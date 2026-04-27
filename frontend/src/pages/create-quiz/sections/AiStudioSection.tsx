import { promptChips, setupSteps } from '../content'

type AiStudioSectionProps = {
  onGenerate: () => void
}

export function AiStudioSection({ onGenerate }: AiStudioSectionProps) {
  return (
    <section className="create-quiz-section" id="ai-studio" aria-labelledby="ai-studio-title">
      <div className="section-heading section-heading-tight">
        <span className="eyebrow">AI Studio</span>
        <h2 id="ai-studio-title">Describe the quiz. Let the draft appear.</h2>
      </div>

      <div className="ai-studio-grid">
        <article className="ai-studio-panel glass-card">
          <div className="ai-studio-panel-head">
            <span className="card-kicker">Prompt</span>
            <span className="timer-badge success">Draft ready</span>
          </div>

          <textarea
            rows={7}
            defaultValue="Create a high-energy quiz about space exploration for a class of 6th graders. Make it playful, fast, and easy to edit."
            aria-label="AI quiz prompt"
          />

          <div className="create-quiz-chip-row">
            {promptChips.map((chip) => (
              <button key={chip.label} type="button" className="create-quiz-chip" title={chip.prompt}>
                {chip.label}
              </button>
            ))}
          </div>

          <button className="primary-button primary-button-large" type="button" onClick={onGenerate}>
            Generate quiz draft
          </button>
        </article>

        <article className="ai-studio-notes glass-card">
          <span className="card-kicker">What you get</span>
          <ul>
            {setupSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p>
            Build your quiz your way, with a clear path from first question to final game.
          </p>
        </article>
      </div>
    </section>
  )
}
