import { Link, useParams } from 'react-router-dom'
import { getProject, projectNeighbours } from '../data/projects'

export default function ProjetoDetalhe() {
  const { slug } = useParams()
  const p = getProject(slug)

  if (!p) {
    return (
      <main className="container page-header">
        <h1 className="page-title">Projeto não encontrado</h1>
        <p className="page-lede">
          <Link to="/projetos">← voltar para projetos</Link>
        </p>
      </main>
    )
  }

  const { prev, next } = projectNeighbours(slug)
  const hasDecisions = p.decisions.length > 0
  const hasFeatures = p.features.length > 0
  const hasChallenge = !!p.challenge
  const hasResults = p.results.length > 0
  const hasGallery = p.gallery.length > 0

  return (
    <main>
      <div className="container detail-back">
        <Link to="/projetos" className="back-link">
          ← projetos
        </Link>
      </div>

      <header className="container detail-header">
        <h1 className="detail-title">{p.name}</h1>
        <p className="detail-tagline">{p.tagline}</p>
        <div className="detail-badges">
          {p.badges.map((b) => (
            <span key={b} className="badge">
              {b}
            </span>
          ))}
        </div>
        <div className="detail-actions">
          {p.live && (
            <a href={p.liveHref} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">
              Ver ao vivo
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              Código
            </a>
          )}
        </div>
      </header>

      <div className="container detail-body">
        <aside className="overview-aside">
          {p.overview.map((o) => (
            <div key={o.label}>
              <p className="overview-label">{o.label}</p>
              <p className="overview-value">{o.value}</p>
            </div>
          ))}
        </aside>

        <div className="detail-sections">
          <section>
            <p className="detail-eyebrow">Contexto e problema</p>
            <p className="detail-text">{p.context}</p>
          </section>

          <section>
            <p className="detail-eyebrow">Meu papel</p>
            <p className="detail-text">{p.myRole}</p>
          </section>

          {hasDecisions && (
            <section>
              <p className="detail-eyebrow">Arquitetura e decisões técnicas</p>
              <div className="decisions-list">
                {p.decisions.map((d) => (
                  <article key={d.decision} className="decision-card">
                    <h3 className="decision-title">{d.decision}</h3>
                    <dl className="decision-body">
                      <div>
                        <dt>Alternativas</dt>
                        <dd>{d.alternatives}</dd>
                      </div>
                      <div>
                        <dt>Por quê</dt>
                        <dd>{d.why}</dd>
                      </div>
                      <div className="decision-tradeoff">
                        <dt>Trade-off aceito</dt>
                        <dd>{d.tradeoff}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          )}

          {hasFeatures && (
            <section>
              <p className="detail-eyebrow">{p.featuresLabel || 'Funcionalidades principais'}</p>
              <div className="features-list">
                {p.features.map((f) => (
                  <div key={f.title} className="feature-row">
                    <div>
                      <h3 className="feature-title">
                        {f.title}
                        {f.highlight && <span className="chip feature-highlight">{f.highlight}</span>}
                      </h3>
                      <p className="feature-body">{f.body}</p>
                    </div>
                    {f.href ? (
                      <a href={f.href} target="_blank" rel="noopener noreferrer" className="feature-shot-link">
                        Ver ao vivo →
                      </a>
                    ) : (
                      <div className="feature-shot">TODO: screenshot</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasChallenge && (
            <section>
              <p className="detail-eyebrow">Desafio técnico em destaque</p>
              <h3 className="challenge-title">{p.challenge.title}</h3>
              <div className="challenge-steps">
                {p.challenge.steps.map((s) => (
                  <div key={s.label} className="challenge-step">
                    <span className="challenge-step-label">{s.label}</span>
                    <p className="challenge-step-body">{s.body}</p>
                  </div>
                ))}
              </div>
              <pre className="code-block">{p.challenge.code}</pre>
            </section>
          )}

          {hasResults && (
            <section>
              <p className="detail-eyebrow">Resultados e aprendizados</p>
              <ul className="results-list">
                {p.results.map((r) => (
                  <li key={r}>
                    <span className="dot" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasGallery && (
            <section>
              <p className="detail-eyebrow">Galeria</p>
              <div className="gallery-grid">
                {p.gallery.map((g) => (
                  <button key={g} type="button" className="gallery-item">
                    {g}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <nav className="container detail-nav">
        <Link to={`/projetos/${prev.slug}`} className="detail-nav-link">
          <span className="detail-nav-eyebrow">← Projeto anterior</span>
          <span className="detail-nav-name">{prev.name}</span>
        </Link>
        <Link to={`/projetos/${next.slug}`} className="detail-nav-link next">
          <span className="detail-nav-eyebrow">Próximo projeto →</span>
          <span className="detail-nav-name">{next.name}</span>
        </Link>
      </nav>
    </main>
  )
}
