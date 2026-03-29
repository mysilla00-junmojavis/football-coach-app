import { createClient } from '@/lib/supabase-server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // coaches 테이블에 프로필 upsert
      await supabase.from('coaches').upsert(
        {
          id: data.user.id,
          name: data.user.user_metadata?.name ?? '코치',
          avatar_url: null,
        },
        { onConflict: 'id', ignoreDuplicates: true }
      )

      return NextResponse.redirect(`${origin}/drills`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
