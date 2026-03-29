# Security

## 인증
- Supabase Auth 사용 (이메일 로그인)
- 모든 페이지는 로그인 필수
  (로그인/회원가입 페이지 제외)
- 미인증 접근 시 /login으로 리다이렉트

## 데이터 접근 제어
- Supabase RLS 필수 적용
- 각 테이블 정책:
  - drills: coach_id = auth.uid()만 CRUD 가능
  - training_plans: coach_id = auth.uid()만 CRUD 가능
  - training_records: coach_id = auth.uid()만 CRUD 가능

## 환경변수
- API 키는 반드시 .env.local에 보관
- NEXT_PUBLIC_ 접두사는 클라이언트에 노출됨 주의
- Supabase Service Role Key는 절대
  클라이언트에 노출 금지

## 에이전트 보안 규칙
- SQL 인젝션 방지: 반드시 Supabase
  클라이언트 메서드 사용 (raw query 금지)
- 사용자 입력값은 반드시 서버에서 검증
- auth.uid()는 클라이언트가 아닌
  서버에서 가져온다
