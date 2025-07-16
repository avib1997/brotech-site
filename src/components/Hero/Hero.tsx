//src/components/Hero/Hero.tsx
'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './Hero.module.scss'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const ICON_PX = 8

type IconCfg = {
  src: string
  top: string
  left: string
  size?: number
  blur?: number
  front?: boolean
  rotate?: number
}
export const icons: IconCfg[] = [
  //   { src: '/icons/aws.svg', top: '1%', left: '5%', size: 60, blur: 0 },
  //   { src: '/icons/code1.svg', top: '-3%', left: '27%', size: 66, blur: 0 },
  //   { src: '/icons/code2.svg', top: '-5%', left: '2%', size: 40, blur: 0 },
  { src: '/icons/aws2.svg', top: '70%', left: '75%', size: 90, blur: 0.5, front: true, rotate: 5 },
  { src: '/icons/react.svg', top: '0%', left: '35%', size: 40, blur: 1.5, rotate: -10 },
  { src: '/icons/cpp.svg', top: '5%', left: '10%', size: 90, blur: 0.4, rotate: 5 },
  { src: '/icons/python1.svg', top: '0%', left: '60%', size: 40, blur: 1.5, rotate: 0 },
  { src: '/icons/csharp.svg', top: '30%', left: '25%', size: 90, blur: 0.4, rotate: 5 },
  { src: '/icons/github.svg', top: '40%', left: '40%', size: 40, blur: 1.5, rotate: -10 },
  { src: '/icons/java.svg', top: '-15%', left: '1%', size: 50, blur: 1.5, rotate: 10 },
  { src: '/icons/js.svg', top: '80%', left: '19%', size: 90, blur: 0, front: true, rotate: -20 },
  { src: '/icons/server.svg', top: '15%', left: '45%', size: 90, blur: 0, front: false },
  { src: '/icons/vs-code.svg', top: '25%', left: '5%', size: 40, blur: 1.5, rotate: -15 },
  { src: '/icons/material-ui.svg', top: '56%', left: '93%', size: 90, blur: 0, front: true, rotate: -15 }
]

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null)
  const heroLogoRef = useRef<HTMLImageElement>(null)
  const [, setIsAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100) // עיכוב קטן להפעלה בטוחה
    return () => clearTimeout(timer)
  }, [])

  useLayoutEffect(() => {
    if (!wrap.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.to('.tech-float', {
        y: '-=8',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 1.2
      })

      /* ❷ Parallax Scroll — אייקונים */
      gsap.utils.toArray<HTMLImageElement>('.tech-float').forEach((el, i) => {
        const depth = i % 5 === 0 ? 60 : 40 // מעט עומק שונה לאסתטיקה
        gsap.fromTo(
          el,
          { yPercent: -depth, z: -depth * 4 },
          {
            yPercent: depth,
            z: depth * 4,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap.current,
              start: 'top 80%', // כשה-Hero מתחיל להיכנס
              end: 'bottom top', // כשה-Hero יוצא
              scrub: true // “משפשף” = קשור לגלילה
            }
          }
        )
      })

      /* ❸ Parallax Scroll — לוגו ראשי */
      if (heroLogoRef.current) {
        gsap.fromTo(
          heroLogoRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      }
    }, wrap)

    return () => ctx.revert()
  }, [])

  const backIcons = icons.filter((ic) => !ic.front)
  const frontIcons = icons.filter((ic) => ic.front)

  const renderIcons = (arr: IconCfg[]) =>
    arr.map(({ src, top, left, size, blur = 0, rotate = 0 }, i) => (
      <Image
        key={i}
        src={src}
        alt=""
        width={size ?? ICON_PX}
        height={size ?? ICON_PX}
        className="tech-float"
        style={{
          position: 'absolute',
          width: size,
          height: size,
          top,
          left,
          transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          filter: `blur(${blur}px) drop-shadow(0 4px 8px rgba(0,0,0,.25))`,
          pointerEvents: 'none'
        }}
      />
    ))

  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroDynamicBackground} />
      <div className={styles.heroWaveBg} />

      {/* ---- Visual side ---- */}
      <div className={styles.heroVisualArea}>
        <div className={styles.heroImg}>
          <div className={styles.heroPhotoWrapper}>
            <div className={styles.heroPhotoArea} ref={wrap}>
              <div className={`${styles['tech-float-wrapper']} ${styles.back}`}>{renderIcons(backIcons)}</div>

              {/* לוגו/Hero-Image עם ref לפרלקס */}
              <Image ref={heroLogoRef} src="/hero/hero6.png" alt="Hero Image" width={480} height={480} className={styles.heroLogo} priority />

              <div className={`${styles['tech-float-wrapper']} ${styles.front}`}>{renderIcons(frontIcons)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
