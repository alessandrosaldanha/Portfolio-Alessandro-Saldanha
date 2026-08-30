import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="container page-header">
      <h1 className="page-title">Página não encontrada</h1>
      <p className="page-lede">
        <Link to="/">← voltar para o início</Link>
      </p>
    </main>
  )
}
