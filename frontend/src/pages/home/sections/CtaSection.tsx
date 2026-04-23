type CtaSectionProps = {
  onLaunch: (message: string) => void
}

export function CtaSection({ onLaunch }: CtaSectionProps) {
  return (
    <section className="cta-section">
      <div className="cta-card glass-card">
        <span className="eyebrow">Ready</span>
        <h2>Ship your first game in minutes.</h2>
        <p>
          Buzzinga is the fast path from idea to live competition. Create the quiz, share the PIN, and let the room
          take over.
        </p>
        <div className="hero-actions">
          <button className="primary-button primary-button-large" type="button" onClick={() => onLaunch('Create quiz flow opened')}>
            Create Quiz Free
          </button>
          <button className="secondary-button secondary-button-large" type="button" onClick={() => onLaunch('Join quiz flow opened')}>
            Join a Live Game
          </button>
        </div>
      </div>
    </section>
  )
}
