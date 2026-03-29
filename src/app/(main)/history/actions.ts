'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type RecordFormState = { error?: string }

export async function createRecordAction(
  planId: string,
  date: string,
  drillIds: string[],
  _prev: RecordFormState,
  formData: FormData
): Promise<RecordFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const attendees = Number(formData.get('attendees'))
  const memo = formData.get('memo') as string

  if (!attendees || attendees < 1) return { error: '참석 인원을 입력해주세요.' }

  const { data, error } = await supabase
    .from('training_records')
    .insert({
      coach_id: user.id,
      plan_id: planId || null,
      date,
      drill_ids: drillIds,
      attendees,
      memo: memo || null,
    })
    .select('id')
    .single()

  if (error) return { error: error.message }

  revalidatePath('/history')
  revalidatePath(`/planner/${planId}`)
  redirect(`/history/${data.id}`)
}

export async function deleteRecordAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('training_records')
    .delete()
    .eq('id', id)
    .eq('coach_id', user.id)

  revalidatePath('/history')
  redirect('/history')
}
