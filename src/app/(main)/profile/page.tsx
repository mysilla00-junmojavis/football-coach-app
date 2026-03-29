import Link from 'next/link'
import { Pencil, Clock, Users } from 'lucide-react'
import { getProfile, getMyDrills, calcDrillStats } from '@/lib/queries/profile'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { LogoutButton } from './_components/LogoutButton'

export default async function ProfilePage() {
  const [profile, drills] = await Promise.all([getProfile(), getMyDrills()])
  const stats = calcDrillStats(drills)

  const initials = profile?.name
    ? profile.name.slice(0, 2).toUpperCase()
    : '?'

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-gray-900 truncate">{profile?.name ?? '이름 없음'}</p>
          <p className="text-sm text-gray-500">드릴 {drills.length}개 · 코치</p>
        </div>
        <Link href="/profile/edit">
          <Button variant="outline" size="sm">
            <Pencil size={14} className="mr-1" />
            수정
          </Button>
        </Link>
      </div>

      <Separator />

      {/* 드릴 카테고리 통계 */}
      {stats.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">드릴 카테고리</p>
          <ul className="space-y-2">
            {stats.map(({ purpose, count, percentage }) => (
              <li key={purpose}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{purpose}</span>
                  <span className="text-xs text-gray-500">{count}개 · {percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Separator />

      {/* 내 드릴 목록 */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">내 드릴 ({drills.length})</p>
        {drills.length === 0 ? (
          <p className="text-sm text-gray-400">아직 만든 드릴이 없어요</p>
        ) : (
          <ul className="space-y-2">
            {drills.map((drill) => (
              <li key={drill.id}>
                <Link href={`/drills/${drill.id}`}>
                  <div className="rounded-lg border p-3 hover:bg-gray-50">
                    <p className="font-medium text-gray-900 text-sm">{drill.name}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {drill.duration}분
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={11} />
                        {drill.min_players}~{drill.max_players}명
                      </span>
                    </div>
                    {drill.purpose.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {drill.purpose.map((p) => (
                          <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Separator />
      <LogoutButton />
    </div>
  )
}
