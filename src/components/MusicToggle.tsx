export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="music-toggle"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label="Background music"
      title={playing ? 'Pause music' : 'Play music'}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 17.5V6.5l8-1.8v10.8" />
          <circle cx="7.3" cy="17.6" r="2.2" />
          <circle cx="15.8" cy="15.6" r="2.2" />
          {!playing && <path d="M4 4l16 16" />}
        </g>
      </svg>
    </button>
  )
}
