// src/components/Footer/Footer.tsx
'use client'

import { Mail as MailIcon, Phone as PhoneIcon, Github, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.glowOverlay} />

      <div className={styles.footerGrid}>
        {/* קישורים + פרטי קשר בשורה אחת */}
        <div className={styles.linksRow}>
          <a href="#services">
            <span>
              המוצרים
              <br />
              שלנו
            </span>
          </a>
          <a href="#gallery">
            <span>
              גלריית
              <br /> עיצובים
            </span>
          </a>

          <a href="#about">
            על <br />
            החברה
          </a>
          <a href="#faq">
            שאלות
            <br /> נפוצות
          </a>
          <a href="#contact">
            צור
            <br /> קשר
          </a>
          <span>
            <PhoneIcon size={16} /> 054-5665166
          </span>
          <span>
            <MailIcon size={16} /> Avib660@gmail.com
          </span>
        </div>
      </div>

      {/* שורת אייקונים גלובלית */}
      <div className={styles.socialBar}>
        <a href="https://github.com/avib1997" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
          <Github size={28} />
        </a>
        <a href="https://www.linkedin.com/in/avi-brodetsky%E2%80%AC%E2%80%8F-721912177/" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
          <Linkedin size={28} />
        </a>
        <a href="https://www.instagram.com/brotech2025/" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">
          <Instagram size={28} />
        </a>
        <a href="https://wa.me/972545665166" target="_blank" rel="noopener" title="WhatsApp" aria-label="WhatsApp">
          <span style={{ fontSize: '28px' }}>💬</span>
        </a>
      </div>

      {/* תחתית משפטית */}
      <div className={styles.bottom}>
        <h3 className={styles.logo}>BroTech</h3>© {year} BroTech. כל הזכויות שמורות.
        <span className={styles.legalLinks}>
          <Link href="/legal">תקנון</Link>
        </span>
      </div>
    </footer>
  )
}
