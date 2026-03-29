'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dumbbell, CalendarDays, ClipboardList, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/drills', label: '드릴', icon: Dumbbell },
  { href: '/planner', label: '플래너', icon: CalendarDays },
  { href: '/history', label: '기록', icon: ClipboardList },
  { href: '/profile', label: '프로필', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <ul className="mx-auto flex max-w-2xl items-center justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
