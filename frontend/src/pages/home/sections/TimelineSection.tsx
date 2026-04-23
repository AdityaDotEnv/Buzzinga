import { Icon } from '../../../components/ui/Icon'
import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import { timeline } from '../content'

export function TimelineSection() {
  return (
    <section className="timeline-section" aria-labelledby="how-it-works-title">
      <ScrollReveal variant="title">
        <div className="section-heading">
          <span className="eyebrow">How it works</span>
          <h2 id="how-it-works-title">Create, host, and compete in one scroll.</h2>
        </div>
      </ScrollReveal>

      <div className="timeline">
        <div className="timeline-track" aria-hidden="true" />
        {timeline.map((step, index) => (
          <ScrollReveal key={step.title} variant="card" delay={index * 0.05}>
            <article className="timeline-step glass-card">
              <span className="timeline-index">0{index + 1}</span>
              <div className="timeline-icon">
                <Icon name={step.icon} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
