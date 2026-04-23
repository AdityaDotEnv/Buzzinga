import { Icon } from '../../../components/ui/Icon'

type NavLink = {
  label: string
  href: string
}

type NavbarProps = {
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
  onLaunch: (message: string) => void
  links?: NavLink[]
  brandHref?: string
}

const defaultLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Create Quiz', href: '/create-quiz' },
  { label: 'Join Quiz', href: '#join' },
  { label: 'Explore Quizzes', href: '#explore' },
  { label: 'Leaderboards', href: '#leaderboards' },
]

export function Navbar({ mobileMenuOpen, onToggleMobileMenu, onLaunch, links = defaultLinks, brandHref = '#home' }: NavbarProps) {
  return (
    <header className="navbar">
      <a className="brand" href={brandHref} aria-label="Buzzinga home">
        <span className="brand-mark">B</span>
        <span className="brand-copy">
          Buzzinga<span aria-hidden="true">!</span>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <details className="profile-menu">
          <summary>
            <span className="avatar avatar-small">U</span>
            Profile
          </summary>
          <div className="menu-panel">
            <a href="#">Dashboard</a>
            <a href="#">Achievements</a>
            <a href="#">Settings</a>
          </div>
        </details>
        <a className="ghost-button" href="#login">
          Log in
        </a>
        <button className="primary-button" type="button" onClick={() => onLaunch('Sign up flow opened')}>
          Sign up
        </button>
      </div>

      <button
        className="icon-button mobile-toggle"
        type="button"
        aria-label="Open menu"
        onClick={onToggleMobileMenu}
      >
        <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
      </button>
    </header>
  )
}
