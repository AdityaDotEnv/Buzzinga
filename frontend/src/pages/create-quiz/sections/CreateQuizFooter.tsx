type CreateQuizFooterProps = {
  onGoHome: () => void
}

export function CreateQuizFooter({ onGoHome }: CreateQuizFooterProps) {
  return (
    <footer className="create-quiz-footer footer">
      <div className="footer-brand">
        <div className="brand">
          <span className="brand-mark">B</span>
          <span className="brand-copy">Buzzinga!</span>
        </div>
        <p>Quiz creation workspace. Fast setup, strong visuals, no backend required yet.</p>
        <button className="ghost-button" type="button" onClick={onGoHome}>
          Back to home
        </button>
      </div>

      <div className="footer-columns">
        <div>
          <h3>Build</h3>
          <a href="#">From scratch</a>
          <a href="#">With AI</a>
          <a href="#">Templates</a>
        </div>
        <div>
          <h3>Resources</h3>
          <a href="#">Quiz tips</a>
          <a href="#">Examples</a>
          <a href="#">Help</a>
        </div>
        <div>
          <h3>Workspace</h3>
          <a href="#">Drafts</a>
          <a href="#">Exports</a>
          <a href="#">Settings</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
}
