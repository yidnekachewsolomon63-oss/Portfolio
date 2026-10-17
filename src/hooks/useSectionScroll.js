import { useEffect } from 'react'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Scroll management for the single-page home layout.
 *
 * With the hash router the in-page "#section" anchors cannot be used, so the
 * section id is part of the route instead (e.g. "#/skills"). Passing a null or
 * unknown section scrolls back to the top of the page, which is what the detail
 * and not-found routes need.
 */
export default function useSectionScroll(sectionId) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return undefined
    }

    const target = document.getElementById(sectionId)
    if (!target) return undefined

    const behavior = prefersReducedMotion() ? 'auto' : 'smooth'

    // Two frames so layout (and any lazy content) has settled before measuring.
    let inner = 0
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior, block: 'start' })
      })
    })

    return () => {
      window.cancelAnimationFrame(outer)
      window.cancelAnimationFrame(inner)
    }
  }, [sectionId])
}
