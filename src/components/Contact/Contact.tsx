//src/components/Contact/Contact.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './Contact.module.scss'
import { Mail, Phone, Send, MessageSquare, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TechSelect from '../TechSelect/TechSelect'
import type { InferType } from 'yup'

export default function Contact() {
  const [showToast, setShowToast] = useState(false) // 🆕
  const [hideToast, setHideToast] = useState(false)

  // state נוסף:
  const [countdown, setCountdown] = useState(5)
  const TEST_MODE = false

  const countdownInterval = useRef<NodeJS.Timeout | null>(null)
  const toastTimer = useRef<NodeJS.Timeout | null>(null)

  const onSubmit = (data: ContactFormData) => {
    const payload = TEST_MODE
      ? {
          name: 'ישראל ישראלי',
          email: 'test@example.com',
          phone: '0501234567',
          product: 'שירות ייעוץ',
          message: 'בדיקת הודעה בלבד'
        }
      : data

    // ניקוי טיימרים קיימים
    clearTimeout(toastTimer.current!)
    clearInterval(countdownInterval.current!)

    // שליחת הבקשה
    fetch('https://formspree.io/f/mpwdgdbq', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          // הצלחה
          clearTimeout(toastTimer.current!)
          clearInterval(countdownInterval.current!)

          setHideToast(false)
          setShowToast(true)
          setCountdown(11)
          reset()

          // התחלת ספירה לאחור
          countdownInterval.current = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(countdownInterval.current!)
                return 0
              }
              return prev - 1
            })
          }, 1000)
        } else {
          console.error('❌ Formspree error:', res.status)
        }
      })
      .catch((err) => {
        console.error('❌ Network error:', err)
      })
  }

  const handleCloseToast = () => {
    clearTimeout(toastTimer.current!)
    clearInterval(countdownInterval.current!)
    setHideToast(true) // ⏳ מפעיל את האנימציה
    setTimeout(() => setShowToast(false), 800) // ❌ מוחק בפועל אחרי זמן האנימציה
  }

  const schema = yup.object({
    name: yup
      .string()
      .required('שדה חובה')
      .matches(/^\S+\s+\S+/, 'יש להזין שם מלא עם רווח')
      .matches(/^[א-תa-zA-Z]{2,}\s+[א-תa-zA-Z]{2,}$/, 'יש להזין שם מלא עם לפחות 2 תווים לכל חלק'),
    email: yup
      .string()
      .required('שדה חובה')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'כתובת לא תקינה'),
    phone: yup
      .string()
      .required('שדה חובה')
      .matches(/^\d{10}$/, 'יש להזין מספר עם 10 ספרות'),
    product: yup.string().required('יש לבחור מוצר'),
    message: yup.string().defined()
  })

  type ContactFormData = InferType<typeof schema>

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitted }
  } = useForm<ContactFormData>({
    resolver: TEST_MODE ? undefined : yupResolver(schema),
    mode: 'onChange'
  })

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100
    })

    const refresh = () => AOS.refresh()
    window.addEventListener('scroll', refresh)
    return () => window.removeEventListener('scroll', refresh)
  }, [])

  useEffect(() => {
    if (showToast) {
      setHideToast(false)
    }
  }, [showToast])

  useEffect(() => {
    if (showToast) AOS.refreshHard()
  }, [showToast])

  useEffect(() => {
    const toastTimerRef = toastTimer.current
    const countdownRef = countdownInterval.current

    return () => {
      if (toastTimerRef) clearTimeout(toastTimerRef)
      if (countdownRef) clearInterval(countdownRef)
    }
  }, [])

  // let toastTimer: NodeJS.Timeout
  // const onSubmit = (data: ContactFormData) => {
  //   fetch('https://formspree.io/f/mpwdgdbq', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     }
  //   }).then((res) => {
  //     if (res.ok) {
  //       setShowToast(true) // 🆕 מציג התראה
  //       reset()
  //       toastTimer = setTimeout(() => setShowToast(false), 5000)
  //     }
  //   })
  // }

  // const handleCloseToast = () => {
  //   clearTimeout(toastTimer)
  //   setShowToast(false)
  // }
  // const productError = errors.product?.message
  // const productSuccess = watch('product') && !errors.product

  return (
    <section id="contact" className={styles.contactSection} dir="rtl">
      {showToast && (
        <div
          className={`${styles.toast} ${hideToast ? styles.exit : styles.enter}`} // 🔧
          role="alert"
        >
          ✓ ההודעה נשלחה&nbsp;בהצלחה! <br />
          תודה שפנית אלינו. צוות BroTech כבר קיבל את הפרטים שלך
          <br />
          ויחזור אליך בתוך&nbsp;24&nbsp;שעות כדי להבין את הצרכים שלך
          <br />
          ולבנות עבורך פתרון מושלם. בינתיים מוזמן להמשיך לגלוש 🙌
          <br />
          <div className={styles.toastFooter}>
            <button className={styles.toastClose} onClick={handleCloseToast}>
              אישור
            </button>
            <span className={styles.toastCountdown}>ההודעה תיסגר בעוד {countdown} שניות...</span>
          </div>
        </div>
      )}
      <div className={styles.contactBox}>
        <div className={styles.contactHeader} data-aos="fade-up" data-aos-delay="50">
          <Mail className={styles.ctaIcon} size={64} />
          <h2 className="section-title">צור קשר</h2>
          <p className={styles.contactSubtitle}>נשמח לשמוע מכם! מלאו את הטופס ונחזור אליכם בהקדם.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm} data-aos="fade-left" data-aos-delay="50">
          <div className={styles.inputWrapper}>
            <input type="text" {...register('name')} placeholder="שם מלא" />
            <User className={styles.inputIcon} size={18} />
            {errors.name?.message === 'שדה חובה' && isSubmitted && <span className={styles.error}>שדה חובה</span>}
            {errors.name?.message !== 'שדה חובה' && <span className={styles.error}>{errors.name?.message}</span>}
            {!errors.name && watch('name')?.match(/^[א-תa-zA-Z]{2,}\s+[א-תa-zA-Z]{2,}$/) && <span className={styles.success}>✔ תקין</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input type="email" {...register('email')} placeholder="אימייל" />
            <Mail className={styles.inputIcon} size={18} />
            {errors.email?.message === 'שדה חובה' && isSubmitted && <span className={styles.error}>שדה חובה</span>}
            {errors.email?.message !== 'שדה חובה' && <span className={styles.error}>{errors.email?.message}</span>}
            {watch('email') && errors.email && <span className={styles.error}>{errors.email.message}</span>}
            {watch('email') && !errors.email && <span className={styles.success}>✔ תקין</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input type="tel" {...register('phone')} placeholder="טלפון" dir="rtl" />
            <Phone className={styles.inputIcon} size={18} />
            {errors.phone?.message === 'שדה חובה' && isSubmitted && <span className={styles.error}>שדה חובה</span>}
            {errors.phone?.message !== 'שדה חובה' && <span className={styles.error}>{errors.phone?.message}</span>}
            {watch('phone') && errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span> // 🟥 הצגת שגיאה אם יש שגיאה
            )}
            {watch('phone') && !errors.phone && (
              <span className={styles.success}>✔ תקין</span> // 🟥 הצגת תקין רק אם תקף
            )}
          </div>

          <div className={`${styles.inputWrapper} ${styles.selectWrapper}`}>
            <TechSelect
              value={watch('product')}
              onChange={(val) => setValue('product', val, { shouldValidate: true })}
              error={errors.product?.message}
              success={!!watch('product') && !errors.product}
            />
          </div>
          <div className={`${styles.inputWrapper} ${styles.textareaWrapper}`}>
            <textarea {...register('message')} placeholder="ההודעה שלך..." rows={5} className={styles.textarea} />
            <MessageSquare className={styles.inputIcon} size={18} />
            {watch('message') && errors.message && <span className={styles.error}>{errors.message.message}</span>}
            {watch('message') && !errors.message && <span className={styles.success}>✔ תקין</span>}
          </div>

          <button type="submit" className={styles.ctaButton} /* אין שינוי מראה */ disabled={showToast} /* מונע שליחה חוזרת */ data-aos="zoom-in" data-aos-delay="400">
            שלח הודעה
            <Send className={styles.ctaIcon} size={20} />
          </button>
        </form>
      </div>
    </section>
  )
}
