import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import { joinTips } from '../content'

export function JoinGuidance() {
  return (
    <section className="join-guidance" aria-labelledby="join-guidance-title">
      <ScrollReveal variant="title">
        <div className="section-heading section-heading-tight">
          <span className="eyebrow">How it works</span>
          <h2 id="join-guidance-title">Fast join path, no clutter.</h2>
        </div>
      </ScrollReveal>

      <div className="join-guidance-grid">
        {joinTips.map((tip, index) => (
          <ScrollReveal key={tip.title} variant="card" delay={index * 0.05}>
            <article className="join-tip-card glass-card">
              <h3>{tip.title}</h3>
              <p>{tip.copy}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
