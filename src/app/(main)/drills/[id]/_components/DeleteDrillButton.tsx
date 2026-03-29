'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteDrillAction } from '@/app/(main)/drills/actions'

interface DeleteDrillButtonProps {
  drillId: string
}

export function DeleteDrillButton({ drillId }: DeleteDrillButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('드릴을 삭제할까요? 이 작업은 되돌릴 수 없습니다.')) return
    startTransition(() => deleteDrillAction(drillId))
  }

  return (
    <Button
      variant="destructive"
      className="w-full"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 size={15} className="mr-1.5" />
      {isPending ? '삭제 중...' : '드릴 삭제'}
    </Button>
  )
}
