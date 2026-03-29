# Design

## Design Philosophy
코치가 훈련 현장에서 빠르게 쓸 수 있어야 한다.
복잡한 UI보다 단순하고 명확한 UX를 우선한다.

## Core Principles
1. **빠름** — 핵심 액션은 3탭 이내로 완료
2. **명확함** — 아이콘보다 텍스트 레이블 우선
3. **일관성** — shadcn/ui 컴포넌트를 벗어나지 않는다
4. **모바일 퍼스트** — 현장에서 폰으로 쓰는 상황 기준

## Color Palette
- Primary: green-600 (#16a34a) — 축구 그린
- Primary Light: green-50 — 배경 강조
- Neutral: gray-900 / gray-500 / gray-100
- Danger: red-500
- Success: green-500

## Iconography
- lucide-react 아이콘만 사용한다
- 아이콘 단독 사용 시 반드시 텍스트 레이블 병기

## Spacing System
- 기본 단위: 4px (Tailwind 기본)
- 컴포넌트 간격: gap-4 (16px)
- 섹션 간격: gap-6 (24px)
- 페이지 패딩: px-4 py-6

## Empty States
- 드릴이 없을 때, 기록이 없을 때 등
  반드시 빈 상태 UI를 제공한다
- 빈 상태에는 항상 CTA 버튼을 포함한다
  예: "첫 드릴을 만들어보세요 →"
