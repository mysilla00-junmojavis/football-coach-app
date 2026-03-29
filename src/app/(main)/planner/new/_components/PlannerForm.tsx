'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Clock, Plus, X, ChevronUp, ChevronDown } from 'lucide-react'
import type { Drill } from '@/types'
import type { PlanFormState } from '../../actions'

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? '저장 중...' : label}
    </Button>
  )
}

interface PlannerFormProps {
  action: (prev: PlanFormState, formData: FormData) => Promise<PlanFormState>
  allDrills: Drill[]
  defaultDate?: string
  defaultDrillIds?: string[]
  defaultMemo?: string
  submitLabel?: string
}

export function PlannerForm({
  action,
  allDrills,
  defaultDate,
  defaultDrillIds = [],
  defaultMemo = '',
  submitLabel = '플랜 저장',
}: PlannerFormProps) {
  const [state, formAction] = useFormState(action, {})
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultDrillIds)
  const [search, setSearch] = useState('')

  const selectedDrills = selectedIds
    .map((id) => allDrills.find((d) => d.id === id))
    .filter(Boolean) as Drill[]

  const totalDuration = selectedDrills.reduce((s, d) => s + d.duration, 0)

  const filteredDrills = allDrills.filter(
    (d) =>
      !selectedIds.includes(d.id) &&
      d.name.toLowerCase().includes(search.toLowerCase())
  )

  function addDrill(id: string) {
    setSelectedIds((prev) => [...prev, id])
    setSearch('')
  }

  function removeDrill(id: string) {
    setSelectedIds((prev) => prev.filter((x) => x !== id))
  }

  function moveUp(index: number) {
    if (index === 0) return
    setSelectedIds((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  function moveDown(index: number) {
    if (index === selectedIds.length - 1) return
    setSelectedIds((prev) => {
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form action={formAction} className="space-y-5">
      {/* 날짜 */}
      <div className="space-y-1.5">
        <Label htmlFor="date">훈련 날짜 *</Label>
        <Input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={defaultDate ?? today}
        />
      </div>

      {/* 드릴 선택 */}
      <div className="space-y-2">
        <Label>드릴 추가</Label>
        <Input
          placeholder="드릴 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && filteredDrills.length > 0 && (
          <ul className="max-h-48 overflow-y-auto rounded-lg border divide-y">
            {filteredDrills.map((drill) => (
              <li key={drill.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={() => addDrill(drill.id)}
                >
                  <span className="font-medium">{drill.name}</span>
                  <span className="flex items-center gap-2 text-gray-400">
                    <Clock size={12} />
                    {drill.duration}분
                    <Plus size={14} className="text-primary" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {search && filteredDrills.length === 0 && (
          <p className="text-sm text-gray-400">검색 결과가 없습니다</p>
        )}
      </div>

      {/* 선택된 드릴 목록 */}
      {selectedDrills.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>훈련 순서</Label>
            <span className="flex items-center gap-1 text-sm text-primary font-medium">
              <Clock size={14} />
              총 {totalDuration}분
            </span>
          </div>
          <ol className="space-y-2">
            {selectedDrills.map((drill, i) => (
              <li key={drill.id} className="flex items-center gap-2 rounded-lg border p-2">
                {/* 순서 hidden inputs */}
                <input type="hidden" name="drill_ids" value={drill.id} />
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-white font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{drill.name}</p>
                  <p className="text-xs text-gray-400">{drill.duration}분 · {drill.min_players}~{drill.max_players}명</p>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveUp(i)} disabled={i === 0}
                    className="rounded p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                    <ChevronUp size={16} />
                  </button>
                  <button type="button" onClick={() => moveDown(i)} disabled={i === selectedDrills.length - 1}
                    className="rounded p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                    <ChevronDown size={16} />
                  </button>
                  <button type="button" onClick={() => removeDrill(drill.id)}
                    className="rounded p-0.5 text-gray-400 hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* 메모 */}
      <div className="space-y-1.5">
        <Label htmlFor="memo">메모</Label>
        <Textarea
          id="memo"
          name="memo"
          placeholder="오늘 훈련 목표나 특이사항을 적어주세요"
          rows={3}
          defaultValue={defaultMemo}
        />
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <SubmitButton label={submitLabel} />
    </form>
  )
}
