import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getDrillById } from '@/lib/queries/drills'
import { DrillForm } from '../../new/_components/DrillForm'
import { updateDrillAction } from '../../actions'

interface EditDrillPageProps {
  params: { id: string }
}

export default async function EditDrillPage({ params }: EditDrillPageProps) {
  const drill = await getDrillById(params.id)
  if (!drill) notFound()

  const action = updateDrillAction.bind(null, drill.id)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href={`/drills/${drill.id}`} className="text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">드릴 수정</h1>
      </div>

      <DrillForm
        action={action}
        defaultValues={drill}
        submitLabel="수정 저장"
      />
    </div>
  )
}
