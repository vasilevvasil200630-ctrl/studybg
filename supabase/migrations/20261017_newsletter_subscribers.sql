-- StudyBG: абонати за бюлетина — браузърът може САМО да добави имейл.
-- Без политики за select/update/delete: никой клиент не може да прочете, промени
-- или изтрие чужд имейл. Отписването минава през unsubscribe_newsletter() (security definer).

create table if not exists public.newsletter_subscribers (
  email text primary key check (email = lower(email) and length(email) between 5 and 254 and email like '%_@_%._%'),
  grade text not null default 'Всички' check (length(grade) <= 60),
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter: insert" on public.newsletter_subscribers;
create policy "newsletter: insert" on public.newsletter_subscribers
  for insert to anon, authenticated
  with check (email = lower(email));

revoke all on public.newsletter_subscribers from anon, authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;

-- Отписване по имейл (чл. 17 GDPR). Не разкрива дали имейлът е съществувал.
create or replace function public.unsubscribe_newsletter(p_email text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.newsletter_subscribers where email = lower(trim(p_email));
$$;

revoke all on function public.unsubscribe_newsletter(text) from public;
grant execute on function public.unsubscribe_newsletter(text) to anon, authenticated;
