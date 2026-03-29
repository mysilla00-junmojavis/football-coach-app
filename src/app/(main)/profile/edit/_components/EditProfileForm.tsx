'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfileAction } from '@/app/(main)/profile/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? '저장 중...' : '저장'}
    </Button>
  )
}

export function EditProfileForm({ defaultName }: { defaultName: string }) {
  const [state, formAction] = useFormState(updateProfileAction, {})

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">이름 *</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={defaultName}
          placeholder="코치 이름"
        />
      </div>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}
