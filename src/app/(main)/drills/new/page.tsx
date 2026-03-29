import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { DrillForm } from './_components/DrillForm'
import { createDrillAction } from '../actions'

export default function NewDrillPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/drills" className="text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">새 드릴</h1>
      </div>

      <DrillForm action={createDrillAction} submitLabel="드릴 만들기" />
    </div>
  )
}
