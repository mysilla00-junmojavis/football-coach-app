import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getPlanById } from '@/lib/queries/plans'
import { getDrills } from '@/lib/queries/drills'
import { updatePlanAction } from '../../actions'
import { PlannerForm } from '@/app/(main)/planner/new/_components/PlannerForm'

interface EditPlanPageProps {
  params: { id: string }
}

export default async function EditPlanPage({ params }: EditPlanPageProps) {
  const [plan, allDrills] = await Promise.all([
    getPlanById(params.id),
    getDrills(),
  ])

  if (!plan) notFound()

  const boundAction = updatePlanAction.bind(null, plan.id)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href={`/planner/${plan.id}`} className="text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">플랜 수정</h1>
      </div>

      <PlannerForm
        action={boundAction}
        allDrills={allDrills}
        defaultDate={plan.date}
        defaultDrillIds={plan.drill_ids}
        defaultMemo={plan.memo ?? ''}
        submitLabel="수정 저장"
      />
    </div>
  )
}
