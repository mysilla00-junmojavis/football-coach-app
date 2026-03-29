import Link from 'next/link'
import { getDrills } from '@/lib/queries/drills'
import { DrillCard } from './_components/DrillCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function DrillsPage() {
  const drills = await getDrills()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">내 드릴</h1>
        <Link href="/drills/new">
          <Button size="sm">
            <Plus size={16} className="mr-1" />
            새 드릴
          </Button>
        </Link>
      </div>

      {drills.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-gray-500">아직 만든 드릴이 없어요</p>
          <Link href="/drills/new">
            <Button>첫 드릴을 만들어보세요 →</Button>
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {drills.map((drill) => (
            <li key={drill.id}>
              <DrillCard drill={drill} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
