import { createClient } from '@/lib/supabase-server'
import type { Drill } from '@/types'

export async function getDrills(): Promise<Drill[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('drills')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getDrillById(id: string): Promise<Drill | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('drills')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}
