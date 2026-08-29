import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/blog', label: 'Blog' },
  { to: '/sobre', label: 'Sobre' },
]

// Mobile panel only — desktop nav keeps NAV_ITEMS as-is. On desktop the brand
// name in the header already links home, but that's not an obvious "go home"
// affordance on mobile, so the panel gets its own explicit first item.
// end: true is required just for this one: NavLink to="/" without `end`
// matches (and shows active on) every route, since every path starts with "/".
const MOBILE_NAV_ITEMS = [{ to: '/', label: 'Início', end: true }, ...NAV_ITEMS]

function getFocusable(container) {
  return Array.from(container.querySelectorAll('a[href], button:not([disabled])'))
}

export default function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const buttonRef = useRef(null)
  const panelRef = useRef(null)
  const wasOpenRef = useRef(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      panelRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      if (wasOpenRef.current) buttonRef.current?.focus()
    }
    wasOpenRef.current = menuOpen
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handlePanelKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      closeMenu()
      return
    }
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusables = getFocusable(panelRef.current)
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    // Fragment, not a single <header>: the mobile nav panel below must be a
    // SIBLING of <header>, not a descendant. .site-header has backdrop-filter,
    // which establishes a containing block for position:fixed descendants (same
    // spec category as transform/filter/perspective) — a fixed panel nested
    // inside it resolves inset:0 against the header's own ~72px box instead of
    // the viewport. See CLAUDE.md, "position: fixed e containing blocks".
    <Fragment>
      <header className="site-header">
        <div className="container site-header-inner">
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
            <Link to="/contato" className="btn btn-dark header-contact" style={{ height: 44, padding: '0 18px' }}>
              Contato
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMenuOpen((o) => !o)}
              ref={buttonRef}
            >
              <span className="nav-toggle-bars" aria-hidden="true" data-open={menuOpen || undefined}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-nav-panel"
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          ref={panelRef}
          tabIndex={-1}
          onClick={closeMenu}
          onKeyDown={handlePanelKeyDown}
        >
          <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
            <p className="mobile-nav-eyebrow">Navegação</p>
            <nav className="mobile-nav-links">
              {MOBILE_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => 'mobile-nav-link' + (isActive ? ' active' : '')}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <Link to="/contato" className="btn btn-primary mobile-nav-contact" onClick={closeMenu}>
              Contato
            </Link>
            <p className="mobile-nav-footer">Maceió · AL · remoto para o Brasil</p>
          </div>
        </div>
      )}
    </Fragment>
  )
}
