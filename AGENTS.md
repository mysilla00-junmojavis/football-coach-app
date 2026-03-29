# Agents

## Overview
이 문서는 AI 에이전트가 코드를 작성할 때
반드시 따라야 할 규칙을 정의한다.
모든 규칙은 이 프로젝트의 일관성과
유지보수성을 위해 존재한다.

## Core Rules

### 1. 언어
- TypeScript를 사용한다
- any 타입은 허용하나, 가능하면 명시적 타입을 우선한다
- 새 파일은 반드시 .ts 또는 .tsx 확장자를 사용한다

### 2. 컴포넌트
- 컴포넌트는 반드시 작은 단위로 제작한다
- 한 컴포넌트가 하나의 역할만 담당하도록 한다
- 200줄이 넘으면 반드시 분리를 고려한다
- 컴포넌트 파일명은 PascalCase로 작성한다
  예: DrillCard.tsx, TrainingPlanList.tsx

### 3. 데이터 페칭
- API 호출은 반드시 서버 컴포넌트에서 처리한다
- 클라이언트 컴포넌트에서 직접 Supabase를
  호출하지 않는다
- 데이터 페칭 로직은 /lib 또는 /actions 폴더에 분리한다

### 4. 파일 구조 규칙
- 페이지: app/(route)/page.tsx
- 서버 액션: app/(route)/actions.ts
- 공통 컴포넌트: components/
- 특정 페이지 전용 컴포넌트: app/(route)/_components/
- Supabase 쿼리: lib/queries/

### 5. 스타일
- 스타일은 Tailwind CSS만 사용한다
- inline style 사용은 지양한다
- 모바일 퍼스트로 작성한다
  예: 기본값이 모바일, md: 이상이 데스크탑

## What Agents Should NOT Do
- 하나의 파일에 모든 로직을 몰아넣지 않는다
- 클라이언트 컴포넌트에서 직접 DB를 호출하지 않는다
- 기존 파일 구조를 임의로 변경하지 않는다
- 확인 없이 DB 스키마를 변경하지 않는다

## When in Doubt
- ARCHITECTURE.md를 먼저 참고한다
- 기능 요구사항은 docs/product-specs/를 참고한다
- 디자인 결정은 docs/FRONTEND.md를 참고한다
