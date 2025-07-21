// src/components/Footer/Footer.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail as MailIcon, Phone as PhoneIcon, Github, Instagram, Linkedin, X } from 'lucide-react'
import styles from './Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()
  const [showTerms, setShowTerms] = useState(false)
  const termsRef = useRef<HTMLDivElement>(null)
  const [isClosing, setIsClosing] = useState(false) // חדש
  const [countdown, setCountdown] = useState(10) // חדש
  const progressRef = useRef<HTMLDivElement>(null) // חדש

  useEffect(() => {
    if (showTerms) {
      setCountdown(10)
      if (progressRef.current) {
        const bar = progressRef.current
        bar.style.transition = 'none'
        bar.style.width = '0%'
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.transition = 'width 10s linear'
            bar.style.width = '100%'
          })
        })
      }

      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      const timeout = setTimeout(closeModal, 10000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
        if (progressRef.current) {
          progressRef.current.style.width = '0%'
        }
      }
    }
  }, [showTerms])

  // useEffect(() => {
  //   if (showTerms) {
  //     setCountdown(10)
  //     const interval = setInterval(() => {
  //       setCountdown((prev) => prev - 1)
  //     }, 1000)
  //     const timeout = setTimeout(closeModal, 10000)

  //     return () => {
  //       clearInterval(interval)
  //       clearTimeout(timeout)
  //     }
  //   }
  // }, [showTerms])

  // שינוי בפונקציית סגירה
  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowTerms(false)
      setIsClosing(false)
    }, 400) // תואם לזמן האנימציה
  }

  // סגירה אוטומטית אחרי 10 שניות
  useEffect(() => {
    if (showTerms) {
      const timeout = setTimeout(() => closeModal(), 10000)
      return () => clearTimeout(timeout)
    }
  }, [showTerms])

  // סגירה בלחיצה מחוץ לחלון
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (termsRef.current && !termsRef.current.contains(event.target as Node)) {
        setShowTerms(false)
      }
    }
    if (showTerms) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTerms])

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.glowOverlay} />

      <div className={styles.footerGrid}>
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
              <br />
              עיצובים
            </span>
          </a>
          <a href="#about">
            על
            <br />
            החברה
          </a>
          <a href="#faq">
            שאלות
            <br />
            נפוצות
          </a>
          <a href="#contact">
            צור
            <br />
            קשר
          </a>
          <span>
            <PhoneIcon size={16} /> 054-5665166
          </span>
          <span>
            <MailIcon size={16} /> Avib660@gmail.com
          </span>
        </div>
      </div>

      <div className={styles.socialBar}>
        <a href="https://github.com/avib1997" target="_blank">
          <Github size={28} />
        </a>
        <a href="https://www.linkedin.com/in/avi-brodetsky%E2%80%AC%E2%80%8F-721912177/" target="_blank">
          <Linkedin size={28} />
        </a>
        <a href="https://www.instagram.com/brotech2025/" target="_blank">
          <Instagram size={28} />
        </a>
        <a href="https://wa.me/972545665166" target="_blank">
          <span style={{ fontSize: '28px' }}>💬</span>
        </a>
      </div>

      <div className={styles.bottom}>
        <h3 className={styles.logo}>BroTech</h3>© {year} BroTech. כל הזכויות שמורות.
        <span className={styles.legalLinks}>
          <span onClick={() => setShowTerms(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            תקנון
          </span>
        </span>
      </div>

      {showTerms && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.termsModal} ${isClosing ? styles.slideOut : styles.slideIn}`} ref={termsRef}>
            <button className={styles.closeButton} onClick={closeModal}>
              <X size={20} />
            </button>
            <h2>תקנון BroTech</h2>
            <p>
              ברוכים הבאים ל־BroTech – חברת טכנולוגיה מתקדמת לבניית אתרים, מערכות חכמות, זיהוי פנים, סליקה ועוד.
              <br />
              השימוש בשירותי החברה כפוף לתקנון זה:
              <br />
              <br />
              1. החברה שומרת לעצמה את הזכות לבצע שינויים בתכנים או בשירותים ללא הודעה מוקדמת.
              <br />
              2. כל הזכויות לתכנים, עיצוב, קוד ומידע באתר שמורות ל־BroTech ואינן ניתנות להעתקה או הפצה ללא אישור.
              <br />
              3. פרטיותכם חשובה לנו – נתונים אישיים נשמרים ואינם מועברים לגורם שלישי ללא הסכמה.
              <br />
              4. החברה אינה אחראית לנזקים כתוצאה משימוש לקוי במערכת, חיבור לקוי לאינטרנט או צד שלישי.
              <br />
              5. כל מחלוקת תתברר בבית המשפט באזור המרכז בלבד.
              <br />
              <br />
              שימוש באתר ובמערכות מהווה הסכמה מלאה לתנאים אלה.
            </p>
            <p className={styles.countdown}>החלון ייסגר אוטומטית בעוד {countdown} שניות...</p>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} ref={progressRef}></div>
              <div className={styles.particles}></div>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
