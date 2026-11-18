// Original line-art ornaments. Colours come from CSS variables so each place can retheme them:
// --line-a (main stroke) and --line-b (gold accent).

const petal = 'M0 0 C-9 -13 -9 -29 0 -42 C9 -29 9 -13 0 0Z'

function LotusPaths() {
  return (
    <g fill="none" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      {[-72, 72].map((r) => (
        <path key={r} d={petal} transform={`rotate(${r}) scale(.82)`} stroke="var(--line-b)" />
      ))}
      {[-44, 44].map((r) => (
        <path key={r} d={petal} transform={`rotate(${r}) scale(.95)`} stroke="var(--line-a)" />
      ))}
      <path d={petal} stroke="var(--line-a)" />
      <path d="M-44 4 Q0 12 44 4" stroke="var(--line-b)" />
    </g>
  )
}

export function Lotus({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="-60 -50 120 56" fill="none" aria-hidden="true">
      <LotusPaths />
    </svg>
  )
}

export function Ganesha({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 210" fill="none" aria-hidden="true">
      <g strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {/* halo */}
        <circle cx="100" cy="106" r="90" stroke="var(--line-b)" opacity=".7" />
        <circle cx="100" cy="106" r="95" stroke="var(--line-b)" strokeDasharray="1 5" opacity=".9" />
        {/* crown */}
        <path d="M70 56 L76 30 L89 44 L100 20 L111 44 L124 30 L130 56" stroke="var(--line-b)" />
        <path d="M68 58 Q100 48 132 58" stroke="var(--line-b)" />
        <circle cx="100" cy="14" r="3.2" stroke="var(--line-b)" />
        <circle cx="100" cy="54" r="2.4" fill="var(--line-b)" stroke="none" />
        {/* ears */}
        <path d="M66 74 C30 64 14 104 34 134 C45 148 62 142 66 126" stroke="var(--line-a)" />
        <path d="M134 74 C170 64 186 104 166 134 C155 148 138 142 134 126" stroke="var(--line-a)" />
        <path d="M58 88 C40 90 34 110 44 126" stroke="var(--line-a)" opacity=".55" />
        <path d="M142 88 C160 90 166 110 156 126" stroke="var(--line-a)" opacity=".55" />
        {/* head */}
        <path d="M68 74 Q100 54 132 74 Q142 104 124 128 Q100 140 76 128 Q58 104 68 74Z" stroke="var(--line-a)" />
        {/* tilak */}
        <path d="M92 70 Q100 82 108 70" stroke="var(--line-b)" />
        <path d="M100 66 V80" stroke="var(--line-b)" />
        {/* eyes */}
        <path d="M78 94 Q86 89 94 94" stroke="var(--line-a)" />
        <path d="M106 94 Q114 89 122 94" stroke="var(--line-a)" />
        {/* trunk */}
        <path d="M93 100 C89 132 93 156 100 172 C107 188 126 186 130 174 C132 166 124 160 118 165" stroke="var(--line-a)" />
        <path d="M107 100 C108 128 108 148 112 160" stroke="var(--line-a)" />
        <path d="M95 126 H105 M94 140 H106" stroke="var(--line-a)" opacity=".45" />
        {/* tusk */}
        <path d="M120 120 C134 130 136 146 128 156" stroke="var(--line-b)" />
        {/* shoulders */}
        <path d="M44 196 C58 178 80 174 100 190 C120 174 142 178 156 196" stroke="var(--line-a)" opacity=".6" />
      </g>
    </svg>
  )
}

