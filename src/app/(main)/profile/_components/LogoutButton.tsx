'use client'

import { useTransition } from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/app/(main)/profile/actions'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="outline"
      className="w-full text-red-500 hover:text-red-600"
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
    >
      <LogOut size={15} className="mr-1.5" />
      {isPending ? '로그아웃 중...' : '로그아웃'}
    </Button>
  )
}
