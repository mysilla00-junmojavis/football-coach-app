'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export type ProfileFormState = { error?: string }

export async function updateProfileAction(
  _prev: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const name = (formData.get('name') as string).trim()
  if (!name) return { error: '이름을 입력해주세요.' }

  const { error } = await supabase
    .from('coaches')
    .upsert({ id: user.id, name })

  if (error) return { error: error.message }

  revalidatePath('/profile')
  redirect('/profile')
}
