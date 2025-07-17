'use client'

import styles from './HeroPic.module.scss'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.overlay}>
          <h1 className={`fade-in-left ${styles.title}`}>
            Technology
            <br />
            that gets
            <br />
            you
          </h1>
        </div>

        <div className={styles.overlaytext}>
          <h1 className={`${styles.titletext} fade-in-right`}>
            <span>אתרים ומערכות חכמות –</span>
            <span>לא נולדים מעצמם הם </span>
            <span> מתחילים בצוות שיודע </span>
            <span>להקשיב, לחשוב ולבנות נכון.</span>
            <span>&nbsp;</span>
            <span>פיתוח אתר או מערכת חדשה –</span>
            <span>זו לא רק שורת קוד ,זה תהליך</span>
            <span> אסטרטגי שאנחנו מובילים יחד </span>
            <span>איתך .</span>
          </h1>

          <p className={`fade-in-up-delayed ${styles.subtitle}`}>דברו איתנו – העתיד מחכה</p>
          <div className={`fade-in-up-delayed ${styles.buttons}`}>
            <button className={styles.primary}>מחירים</button>
            <button className={styles.secondary}>דבר איתי</button>
          </div>
        </div>

        <Image
          src="/hero/mac5.png" // שים את התמונה שלך כאן
          alt="MacBook Pro"
          fill
          className={styles.bgImage}
          priority
        />
      </div>
    </section>
  )
}
