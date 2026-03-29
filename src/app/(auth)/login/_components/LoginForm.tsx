'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction } from '../actions'

type State = { error?: string }
const initialState: State = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? '로그인 중...' : '로그인'}
    </Button>
  )
}

export function LoginForm() {
  const [state, formAction] = useFormState(
    async (_prev: State, formData: FormData) => {
      const result = await loginAction(formData)
      return result ?? initialState
    },
    initialState
  )

  return (
    <form action={formAction} className="space-y-4">
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
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  )
}
