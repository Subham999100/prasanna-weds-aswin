import { useCallback, useEffect, useState } from 'react'
import { Countdown } from './components/Countdown'
import { Nav } from './components/Nav'
import { Opening, type Phase } from './components/Opening'
import { Divider, Lotus, Pavilion } from './components/Ornaments'
import { Petals } from './components/Petals'
import { MusicToggle } from './components/MusicToggle'
import { Reveal } from './components/Reveal'
import { useMusic } from './useMusic'
import { VENUE_CONFIRMED, directionsUrl, mapsUrl, nav, wedding, type Person } from './data'

// Optimised 1080x1920 JPEG. The 4K master stays out of the bundle.
const couplePhoto = new URL('./assets/couple/couple-hero-web.jpg', import.meta.url).href

const prefersReducedMotion =() => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Builds a calendar file: Sumuhurtham at 9:25 PM IST, location text as printed. No end time was supplied, so none is set.
function calendarHref() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Prasanna and Aswin//Wedding//EN',
    'BEGIN:VEVENT',
    'UID:prasanna-aswin-sumuhurtham@wedding',
    'DTSTAMP:20261118T000000Z',
    'DTSTART:20261127T155500Z', // 9:25 PM IST
    'SUMMARY:Prasanna & Aswin Wedding',
    `LOCATION:${[wedding.venue.name, ...wedding.venue.addressLines].join(', ').replace(/,/g, '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`
}

function useActiveSection() {
  const [active, setActive] = useState(nav[0].id)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

function Parents({ person }: { person: Person }) {
  return (
    <article className="person">
      <p className="eyebrow">{person.role}</p>
      <h3 className="person__name">{person.name}</h3>
      <p className="person__printed">{person.printed}</p>
      <Divider className="person__divider" />
      <p className="person__relation">{person.relation}</p>
      <p className="person__parents">
        <span>{person.parents[0]}</span>
        <span className="person__and">&amp;</span>
        <span>{person.parents[1]}</span>
      </p>
    </article>
  )
}

export default function App() {
  const [phase, setPhase] = useState<Phase>(() => (prefersReducedMotion() ? 'done' : 'closed'))
  const active = useActiveSection()

  const music = useMusic()
  const { play: playMusic } = music

  // Music starts only on a guest's own tap. The 8s auto-open cannot start it (browser autoplay rules).
  const open = useCallback(
    (fromGuest?: boolean) => {
      setPhase((p) => (p === 'closed' ? 'opening' : p))
      if (fromGuest) void playMusic()
    },
    [playMusic],
  )

  useEffect(() => {
    if (phase !== 'opening') return
    const id = window.setTimeout(() => setPhase('done'), 2300)
    return () => window.clearTimeout(id)
  }, [phase])

  useEffect(() => {
    document.body.style.overflow = phase === 'done' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  const { bride, groom, venue } = wedding

  return (
    <>
      {phase !== 'done' && <Opening phase={phase} onOpen={open} />}
      <Petals />
      <Nav active={active} />
      {music.available && <MusicToggle playing={music.playing} onToggle={music.toggle} />}

      <main className={`page ${phase === 'done' ? 'page--ready' : ''}`}>
        {/* Invitation */}
        <section id="home" className="section hero">
          <div className="hero__art">
            <figure className="photo-frame">
              <img
                src={couplePhoto}
                alt="Prasanna and Aswin looking at each other and smiling"
                width={1080}
                height={1920}
                decoding="async"
                fetchPriority="high"
              />
            </figure>
          </div>
          <div className="hero__text">
            <p className="eyebrow hero__eyebrow">Wedding Invitation</p>
            <h1 className="hero__names">
              <span>{wedding.couple.bride}</span>
              <em>&amp;</em>
              <span>{wedding.couple.groom}</span>
            </h1>
            <div className="hero__date">
              <p className="hero__day">{wedding.ceremonyDateLabel}</p>
              <p className="eyebrow">Sumuhurtham at 9:25 PM</p>
            </div>
            <Countdown />
          </div>
        </section>

        {/* Family invitation */}
        <section id="family" className="section family">
          <div className="family__inner">
            <Reveal className="center">
              <Lotus className="lotus-mark" />
              <p className="invocation">{wedding.invocation}</p>
              <p className="family-title">{wedding.familyHeading.join(' ')}</p>
              <h2 className="heading">
                {wedding.welcome.heading[0]} <em>{wedding.welcome.heading[1]}</em>
              </h2>
              {wedding.welcome.paragraphs.map((p) => (
                <p className="lede" key={p}>
                  {p}
                </p>
              ))}
            </Reveal>
            <div className="couple">
              <Reveal delay={100}>
                <Parents person={bride} />
              </Reveal>
              <Reveal delay={200} className="couple__mark">
                <span aria-hidden="true">&amp;</span>
              </Reveal>
              <Reveal delay={300}>
                <Parents person={groom} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Events */}
        <section id="events" className="section events">
          <div className="events__inner">
            <Reveal className="center">
              <p className="eyebrow">{wedding.ceremonyDateLabel}</p>
              <h2 className="heading">
                Wedding <em>events</em>
              </h2>
            </Reveal>
            <div className="event-list">
              {wedding.events.map((e, i) => (
                <Reveal key={e.key} delay={i * 140}>
                  <article className="event">
                    <div className="event__date" aria-hidden="true">
                      <strong>{e.day}</strong>
                      <span>{e.month}</span>
                      <span>{e.weekday}</span>
                    </div>
                    <div className="event__body">
                      <h3 className="event__title">
                        {e.title}
                        {e.subtitle && <small> {e.subtitle}</small>}
                      </h3>
                      <p className="event__time">{e.time}</p>
                      <p className="event__place">{venue.name}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Venue & wishes */}
        <section id="venue" className="section venue">
          <Reveal className="venue__art">
            <Pavilion />
          </Reveal>
          <Reveal className="center venue__text" delay={120}>
            <p className="eyebrow">Venue</p>
            <h2 className="heading">{venue.name}</h2>
            <address className="venue__address">
              {venue.addressLines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            {VENUE_CONFIRMED && (
              <div className="venue__actions">
                <a className="btn btn--solid" href={mapsUrl} target="_blank" rel="noreferrer">
                  <span>Open in Maps</span>
                  <small lang="te">మ్యాప్స్‌లో చూడండి</small>
                </a>
                <a className="btn" href={directionsUrl} target="_blank" rel="noreferrer">
                  <span>Directions</span>
                  <small lang="te">దారి చూపు</small>
                </a>
              </div>
            )}
            <a className="btn btn--link" href={calendarHref()} download="prasanna-aswin-wedding.ics">
              Add to Calendar
            </a>
          </Reveal>

          <Reveal className="center wishes" delay={200}>
            <Divider />
            <p className="eyebrow">{wedding.awaiting.heading}</p>
            <p className="wishes__name">{wedding.awaiting.name}</p>
            <p className="eyebrow wishes__sub">With Best Compliments From</p>
            <ul className="wishes__list">
              {wedding.compliments.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        <footer className="footer">
          <p>
            {wedding.couple.bride} &amp; {wedding.couple.groom} · 27 November 2026
          </p>
        </footer>
      </main>
    </>
  )
}