/** Double arch with Ganesha, a bead garland and a lotus base. */
export function ArchArt({ className = '', drawn = false }: { className?: string; drawn?: boolean }) {
  const beads = Array.from({ length: 19 }, (_, i) => {
    const a = Math.PI * (1 + i / 18)
    return { x: 200 + 148 * Math.cos(a), y: 210 + 148 * Math.sin(a), gold: i % 2 === 0 }
  })
  return (
    <svg className={`arch-art ${drawn ? 'is-drawn' : ''} ${className}`} viewBox="0 0 400 520" fill="none" role="img" aria-label="Lord Ganesha within a gold and burgundy arch above a lotus">
      <g strokeWidth="1.6" strokeLinecap="round">
        <path className="arch-line" pathLength={1} d="M40 500 V210 A160 160 0 0 1 360 210 V500" stroke="var(--line-a)" />
        <path className="arch-line arch-line--2" pathLength={1} d="M64 500 V212 A136 136 0 0 1 336 212 V500" stroke="var(--line-b)" />
      </g>
      <g className="arch-beads">
        {beads.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.gold ? 3.2 : 2.2} fill={b.gold ? 'var(--line-b)' : 'var(--line-a)'} />
        ))}
      </g>
      <svg className="arch-ganesha" x="76" y="108" width="248" height="260" viewBox="0 0 200 210">
        <Ganesha />
      </svg>
      <g className="arch-lotus" transform="translate(200 488) scale(2.3)">
        <LotusPaths />
      </g>
      <path d="M40 504 H360" stroke="var(--line-b)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Divider({ className = '' }: { className?: string }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 240 16" fill="none" aria-hidden="true">
      <path d="M0 8 H98 M142 8 H240" stroke="var(--gold)" strokeWidth="1" />
      <path d="M120 1 L127 8 L120 15 L113 8Z" stroke="var(--gold)" strokeWidth="1.2" />
      <circle cx="104" cy="8" r="1.8" fill="var(--gold)" />
      <circle cx="136" cy="8" r="1.8" fill="var(--gold)" />
    </svg>
  )
}

/** Simple pavilion (mandap) illustration for the venue. A generic drawing, not a photo of the venue. */
export function Pavilion({ className = '' }: { className?: string }) {
  const rays = Array.from({ length: 21 }, (_, i) => {
    const a = Math.PI * (1.05 + (i / 20) * 0.9)
    return { x1: 300 + 108 * Math.cos(a), y1: 150 + 108 * Math.sin(a), x2: 300 + 128 * Math.cos(a), y2: 150 + 128 * Math.sin(a) }
  })
  return (
    <svg className={className} viewBox="0 0 600 270" fill="none" role="img" aria-label="Illustration of a decorated wedding pavilion">
      <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <circle cx="300" cy="150" r="100" stroke="var(--line-b)" opacity=".6" />
        {rays.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="var(--line-b)" opacity=".8" />
        ))}
        {/* dome */}
        <path d="M232 140 C232 96 272 84 300 62 C328 84 368 96 368 140" stroke="var(--line-a)" />
        <path d="M258 140 C258 112 284 102 300 86 C316 102 342 112 342 140" stroke="var(--line-a)" opacity=".5" />
        <path d="M300 62 V42" stroke="var(--line-b)" />
        <circle cx="300" cy="37" r="4" stroke="var(--line-b)" />
        {/* body */}
        <path d="M214 140 H386 M214 140 V228 M386 140 V228" stroke="var(--line-a)" />
        <path d="M222 148 H378" stroke="var(--line-b)" />
        <path d="M232 228 V186 A18 18 0 0 1 268 186 V228" stroke="var(--line-a)" />
        <path d="M332 228 V186 A18 18 0 0 1 368 186 V228" stroke="var(--line-a)" />
        <path d="M274 228 V172 A26 26 0 0 1 326 172 V228" stroke="var(--line-a)" />
        <path d="M284 228 V176 A16 16 0 0 1 316 176 V228" stroke="var(--line-b)" opacity=".7" />
        {/* side chhatris */}
        {[130, 470].map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 24} 228 V150 M${cx + 24} 228 V150 M${cx - 30} 150 H${cx + 30}`} stroke="var(--line-a)" />
            <path d={`M${cx - 26} 150 C${cx - 26} 120 ${cx} 112 ${cx} 98 C${cx} 112 ${cx + 26} 120 ${cx + 26} 150`} stroke="var(--line-a)" />
            <path d={`M${cx} 98 V84`} stroke="var(--line-b)" />
            <circle cx={cx} cy="80" r="3.2" stroke="var(--line-b)" />
            <path d={`M${cx - 24} 200 Q${cx} 214 ${cx + 24} 200`} stroke="var(--line-b)" />
          </g>
        ))}
        {/* garlands */}
        <path d="M154 160 Q184 196 214 160" stroke="var(--line-b)" strokeDasharray="1 6" strokeWidth="3.2" />
        <path d="M386 160 Q416 196 446 160" stroke="var(--line-b)" strokeDasharray="1 6" strokeWidth="3.2" />
        {/* steps & ground */}
        <path d="M196 236 H404 M180 244 H420 M164 252 H436" stroke="var(--line-a)" opacity=".7" />
        <path d="M30 260 H570" stroke="var(--line-b)" />
      </g>
    </svg>
  )
}
