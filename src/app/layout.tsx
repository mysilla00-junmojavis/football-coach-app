import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: '풋볼 코치',
  description: '축구 코치를 위한 드릴 라이브러리 & 훈련 플래너',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
