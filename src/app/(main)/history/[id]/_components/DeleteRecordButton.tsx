'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteRecordAction } from '@/app/(main)/history/actions'

export function DeleteRecordButton({ recordId }: { recordId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('기록을 삭제할까요?')) return
    startTransition(() => deleteRecordAction(recordId))
  }

  return (
    <Button variant="destructive" className="w-full" onClick={handleDelete} disabled={isPending}>
      <Trash2 size={15} className="mr-1.5" />
      {isPending ? '삭제 중...' : '기록 삭제'}
    </Button>
  )
}
