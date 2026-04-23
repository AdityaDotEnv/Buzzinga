import { Icon } from '../../../components/ui/Icon'
import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import { features } from '../content'

export function FeaturesSection() {
  return (
    <section className="feature-section" aria-labelledby="feature-grid-title">
      <ScrollReveal variant="title">
        <div className="section-heading">
          <span className="eyebrow">Features</span>
          <h2 id="feature-grid-title">Everything the homepage needs to sell the game loop.</h2>
        </div>
      </ScrollReveal>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <ScrollReveal key={feature.title} variant="card" delay={index * 0.05}>
            <article className={`feature-card glass-card accent-${feature.accent}`}>
              <div className="feature-icon">
                <Icon name={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-hover-note">Hover for live demo energy</span>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
