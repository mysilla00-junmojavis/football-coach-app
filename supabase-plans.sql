create table training_plans (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  drill_ids uuid[] not null default '{}',
  memo text,
  created_at timestamptz default now()
);

alter table training_plans enable row level security;

create policy "본인 플랜 조회" on training_plans for select using (auth.uid() = coach_id);
create policy "플랜 생성" on training_plans for insert with check (auth.uid() = coach_id);
create policy "본인 플랜 수정" on training_plans for update using (auth.uid() = coach_id);
create policy "본인 플랜 삭제" on training_plans for delete using (auth.uid() = coach_id);
