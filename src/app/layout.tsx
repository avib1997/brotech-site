// ⚠️
//src/app/layout.tsx
import './globals.scss'
import 'normalize.css'
import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import LenisProvider from '@/styles/LenisProvider/LenisProvider'
import Footer from '@/components/Footer/Footer'
import '@/styles/animations.scss'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
// import FloatingLogo from '@/components/FloatingLogo'

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
          <Script
            src="https://widgets.leadconnectorhq.com/loader.js"
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id="6885fab167d91b25999c64cb"
            strategy="afterInteractive"
          />
          {children}
          <Analytics />
          <Footer />
          {/* <FloatingLogo /> */}
        </LenisProvider>
      </body>
    </html>
  )
}
