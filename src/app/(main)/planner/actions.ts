'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type PlanFormState = { error?: string }

export async function createPlanAction(
  _prev: PlanFormState,
  formData: FormData
): Promise<PlanFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const date = formData.get('date') as string
  const drill_ids = formData.getAll('drill_ids') as string[]
  const memo = formData.get('memo') as string

  if (!date) return { error: '날짜를 선택해주세요.' }

  const { data, error } = await supabase
    .from('training_plans')
    .insert({ coach_id: user.id, date, drill_ids, memo: memo || null })
    .select('id')
    .single()

  if (error) return { error: error.message }

  revalidatePath('/planner')
  redirect(`/planner/${data.id}`)
}

export async function updatePlanAction(
  id: string,
  _prev: PlanFormState,
  formData: FormData
): Promise<PlanFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const drill_ids = formData.getAll('drill_ids') as string[]
  const memo = formData.get('memo') as string

  const { error } = await supabase
    .from('training_plans')
    .update({
      date: formData.get('date') as string,
      drill_ids,
      memo: memo || null,
    })
    .eq('id', id)
    .eq('coach_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/planner')
  revalidatePath(`/planner/${id}`)
  redirect(`/planner/${id}`)
}

export async function deletePlanAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('training_plans')
    .delete()
    .eq('id', id)
    .eq('coach_id', user.id)

  revalidatePath('/planner')
  redirect('/planner')
}

export async function duplicatePlanAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: original } = await supabase
    .from('training_plans')
    .select('*')
    .eq('id', id)
    .single()

  if (!original) return

  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('training_plans')
    .insert({
      coach_id: user.id,
      date: today,
      drill_ids: original.drill_ids,
      memo: original.memo,
    })
    .select('id')
    .single()

  if (error) return

  revalidatePath('/planner')
  redirect(`/planner/${data.id}`)
}
