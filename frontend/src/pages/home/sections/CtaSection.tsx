import { ScrollReveal } from '../../../components/ui/ScrollReveal'

type CtaSectionProps = {
  onLaunch: (message: string) => void
  onOpenCreateQuiz: () => void
}

export function CtaSection({ onLaunch, onOpenCreateQuiz }: CtaSectionProps) {
  return (
    <section className="cta-section">
      <ScrollReveal variant="title">
        <div className="cta-card glass-card">
          <span className="eyebrow">Ready</span>
          <h2>Ship your first game in minutes.</h2>
        </div>
      </ScrollReveal>

      <div className="cta-body">
        <ScrollReveal variant="body">
          <p>
            Buzzinga is the fast path from idea to live competition. Create the quiz, share the PIN, and let the room
            take over.
          </p>
        </ScrollReveal>

        <div className="cta-actions">
          <ScrollReveal variant="card">
            <button className="primary-button primary-button-large" type="button" onClick={onOpenCreateQuiz}>
              Create Quiz Free
            </button>
          </ScrollReveal>
          <ScrollReveal variant="card">
            <button className="secondary-button secondary-button-large" type="button" onClick={() => onLaunch('Join quiz flow opened')}>
              Join a Live Game
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
