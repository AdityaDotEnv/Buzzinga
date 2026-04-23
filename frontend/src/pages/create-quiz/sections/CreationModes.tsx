import { Icon } from '../../../components/ui/Icon'
import { creationModes } from '../content'
import type { CreationMode } from '../types'

type CreationModesProps = {
  selectedMode: CreationMode['id']
  onSelectMode: (mode: CreationMode['id']) => void
}

export function CreationModes({ selectedMode, onSelectMode }: CreationModesProps) {
  return (
    <section className="create-quiz-section" id="scratch" aria-labelledby="creation-methods-title">
      <div className="section-heading">
        <span className="eyebrow">Ways to start</span>
        <h2 id="creation-methods-title">Pick a creation path that matches your pace.</h2>
      </div>

      <div className="create-mode-grid">
        {creationModes.map((mode) => (
          <button
            key={mode.id}
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
        ))}
      </div>
    </section>
  )
}
