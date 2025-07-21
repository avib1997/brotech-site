// src/components/HappyClients/HappyClients.tsx
'use client'

import styles from './HappyClients.module.scss'
import Image from 'next/image'
import React, { useEffect } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useRef } from 'react'

/* ---------- Swiper ---------- */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper as SwiperClass } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const stats = [
  {
    label: (
      <>
        שעות חסכון ללקוחות
        <br />
        מדי שנה
      </>
    ),
    value: 15200,
    prefix: '+',
    suffix: ''
  },
  { label: 'זמן אספקה ממוצע', value: 50, suffix: ' שעות עבודה' },
  { label: 'פרויקטים מוצלחים', value: 30, prefix: '+', suffix: '' },
  { label: 'שביעות רצון לקוחות', value: 98, suffix: '%' },
  {
    label: (
      <>
        שפות תכנות <br />
        וטכנולוגיות נתמכות
      </>
    ),
    value: 25,
    prefix: '+',
    suffix: ''
  }
]

// const logos = ['/logos/bank-of-israel2.svg', '/logos/hamazon.svg', '/logos/IDF.svg', '/logos/shita.svg', '/logos/IAF.svg', '/logos/sls.svg']

const testimonials = [
  {
    companyLogo: '/logos/sls.svg',
    companyName: 'SLS Systems',
    quote: `BroTech פיתחה עבורנו מערך מערכות מקיף שכלל פתרון לניהול מלאי חכם, יצירת חבילות דינמיות למכירה אונליין, ומערכת אבטחה מתקדמת המנטרת בזמן אמת את פעילות מחסן הרובוטים האוטונומי (Hamazon).<br/><br/>

בנוסף, הוקמה עבורנו חנות אוטומטית (Shita Market) למכירת מוצרים חכמים במוקדים שונים – כולל תחנות בשטח ובחניונים – עם ממשק משתמש מלא הכולל רישום, התחברות ותשלום באמצעות <strong>זיהוי פנים בזמן אמת</strong>.<br/><br/>

המערכות פותחו בטכנולוגיות <strong>AWS Lambda, DynamoDB, S3, TypeScript ו־GitHub Actions</strong>, תוך התממשקות מלאה למצלמות IP, שירותי SMS ואחסון ענן מאובטח.  
הפיתוח כלל גם דשבורדים לניהול ותצוגה, תהליכי DevOps מותאמים, ותמיכה בעומסים גבוהים בפרודקשן – כולל ניטור שוטף ואירועי fallback מתקדמים.<br/><br/>

כל הפתרונות הוטמעו בהתאמה מלאה לצרכים שלנו, צמצמו כשלים תפעוליים באופן דרמטי, ושיפרו את חוויית המשתמש והביצועים התפעוליים של המערכת מקצה לקצה.`,
    name: 'שלמה הירשביין',
    position: 'מנכ"ל SLS Systems',
    rating: 5
  },
  {
    companyLogo: '/logos/bank-of-israel2.svg',
    companyName: 'Bank of Israel',
    quote: `BroTech פיתחה עבורנו מערכת אסטרטגית לניהול מידע בזמן אמת, אשר מחליפה תהליך מסורבל שהתבצע בעבר באופן ידני ומבוזר דרך מיילים.  
המערכת כוללת <strong>דשבורד חכם</strong> המרכז נתונים חיים ממקורות מגוונים – כולל <strong>AWS, SQL Server ו־Data Lakes</strong> – ומציגה את תמונת ההשקעות העדכנית ביותר בנוגע להתרות המט"ח של מדינת ישראל.<br/><br/>

המערכת מאפשרת מעקב וביצוע <strong>השקעות גלובליות בזמן אמת</strong>, תכנון ורכישת מט"ח מול גופים בינלאומיים – עם שקיפות מלאה למקבלי החלטות בבנק ישראל ובמשרד האוצר.  
התממשקות חכמה מנתחת גם <strong>התכתבויות מייל רלוונטיות</strong> והופכת אותן למידע מובנה המוצג בלייב בדשבורד חדר העסקאות המרכזי – כלי קריטי לקבלת החלטות יומיות בשוק המט"ח.<br/><br/>

הפיתוח התבצע בטכנולוגיות <strong>Python, C#, .NET Core, Material UI ו־WebSocket</strong> לקבלת עדכונים רציפים.  
התוצאה: מערכת מאובטחת, סקלאבילית, חכמה – שחוסכת עשרות שעות עבודה יומיות ומציבה סטנדרט חדש בניהול השקעות דינמי.`,
    name: 'ליאור',
    position: 'ראש מחלקת IT, בנק ישראל',
    rating: 5
  },
  {
    companyLogos: ['/logos/IDF.svg', '/logos/IAF.svg'],
    companyName: 'צה״ל / חיל האוויר',
    quote: `ב־BroTech פיתחנו עבור צה״ל וחיל האוויר מערכת מתקדמת ל<strong>זיהוי חזותי של טילים בזמן אמת</strong>, המבצעת סיווג ראשוני לפי סוג הטיל ואומדן יעד משוער.  
    המערכת מבוססת <strong>Python ו־OpenCV</strong>, ופועלת באמצעות ניתוח פריימים חיים ממצלמות תצפית קרקעיות ואוויריות – לצורך חיזוי מסלול ומענה מהיר.<br/><br/>
    
    בנוסף, פותחה מערכת פרוטוקול ייעודית ל<strong>שידור וידאו חי ורציף לבור חיל האוויר</strong>, המשדרת בזמן אמת צילומי מטוסים, מסוקים וכלי טיס בלתי מאוישים (כטב״מים) הפועלים בשטח.  
    המערכת כוללת עיבוד ראשוני בצד הקצה, קידוד מאובטח, תיעדוף שידורים קריטיים – והצגה אחודה על מסכי שליטה מבצעיים בלייב.<br/><br/>
    
    שילוב שתי המערכות מאפשר שליטה טובה יותר במרחב, קיצור זמני תגובה, והפחתה דרמטית בתקלות זיהוי ובתלות במערכות ידניות.`,
    name: 'צה״ל / חיל האוויר',
    position: 'יחידת 108 - יחידת טכנולוגיות מתקדמות',
    rating: 5
  },
  {
    companyLogo: '/logos/shita.svg',
    companyName: 'Shita Market',
    quote: `הקמנו עבור Shita Market רשת <strong>חנויות אוטומטיות</strong> למכירת מוצרים חכמים בפריסה ארצית – כולל עמדות בחניונים, מרכזים מסחריים ומוקדים ציבוריים עתירי תנועה.  
בחנויות פועל <strong>ממשק משתמש חכם</strong> הכולל <strong>זיהוי פנים בזמן אמת</strong> לצורך רישום, התחברות ותשלום – ללא צורך בכרטיסים, אפליקציות או מגע ידני.<br/><br/>

המערכות פותחו בטכנולוגיות <strong>TypeScript, Firebase, AWS ו־Face Recognition APIs</strong>, עם התממשקות מלאה לשירותי סליקה, מערכי לוגיסטיקה ו־CRM חיצוניים – והכל בזמן אמת.<br/><br/>

מאז ההשקה נרשמה עלייה של <strong>47% בהזמנות היומיות</strong> תוך חודש בלבד, לצד ירידה של <strong>85% בפניות טלפון תפעוליות</strong> – נתונים שמצביעים על שיפור משמעותי בחוויית המשתמש, במהירות התפעול ובאוטומציה כוללת.`,
    name: 'Shita Market',
    position: 'מערכת קניה חכמה אוטומטית אוטונומית',
    rating: 5
  },
  {
    companyLogo: '/logos/hamazon.svg',
    companyName: 'Hamazon',
    quote: `BroTech פיתחה עבורנו מערך מערכות מקיף שכולל <strong>פתרון מתקדם לניהול מלאי חכם</strong>, המאפשר מעקב רציף אחר סטטוס מוצרים, רמות זמינות והתראות אוטומטיות לפי הגדרות עסקיות.  
בנוסף, פותחה מערכת ל<strong>יצירת חבילות דינמיות</strong> – המשלבת בין מוצרים בזמן אמת לפי ביקוש, מלאי ופרופיל משתמש, ומשולבת ישירות לתהליכי מכירה אונליין, סליקה ומשלוח.<br/><br/>

לצד זה, פותחה <strong>מערכת אבטחה חכמה</strong> למעקב אחר פעילות שוטפת במחסן הרובוטי (Hamazon), כולל קישור לזרמי וידאו ממצלמות IP, ניתוח תנועה, התרעות מיידיות ואינטגרציה עם מערכת בקרת כניסה והרשאות.  
המערכת מאפשרת תצוגת שליטה בזמן אמת (Live Monitor), מעקב היסטורי על פעולות רובוטיות, וחיבור למוקד אבטחה מבצעי.<br/><br/>

הפיתוח נעשה בטכנולוגיות <strong>TypeScript, Node.js, AWS (כולל S3, Lambda ו־CloudWatch), Firebase Realtime DB ו־GitHub Actions</strong>, לצד שילוב עם שירותי Face Recognition, אוטומציה עסקית, WebSocket והצפנת מידע מלאה.  
המערכות פועלות בסביבת ענן סקלאבילית, עם זמינות גבוהה, ביצועים מיטביים וניהול תפעול אינטגרטיבי מקצה לקצה.`,
    name: 'Hamazon',
    position: 'מערכת איחסון רובוטית אוטמטית והזמנות',
    rating: 5
  }
]

