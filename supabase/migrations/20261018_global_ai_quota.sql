-- StudyBG: глобален дневен таван за AI заявките (защита на бюджета на Gemini ключа)
-- + причина при отказ. Заменя consume_ai_quota(integer) от 20261016_rls_and_ai_usage.sql.
--
-- Сигурност: функцията се изпълнява САМО от service_role (Edge Function gemini-proxy след
-- проверка на сесията). Иначе всеки (и анонимен) потребител би могъл да я вика директно
-- и да изчерпи глобалния таван — т.е. да спре AI за всички, без да харчи токени.

drop function if exists public.consume_ai_quota(integer);

create index if not exists ai_usage_date_idx on public.ai_usage (usage_date);

create or replace function public.consume_ai_quota(
  p_user_id uuid,
  p_limit integer default 30,
  p_global_limit integer default 500
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today date := (now() at time zone 'Europe/Sofia')::date;
  v_global integer;
  v_count integer;
begin
  if p_user_id is null then
    return 'no_session';
  end if;

  -- Сериализира проверките за деня: паралелни заявки не могат да прескочат тавана
  perform pg_advisory_xact_lock(hashtext('studybg_ai_quota'), (v_today - date '2000-01-01'));

  select coalesce(sum(request_count), 0) into v_global
  from public.ai_usage
  where usage_date = v_today;

  -- твърди тавани независимо от подадените стойности
  if v_global >= least(greatest(p_global_limit, 1), 5000) then
    return 'global_limit';
  end if;

  insert into public.ai_usage as u (user_id, usage_date, request_count)
  values (p_user_id, v_today, 1)
  on conflict (user_id, usage_date) do update
    set request_count = u.request_count + 1,
        updated_at = now()
    where u.request_count < least(greatest(p_limit, 1), 200)
  returning request_count into v_count;

  if v_count is null then
    return 'user_limit';
  end if;
  return 'ok';
end;
$$;

revoke all on function public.consume_ai_quota(uuid, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_ai_quota(uuid, integer, integer) to service_role;
