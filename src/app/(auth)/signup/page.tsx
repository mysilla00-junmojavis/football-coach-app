import Link from 'next/link'
import { SignupForm } from './_components/SignupForm'

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
        <p className="text-sm text-gray-500">코치 계정을 만들어주세요</p>
      </div>

      <SignupForm />

      <p className="text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          로그인
        </Link>
      </p>
    </div>
  )
}
