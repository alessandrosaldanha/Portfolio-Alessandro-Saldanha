import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/blog', label: 'Blog' },
  { to: '/sobre', label: 'Sobre' },
]

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-name">alessandro saldanha</span>
        <span className="brand-dot" />
      </Link>

      <nav className="nav-desktop">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle"
          aria-label="Alternar tema claro e escuro"
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? '☾' : '☀'}
        </button>
        <Link to="/contato" className="btn btn-dark" style={{ height: 44, padding: '0 18px' }}>
          Contato
        </Link>
      </div>
    </header>
  )
}
