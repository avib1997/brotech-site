'use client'

import styles from './WebShowcase.module.scss'
import Image from 'next/image'
import { useState } from 'react'

const darkDesigns = [
  // כהים
  { id: 2, title: 'Glassium / גלאסיום', preview: '/designs/22.jpeg', url: '/showcases/2.html' },
  { id: 3, title: 'DarkMinimal / דארק־מינימל', preview: '/designs/33.png', url: '/showcases/3.html' },
  { id: 4, title: 'CyberNeon / סייבר־ניאון', preview: '/designs/44.jpeg', url: '/showcases/4.html' },
  { id: 7, title: 'MotionFirst / תנועה־קודם', preview: '/designs/77.jpeg', url: '/showcases/7.html' }
]

const lightDesigns = [
  // בהירים
  { id: 1, title: 'BrutaOne / ברוטאון', preview: '/designs/11.png', url: '/showcases/1.html' },
  { id: 6, title: 'MagazineGrid / מגזין גריד', preview: '/designs/66.png', url: '/showcases/6.html' },
  { id: 5, title: 'SoftUI / סופט־יו־איי', preview: '/designs/55.png', url: '/showcases/5.html' },
  { id: 8, title: 'SplitLayout / פריסה חצויה', preview: '/designs/88.jpeg', url: '/showcases/8.html' }
]

export default function WebShowcase() {
  const [selected, setSelected] = useState<number | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const allDesigns = [...darkDesigns, ...lightDesigns]

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setSelected(null)
    }, 300)
  }

  return (
    <section id="gallery" className={styles.gallerySection}>
      <h2 className={styles.title}>גלריית עיצובים</h2>
      <h3 className={styles.subTitle}>כהים</h3>
      <div className={styles.grid}>
        {darkDesigns.map((design) => (
          <div key={design.id} className={styles.thumb} onClick={() => setSelected(design.id)}>
            <Image src={design.preview} alt={design.title} width={300} height={200} />
            <div className={styles.zoomIcon}>
              <Image src="/icons/hand-click.gif" alt="Click icon" width={36} height={36} unoptimized />{' '}
            </div>
            <p className={styles.caption}>{design.title}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.subTitle}>בהירים</h3>
      <div className={styles.grid}>
        {lightDesigns.map((design) => (
          <div key={design.id} className={styles.thumb} onClick={() => setSelected(design.id)}>
            <Image src={design.preview} alt={design.title} width={300} height={200} />
            <div className={styles.zoomIcon}>
              <Image src="/icons/click-2.gif" alt="Click icon" width={36} height={36} unoptimized />{' '}
            </div>
            <p className={styles.caption}>{design.title}</p>
          </div>
        ))}
      </div>

      {/* Modal Placeholder */}
      {selected && (
        <div className={styles.modal} onClick={handleClose}>
          <div className={`${styles.modalContent} ${isClosing ? styles.fadeOut : styles.fadeZoom}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClose} className={styles.close}>
              ✕
            </button>
            <h3 className={styles.modalTitle}>{allDesigns.find((d) => d.id === selected)?.title}</h3>
            <iframe src={allDesigns.find((d) => d.id === selected)?.url} className={styles.previewIframe} title="Live Preview" />{' '}
          </div>
        </div>
      )}
      <div className={styles.ctaWrapper}>
        <button className={styles.ctaButton} onClick={() => (window.location.href = '#contact')}>
          אהבתם עיצוב? דברו איתי →
        </button>
      </div>
    </section>
  )
}
