create extension if not exists pgcrypto;

create table if not exists public.learnmaster_tutors (
  id uuid primary key default gen_random_uuid(),
  tutor_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  qualification text not null,
  photo_url text not null default '',
  availability text not null,
  subjects text[] not null default '{}',
  grade_levels text[] not null default '{}',
  formats text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learnmaster_tutor_messages (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.learnmaster_tutors(id) on delete cascade,
  sender_user_id uuid not null references auth.users(id) on delete cascade,
  grade_level text not null,
  subject text not null,
  message text not null check (char_length(message) between 1 and 500),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.learnmaster_tutors enable row level security;
alter table public.learnmaster_tutor_messages enable row level security;

drop policy if exists "Authenticated users can view active tutors" on public.learnmaster_tutors;
create policy "Authenticated users can view active tutors"
on public.learnmaster_tutors for select
to authenticated
using (active = true);

drop policy if exists "Learners can send their own tutor messages" on public.learnmaster_tutor_messages;
create policy "Learners can send their own tutor messages"
on public.learnmaster_tutor_messages for insert
to authenticated
with check (sender_user_id = auth.uid());

drop policy if exists "Participants can read tutor messages" on public.learnmaster_tutor_messages;
create policy "Participants can read tutor messages"
on public.learnmaster_tutor_messages for select
to authenticated
using (
  sender_user_id = auth.uid()
  or exists (
    select 1 from public.learnmaster_tutors tutor
    where tutor.id = learnmaster_tutor_messages.tutor_id and tutor.tutor_user_id = auth.uid()
  )
);

insert into public.learnmaster_tutors
  (id,name,qualification,photo_url,availability,subjects,grade_levels,formats,active)
values
  ('11111111-1111-4111-8111-111111111111','Alicia Morgan','B.Ed. Elementary Education · 8 years teaching','images/tutors/alicia-morgan.svg','Mon–Thu, 4:00–7:00 PM',array['English and reading','Math','Homework support'],array['Pre-K','Kindergarten','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5'],array['local','online'],true),
  ('22222222-2222-4222-8222-222222222222','Marcus Reed','M.A. Reading Education · Certified reading specialist','images/tutors/marcus-reed.svg','Tue, Thu, and Sat mornings',array['English and reading','Homework support'],array['Kindergarten','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'],array['online'],true),
  ('33333333-3333-4333-8333-333333333333','Priya Shah','B.S. Biology · STEM tutor and science coach','images/tutors/priya-shah.svg','Weekdays, 5:00–8:00 PM',array['Math','Science','Homework support'],array['Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'],array['local','online'],true),
  ('44444444-4444-4444-8444-444444444444','Elena Torres','M.Ed. Curriculum & Instruction · Social studies teacher','images/tutors/elena-torres.svg','Mon, Wed, Fri, and Sunday afternoons',array['History and social studies','English and reading','Homework support'],array['Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'],array['local','online'],true)
on conflict (id) do update set
  name = excluded.name,
  qualification = excluded.qualification,
  photo_url = excluded.photo_url,
  availability = excluded.availability,
  subjects = excluded.subjects,
  grade_levels = excluded.grade_levels,
  formats = excluded.formats,
  active = excluded.active,
  updated_at = now();

create index if not exists learnmaster_tutors_subjects_idx on public.learnmaster_tutors using gin(subjects);
create index if not exists learnmaster_tutors_grades_idx on public.learnmaster_tutors using gin(grade_levels);
create index if not exists learnmaster_tutor_messages_sender_idx on public.learnmaster_tutor_messages(sender_user_id,created_at desc);
create index if not exists learnmaster_tutor_messages_tutor_idx on public.learnmaster_tutor_messages(tutor_id,created_at desc);
