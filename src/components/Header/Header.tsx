//src/components/Header/Header.tsx
'use client'
import React, { JSX, useRef } from 'react'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import styles from './Header.module.scss'
import { Home, Briefcase, Users, HelpCircle, Mail, Images } from 'lucide-react'

const navIcons: Record<string, JSX.Element> = {
  hero: <Home size={18} />,
  services: <Briefcase size={18} />,
  gallery: <Images size={18} />,
  about: <Users size={18} />,
  faq: <HelpCircle size={18} />,
  contact: <Mail size={18} />
}

const navItems = [
  { label: 'פתיחה', target: 'hero' },
  { label: 'המוצרים שלנו', target: 'services' },
  { label: 'גלריית עיצובים', target: 'gallery' },
  { label: 'על החברה', target: 'about' },
  { label: 'שאלות שלכם', target: 'faq' },
  { label: 'צור קשר', target: 'contact' }
]

const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function Header() {
  // const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const HEADER = 80
  const [active, setActive] = useState('hero')

  /** מפה שמכילה את יחס-החשיפה הנוכחי של כל מקטע */
  const ratiosRef = useRef<Record<string, number>>({})

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.target)).filter(Boolean) as HTMLElement[]

    const io = new IntersectionObserver(
      (entries) => {
        // ✨ 1. מעדכנים את המפה
        entries.forEach((e) => {
          ratiosRef.current[e.target.id] = e.intersectionRatio
        })

        // ✨ 2. מחפשים את המקטע עם החשיפה הגבוהה ביותר כרגע
        let bestId = active
        let bestRatio = 0

        for (const [id, ratio] of Object.entries(ratiosRef.current)) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        // סף מינימום קטן כדי לא לבחור מקטע עם 1% במקרה קצה
        if (bestRatio > 0.05 && bestId !== active) {
          setActive(bestId)
        }
      },
      {
        rootMargin: `-${HEADER}px 0px -70% 0px`,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0-1 בקפיצות 0.01
      }
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [active])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  return (
    <header className={styles.header} onMouseMove={handleMouseMove} role="navigation" aria-label="Main Navigation">
      <span className={styles.neonLine} />

      <nav className={styles.navContainer}>
        <div className={styles.logo} onClick={() => scrollTo('hero')}>
          <Image src="/brotech_logo_hq.png" alt="BroTech logo" width={120} height={50} priority className={styles.logoImg} />
        </div>

        <div className={styles.navItems}>
          {navItems.map((item) => (
            <button key={item.target} className={`${styles.navLink} ${active === item.target ? styles.active : ''}`} onClick={() => scrollTo(item.target)} aria-label={`מעבר אל ${item.label}`}>
              <div className={styles.navIcon}>{navIcons[item.target]}</div>
              <div className={styles.navLabel}>{item.label}</div>
            </button>
          ))}
        </div>

        <div className={styles.mobileToggle}>
          <button onClick={() => setOpen(!open)} aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className={styles.mobileMenu} role="menu">
          {navItems.map(({ label, target }) => (
            <button key={target} className={styles.mobileLink} onClick={() => scrollTo(target)} role="menuitem" aria-label={`מעבר אל ${label}`}>
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
