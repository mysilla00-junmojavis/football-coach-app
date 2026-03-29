import Link from 'next/link'
import { ClipboardList } from 'lucide-react'
import { getRecords } from '@/lib/queries/history'
import { Card, CardContent } from '@/components/ui/card'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

export default async function HistoryPage() {
  const records = await getRecords()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">훈련 기록</h1>

      {records.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <ClipboardList size={40} className="text-gray-300" />
          <p className="text-gray-500">아직 훈련 기록이 없어요</p>
          <p className="text-sm text-gray-400">플래너에서 훈련 완료 버튼을 눌러보세요</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {records.map((record) => (
            <li key={record.id}>
              <Link href={`/history/${record.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center gap-3 p-4">
                    <ClipboardList size={20} className="shrink-0 text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{formatDate(record.date)}</p>
                      <p className="text-sm text-gray-500">
                        드릴 {record.drill_ids.length}개 · 참석 {record.attendees}명
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
