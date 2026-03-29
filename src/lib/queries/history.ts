import { createClient } from '@/lib/supabase-server'
import type { Drill, TrainingRecord } from '@/types'

export interface TrainingRecordWithDrills extends TrainingRecord {
  drills: Drill[]
}

export async function getRecords(): Promise<TrainingRecord[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('training_records')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getRecordById(id: string): Promise<TrainingRecordWithDrills | null> {
  const supabase = await createClient()
  const { data: record, error } = await supabase
    .from('training_records')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !record) return null

  const drills: Drill[] = []
  if (record.drill_ids.length > 0) {
    const { data: drillData } = await supabase
      .from('drills')
      .select('*')
      .in('id', record.drill_ids)

    if (drillData) {
      record.drill_ids.forEach((id: string) => {
        const drill = drillData.find((d) => d.id === id)
        if (drill) drills.push(drill)
      })
    }
  }

  return { ...record, drills }
}
