'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { DrillFormState } from '../../actions'
import type { Drill } from '@/types'

const PURPOSE_OPTIONS = ['공격', '수비', '패스', '슈팅', '드리블', '체력', '전술', '세트피스']
const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: '쉬움' },
  { value: 'medium', label: '보통' },
  { value: 'hard', label: '어려움' },
]

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? '저장 중...' : label}
    </Button>
  )
}

interface DrillFormProps {
  action: (prev: DrillFormState, formData: FormData) => Promise<DrillFormState>
  defaultValues?: Partial<Drill>
  submitLabel?: string
}

export function DrillForm({ action, defaultValues, submitLabel = '드릴 저장' }: DrillFormProps) {
  const [state, formAction] = useFormState(action, {})

  return (
    <form action={formAction} className="space-y-5">
      {/* 이름 */}
      <div className="space-y-1.5">
        <Label htmlFor="name">드릴 이름 *</Label>
        <Input
          id="name"
          name="name"
          placeholder="예: 3대1 패스 훈련"
          required
          defaultValue={defaultValues?.name}
        />
      </div>

      {/* 목적 */}
      <div className="space-y-2">
        <Label>목적 (복수 선택 가능)</Label>
        <div className="flex flex-wrap gap-2">
          {PURPOSE_OPTIONS.map((p) => (
            <label key={p} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                name="purpose"
                value={p}
                defaultChecked={defaultValues?.purpose?.includes(p)}
                className="rounded border-gray-300 text-primary"
              />
              <span className="text-sm">{p}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 소요시간 */}
      <div className="space-y-1.5">
        <Label htmlFor="duration">소요시간 (분) *</Label>
        <Input
          id="duration"
          name="duration"
          type="number"
          min={1}
          max={120}
          placeholder="15"
          required
          defaultValue={defaultValues?.duration}
        />
      </div>

      {/* 참여 인원 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="min_players">최소 인원 *</Label>
          <Input
            id="min_players"
            name="min_players"
            type="number"
            min={1}
            placeholder="4"
            required
            defaultValue={defaultValues?.min_players}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="max_players">최대 인원 *</Label>
          <Input
            id="max_players"
            name="max_players"
            type="number"
            min={1}
            placeholder="12"
            required
            defaultValue={defaultValues?.max_players}
          />
        </div>
      </div>

      {/* 난이도 */}
      <div className="space-y-1.5">
        <Label>난이도 *</Label>
        <div className="flex gap-3">
          {DIFFICULTY_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="difficulty"
                value={value}
                required
                defaultChecked={defaultValues?.difficulty === value || (!defaultValues?.difficulty && value === 'medium')}
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 설명 */}
      <div className="space-y-1.5">
        <Label htmlFor="description">설명</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="훈련 방법, 규칙 등을 적어주세요"
          rows={4}
          defaultValue={defaultValues?.description}
        />
      </div>

      {/* 필요 장비 */}
      <div className="space-y-1.5">
        <Label htmlFor="equipment">필요 장비</Label>
        <Input
          id="equipment"
          name="equipment"
          placeholder="콘, 공, 조끼 (쉼표로 구분)"
          defaultValue={defaultValues?.equipment?.join(', ')}
        />
        <p className="text-xs text-gray-400">쉼표(,)로 구분해서 입력하세요</p>
      </div>

      {state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <SubmitButton label={submitLabel} />
    </form>
  )
}
