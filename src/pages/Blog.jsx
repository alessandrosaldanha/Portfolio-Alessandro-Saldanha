import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../data/posts'

export default function Blog() {
  const [tag, setTag] = useState('Todas')

  const tags = useMemo(() => ['Todas', ...new Set(posts.flatMap((p) => p.tags))], [])

  const filtered = tag === 'Todas' ? posts : posts.filter((p) => p.tags.includes(tag))

  return (
    <main className="container" style={{ paddingBottom: 'clamp(64px, 10vw, 120px)' }}>
      <div className="page-header">
        <h1 className="page-title">Blog</h1>
        <p className="page-lede">Notas técnicas tiradas do que quebrou nos meus projetos.</p>
      </div>

      <div className="filter-row">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            className={'filter-chip' + (tag === t ? ' active' : '')}
            onClick={() => setTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="row-list">
        {filtered.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="row-item row-item-post">
            <span className="post-card-meta">
              {post.date} · {post.read}
            </span>
            <h2 className="post-card-title">{post.title}</h2>
            <p className="row-item-tagline">{post.excerpt}</p>
            <div className="chip-row" style={{ marginTop: 4, paddingTop: 0 }}>
              {post.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
