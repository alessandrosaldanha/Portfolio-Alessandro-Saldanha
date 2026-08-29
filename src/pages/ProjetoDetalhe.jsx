import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject, projectNeighbours } from '../data/projects'
import GalleryLightbox from '../components/GalleryLightbox'

export default function ProjetoDetalhe() {
  const { slug } = useParams()
  const p = getProject(slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const lightboxTriggerRef = useRef(null)
  const [featureLightboxIndex, setFeatureLightboxIndex] = useState(null)
  const featureLightboxTriggerRef = useRef(null)

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
  const galleryImages = p.gallery.filter((g) => typeof g !== 'string')
  const featureImages = p.features.filter((f) => f.image).map((f) => f.image)

  const openLightbox = (image, event) => {
    lightboxTriggerRef.current = event.currentTarget
    setLightboxIndex(galleryImages.indexOf(image))
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    lightboxTriggerRef.current?.focus()
  }

  // Separate lightbox instance/state from the gallery's: its own image set
  // (feature screenshots only) and its own index, so opening one never
  // touches the other's position or count.
  const openFeatureLightbox = (image, event) => {
    featureLightboxTriggerRef.current = event.currentTarget
    setFeatureLightboxIndex(featureImages.indexOf(image))
  }

  const closeFeatureLightbox = () => {
    setFeatureLightboxIndex(null)
    featureLightboxTriggerRef.current?.focus()
  }

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
          {p.accessNote && <span className="chip access-note">🔒 {p.accessNote}</span>}
        </div>
      </header>

      {p.coverImage && (
        <div className="container">
          {/* aspect-ratio inline, not a fixed class value: each project's cover
              has its own real ratio (near-square, tall, wide...), and putting
              it on this wrapper instead of the <img> itself sidesteps the
              Chromium bug where an <img> with HTML width/height attributes
              miscomputes `height: auto` — confirmed live: height came out at
              the max-height cap (520px) regardless of the image's real ratio
              when aspect-ratio/height:auto lived on the <img>, and correctly
              at width/ratio once moved to a plain-block wrapper. See
              CLAUDE.md. */}
          <div
            className="detail-cover-wrap"
            style={{ aspectRatio: `${p.coverImage.width} / ${p.coverImage.height}` }}
          >
            <img
              className="detail-cover"
              src={p.coverImage.src}
              alt={p.coverImage.alt}
              loading="lazy"
              width={p.coverImage.width}
              height={p.coverImage.height}
            />
          </div>
        </div>
      )}

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
                    {f.image ? (
                      <div className="feature-shot-wrap">
                        <button
                          type="button"
                          className="feature-shot feature-shot-btn"
                          onClick={(e) => openFeatureLightbox(f.image, e)}
                        >
                          <img
                            className="feature-shot-img"
                            src={f.image.src}
                            alt={f.image.alt}
                            loading="lazy"
                            width={f.image.width}
                            height={f.image.height}
                          />
                        </button>
                        {f.href && (
                          <a href={f.href} target="_blank" rel="noopener noreferrer" className="feature-shot-live-link">
                            Ver ao vivo →
                          </a>
                        )}
                      </div>
                    ) : f.href ? (
                      <a href={f.href} target="_blank" rel="noopener noreferrer" className="feature-shot-link">
                        Ver ao vivo →
                      </a>
                    ) : (
                      <div className="feature-shot" />
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
                {p.gallery.map((g) =>
                  typeof g === 'string' ? (
                    <button key={g} type="button" className="gallery-item">
                      {g}
                    </button>
                  ) : (
                    <button
                      key={g.alt}
                      type="button"
                      className="gallery-item gallery-item-img"
                      onClick={(e) => openLightbox(g, e)}
                    >
                      <img src={g.src} alt={g.alt} loading="lazy" width={g.width} height={g.height} />
                    </button>
                  )
                )}
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

      {lightboxIndex !== null && (
        <GalleryLightbox images={galleryImages} startIndex={lightboxIndex} onClose={closeLightbox} />
      )}
      {featureLightboxIndex !== null && (
        <GalleryLightbox images={featureImages} startIndex={featureLightboxIndex} onClose={closeFeatureLightbox} />
      )}
    </main>
  )
}
