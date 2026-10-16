-- StudyBG: собственост на изпитните опити (user_id + RLS) и дневен лимит за AI заявките.
-- Идемпотентна миграция: може да се пусне и върху вече съществуваща таблица exam_attempts.
-- Изисква: Authentication → Sign In / Providers → „Allow anonymous sign-ins“ = ON,
-- за да получат учениците анонимен акаунт без регистрация.

-- ---------------------------------------------------------------------------
-- 1. exam_attempts
-- ---------------------------------------------------------------------------
create table if not exists public.exam_attempts (
  id text primary key,
  lesson_id text not null,
  lesson_title text not null,
  subject text not null,
  grade text not null,
  exam_preset text,
  duration_minutes integer,
  time_spent_seconds integer,
  module1_points integer not null default 0,
  module2_points integer not null default 0,
  module3_points integer not null default 0,
  total_points integer not null default 0 check (total_points between 0 and 100),
  grade_equivalent text,
  grade_numeric numeric(3, 2) check (grade_numeric between 2 and 6),
  passed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.exam_attempts
  add column if not exists user_id uuid references auth.users (id) on delete cascade default auth.uid();

create index if not exists exam_attempts_user_created_idx
  on public.exam_attempts (user_id, created_at desc);

alter table public.exam_attempts enable row level security;

-- Стари анонимни записи без собственик не са видими за никого (няма политика за user_id IS NULL)
drop policy if exists "exam_attempts: select own" on public.exam_attempts;
drop policy if exists "exam_attempts: insert own" on public.exam_attempts;
drop policy if exists "exam_attempts: update own" on public.exam_attempts;
drop policy if exists "exam_attempts: delete own" on public.exam_attempts;

create policy "exam_attempts: select own" on public.exam_attempts
  for select to authenticated using (user_id = (select auth.uid()));

create policy "exam_attempts: insert own" on public.exam_attempts
  for insert to authenticated with check (user_id = (select auth.uid()));

create policy "exam_attempts: update own" on public.exam_attempts
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "exam_attempts: delete own" on public.exam_attempts
  for delete to authenticated using (user_id = (select auth.uid()));

-- Ролята anon (без сесия) няма достъп до таблицата
revoke all on public.exam_attempts from anon;
grant select, insert, update, delete on public.exam_attempts to authenticated;

-- ---------------------------------------------------------------------------
-- 2. ai_usage — брояч на AI заявките на потребител за деня (часова зона София)
-- ---------------------------------------------------------------------------
create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  usage_date date not null default ((now() at time zone 'Europe/Sofia')::date),
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, usage_date)
);

alter table public.ai_usage enable row level security;

drop policy if exists "ai_usage: select own" on public.ai_usage;
create policy "ai_usage: select own" on public.ai_usage
  for select to authenticated using (user_id = (select auth.uid()));

-- Без insert/update политики: записът става само през consume_ai_quota()
revoke all on public.ai_usage from anon, authenticated;
grant select on public.ai_usage to authenticated;

-- Атомарно „взимане“ на една AI заявка. Връща false, когато дневният лимит е изчерпан.
create or replace function public.consume_ai_quota(p_limit integer default 30)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_today date := (now() at time zone 'Europe/Sofia')::date;
  v_count integer;
begin
  if v_uid is null then
    return false;
  end if;

  insert into public.ai_usage as u (user_id, usage_date, request_count)
  values (v_uid, v_today, 1)
  on conflict (user_id, usage_date) do update
    set request_count = u.request_count + 1,
        updated_at = now()
    -- твърд таван 200, независимо какъв лимит подаде извикващият
    where u.request_count < least(greatest(p_limit, 1), 200)
  returning request_count into v_count;

  return v_count is not null;
end;
$$;

revoke all on function public.consume_ai_quota(integer) from public, anon;
grant execute on function public.consume_ai_quota(integer) to authenticated;
