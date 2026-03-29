import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users } from 'lucide-react'
import type { Drill } from '@/types'

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
}

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
}

interface DrillCardProps {
  drill: Drill
}

export function DrillCard({ drill }: DrillCardProps) {
  return (
    <Link href={`/drills/${drill.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-semibold text-gray-900">{drill.name}</h2>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${DIFFICULTY_COLOR[drill.difficulty]}`}
            >
              {DIFFICULTY_LABEL[drill.difficulty]}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {drill.duration}분
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {drill.min_players}~{drill.max_players}명
            </span>
          </div>

          {drill.purpose.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {drill.purpose.map((p) => (
                <Badge key={p} variant="secondary" className="text-xs">
                  {p}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
