import { BottomNav } from '@/components/BottomNav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
        {children}
      </main>
      <BottomNav />
    </>
  )
}
