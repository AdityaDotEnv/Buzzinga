import { Icon } from '../../../components/ui/Icon'
import buzzingaLogo from '../../../assets/buzzinga-logo.png'

type MobileDrawerProps = {
  open: boolean
  onClose: () => void
  onLaunch: (message: string) => void
  links?: { label: string; href: string }[]
}

const defaultLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Create Quiz', href: '/create-quiz' },
  { label: 'Join Quiz', href: '#join' },
  { label: 'Explore Quizzes', href: '#explore' },
  { label: 'Leaderboards', href: '#leaderboards' },
]

export function MobileDrawer({ open, onClose, onLaunch, links = defaultLinks }: MobileDrawerProps) {
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
        <a className="ghost-button" href="#login">
          Log in
        </a>
        <button className="primary-button" type="button" onClick={() => onLaunch('Sign up flow opened')}>
          Sign up
        </button>
      </div>
    </div>
  )
}
