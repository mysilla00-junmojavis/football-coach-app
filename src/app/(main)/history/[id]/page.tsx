import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Clock, Users } from 'lucide-react'
import { getRecordById } from '@/lib/queries/history'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { DeleteRecordButton } from './_components/DeleteRecordButton'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

interface RecordDetailPageProps {
  params: { id: string }
}

export default async function RecordDetailPage({ params }: RecordDetailPageProps) {
  const record = await getRecordById(params.id)
  if (!record) notFound()

  const totalDuration = record.drills.reduce((sum, d) => sum + d.duration, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/history" className="text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="flex-1 text-xl font-bold text-gray-900">
          {formatDate(record.date)}
        </h1>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={15} />
          총 {totalDuration}분
        </span>
        <span className="flex items-center gap-1">
          <Users size={15} />
          참석 {record.attendees}명
        </span>
        <span>드릴 {record.drills.length}개</span>
      </div>

      <Separator />

      {record.drills.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">진행한 드릴이 없습니다</p>
      ) : (
        <ol className="space-y-3">
          {record.drills.map((drill, i) => (
            <li key={drill.id} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {i + 1}
              </span>
              <Link href={`/drills/${drill.id}`} className="flex-1">
                <div className="rounded-lg border p-3 hover:bg-gray-50">
                  <p className="font-medium text-gray-900">{drill.name}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {drill.duration}분
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
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
        </ol>
      )}

      {record.memo && (
        <>
          <Separator />
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">메모</p>
            <p className="whitespace-pre-wrap text-sm text-gray-600">{record.memo}</p>
          </div>
        </>
      )}

      <Separator />
      <DeleteRecordButton recordId={record.id} />
    </div>
  )
}
