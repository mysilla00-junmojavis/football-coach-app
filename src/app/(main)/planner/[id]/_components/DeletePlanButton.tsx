'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deletePlanAction } from '@/app/(main)/planner/actions'

export function DeletePlanButton({ planId }: { planId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('플랜을 삭제할까요?')) return
    startTransition(() => deletePlanAction(planId))
  }

  return (
    <Button variant="destructive" className="w-full" onClick={handleDelete} disabled={isPending}>
      <Trash2 size={15} className="mr-1.5" />
      {isPending ? '삭제 중...' : '플랜 삭제'}
    </Button>
  )
}
