import { useState, useEffect } from 'react'
import { Icon } from '../../../components/ui/Icon'
import buzzingaLogo from '../../../assets/buzzinga-logo.png'
import { Link } from 'react-router-dom'

type MobileDrawerProps = {
  open: boolean
  onClose: () => void
  onLaunch: (message: string) => void
  links?: { label: string; href: string }[]
}

const defaultLinks = [
  { label: 'Home', href: '/' },
  { label: 'Create Quiz', href: '/create-quiz' },
  { label: 'Join Quiz', href: '/join' },
  { label: 'Explore Quizzes', href: '/explore' },
  { label: 'Leaderboards', href: '/leaderboards' },
]

export function MobileDrawer({ open, onClose, onLaunch, links = defaultLinks }: MobileDrawerProps) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user', e)
      }
    }
  }, [open]) // Re-check when drawer opens

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  if (!open) return null

  return (
    <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="mobile-drawer-header">
        <img className="brand-logo" src={buzzingaLogo} alt="Buzzinga" />
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close menu">
          <Icon name="close" />
        </button>
      </div>
      {links.map((link) => (
        <a key={link.label} href={link.href} onClick={onClose}>
          {link.label}
        </a>
      ))}
      <div className="mobile-drawer-actions">
        {user ? (
          <>
            <div style={{ padding: '0 1rem', marginBottom: '1rem', color: 'rgba(226, 232, 240, 0.85)', fontWeight: 600 }}>
              {user.username}
            </div>
            <a className="ghost-button" href="#" onClick={(e) => { handleLogout(e); onClose(); }}>
              Log out
            </a>
          </>
        ) : (
          <>
            <Link className="ghost-button" to="/login" onClick={onClose}>
              Log in
            </Link>
            <Link className="primary-button" to="/signup" onClick={onClose}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
