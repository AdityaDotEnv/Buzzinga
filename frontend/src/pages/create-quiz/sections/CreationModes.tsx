import { Icon } from '../../../components/ui/Icon'
import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import { creationModes } from '../content'
import type { CreationMode } from '../types'

type CreationModesProps = {
  selectedMode: CreationMode['id']
  onSelectMode: (mode: CreationMode['id']) => void
}

export function CreationModes({ selectedMode, onSelectMode }: CreationModesProps) {
  return (
    <section className="create-quiz-section" id="scratch" aria-labelledby="creation-methods-title">
      <ScrollReveal variant="title">
        <div className="section-heading">
          <span className="eyebrow">Ways to start</span>
          <h2 id="creation-methods-title">Pick a creation path that matches your pace.</h2>
        </div>
      </ScrollReveal>

      <div className="create-mode-grid">
        {creationModes.map((mode, index) => (
          <ScrollReveal key={mode.id} variant="card" delay={index * 0.05}>
            <button
              type="button"
              className={`mode-card glass-card ${selectedMode === mode.id ? 'is-selected' : ''}`}
              onClick={() => onSelectMode(mode.id)}
            >
              <span className={`mode-icon ${mode.tone}`}>
                <Icon name={mode.icon} />
              </span>
              <strong>{mode.title}</strong>
              <p>{mode.copy}</p>
            </button>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
