'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './FloatingLogo.module.scss'

export default function FloatingLogo() {
  return (
    <div className={styles.wrapperLogo}>
      <Link href="#contact">
        <Image src="/BTLL.png" alt="BroTech logo" width={140} height={100} className={styles.logo} />
      </Link>
    </div>
  )
}
