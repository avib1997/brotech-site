'use client'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Check, Package } from 'lucide-react'
import styles from './TechSelect.module.scss'

const products = [
  { id: '', name: 'בחר מוצר', disabled: true },
  { id: 'website', name: 'אתר אינטרנט' },
  { id: 'app', name: 'אפליקציה' },
  { id: 'system', name: 'מערכת פנים-ארגונית' },
  { id: 'consultation', name: 'ייעוץ טכנולוגי' },
  { id: 'maintenance', name: 'תחזוקה ושדרוג' },
  { id: 'ecommerce', name: 'חנות מקוונת' },
  { id: 'saas', name: 'פתרון SaaS' },
  { id: 'custom', name: 'פרויקט מותאם אישית' },
  { id: 'other', name: 'אחר' }
]

type Props = {
  value: string
  onChange: (val: string) => void
  error?: string
  success?: boolean
}

export default function TechSelect({ value, onChange, error, success }: Props) {
  const selected = products.find((p) => p.id === value) ?? products[0]
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (isOpen && !btnRef.current?.contains(e.target as Node) && !(e.target as HTMLElement).closest(`.${styles.menu}`)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    function handleScroll() {
      if (isOpen) setIsOpen(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflowY = isOpen ? 'auto' : ''
    return () => {
      document.body.style.overflowY = ''
    }
  }, [isOpen])

  return (
    <div className={styles.wrapper}>
      <Listbox
        value={selected}
        onChange={(p) => {
          onChange(p.id)
          setIsOpen(false)
        }}
      >
        <div>
          <Listbox.Button ref={btnRef} className={styles.button} onClick={() => setIsOpen((p) => !p)}>
            <Package size={18} className={styles.icon} />
            <span className={selected.id ? '' : styles.placeholder}>{selected.name}</span>
            <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} />
          </Listbox.Button>

          <Transition
            as="div"
            show={isOpen}
            enter={styles.menuEnter}
            enterFrom={styles.menuEnterFrom}
            enterTo={styles.menuEnterTo}
            leave={styles.menuLeave}
            leaveFrom={styles.menuLeaveFrom}
            leaveTo={styles.menuLeaveTo}
            className={styles.menuWrapper}
          >
            <Listbox.Options
              static
              as="ul"
              className={styles.menu}
              style={{
                position: 'absolute'
              }}
            >
              {products.map((p) => (
                <Listbox.Option key={p.id} value={p} disabled={p.disabled} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`
                        ${styles.item}
                        ${p.disabled ? styles.disabled : ''}
                        ${!p.disabled && active ? styles.active : ''}
                        ${!p.disabled && selected ? styles.selected : ''}
                      `}
                    >
                      {p.name}
                      {selected && <Check size={14} className={styles.check} />}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {error && <span className={styles.error}>{error}</span>}
      {!error && success && !isOpen && <span className={styles.success}>✔ תקין</span>}
    </div>
  )
}
