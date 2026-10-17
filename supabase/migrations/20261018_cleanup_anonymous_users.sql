-- StudyBG: автоматично почистване на анонимни акаунти без активност над 30 дни.
-- Изтриването каскадно премахва и техните exam_attempts и ai_usage (ON DELETE CASCADE).
--
-- Изисква pg_cron: Dashboard → Integrations → Cron (или командата по-долу).

create extension if not exists pg_cron;

create or replace function public.cleanup_inactive_anonymous_users()
returns integer
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_deleted integer;
begin
  delete from auth.users u
  where u.is_anonymous is true
    and u.created_at < now() - interval '30 days'
    and coalesce(u.last_sign_in_at, u.created_at) < now() - interval '30 days'
    -- никаква подновена сесия в последните 30 дни
    and not exists (
      select 1
      from auth.sessions s
      where s.user_id = u.id
        and s.updated_at > now() - interval '30 days'
    );
  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke all on function public.cleanup_inactive_anonymous_users() from public, anon, authenticated;

-- Всеки ден в 03:30 UTC (повторното пускане обновява задачата със същото име)
select cron.schedule(
  'studybg-cleanup-anonymous-users',
  '30 3 * * *',
  $$select public.cleanup_inactive_anonymous_users();$$
);
