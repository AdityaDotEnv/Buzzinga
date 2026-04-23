import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import buzzingaLogo from '../../assets/buzzinga-logo.png'

export type NavLink = {
  label: string
  href: string
}

type NavbarProps = {
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
  onLaunch: (message: string) => void
  links?: NavLink[]
  mobileLinks?: NavLink[]
  brandHref?: string
  rightContent?: ReactNode
}

const defaultLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Create Quiz', href: '/create-quiz' },
  { label: 'Join Quiz', href: '/join-quiz' },
  { label: 'Explore Quizzes', href: '#explore' },
  { label: 'Leaderboards', href: '#leaderboards' },
]

export function Navbar({
  mobileMenuOpen,
  onToggleMobileMenu,
  onLaunch,
  links = defaultLinks,
  mobileLinks = defaultLinks,
  brandHref = '/',
  rightContent,
}: NavbarProps) {
  const renderNavLink = (link: NavLink) =>
    link.href.startsWith('/') ? (
      <Link key={link.label} to={link.href}>
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={link.href}>
        {link.label}
      </a>
    )

  return (
    <header className="navbar">
      <Link className="brand" to={brandHref} aria-label="Buzzinga home">
        <img className="brand-logo" src={buzzingaLogo} alt="Buzzinga" />
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map(renderNavLink)}
      </nav>

      <div className="nav-actions">
        {rightContent}
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

      <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation" hidden={!mobileMenuOpen}>
        <div className="mobile-drawer-header">
          <img className="brand-logo" src={buzzingaLogo} alt="Buzzinga" />
          <button className="icon-button" type="button" onClick={onToggleMobileMenu} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
        {mobileLinks.map((link) =>
          link.href.startsWith('/') ? (
            <Link key={link.label} to={link.href} onClick={onToggleMobileMenu}>
              {link.label}
            </Link>
          ) : (
            <a key={link.label} href={link.href} onClick={onToggleMobileMenu}>
              {link.label}
            </a>
          ),
        )}
        <div className="mobile-drawer-actions">
          <a className="ghost-button" href="#login">
            Log in
          </a>
          <button className="primary-button" type="button" onClick={() => onLaunch('Sign up flow opened')}>
            Sign up
          </button>
        </div>
      </div>
    </header>
  )
}
