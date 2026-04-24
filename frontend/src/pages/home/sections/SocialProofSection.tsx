import { socialStats } from '../content'

export function SocialProofSection() {
  return (
    <section className="social-proof-section">
      <div className="section-heading">
        <span className="eyebrow">Proof</span>
        <h2>Built for classrooms, communities, and competitive teams.</h2>
      </div>

      <div className="social-proof-grid">
        <div className="social-stats glass-card">
          {socialStats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        <div className="testimonial-card glass-card">
          <p>
            “We use Buzzinga to turn review sessions into a race. Students want to win the next round, which means
            they actually keep playing.”
          </p>
          <div className="testimonial-meta">
            <span className="avatar">T</span>
            <div>
              <strong>Priya, Teacher</strong>
              <span>High school social studies</span>
            </div>
          </div>
        </div>

        <div className="logo-wall glass-card" aria-label="Community logos">
          <span>Northstar Academy</span>
          <span>Orbit Labs</span>
          <span>Trivia Club</span>
          <span>Team Nova</span>
        </div>
      </div>
    </section>
  )
}
