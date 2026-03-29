import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getDrills } from '@/lib/queries/drills'
import { createPlanAction } from '../actions'
import { PlannerForm } from './_components/PlannerForm'

export default async function NewPlanPage() {
  const allDrills = await getDrills()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/planner" className="text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">새 훈련 플랜</h1>
      </div>

      <PlannerForm action={createPlanAction} allDrills={allDrills} submitLabel="플랜 저장" />
    </div>
  )
}
