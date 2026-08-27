import { useCallback, useEffect, useRef, useState } from 'react'

// Accessible dialog for browsing a project's gallery images without leaving the
// page. images must already be the filtered, src-having subset of p.gallery —
// this component has no opinion about the text-only placeholder items.
export default function GalleryLightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  // Esc to close, arrow keys to navigate.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        goPrev()
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        goNext()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, goPrev, goNext, images.length])

  // Lock body scroll while open.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Move focus into the dialog on open.
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Focus trap: Tab/Shift+Tab cycle only through this dialog's focusable elements.
  useEffect(() => {
    const node = dialogRef.current
    if (!node) return
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const focusables = node.querySelectorAll('button')
      if (focusables.length === 0) return
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
    node.addEventListener('keydown', onKeyDown)
    return () => node.removeEventListener('keydown', onKeyDown)
  }, [])

  const current = images[index]

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Imagem ampliada: ${current.alt}`}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeButtonRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        {images.length > 1 && (
          <button type="button" className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Imagem anterior">
            ‹
          </button>
        )}

        <figure className="lightbox-figure">
          <img key={current.src} src={current.src} alt={current.alt} width={current.width} height={current.height} />
          <figcaption className="lightbox-caption">{current.alt}</figcaption>
        </figure>

        {images.length > 1 && (
          <button type="button" className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Próxima imagem">
            ›
          </button>
        )}

        {images.length > 1 && (
          <p className="lightbox-position" aria-hidden="true">
            {index + 1}/{images.length}
          </p>
        )}
      </div>
    </div>
  )
}
