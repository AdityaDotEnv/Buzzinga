export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <a className="brand" href="/" aria-label="Buzzinga home">
          <span className="brand-mark">B</span>
          <span className="brand-copy">Buzzinga!</span>
        </a>
        <p>Competitive quizzes with classroom-grade clarity and game-night energy.</p>
      </div>

      <div className="footer-columns">
        <div>
          <h3>Product</h3>
          <a href="#">Create Quiz</a>
          <a href="#">Join Game</a>
          <a href="#">Leaderboards</a>
          <a href="#">Analytics</a>
        </div>
        <div>
          <h3>Solutions</h3>
          <a href="#">Classroom Mode</a>
          <a href="#">Team Battles</a>
          <a href="#">Events</a>
          <a href="#">Community Play</a>
        </div>
        <div>
          <h3>Resources</h3>
          <a href="#">Help Center</a>
          <a href="#">Templates</a>
          <a href="#">Guides</a>
          <a href="#">Status</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