// --- ✨ קונפיגורציית גדלים ללוגו – שולט בכל לוגו בנפרד -------------
const logoSizes: Record<string, { w: number; h: number }> = {
  sls: { w: 160, h: 90 },
  'bank-of-israel2': { w: 120, h: 70 },
  idf: { w: 80, h: 40 },
  iaf: { w: 80, h: 40 },
  shita: { w: 120, h: 75 },
  hamazon: { w: 140, h: 80 }
}

// קומפוננטת-עזר מצומצמת – משתמשת בטבלה למעלה
function Logo({ src }: { src: string }) {
  const id = src.split('/').pop()?.replace('.svg', '').toLowerCase() || ''
  const size = logoSizes[id] ?? { w: 100, h: 60 }
  return <Image src={src} alt="Company Logo" width={size.w} height={size.h} />
}
// -------------------------------------------------------------------

export default function HappyClients() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const swiperRef = useRef<SwiperClass | null>(null)

  // const slides = Array.from({ length: Math.ceil(testimonials.length / 2) })
  // const [active, setActive] = useState(0)
  // const prev = () => setActive((a) => (a === 0 ? slides.length - 1 : a - 1))
  // const next = () => setActive((a) => (a === slides.length - 1 ? 0 : a + 1))
  // const goto = (i: number) => setActive(i)

  useEffect(() => {
    if (!swiperRef.current) return

    if (activeIndex !== null) {
      swiperRef.current.autoplay?.stop()
    } else {
      swiperRef.current.autoplay?.start()
    }
  }, [activeIndex])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    const closeOnArrowClick = () => {
      setActiveIndex(null)
    }

    const next = document.querySelector('.swiper-button-next')
    const prev = document.querySelector('.swiper-button-prev')

    next?.addEventListener('click', closeOnArrowClick)
    prev?.addEventListener('click', closeOnArrowClick)

    return () => {
      next?.removeEventListener('click', closeOnArrowClick)
      prev?.removeEventListener('click', closeOnArrowClick)
    }
  }, [])

  return (
    <section className={styles.clientsSection} id="clients">
      <h2 className={styles.title}>לקוחות שעובדים איתנו</h2>
      {/* סטטיסטיקות */}
      <div className={styles.statsRow}>
        {stats.map((stat, idx) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { ref, inView } = useInView({ triggerOnce: false })
          return (
            <div key={idx} className={styles.statBox} ref={ref}>
              <strong className={styles.statValue}>
                {inView && <CountUp className={styles.statValue} end={stat.value} duration={6} separator="," prefix={stat.prefix || ''} suffix={stat.suffix || ''} />}
              </strong>
              <span>{stat.label}</span>
            </div>
          )
        })}
      </div>

      <div className={styles.logoSection}>
        {/* סמליים בלבד */}
        <div className={styles.iconRow}>
          {['/logos/IAF.svg', '/logos/IDF.svg', '/logos/bank-of-israel2.svg'].map((src, idx) => (
            <div key={idx} className={styles.logoBox}>
              <Image src={src} alt="Client Logo" width={100} height={70} />
            </div>
          ))}
        </div>

        {/* טקסטואליים בלבד */}
        <div className={styles.textLogoRow}>
          {['/logos/sls.svg', '/logos/hamazon.svg', '/logos/shita.svg'].map((src, idx) => (
            <div key={idx} className={styles.logoBox}>
              <Image src={src} alt="Client Logo" width={160} height={70} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
              const labels = ['SLS Systems', 'Bank of Israel', 'IDF/IAF', 'Shita Market', 'Hamazon']
              return `<span class="${className}" data-label="${labels[index] || 'ללא שם'}" style="position:relative;"></span>`
            }
          }}
          autoplay={{
            delay: 1800,
            disableOnInteraction: false
          }}
          centeredSlides
          slidesPerView="auto"
          spaceBetween={80}
          loop
          dir="rtl"
          speed={1500}
          className={styles.swiper}
        >
          {testimonials.map((t, idx) => {
            return (
              <SwiperSlide key={idx} className={styles.cardSlide}>
                <div className={styles.testimonial}>
                  <div className={styles.logos}>{Array.isArray(t.companyLogos) ? t.companyLogos.map((l, i) => <Logo key={i} src={l} />) : <Logo src={t.companyLogo ?? '/default-logo.svg'} />}</div>
                  {t.companyName && <div className={styles.companyLabel}>{t.companyName}</div>}

                  {/* טקסט מקוצר + כפתור */}
                  <p className={styles.quoteShort} dangerouslySetInnerHTML={{ __html: t.quote.split('<br/><br/>')[0] }} />
                  <button className={styles.readMoreButton} onClick={() => setActiveIndex(idx)}>
                    להמשך קריאה...
                  </button>

                  <p className={styles.stars}>{'⭐️'.repeat(t.rating)}</p>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.position}>{t.position}</p>
                </div>

                <div className={`${styles.modalOverlay} ${activeIndex === idx ? styles.show : ''}`} onClick={() => setActiveIndex(null)}>
                  <div className={styles.modalContentLarge} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.modalClose} onClick={() => setActiveIndex(null)}>
                      ✕
                    </button>
                    <h3 className={styles.modalTitle}>{t.companyName}</h3>
                    <div className={styles.modalQuote} dangerouslySetInnerHTML={{ __html: t.quote }} />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div
          className="custom-pagination"
          style={{
            opacity: activeIndex === null ? 1 : 0, // שקוף כש-modal פתוח
            pointerEvents: activeIndex === null ? 'auto' : 'none',
            transition: 'opacity .25s'
          }}
        />
      </div>
    </section>
  )
}
