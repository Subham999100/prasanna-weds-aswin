import { nav } from '../data'

export function Nav({ active }: { active: string }) {
  return (
    <nav className="nav" aria-label="Sections">
      <ul>
        {nav.map((n) => (
          <li key={n.id}>
            <a href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
