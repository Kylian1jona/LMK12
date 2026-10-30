create table if not exists public.learnmaster_lesson_likes (
  lesson_key text not null check (length(lesson_key) <= 140),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (lesson_key, user_id)
);

create index if not exists learnmaster_lesson_likes_user_id_idx
  on public.learnmaster_lesson_likes (user_id);

alter table public.learnmaster_lesson_likes enable row level security;
revoke all on public.learnmaster_lesson_likes from anon, authenticated;

create or replace function public.learnmaster_lesson_like_summary(p_lesson_key text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  viewer_id uuid := auth.uid();
begin
  if p_lesson_key is null or p_lesson_key !~ '^(prek|k|g([1-9]|1[0-2])):[a-z0-9_]+:[A-Za-z0-9_]+$' then
    raise exception 'Invalid lesson key' using errcode = '22023';
  end if;
  return pg_catalog.jsonb_build_object(
    'count', (select count(*) from public.learnmaster_lesson_likes where lesson_key = p_lesson_key),
    'liked', (select exists(select 1 from public.learnmaster_lesson_likes where lesson_key = p_lesson_key and user_id = viewer_id))
  );
end;
$$;

create or replace function public.learnmaster_toggle_lesson_like(p_lesson_key text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  viewer_id uuid := auth.uid();
  removed_count integer;
  now_liked boolean;
begin
  if viewer_id is null then
    raise exception 'Sign in to like a lesson' using errcode = '28000';
  end if;
  if p_lesson_key is null or p_lesson_key !~ '^(prek|k|g([1-9]|1[0-2])):[a-z0-9_]+:[A-Za-z0-9_]+$' then
    raise exception 'Invalid lesson key' using errcode = '22023';
  end if;
  delete from public.learnmaster_lesson_likes
   where lesson_key = p_lesson_key and user_id = viewer_id;
  get diagnostics removed_count = row_count;
  if removed_count = 0 then
    insert into public.learnmaster_lesson_likes (lesson_key, user_id)
    values (p_lesson_key, viewer_id)
    on conflict do nothing;
  end if;
  select exists(
    select 1 from public.learnmaster_lesson_likes
     where lesson_key = p_lesson_key and user_id = viewer_id
  ) into now_liked;
  return pg_catalog.jsonb_build_object(
    'count', (select count(*) from public.learnmaster_lesson_likes where lesson_key = p_lesson_key),
    'liked', now_liked
  );
end;
$$;

revoke all on function public.learnmaster_lesson_like_summary(text) from public;
revoke all on function public.learnmaster_toggle_lesson_like(text) from public;
grant execute on function public.learnmaster_lesson_like_summary(text) to anon, authenticated;
grant execute on function public.learnmaster_toggle_lesson_like(text) to authenticated;
