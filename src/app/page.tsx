//src/app/page.tsx
// ⚠️
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { HeroPic, Hero, Services, Faq, Contact, About, HappyClients, WebShowcase, OwnerIntro } from '@/components'
import { useEffect } from 'react'

export default function Home() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const el = document.querySelector('.hero-logo-wrapper') as HTMLElement | null
    if (!el) return
    const onScroll = () => {
      if (window.scrollY > 200) {
        el.classList.add('glow-strong')
      } else {
        el.classList.remove('glow-strong')
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname.startsWith('/home')) {
      router.replace('/')
    }
  }, [pathname])

  return (
    <main className="main-wrapper">
      <HeroPic />
      <Services />
      <WebShowcase />
      <About />
      <OwnerIntro />
      <HappyClients />
      <Faq />
      <Contact />
      <Hero />
    </main>
  )
}
