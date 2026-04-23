import { templates } from '../content'

export function TemplateShelf() {
  return (
    <section className="create-quiz-section" aria-labelledby="template-shelf-title">
      <div className="section-heading">
        <span className="eyebrow">Templates</span>
        <h2 id="template-shelf-title">Kick off from a proven quiz shape.</h2>
      </div>

      <div className="template-grid">
        {templates.map((template) => (
          <article key={template.title} className="template-card glass-card">
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
        ))}
      </div>
    </section>
  )
}
