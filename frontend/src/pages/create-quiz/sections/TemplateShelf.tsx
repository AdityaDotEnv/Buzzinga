import { ScrollReveal } from '../../../components/ui/ScrollReveal'
import { templates } from '../content'

export function TemplateShelf() {
  return (
    <section className="create-quiz-section" id="templates" aria-labelledby="template-shelf-title">
      <ScrollReveal variant="title">
        <div className="section-heading">
          <span className="eyebrow">Templates</span>
          <h2 id="template-shelf-title">Kick off from a proven quiz shape.</h2>
        </div>
      </ScrollReveal>

      <div className="template-grid">
        {templates.map((template, index) => (
          <ScrollReveal key={template.title} variant="card" delay={index * 0.05}>
            <article className="template-card glass-card">
              <div className={`template-art ${template.accent}`}>
                <span>{template.category}</span>
                <strong>{template.badge}</strong>
              </div>
              <div className="template-body">
                <h3>{template.title}</h3>
                <p>Fine-tuned for quick launches, strong pacing, and easy editing.</p>
                <a href="#" className="template-link">
                  Use template
                </a>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
