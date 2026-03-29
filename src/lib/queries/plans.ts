import { createClient } from '@/lib/supabase-server'
import type { Drill } from '@/types'

export interface TrainingPlan {
  id: string
  coach_id: string
  date: string
  drill_ids: string[]
  memo: string | null
  created_at: string
}

export interface TrainingPlanWithDrills extends TrainingPlan {
  drills: Drill[]
}

export async function getPlans(): Promise<TrainingPlan[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('training_plans')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getPlanById(id: string): Promise<TrainingPlanWithDrills | null> {
  const supabase = await createClient()
  const { data: plan, error } = await supabase
    .from('training_plans')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !plan) return null

  // drill_ids 순서대로 드릴 조회
  const drills: Drill[] = []
  if (plan.drill_ids.length > 0) {
    const { data: drillData } = await supabase
      .from('drills')
      .select('*')
      .in('id', plan.drill_ids)

    if (drillData) {
      // drill_ids 순서 유지
      plan.drill_ids.forEach((id: string) => {
        const drill = drillData.find((d) => d.id === id)
        if (drill) drills.push(drill)
      })
    }
  }

  return { ...plan, drills }
}
