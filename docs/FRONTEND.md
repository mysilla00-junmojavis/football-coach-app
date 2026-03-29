# Frontend

## UI Library
- shadcn/ui를 기본 컴포넌트 라이브러리로 사용한다
- 커스텀 컴포넌트 제작 전 shadcn/ui에 있는지
  먼저 확인한다
- shadcn/ui 컴포넌트는 components/ui/ 에 위치한다

## Design Tokens

### Colors
- Primary: 축구 그린 계열 (green-600)
- Background: white / gray-50
- Text: gray-900 (기본) / gray-500 (보조)
- Danger: red-500
- 다크모드: MVP에서는 지원하지 않는다

### Typography
- 폰트: Pretendard (한국어 최적화)
- 제목: font-bold text-xl 이상
- 본문: text-sm ~ text-base
- 보조 텍스트: text-sm text-gray-500

### Spacing
- 페이지 좌우 패딩: px-4 (모바일) / px-8 (데스크탑)
- 카드 내부 패딩: p-4
- 섹션 간격: gap-4 ~ gap-6

## Component Conventions

### 페이지 레이아웃
- 최대 너비: max-w-2xl mx-auto (모바일 퍼스트)
- 하단 네비게이션 바 사용 (모바일 앱 느낌)

### 카드
- 드릴, 훈련 플랜 등은 카드 형태로 표시
- shadcn/ui Card 컴포넌트 사용

### 폼
- shadcn/ui Form + react-hook-form 조합
- 에러 메시지는 필드 바로 아래 표시

### 버튼
- Primary 액션: Button variant="default"
- 취소/보조: Button variant="outline"
- 위험 액션: Button variant="destructive"

## Navigation Structure
- 하단 탭 바 (모바일 기준)
  - 드릴 (Drills)
  - 플래너 (Planner)
  - 기록 (History)
  - 프로필 (Profile)

## Rules
- shadcn/ui가 제공하는 컴포넌트는 직접 만들지 않는다
- 모든 UI는 모바일(375px) 기준으로 먼저 만든다
- 로딩 상태는 반드시 처리한다 (shadcn/ui Skeleton)
- 에러 상태는 반드시 처리한다 (toast 알림)
