# Architecture

## Overview
축구 코치를 위한 드릴 라이브러리 & 훈련 플래너 웹앱.
모바일 브라우저에서도 편하게 쓸 수 있는
반응형 웹으로 구현한다.

## Tech Stack

| 레이어 | 기술 | 이유 |
|--------|------|------|
| Frontend | Next.js 14 (App Router) | React 기반, Vercel 최적화 |
| Styling | Tailwind CSS | 빠른 UI 구현 |
| Backend | Supabase | DB + Auth + Storage 일체형 |
| Database | PostgreSQL (via Supabase) | 관계형 데이터에 적합 |
| Auth | Supabase Auth | 이메일/소셜 로그인 |
| Deploy | Vercel | Next.js 최적 배포 환경 |

## DB Schema (핵심 테이블)

### drills
- id, coach_id, name, purpose[], duration,
  min_players, max_players, difficulty,
  description, equipment[], created_at

### training_plans
- id, coach_id, date, drills[], memo, created_at

### training_records
- id, plan_id, coach_id, date, drills[],
  attendees, memo, completed_at

### coaches
- id, name, avatar_url, created_at

## File Structure
```
src/
├── app/                  # Next.js App Router
│   ├── drills/           # 드릴 생성 & 목록
│   ├── planner/          # 훈련 플래너
│   ├── history/          # 훈련 기록
│   └── profile/          # 코치 프로필
├── components/           # 공통 컴포넌트
├── lib/
│   └── supabase.ts       # Supabase 클라이언트
└── types/                # TypeScript 타입 정의
```

## Constraints
- 모바일 퍼스트 반응형 (코치가 현장에서 폰으로 사용)
- 초기 로딩 3초 이내
- Supabase 무료 티어 내에서 MVP 운영
