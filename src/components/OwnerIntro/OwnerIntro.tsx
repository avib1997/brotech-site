'use client'

import styles from './OwnerIntro.module.scss'
import Image from 'next/image'

export default function OwnerIntro() {
  return (
    <section className={styles.ownerSection}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h2 className={styles.title}>נעים להכיר 👋</h2>
          <p className={styles.description}>
            אני אבי ברודצקי, הבעלים והמפתח הראשי של BroTech. הקמתי את החברה כדי לעזור לעסקים וליזמים לבנות מערכות טכנולוגיות מתקדמות — אתרים, בוטים, אוטומציות ועיצוב חוויית משתמש. כל פרויקט נבנה
            בקפדנות, עם דגש על ביצועים, אבטחה ועיצוב מודרני שמביא תוצאות.
          </p>
        </div>

        <div className={styles.imageBox}>
          <Image src="/hero/me1.png" alt="תמונה של אבי ברודצקי" width={600} height={600} className={styles.image} priority />
        </div>
      </div>
    </section>
  )
}
