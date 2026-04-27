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
      { label: 'Leaderboards', href: '#leaderboards' },
      { label: 'Analytics', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Classroom Mode', href: '#' },
      { label: 'Team Battles', href: '#' },
      { label: 'Events', href: '#' },
      { label: 'Community Play', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
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
