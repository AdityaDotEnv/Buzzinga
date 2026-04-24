import { joinTips } from '../content'

export function JoinGuidance() {
  return (
    <section className="join-guidance" aria-labelledby="join-guidance-title">
      <div className="section-heading section-heading-tight">
        <span className="eyebrow">How it works</span>
        <h2 id="join-guidance-title">Fast join path, no clutter.</h2>
      </div>

      <div className="join-guidance-grid">
        {joinTips.map((tip) => (
          <article key={tip.title} className="join-tip-card glass-card">
            <h3>{tip.title}</h3>
            <p>{tip.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
