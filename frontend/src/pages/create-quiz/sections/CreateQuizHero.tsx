import { Icon } from '../../../components/ui/Icon'
import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import { creationModes } from '../content'
import type { CreationMode } from '../types'

type CreateQuizHeroProps = {
  selectedMode: CreationMode['id']
  onSelectMode: (mode: CreationMode['id']) => void
  onStartScratch: () => void
  onStartAi: () => void
  onGoHome: () => void
}

export function CreateQuizHero({ selectedMode, onSelectMode, onStartScratch, onStartAi, onGoHome }: CreateQuizHeroProps) {
  const activeMode = creationModes.find((mode) => mode.id === selectedMode) ?? creationModes[0]

  return (
    <section className="create-quiz-hero" id="overview">
      <div className="create-quiz-hero-copy">
        <ScrollReveal variant="title">
          <span className="eyebrow">Create quiz</span>
          <h1>Build a quiz faster than the clock starts.</h1>
        </ScrollReveal>

        <ScrollReveal variant="body">
          <p className="create-quiz-lead">
            Start from scratch or let AI draft the first version. Keep the energy high, the setup light, and the
            questions ready to play.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="body">
          <div className="create-quiz-hero-actions">
            <button className="primary-button primary-button-large" type="button" onClick={onStartScratch}>
              Create from scratch
            </button>
            <button className="secondary-button secondary-button-large" type="button" onClick={onStartAi}>
              Create with AI
            </button>
            <button className="ghost-button" type="button" onClick={onGoHome}>
              Back to home
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="body">
          <div className="create-quiz-hero-actions secondary-row">
            <a className="ghost-button" href="#">
              Browse templates
            </a>
            <a className="ghost-button" href="#">
              View examples
            </a>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="card">
        <div className="create-quiz-hero-visual glass-card">
          <div className={`hero-visual-banner ${activeMode.tone}`}>
            <span className="hero-visual-kicker">{activeMode.title}</span>
            <strong>{activeMode.copy}</strong>
          </div>

          <div className="hero-mode-strip">
            {creationModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`hero-mode-chip ${selectedMode === mode.id ? 'is-active' : ''}`}
                onClick={() => onSelectMode(mode.id)}
              >
                <Icon name={mode.icon} />
                <span>{mode.title}</span>
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
