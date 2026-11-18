import type { CSSProperties } from 'react'

// Fixed set so petals never re-randomise on re-render. Hidden when reduced motion is on (see CSS).
const petals = Array.from({ length: 14 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * 97.13 + n * 31.7) * 10000
    return x - Math.floor(x)
  }
  return {
    left: `${Math.round(r(1) * 100)}%`,
    size: 9 + Math.round(r(2) * 9),
    duration: 11 + r(3) * 7,
    delay: -r(4) * 18,
    drift: (r(5) - 0.5) * 140,
    gold: i % 4 === 0,
  }
})

export function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className={`petal ${p.gold ? 'petal--gold' : ''}`}
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.25,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
