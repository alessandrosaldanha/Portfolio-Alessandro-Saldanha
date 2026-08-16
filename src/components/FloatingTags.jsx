const TAGS = [
  { slot: 'tl', emoji: '🎮', label: 'Gamer' },
  { slot: 'tr', emoji: '🎬', label: 'Edito meus vídeos' },
  { slot: 'bl', emoji: '🥊', label: 'Luta e corrida' },
  { slot: 'br', emoji: '🥤', label: 'Coca-Cola Lover', dark: true },
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
        </span>
      ))}
    </div>
  )
}
