import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function Projetos() {
  const [filter, setFilter] = useState('Todos')

  const filterKeys = useMemo(() => {
    const types = ['Todos', ...new Set(projects.map((p) => p.type))]
    const stacks = [...new Set(projects.flatMap((p) => p.stack))].slice(0, 6)
    return types.concat(stacks)
  }, [])

  const filtered =
    filter === 'Todos' ? projects : projects.filter((p) => p.type === filter || p.stack.includes(filter))

  return (
    <main className="container" style={{ paddingBottom: 'clamp(64px, 10vw, 120px)' }}>
      <div className="page-header">
        <h1 className="page-title">Projetos</h1>
        <p className="page-lede">
          Produtos próprios, freelances e entregas corporativas. Cada página descreve o escopo
          exato do que eu fiz.
        </p>
      </div>

      <div className="filter-row">
        {filterKeys.map((f) => (
          <button
            key={f}
            type="button"
            className={'filter-chip' + (filter === f ? ' active' : '')}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="row-list">
        {filtered.map((p) => (
          <Link key={p.slug} to={`/projetos/${p.slug}`} className="row-item">
            <div className="row-item-head">
              <h2 className="row-item-name">
                {p.name}
                {p.accessNote && <span className="chip access-note">🔒 {p.accessNote}</span>}
              </h2>
              <span className="row-item-badge">
                {p.role} · {p.badges[1].replace('Período: ', '')}
              </span>
            </div>
            <p className="row-item-tagline">{p.tagline}</p>
            <div className="row-item-stack">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
