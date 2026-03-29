'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { RecordFormState } from '@/app/(main)/history/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? '저장 중...' : '기록 저장'}
    </Button>
  )
}

interface CompleteTrainingButtonProps {
  action: (prev: RecordFormState, formData: FormData) => Promise<RecordFormState>
}

export function CompleteTrainingButton({ action }: CompleteTrainingButtonProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState(action, {})

  if (!open) {
    return (
      <Button className="w-full" onClick={() => setOpen(true)}>
        <CheckCircle size={15} className="mr-1.5" />
        훈련 완료 기록
      </Button>
    )
  }

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">훈련 완료 기록</p>
        <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      <form action={formAction} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="attendees">참석 인원 *</Label>
          <Input
            id="attendees"
            name="attendees"
            type="number"
            min={1}
            placeholder="참석한 선수 수"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="memo">메모</Label>
          <Textarea
            id="memo"
            name="memo"
            placeholder="오늘 훈련 총평"
            rows={2}
          />
        </div>
        {state.error && <p className="text-sm text-red-500">{state.error}</p>}
        <SubmitButton />
      </form>
    </div>
  )
}
