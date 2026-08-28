import { Link } from 'react-router-dom'
import OrlaMarquee from '../components/OrlaMarquee'
import { orlaProjects } from '../data/companies'
import { featuredProjects } from '../data/projects'
import { posts } from '../data/posts'
import { stackGroups } from '../data/stack'

export default function Home() {
  const featured = featuredProjects()

  return (
    <main>
      <section className="container hero" data-rise>
        <p className="eyebrow">Maceió · AL · remoto para o Brasil</p>
        <h1 className="hero-title">Desenvolvedor full-stack. Do schema ao deploy.</h1>
        <p className="hero-lede">
          Construo SaaS com React, Next.js e PostgreSQL. Documento por que cada decisão foi
          tomada, incluindo as que deram trabalho. Três produtos próprios no ar: Maré de Estudos,
          Contabilidade Reformada e Gestão de Escalas. Disponível para freelance, PJ ou CLT, em
          Maceió ou remoto.
        </p>
        <div className="hero-actions">
          <Link to="/projetos" className="btn btn-primary">
            Ver projetos
          </Link>
        </div>
      </section>

      <section className="marquee-section" aria-labelledby="orla-projects-title">
        <h2 id="orla-projects-title" className="marquee-label">
          Projetos entregues durante minha passagem pela Orla.tech
        </h2>
        <OrlaMarquee items={orlaProjects} />
      </section>

      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">Projetos em destaque</h2>
          <Link to="/projetos" className="section-link">
            Todos os projetos →
          </Link>
        </div>
        <div className="projects-grid">
          {featured.map((p) => (
            <Link key={p.slug} to={`/projetos/${p.slug}`} className="project-card">
              <div className="project-card-thumb">
                {p.thumb && (
                  <img
                    className="project-card-thumb-img"
                    src={p.thumb.src}
                    alt={p.thumb.alt}
                    loading="lazy"
                    width={p.thumb.width}
                    height={p.thumb.height}
                  />
                )}
              </div>
              <div className="project-card-body">
                <span className="project-card-role">{p.role}</span>
                <h3 className="project-card-name">
                  {p.name}
                  {p.accessNote && <span className="chip access-note">🔒 {p.accessNote}</span>}
                </h3>
                <p className="project-card-tagline">{p.tagline}</p>
                <div className="chip-row">
                  {p.chips.map((chip) => (
                    <span key={chip} className="chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <h2 className="section-title" style={{ marginBottom: 44 }}>
          Stack
        </h2>
        <div className="stack-grid">
          {stackGroups.map((g) => (
            <div key={g.label} className="stack-col">
              <p className="stack-col-label">{g.label}</p>
              <ul className="stack-list">
                {g.items.map((it) => (
                  <li key={it}>
                    <span className="dot" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">Escrevendo</h2>
          <Link to="/blog" className="section-link">
            Todos os posts →
          </Link>
        </div>
        <div className="posts-grid">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="post-card">
              <span className="post-card-meta">
                {post.date} · {post.read}
              </span>
              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-card-excerpt">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-inner">
          <div>
            <h2 className="cta-title">Tem um produto para tirar do papel?</h2>
            <p className="cta-lede">Respondo em até um dia útil. Freelance ou CLT, Maceió ou remoto.</p>
          </div>
          <div>
            <Link to="/contato" className="btn btn-primary">
              Falar comigo
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
