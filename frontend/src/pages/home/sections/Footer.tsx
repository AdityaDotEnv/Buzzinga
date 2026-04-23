import { footerColumns } from '../content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="brand">
          <span className="brand-mark">B</span>
          <span className="brand-copy">Buzzinga!</span>
        </div>
        <p>Competitive quizzes with classroom-grade clarity and game-night energy.</p>
      </div>

      <div className="footer-columns">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((link) => (
              <a key={link} href="#">
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}
