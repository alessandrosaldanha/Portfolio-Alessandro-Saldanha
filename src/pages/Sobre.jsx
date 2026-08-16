import { timeline } from '../data/timeline'
import { allStack } from '../data/stack'
import perfilAlessandro from '../assets/perfil-alessandro.jpeg'
import FloatingTags from '../components/FloatingTags'

export default function Sobre() {
  return (
    <main className="container" style={{ maxWidth: 1080, paddingTop: 'clamp(48px, 8vw, 96px)', paddingBottom: 'clamp(64px, 10vw, 120px)' }}>
      <div className="sobre-grid">
        <div>
          <h1 className="sobre-heading">Alessandro Saldanha</h1>
          <p className="detail-text" style={{ marginTop: 24 }}>
            Sou desenvolvedor em Maceió. Comecei como estagiário de desenvolvimento na Orla.tech e
            hoje atuo como desenvolvedor júnior, implementando features em produtos de clientes
            como ANBIMA, RD Group e Conviva Hotelaria.
          </p>
          <p className="detail-text" style={{ marginTop: 18 }}>
            Fora do expediente mantenho dois SaaS próprios no ar — um de gestão financeira para
            igrejas e outro de escalas de ministérios. É neles que eu erro à vontade: modelagem
            multi-tenant, RLS, refatoração de estado, e-mail transacional. O que aprendo ali
            costuma virar post.
          </p>
        </div>
        <div className="sobre-photo">
          <FloatingTags>
            <img src={perfilAlessandro} alt="Alessandro Saldanha" />
          </FloatingTags>
        </div>
      </div>

      <section className="sobre-section">
        <h2 className="sobre-section-title">Trajetória</h2>
        <div className="row-list">
          {timeline.map((t) => (
            <div key={t.role + t.period} className="timeline-row">
              <div>
                <p className="timeline-period">{t.period}</p>
                <p className="timeline-role">{t.role}</p>
                <p className="timeline-org">{t.org}</p>
              </div>
              <p className="timeline-body">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sobre-section">
        <h2 className="sobre-section-title">Ferramentas do dia a dia</h2>
        <div className="tool-pill-row">
          {allStack.map((s) => (
            <span key={s} className="tool-pill">
              {s}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
