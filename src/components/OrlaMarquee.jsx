import { useLayoutEffect, useRef, useState } from 'react'

// No token defines a marquee speed — these are hardcoded design choices, not pulled
// from tokens/*.css (see CLAUDE.md note about spacing.css/effects.css being empty).
// Speed is an absolute px/s, not scaled to viewport width, so the same value reads
// much faster on a narrow screen (a bigger fraction of the visible width crosses per
// second). Below NARROW_BREAKPOINT_PX (the same breakpoint site.css already uses for
// .marquee-label) it drops to NARROW_SPEED_PX_PER_SECOND to keep the perceived speed
// comparable to desktop.
const SPEED_PX_PER_SECOND = 70
const NARROW_SPEED_PX_PER_SECOND = 40
const NARROW_BREAKPOINT_PX = 640

// Renders a client logo recolored to the marquee's current text color, regardless
// of the source file's own colors — a plain <img> can't be recolored via CSS, so
// the visible pixels come from a CSS mask (mask-image, works for SVG/PNG/WebP alike)
// on a sibling span. The real <img> stays in the DOM (opacity: 0) purely so it keeps
// its native loading="lazy", its alt text, and its onError — if the file 404s or
// fails to decode, it falls back to the plain text wordmark, same as an entry with
// no logo at all.
function MarqueeLogo({ item }) {
  const [failed, setFailed] = useState(false)
  if (!item.logo || failed) {
    return <span className="marquee-item">{item.name}</span>
  }
  return (
    <span
      className="marquee-logo"
      style={{ '--marquee-logo-src': `url(${item.logo})`, height: item.logoHeight }}
    >
      <img
        src={item.logo}
        alt={item.name}
        loading="lazy"
        width={item.logoWidth}
        height={item.logoHeightPx}
        onError={() => setFailed(true)}
      />
    </span>
  )
}

function renderGroup(items, groupIndex, setGroupRef) {
  const isReal = groupIndex === 0
  return (
    <ul
      key={groupIndex}
      className="marquee-group"
      aria-hidden={isReal ? undefined : 'true'}
      ref={setGroupRef}
    >
      {items.map((p, i) => (
        <li key={p.name} className="marquee-item-wrap">
          <MarqueeLogo item={p} />
          {i < items.length - 1 && (
            <span className="marquee-sep" aria-hidden="true">
              ·
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function OrlaMarquee({ items }) {
  const maskRef = useRef(null)
  const firstGroupRef = useRef(null)
  const secondGroupRef = useRef(null)
  const [copies, setCopies] = useState(2)
  const [metrics, setMetrics] = useState(null)

  useLayoutEffect(() => {
    const mask = maskRef.current
    if (!mask) return

    const recalc = () => {
      const first = firstGroupRef.current
      const second = secondGroupRef.current
      if (!first || !second) return

      // Distance between the start of copy 0 and copy 1 is exactly one full
      // period (group width + the gap the track renders between groups) —
      // translating by this amount, not a guessed percentage, is what makes
      // the loop seam invisible regardless of how many words are in the list.
      const step = second.getBoundingClientRect().left - first.getBoundingClientRect().left
      if (!(step > 0)) return

      const containerWidth = mask.getBoundingClientRect().width
      const needed = Math.max(2, Math.ceil((containerWidth * 2) / step))
      const speed = containerWidth < NARROW_BREAKPOINT_PX ? NARROW_SPEED_PX_PER_SECOND : SPEED_PX_PER_SECOND

      setCopies(needed)
      setMetrics({ step, duration: step / speed })
    }

    recalc()

    const observer = new ResizeObserver(recalc)
    observer.observe(mask)
    return () => observer.disconnect()
  }, [items])

  const trackStyle = metrics
    ? { '--marquee-step': `${metrics.step}px`, animationDuration: `${metrics.duration}s` }
    : undefined

  return (
    <div className="marquee-mask" ref={maskRef}>
      <div className="marquee-track" data-marquee style={trackStyle}>
        {Array.from({ length: copies }, (_, groupIndex) =>
          renderGroup(items, groupIndex, (node) => {
            if (groupIndex === 0) firstGroupRef.current = node
            if (groupIndex === 1) secondGroupRef.current = node
          })
        )}
      </div>
    </div>
  )
}
