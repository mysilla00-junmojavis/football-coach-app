import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getPlans } from '@/lib/queries/plans'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays } from 'lucide-react'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

export default async function PlannerPage() {
  const plans = await getPlans()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">훈련 플래너</h1>
        <Link href="/planner/new">
          <Button size="sm">
            <Plus size={16} className="mr-1" />
            새 플랜
          </Button>
        </Link>
      </div>

      {plans.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-gray-500">아직 작성한 훈련 플랜이 없어요</p>
          <Link href="/planner/new">
            <Button>첫 훈련 플랜 만들기 →</Button>
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {plans.map((plan) => (
            <li key={plan.id}>
              <Link href={`/planner/${plan.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center gap-3 p-4">
                    <CalendarDays size={20} className="shrink-0 text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{formatDate(plan.date)}</p>
                      <p className="text-sm text-gray-500">드릴 {plan.drill_ids.length}개</p>
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
