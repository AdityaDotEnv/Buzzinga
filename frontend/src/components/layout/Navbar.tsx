import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import buzzingaLogo from '../../assets/buzzinga-logo.png'
import styles from './Navbar.module.css'

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
  { label: 'Join Quiz', href: '/join' },
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
    <header className={styles.navbar}>
      <Link className={styles.brand} to={brandHref} aria-label="Buzzinga home">
        <img className={styles.brandLogo} src={buzzingaLogo} alt="Buzzinga" />
      </Link>

      <nav className={styles.navLinks} aria-label="Primary navigation">
        {links.map(renderNavLink)}
      </nav>

      <div className={styles.navActions}>
        {rightContent}
        <details className={styles.profileMenu}>
          <summary>
            <span className={`${styles.avatar} ${styles.avatarSmall}`}>U</span>
            Profile
          </summary>
          <div className={styles.menuPanel}>
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
        className={`icon-button ${styles.mobileToggle}`}
        type="button"
        aria-label="Open menu"
        onClick={onToggleMobileMenu}
      >
        <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
      </button>

      <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Mobile navigation" hidden={!mobileMenuOpen}>
        <div className={styles.mobileDrawerHeader}>
          <img className={styles.brandLogo} src={buzzingaLogo} alt="Buzzinga" />
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
        <div className={styles.mobileDrawerActions}>
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
