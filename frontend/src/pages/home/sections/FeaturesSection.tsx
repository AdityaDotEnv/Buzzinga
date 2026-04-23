import { Icon } from '../../../components/ui/Icon'
import { features } from '../content'

export function FeaturesSection() {
  return (
    <section className="feature-section" aria-labelledby="feature-grid-title">
      <div className="section-heading">
        <span className="eyebrow">Features</span>
        <h2 id="feature-grid-title">Everything the homepage needs to sell the game loop.</h2>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <article key={feature.title} className={`feature-card glass-card accent-${feature.accent}`}>
            <div className="feature-icon">
              <Icon name={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <span className="feature-hover-note">Hover for live demo energy</span>
          </article>
        ))}
      </div>
    </section>
  )
}
