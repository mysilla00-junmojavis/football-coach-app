'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signupAction } from '../actions'

type State = { error?: string; success?: string }
const initialState: State = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? '가입 중...' : '회원가입'}
    </Button>
  )
}

export function SignupForm() {
  const [state, formAction] = useFormState(
    async (_prev: State, formData: FormData) => {
      const result = await signupAction(formData)
      return result ?? initialState
    },
    initialState
  )

  if (state.success) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-center text-sm text-green-700">
        {state.success}
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="홍길동"
          required
          autoComplete="name"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="coach@example.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="8자 이상 입력해주세요"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  )
}
