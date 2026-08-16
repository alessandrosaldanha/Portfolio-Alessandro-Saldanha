import { useState } from 'react'
import { socials } from '../data/social'

export default function Contato() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: integrar com um serviço real de envio (ex.: Resend, Formspree) quando o backend existir.
    setSent(true)
  }

  return (
    <main className="container" style={{ maxWidth: 1080, paddingTop: 'clamp(48px, 8vw, 96px)', paddingBottom: 'clamp(64px, 10vw, 120px)' }}>
      <h1 className="page-title">Contato</h1>
      <p className="page-lede" style={{ fontSize: 18, marginBottom: 48 }}>
        Freelance, CLT ou só uma dúvida técnica — pode chamar. Respondo em até um dia útil.
      </p>

      <div className="contato-grid">
        <form onSubmit={handleSubmit} className="contato-form">
          <label className="field">
            Nome
            <input type="text" required />
          </label>
          <label className="field">
            E-mail
            <input type="email" required />
          </label>
          <label className="field">
            Mensagem
            <textarea rows={6} required />
          </label>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {sent ? 'Mensagem enviada (demo)' : 'Enviar mensagem'}
          </button>
        </form>

        <div>
          <p className="contato-channels-label">Canais diretos</p>
          <div className="channels-list">
            {socials.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.aria} className="channel-link">
                <span className="channel-link-label">{s.label}</span>
                <span className="channel-link-hint">{s.hint}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
