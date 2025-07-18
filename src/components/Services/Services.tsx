//src/components/Services/Services.tsx
'use client'

import { Bot, ScanFace, BarChart4, LayoutDashboard, ShieldCheck, Globe } from 'lucide-react'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './Services.module.scss'

const services = [
  {
    title: 'פיתוח אתרים',
    desc: 'אתרי תדמית, דפי נחיתה ומערכות מתקדמות – בהתאמה אישית מלאה. מבוסס Next.js ו־React עם ביצועים גבוהים, התאמה לנייד ואבטחה מחוזקת.',
    icon: <Globe size={24} />,
    sideIcon: <Globe size={36} strokeWidth={0.5} />,
    availability: 'אספקה תוך 5 ימי עסקים'
  },
  {
    title: 'אוטומציה ובוטים',
    desc: 'בניית תהליכים חכמים בעזרת Make ו־Python – משליחת מיילים אוטומטית ועד בוטים ל־WhatsApp ולניהול לקוחות. חוסך לך זמן, כסף והתעסקות.',
    icon: <Bot size={24} />,
    sideIcon: <Bot size={24} strokeWidth={0.5} />,
    availability: 'מענה תוך 24 שעות'
  },
  {
    title: 'AI וזיהוי פנים',
    desc: 'מערכות זיהוי פנים בזמן אמת עם AWS Rekognition – כולל צילום, אימות, שמירה בענן וחיבור למערכות בקרה או פתיחת דלתות. פתרונות מתקדמים בפריסה מלאה.',
    icon: <ScanFace size={24} />,
    sideIcon: <ScanFace size={36} strokeWidth={0.5} />,
    availability: 'פתרון מלא תוך 7 ימים'
  },
  {
    title: 'דשבורדים וממשקי ניהול',
    desc: 'מערכות ניהול חכמות עם ממשק מתקדם, כולל גרפים, פילוחים וייצוא. התאמה אישית לפי צרכי הלקוח – כולל דוחות PDF, אקסלים וחוויית משתמש עוצמתית.',
    icon: <BarChart4 size={24} />,
    sideIcon: <BarChart4 size={36} strokeWidth={0.5} />,
    availability: 'התאמה אישית לפי צורך'
  },
  {
    title: 'עיצוב UX/UI',
    desc: 'אפיון ועיצוב חוויית משתמש שתואמת את המותג שלך – כולל מסכים אינטראקטיביים, עיצוב רספונסיבי ופוקוס על נגישות ושימושיות.',
    icon: <LayoutDashboard size={24} />,
    sideIcon: <LayoutDashboard size={36} strokeWidth={0.5} />,
    availability: 'עיצוב מודרני למובייל ודסקטופ'
  },
  {
    title: 'תחזוקה ואבטחת אתרים',
    desc: 'עדכוני גרסאות, ניטור ביצועים, גיבויים אוטומטיים והקשחות אבטחה – כדי שהאתר שלך יעבוד מהר, בטוח ובלי תקלות.',
    icon: <ShieldCheck size={24} />,
    sideIcon: <ShieldCheck size={36} strokeWidth={0.5} />,
    availability: 'ניטור 24/7 ותגובה מהירה'
  }
] as const

export default function Services() {
  useEffect(() => {
    AOS.init({
      delay: 400,
      duration: 800,
      once: false,
      mirror: true,
      offset: 50
    })

    const refresh = () => AOS.refresh()
    window.addEventListener('scroll', refresh)
    return () => window.removeEventListener('scroll', refresh)
  }, [])

  return (
    <div>
      <div className={styles.horizontalDivider}></div>
      <section id="services" className={styles.servicesSection}>
        <div data-aos="zoom-in-up">
          <h2 className={styles['section-title']}>פתרונות טכנולוגיים חכמים מבית BroTech </h2>
        </div>
        <div className={styles.servicesGlassWrapper}>
          <div className={styles.grid2}>
            {services.map(({ title, desc, icon, sideIcon, availability }, i) => (
              <div key={title} className={styles.cardGroup}>
                {/* כרטיס שמאלי (איקון מימין) */}
                {i % 2 === 0 ? (
                  <>
                    <div className={`${styles.card} ${styles.left}`} data-aos="fade-right" data-aos-delay={i * 150}>
                      <h3 className={styles.cardTitle}>
                        {icon}
                        {title}
                      </h3>
                      <p>{desc}</p>
                      <p className={styles.availability}>{availability}</p>
                    </div>
                    <div className={styles.emptySpot}>{sideIcon}</div>
                  </>
                ) : (
                  <>
                    <div className={styles.emptySpot}>{sideIcon}</div>
                    <div className={`${styles.card} ${styles.right}`} data-aos="fade-left" data-aos-delay={i * 150}>
                      <h3 className={styles.cardTitle}>
                        {icon}
                        {title}
                      </h3>
                      <p>{desc}</p>
                      <p className={styles.availability}>{availability}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.horizontalDivider}></div>
      </section>
    </div>
  )
}
