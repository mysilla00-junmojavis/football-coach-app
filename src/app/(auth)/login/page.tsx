import Link from 'next/link'
import { LoginForm } from './_components/LoginForm'

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-gray-900">풋볼 코치</h1>
        <p className="text-sm text-gray-500">훈련 관리를 시작해보세요</p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-gray-500">
        계정이 없으신가요?{' '}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  )
}
