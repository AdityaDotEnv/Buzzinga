import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import { clearAuth, clearSession } from '../../store/authSlice'
import { Icon } from '../ui/Icon'
import { LayoutDashboard, Trophy, Settings, LogOut, ChevronDown } from 'lucide-react'
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
  { label: 'Explore Quizzes', href: '/explore' },
  { label: 'Leaderboards', href: '/leaderboards' },
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

  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(clearSession())
    dispatch(clearAuth())
    window.location.href = '/'
  }

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
        {user ? (
          <details className={styles.profileMenu}>
            <summary>
              <span className={`${styles.avatar} ${styles.avatarSmall}`}>
                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </span>
              {user.username || 'Profile'}
              <ChevronDown size={14} style={{ marginLeft: '0.25rem', opacity: 0.6, flexShrink: 0 }} />
            </summary>
            <div className={styles.menuPanel}>
              <Link to="/analytics" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <LayoutDashboard size={15} style={{ opacity: 0.7 }} />
                Dashboard
              </Link>
              <Link to="/leaderboards" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Trophy size={15} style={{ opacity: 0.7 }} />
                Achievements
              </Link>
              <Link to="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Settings size={15} style={{ opacity: 0.7 }} />
                Settings
              </Link>
              <a
                href="#"
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f87171' }}
              >
                <LogOut size={15} style={{ opacity: 0.85 }} />
                Log out
              </a>
            </div>
          </details>
        ) : (
          <>
            <Link className="ghost-button" to="/login">
              Log in
            </Link>
            <Link className="primary-button" to="/signup">
              Sign up
            </Link>
          </>
        )}
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
          {user ? (
            <>
              <div style={{ padding: '0 1rem', marginBottom: '1rem', color: 'rgba(226, 232, 240, 0.85)', fontWeight: 600 }}>
                {user.username}
              </div>
              <a className="ghost-button" href="#" onClick={(e) => { handleLogout(e); onToggleMobileMenu(); }}>
                Log out
              </a>
            </>
          ) : (
            <>
              <Link className="ghost-button" to="/login" onClick={onToggleMobileMenu}>
                Log in
              </Link>
              <Link className="primary-button" to="/signup" onClick={onToggleMobileMenu}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
