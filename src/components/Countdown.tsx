import { useEffect, useState } from 'react'
import { wedding } from '../data'

const target = new Date(wedding.ceremonyISO).getTime()
const pad = (n: number) => String(n).padStart(2, '0')

export function Countdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = target - now
  if (diff <= 0) {
    return <p className="countdown-done">The celebration has begun.</p>
  }

  const s = Math.floor(diff / 1000)
  const cells = [
    { label: 'Days', value: String(Math.floor(s / 86400)) },
    { label: 'Hours', value: pad(Math.floor((s % 86400) / 3600)) },
    { label: 'Min', value: pad(Math.floor((s % 3600) / 60)) },
    { label: 'Sec', value: pad(s % 60) },
  ]

  return (
    <div className="countdown" role="timer" aria-label="Time remaining until the Sumuhurtham">
      {cells.map((c) => (
        <div className="countdown__cell" key={c.label}>
          <span className="countdown__value">{c.value}</span>
          <span className="countdown__label">{c.label}</span>
        </div>
      ))}
    </div>
  )
}
