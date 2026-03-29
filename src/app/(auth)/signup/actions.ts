'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // 이메일 확인 없이 바로 가입 완료된 경우 (이메일 확인 비활성화 시)
  if (data.user && !data.user.email_confirmed_at) {
    return { success: '이메일을 확인해주세요. 인증 링크를 발송했습니다.' }
  }

  redirect('/drills')
}
