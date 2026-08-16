const TAGS = [
  { slot: 'tl', emoji: '🎮', label: 'Gamer' },
  { slot: 'tr', emoji: '🎬', label: 'Edito meus vídeos' },
  { slot: 'ml', emoji: '🍥', label: 'Assistir animes' },
  { slot: 'mr', emoji: '✝️', label: 'Cristão' },
  { slot: 'bl', emoji: '🥊', label: 'Luta e corrida' },
  { slot: 'br', emoji: '🖥️', label: 'Monta e desmonta PC', dark: true },
]

const SPARKS = [
  { sx: '-18px', sy: '-16px' },
  { sx: '-7px', sy: '-22px' },
  { sx: '7px', sy: '-22px' },
  { sx: '18px', sy: '-16px' },
]

export default function FloatingTags({ children }) {
  return (
    <div className="floating-tags">
      {children}
      {TAGS.map((tag) => (
        <span
          key={tag.label}
          aria-hidden="true"
          className={`floating-tag floating-tag--${tag.slot}${
            tag.dark ? ' floating-tag--dark' : ''
          }`}
        >
          <span className="floating-tag__emoji">{tag.emoji}</span>
          {tag.label}
          {SPARKS.map((s, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="floating-tag__spark"
              style={{ '--sx': s.sx, '--sy': s.sy }}
            />
          ))}
        </span>
      ))}
    </div>
  )
}
