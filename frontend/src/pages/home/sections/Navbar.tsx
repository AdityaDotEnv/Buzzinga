import { Icon } from '../../../components/ui/Icon'

type NavbarProps = {
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
  onLaunch: (message: string) => void
}

export function Navbar({ mobileMenuOpen, onToggleMobileMenu, onLaunch }: NavbarProps) {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Buzzinga home">
        <span className="brand-mark">B</span>
        <span className="brand-copy">
          Buzzinga<span aria-hidden="true">!</span>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#home">Home</a>
        <a href="#create">Create Quiz</a>
        <a href="#join">Join Quiz</a>
        <a href="#explore">Explore Quizzes</a>
        <a href="#leaderboards">Leaderboards</a>
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
