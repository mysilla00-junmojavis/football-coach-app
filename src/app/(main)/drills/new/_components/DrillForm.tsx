'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { DrillFormState } from '../../actions'
import type { Drill } from '@/types'

const PURPOSE_OPTIONS = [
  '공격', '수비', '패스', '슈팅', '드리블',
  '체력', '전술', '세트피스', '민첩성', '스피드', '파워',
]
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
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [description, setDescription] = useState(defaultValues?.description ?? '')
  const [equipment, setEquipment] = useState(defaultValues?.equipment?.join(', ') ?? '')
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>(defaultValues?.purpose ?? [])
  const [duration, setDuration] = useState(defaultValues?.duration?.toString() ?? '')
  const [minPlayers, setMinPlayers] = useState(defaultValues?.min_players?.toString() ?? '')
  const [maxPlayers, setMaxPlayers] = useState(defaultValues?.max_players?.toString() ?? '')
  const [difficulty, setDifficulty] = useState(defaultValues?.difficulty ?? 'medium')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  function togglePurpose(p: string) {
    setSelectedPurposes((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  async function handleAiGenerate() {
    if (selectedPurposes.length === 0) {
      setAiError('목적을 하나 이상 선택해주세요.')
      return
    }
    setAiError('')
    setAiLoading(true)
    try {
      const res = await fetch('/api/generate-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purposes: selectedPurposes,
          duration: duration || 15,
          minPlayers: minPlayers || 4,
          maxPlayers: maxPlayers || 12,
          difficulty,
        }),
      })
      const data = await res.json()
      if (data.error) {
        setAiError(data.error)
      } else {
        if (data.name) setName(data.name)
        if (data.description) setDescription(data.description)
        if (data.equipment) setEquipment(data.equipment)
      }
    } catch {
      setAiError('AI 생성 중 오류가 발생했습니다.')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* 목적 */}
      <div className="space-y-2">
        <Label>목적 (복수 선택 가능)</Label>
        <div className="flex flex-wrap gap-2">
          {PURPOSE_OPTIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => togglePurpose(p)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                selectedPurposes.includes(p)
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 text-gray-600 hover:border-primary'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        {selectedPurposes.map((p) => (
          <input key={p} type="hidden" name="purpose" value={p} />
        ))}
      </div>

      {/* AI 생성 버튼 */}
      <Button
        type="button"
        variant="outline"
        className="w-full border-primary text-primary hover:bg-primary/5"
        onClick={handleAiGenerate}
        disabled={aiLoading}
      >
        <Sparkles size={15} className="mr-1.5" />
        {aiLoading ? 'AI가 드릴을 만드는 중...' : 'AI로 드릴 자동 생성'}
      </Button>
      {aiError && <p className="text-sm text-red-500">{aiError}</p>}

      {/* 이름 */}
      <div className="space-y-1.5">
        <Label htmlFor="name">드릴 이름 *</Label>
        <Input
          id="name"
          name="name"
          placeholder="예: 3대1 패스 훈련"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
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
            value={minPlayers}
            onChange={(e) => setMinPlayers(e.target.value)}
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
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
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
                checked={difficulty === value}
                onChange={() => setDifficulty(value as 'easy' | 'medium' | 'hard')}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* 필요 장비 */}
      <div className="space-y-1.5">
        <Label htmlFor="equipment">필요 장비</Label>
        <Input
          id="equipment"
          name="equipment"
          placeholder="콘, 공, 조끼 (쉼표로 구분)"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
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
