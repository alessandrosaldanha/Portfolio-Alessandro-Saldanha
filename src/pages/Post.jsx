import { Link, useParams } from 'react-router-dom'
import { getPost } from '../data/posts'

export default function Post() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return (
      <main className="container page-header">
        <h1 className="page-title">Post não encontrado</h1>
        <p className="page-lede">
          <Link to="/blog">← voltar para o blog</Link>
        </p>
      </main>
    )
  }

  const toc = post.body
    .map((b, i) => ({ ...b, id: `h-${i}` }))
    .filter((b) => b.kind === 'heading')

  return (
    <main className="container" style={{ maxWidth: 1180, paddingBottom: 'clamp(64px, 10vw, 120px)' }}>
      <Link to="/blog" className="back-link">
        ← blog
      </Link>

      <div className="post-page-grid">
        <article className="post-article">
          <span className="post-meta">
            {post.date} · {post.read} · {post.tags.join(', ')}
          </span>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>

          <div className="post-share">
            <span>Compartilhar:</span>
            <a href="#" onClick={(e) => e.preventDefault()}>
              LinkedIn
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              WhatsApp
            </a>
          </div>

          <div className="post-body">
            {post.body.map((b, i) => {
              const id = `h-${i}`
              if (b.kind === 'heading') {
                return (
                  <h2 key={id} id={id} className="post-heading">
                    {b.text}
                  </h2>
                )
              }
              if (b.kind === 'code') {
                return (
                  <pre key={id} className="code-block">
                    {b.text}
                  </pre>
                )
              }
              if (b.kind === 'callout') {
                return (
                  <aside key={id} className="post-callout">
                    {b.text}
                  </aside>
                )
              }
              if (b.kind === 'todo') {
                return (
                  <p key={id} className="post-todo">
                    {b.text}
                  </p>
                )
              }
              return (
                <p key={id} className="post-paragraph">
                  {b.text}
                </p>
              )
            })}
          </div>
        </article>

        {toc.length > 0 && (
          <aside className="post-toc">
            <p className="post-toc-label">Nesta página</p>
            <ul className="post-toc-list">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </main>
  )
}
