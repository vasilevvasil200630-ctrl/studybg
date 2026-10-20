-- StudyBG: потребителски профили с Google OAuth и облачна синхронизация на прогреса (План за 6.00 + Банка с грешки).
-- Идемпотентна миграция: може да се изпълни многократно.
-- Изисква: Authentication → Sign In / Providers → Google = Enabled в Supabase Dashboard.

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  auth_provider text not null default 'google',
  study_progress jsonb not null default '{}'::jsonb,
  error_bank jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists user_profiles_updated_at_idx
  on public.user_profiles (updated_at desc);

alter table public.user_profiles enable row level security;

drop policy if exists "user_profiles: select own" on public.user_profiles;
drop policy if exists "user_profiles: insert own" on public.user_profiles;
drop policy if exists "user_profiles: update own" on public.user_profiles;
drop policy if exists "user_profiles: delete own" on public.user_profiles;

create policy "user_profiles: select own" on public.user_profiles
  for select to authenticated using (user_id = (select auth.uid()));

create policy "user_profiles: insert own" on public.user_profiles
  for insert to authenticated with check (user_id = (select auth.uid()));

create policy "user_profiles: update own" on public.user_profiles
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "user_profiles: delete own" on public.user_profiles
  for delete to authenticated using (user_id = (select auth.uid()));

revoke all on public.user_profiles from anon;
grant select, insert, update, delete on public.user_profiles to authenticated;
