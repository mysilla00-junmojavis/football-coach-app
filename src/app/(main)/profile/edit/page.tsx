import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getProfile } from '@/lib/queries/profile'
import { EditProfileForm } from './_components/EditProfileForm'

export default async function EditProfilePage() {
  const profile = await getProfile()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/profile" className="text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">프로필 수정</h1>
      </div>

      <EditProfileForm defaultName={profile?.name ?? ''} />
    </div>
  )
}
