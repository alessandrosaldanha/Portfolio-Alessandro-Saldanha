import { socials } from '../data/social'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">alessandro saldanha</p>
          <p className="footer-location">Maceió, AL · desenvolvedor full-stack</p>
        </div>
        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.aria}
              title={s.label}
              className="social-icon"
            >
              {s.short}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
