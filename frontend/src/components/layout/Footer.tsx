import { Link } from 'react-router-dom'
import buzzingaLogo from '../../assets/buzzinga-logo.png'
import styles from './Footer.module.css'

type FooterLink = {
  label: string
  href: string
}

const footerColumns: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: 'Product',
    links: [
      { label: 'Create Quiz', href: '/create-quiz' },
      { label: 'Join Game', href: '/join-quiz' },
      { label: 'Leaderboards', href: '/leaderboards' },
      { label: 'Analytics', href: '/analytics' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Classroom Mode', href: '/classroom' },
      { label: 'Team Battles', href: '/team-battles' },
      { label: 'Events', href: '/events' },
      { label: 'Community Play', href: '/community' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Templates', href: '/templates' },
      { label: 'Guides', href: '/guides' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
]

function renderFooterLink(link: FooterLink) {
  return link.href.startsWith('/') ? (
    <Link key={link.label} to={link.href}>
      {link.label}
    </Link>
  ) : (
    <a key={link.label} href={link.href}>
      {link.label}
    </a>
  )
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <Link to="/" aria-label="Buzzinga home">
          <img className={styles.brandLogo} src={buzzingaLogo} alt="Buzzinga" />
        </Link>
        <p>Competitive quizzes with classroom-grade clarity and game-night energy.</p>
      </div>

      <div className={styles.footerColumns}>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map(renderFooterLink)}
          </div>
        ))}
      </div>
    </footer>
  )
}
