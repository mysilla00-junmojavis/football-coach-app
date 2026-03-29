create table drills (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  purpose text[] not null default '{}',
  duration integer not null,
  min_players integer not null,
  max_players integer not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  description text not null default '',
  equipment text[] not null default '{}',
  created_at timestamptz default now()
);

alter table drills enable row level security;

create policy "본인 드릴 조회" on drills for select using (auth.uid() = coach_id);
create policy "드릴 생성" on drills for insert with check (auth.uid() = coach_id);
create policy "본인 드릴 수정" on drills for update using (auth.uid() = coach_id);
create policy "본인 드릴 삭제" on drills for delete using (auth.uid() = coach_id);
