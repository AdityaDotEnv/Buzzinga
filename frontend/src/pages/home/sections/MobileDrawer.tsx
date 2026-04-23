import { Icon } from '../../../components/ui/Icon'

type MobileDrawerProps = {
  open: boolean
  onClose: () => void
  onLaunch: (message: string) => void
}

export function MobileDrawer({ open, onClose, onLaunch }: MobileDrawerProps) {
  if (!open) return null

  return (
    <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="mobile-drawer-header">
        <span className="brand-copy">Buzzinga!</span>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close menu">
          <Icon name="close" />
        </button>
      </div>
      <a href="#home" onClick={onClose}>
        Home
      </a>
      <a href="#create" onClick={onClose}>
        Create Quiz
      </a>
      <a href="#join" onClick={onClose}>
        Join Quiz
      </a>
      <a href="#explore" onClick={onClose}>
        Explore Quizzes
      </a>
      <a href="#leaderboards" onClick={onClose}>
        Leaderboards
      </a>
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
