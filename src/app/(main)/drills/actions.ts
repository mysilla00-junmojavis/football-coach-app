'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type DrillFormState = { error?: string }

export async function createDrillAction(
  _prev: DrillFormState,
  formData: FormData
): Promise<DrillFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: '로그인이 필요합니다.' }

  const name = formData.get('name') as string
  const purpose = formData.getAll('purpose') as string[]
  const duration = Number(formData.get('duration'))
  const min_players = Number(formData.get('min_players'))
  const max_players = Number(formData.get('max_players'))
  const difficulty = formData.get('difficulty') as string
  const description = formData.get('description') as string
  const equipment = (formData.get('equipment') as string)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  if (!name) return { error: '드릴 이름을 입력해주세요.' }
  if (min_players > max_players) return { error: '최소 인원이 최대 인원보다 많습니다.' }

  const { data, error } = await supabase
    .from('drills')
    .insert({
      coach_id: user.id,
      name,
      purpose,
      duration,
      min_players,
      max_players,
      difficulty,
      description,
      equipment,
    })
    .select('id')
    .single()

  if (error) return { error: error.message }

  revalidatePath('/drills')
  redirect(`/drills/${data.id}`)
}

export async function updateDrillAction(
  id: string,
  _prev: DrillFormState,
  formData: FormData
): Promise<DrillFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: '로그인이 필요합니다.' }

  const purpose = formData.getAll('purpose') as string[]
  const equipment = (formData.get('equipment') as string)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const { error } = await supabase
    .from('drills')
    .update({
      name: formData.get('name') as string,
      purpose,
      duration: Number(formData.get('duration')),
      min_players: Number(formData.get('min_players')),
      max_players: Number(formData.get('max_players')),
      difficulty: formData.get('difficulty') as string,
      description: formData.get('description') as string,
      equipment,
    })
    .eq('id', id)
    .eq('coach_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/drills')
  revalidatePath(`/drills/${id}`)
  redirect(`/drills/${id}`)
}

export async function deleteDrillAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  await supabase
    .from('drills')
    .delete()
    .eq('id', id)
    .eq('coach_id', user.id)

  revalidatePath('/drills')
  redirect('/drills')
}
