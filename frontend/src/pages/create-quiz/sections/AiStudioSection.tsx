import { Layout, FileText, Sliders, Rocket } from 'lucide-react'
import { promptChips, setupSteps } from '../content'
import styles from '../CreateQuizPage.module.css'

const IconMap = {
  Layout,
  FileText,
  Sliders,
  Rocket
}

type AiStudioSectionProps = {
  onGenerate: () => void
}

export function AiStudioSection({ onGenerate }: AiStudioSectionProps) {
  return (
    <section className={styles.createQuizSection} id="ai-studio" aria-labelledby="ai-studio-title">
      <div className="section-heading section-heading-tight">
        <span className="eyebrow">AI Studio</span>
        <h2 id="ai-studio-title">Describe the quiz. Let the draft appear.</h2>
      </div>

      <div className={styles.aiStudioGrid}>
        <article className={`${styles.aiStudioPanel} glass-card`}>
          <div className={styles.aiStudioPanelHead}>
            <span className="card-kicker">Prompt</span>
            <span className="timer-badge success">Draft ready</span>
          </div>

          <textarea
            rows={7}
            defaultValue="Create a high-energy quiz about space exploration for a class of 6th graders. Make it playful, fast, and easy to edit."
            aria-label="AI quiz prompt"
          />

          <div className={styles.createQuizChipRow}>
            {promptChips.map((chip) => (
              <button key={chip.label} type="button" className={styles.createQuizChip} title={chip.prompt}>
                {chip.label}
              </button>
            ))}
          </div>

          <button className="primary-button primary-button-large" type="button" onClick={onGenerate}>
            Generate quiz draft
          </button>
        </article>

        <article className={`${styles.aiStudioNotes} glass-card`}>
          <span className="card-kicker">What you get</span>
          <ul className={styles.aiStudioSteps}>
            {setupSteps.map((step) => {
              const StepIcon = IconMap[step.icon as keyof typeof IconMap]
              return (
                <li key={step.text} className="flex items-center gap-3">
                  <span className={styles.stepIconWrapper}>
                    <StepIcon size={18} />
                  </span>
                  {step.text}
                </li>
              )
            })}
          </ul>
          <p>
            Build your quiz your way, with a clear path from first question to final game.
          </p>
        </article>
      </div>
    </section>
  )
}
