'use client'

import { useTransition } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { duplicatePlanAction } from '@/app/(main)/planner/actions'

export function DuplicatePlanButton({ planId }: { planId: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => startTransition(() => duplicatePlanAction(planId))}
      disabled={isPending}
    >
      <Copy size={15} className="mr-1.5" />
      {isPending ? '복제 중...' : '오늘 날짜로 복제'}
    </Button>
  )
}
