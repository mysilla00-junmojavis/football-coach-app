import { createClient } from '@/lib/supabase-server'
import type { Coach, Drill } from '@/types'

export interface DrillStat {
  purpose: string
  count: number
  percentage: number
}

export async function getProfile(): Promise<Coach | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('coaches')
    .select('*')
    .eq('id', user.id)
    .single()

  return data ?? null
}

export async function getMyDrills(): Promise<Drill[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('drills')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export function calcDrillStats(drills: Drill[]): DrillStat[] {
  const counts: Record<string, number> = {}
  drills.forEach((drill) => {
    drill.purpose.forEach((p) => {
      counts[p] = (counts[p] ?? 0) + 1
    })
  })

  const total = Object.values(counts).reduce((s, c) => s + c, 0)
  if (total === 0) return []

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([purpose, count]) => ({
      purpose,
      count,
      percentage: Math.round((count / total) * 100),
    }))
}
