create table training_records (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references training_plans(id) on delete set null,
  date date not null,
  drill_ids uuid[] not null default '{}',
  attendees integer not null default 0,
  memo text,
  created_at timestamptz default now()
);

alter table training_records enable row level security;

create policy "본인 기록 조회" on training_records for select using (auth.uid() = coach_id);
create policy "기록 생성" on training_records for insert with check (auth.uid() = coach_id);
create policy "본인 기록 수정" on training_records for update using (auth.uid() = coach_id);
create policy "본인 기록 삭제" on training_records for delete using (auth.uid() = coach_id);
