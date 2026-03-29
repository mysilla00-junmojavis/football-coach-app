# Database Schema

## Overview
Supabase (PostgreSQL) 기반 스키마 정의.
모든 테이블은 RLS(Row Level Security)를 활성화한다.

---

## Tables

### coaches
코치 프로필 정보. Supabase Auth와 1:1 연결.

```sql
create table coaches (
  id uuid references auth.users(id) primary key,
  name text not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- RLS
alter table coaches enable row level security;

create policy "코치는 자신의 프로필만 조회/수정 가능"
on coaches
for all
using (auth.uid() = id);
```

---

### drills
코치가 만든 드릴 정보.

```sql
create table drills (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references coaches(id) not null,
  name text not null,
  purpose text[] not null,        -- 예: ['패스', '슈팅']
  duration_minutes int not null,  -- 소요시간 (분)
  min_players int not null,
  max_players int not null,
  difficulty text not null,       -- '초급' | '중급' | '고급'
  description text not null,
  equipment text[],               -- 예: ['콘', '조끼']
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table drills enable row level security;

create policy "코치는 자신의 드릴만 CRUD 가능"
on drills
for all
using (auth.uid() = coach_id);
```

---

### training_plans
코치가 만든 훈련 계획.

```sql
create table training_plans (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references coaches(id) not null,
  date date not null,
  drill_ids uuid[] not null,      -- 순서 포함한 드릴 ID 배열
  total_minutes int not null,     -- 자동 계산값 저장
  memo text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table training_plans enable row level security;

create policy "코치는 자신의 플랜만 CRUD 가능"
on training_plans
for all
using (auth.uid() = coach_id);
```

---

### training_records
훈련 완료 후 기록.

```sql
create table training_records (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references coaches(id) not null,
  plan_id uuid references training_plans(id),
  date date not null,
  drill_ids uuid[] not null,      -- 실제 진행한 드릴 목록
  attendees int not null,         -- 참석 인원
  memo text,
  completed_at timestamptz default now()
);

-- RLS
alter table training_records enable row level security;

create policy "코치는 자신의 기록만 CRUD 가능"
on training_records
for all
using (auth.uid() = coach_id);
```

---

## Triggers

### updated_at 자동 갱신
drills, training_plans 테이블의
updated_at을 자동으로 갱신한다.

```sql
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger drills_updated_at
before update on drills
for each row execute function update_updated_at();

create trigger training_plans_updated_at
before update on training_plans
for each row execute function update_updated_at();
```

---

## 신규 코치 자동 프로필 생성
회원가입 시 coaches 테이블에 자동으로 row 생성.

```sql
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.coaches (id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', '코치')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function handle_new_user();
```
