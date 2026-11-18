import { useEffect, useRef } from 'react'
import { ArchArt } from './Ornaments'
import { wedding } from '../data'

export type Phase = 'closed' | 'opening' | 'done'

/** Full-screen opening: arch draws itself, then the two doors part to reveal the invitation. */
export function Opening({ phase, onOpen }: { phase: Phase; onOpen: (fromGuest?: boolean) => void }) {
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    btn.current?.focus({ preventScroll: true })
    const id = window.setTimeout(() => onOpen(false), 8000) // opens by itself if nobody taps
    return () => window.clearTimeout(id)
  }, [onOpen])

  return (
    <div className={`opening opening--${phase}`} role="dialog" aria-modal="true" aria-label="Wedding invitation opening">
      <div className="door door--left" />
      <div className="door door--right" />
      <div className="opening__line" />
      <div className="opening__content">
        <ArchArt className="opening__arch" drawn />
        <p className="eyebrow opening__eyebrow">Wedding Invitation</p>
        <h1 className="opening__names">
          {wedding.couple.bride} <span>&amp;</span> {wedding.couple.groom}
        </h1>
        <button ref={btn} type="button" className="opening__btn" onClick={() => onOpen(true)}>
          Open Invitation
        </button>
      </div>
    </div>
  )
}
