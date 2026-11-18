import { useCallback, useEffect, useRef, useState } from 'react'
import musicUrl from './assets/music/raataan-lambiyan.mp3'

// The background track is this one file, imported by name (no automatic file picking). Publication
// rights for it have not been shown: read src/assets/music/README.md before publishing the repo.
const MUSIC_SRC: string = musicUrl
const PLAY_LIMIT_S = 15 // the music is a short intro: it stops here, jumps back to 0:00 and never loops
const TARGET_VOLUME = 0.35
const FADE_IN_MS = 3000
const FADE_OUT_MS = 600

/** One persistent <audio> for the whole page. It lives in a ref, so re-renders never restart it. */
export function useMusic() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const timer = useRef(0)
  const stopTimer = useRef(0)
  const [available, setAvailable] = useState(Boolean(MUSIC_SRC))
  const [playing, setPlaying] = useState(false)

  const getAudio = useCallback(() => {
    if (!audio.current) {
      const a = new Audio(MUSIC_SRC)
      a.loop = false
      a.preload = 'auto'
      a.addEventListener('play', () => setPlaying(true))
      a.addEventListener('pause', () => setPlaying(false))
      a.addEventListener('error', () => {
        setAvailable(false)
        setPlaying(false)
      })
      audio.current = a
    }
    return audio.current
  }, [])

  const fade = useCallback((to: number, ms: number, done?: () => void) => {
    window.clearInterval(timer.current)
    const a = audio.current
    if (!a) return
    const from = a.volume
    const start = performance.now()
    timer.current = window.setInterval(() => {
      const k = Math.min(1, (performance.now() - start) / ms)
      a.volume = from + (to - from) * k
      if (k === 1) {
        window.clearInterval(timer.current)
        done?.()
      }
    }, 40)
  }, [])

  /** Hard stop at the limit: no fade, back to 0:00, so the next play starts from the beginning. */
  const stop = useCallback(() => {
    const a = audio.current
    if (!a) return
    window.clearInterval(timer.current)
    a.pause() // the 'pause' listener updates the button
    a.currentTime = 0
  }, [])

  /** One timer aimed at the limit, based on the playhead (so pause and resume still count from where it was). */
  const armStop = useCallback(
    function arm() {
      window.clearTimeout(stopTimer.current)
      const a = audio.current
      if (!a) return
      stopTimer.current = window.setTimeout(
        () => {
          if (a.paused) return
          if (a.currentTime >= PLAY_LIMIT_S - 0.02) stop()
          else arm() // fired early (e.g. buffering): aim again at the remaining time
        },
        Math.max(0, (PLAY_LIMIT_S - a.currentTime) * 1000),
      )
    },
    [stop],
  )

  /** Call only from a guest's click or tap. Browsers reject play() otherwise, and that is left silent. */
  const play = useCallback(async () => {
    if (!MUSIC_SRC) return
    const a = getAudio()
    if (a.paused) a.volume = 0
    try {
      await a.play()
      fade(TARGET_VOLUME, FADE_IN_MS)
      armStop()
    } catch {
      setPlaying(false) // autoplay blocked or file unreadable; the toggle stays available
    }
  }, [getAudio, fade, armStop])

  const pause = useCallback(() => {
    const a = audio.current
    if (!a) return
    setPlaying(false)
    fade(0, FADE_OUT_MS, () => a.pause())
  }, [fade])

  const toggle = useCallback(() => (playing ? pause() : void play()), [playing, pause, play])

  useEffect(
    () => () => {
      window.clearInterval(timer.current)
      window.clearTimeout(stopTimer.current)
      audio.current?.pause()
    },
    [],
  )

  return { available, playing, play, toggle }
}
