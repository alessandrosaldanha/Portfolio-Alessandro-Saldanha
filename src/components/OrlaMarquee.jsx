import { useLayoutEffect, useRef, useState } from 'react'

// No token defines a marquee speed — this is a hardcoded design choice, not pulled
// from tokens/*.css (see CLAUDE.md note about spacing.css/effects.css being empty).
const SPEED_PX_PER_SECOND = 70

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
          <span className="marquee-item">{p.name}</span>
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

      setCopies(needed)
      setMetrics({ step, duration: step / SPEED_PX_PER_SECOND })
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
