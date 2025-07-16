// ⚠️
//src/app/layout.tsx
import './globals.scss'
import 'normalize.css'
import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import LenisProvider from '@/styles/LenisProvider/LenisProvider'
import Footer from '@/components/Footer/Footer'
import '@/styles/animations.scss'

export const metadata: Metadata = {
  title: 'BroTech',
  description: 'Avi Brodetsky - Freelance Software Solutions'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
