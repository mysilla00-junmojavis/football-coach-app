import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Clock, Users, Pencil } from 'lucide-react'
import { getDrillById } from '@/lib/queries/drills'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DeleteDrillButton } from './_components/DeleteDrillButton'

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
}

interface DrillDetailPageProps {
  params: { id: string }
}

export default async function DrillDetailPage({ params }: DrillDetailPageProps) {
  const drill = await getDrillById(params.id)
  if (!drill) notFound()

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <Link href="/drills" className="text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="flex-1 text-xl font-bold text-gray-900">{drill.name}</h1>
        <Link href={`/drills/${drill.id}/edit`}>
          <Button variant="outline" size="sm">
            <Pencil size={14} className="mr-1" />
            수정
          </Button>
        </Link>
      </div>

      {/* 기본 정보 */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Clock size={15} />
          {drill.duration}분
        </span>
        <span className="flex items-center gap-1">
          <Users size={15} />
          {drill.min_players}~{drill.max_players}명
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium">
          {DIFFICULTY_LABEL[drill.difficulty]}
        </span>
      </div>

      {/* 목적 */}
      {drill.purpose.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-700">목적</p>
          <div className="flex flex-wrap gap-1.5">
            {drill.purpose.map((p) => (
              <Badge key={p} variant="secondary">{p}</Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* 설명 */}
      {drill.description && (
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-700">설명</p>
          <p className="whitespace-pre-wrap text-sm text-gray-600">{drill.description}</p>
        </div>
      )}

      {/* 필요 장비 */}
      {drill.equipment.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-700">필요 장비</p>
          <div className="flex flex-wrap gap-1.5">
            {drill.equipment.map((e) => (
              <Badge key={e} variant="outline">{e}</Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* 삭제 버튼 */}
      <DeleteDrillButton drillId={drill.id} />
    </div>
  )
}
