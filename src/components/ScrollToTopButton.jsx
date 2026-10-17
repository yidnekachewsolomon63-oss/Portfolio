import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

/**
 * Back-to-top button. Hidden until the page has been scrolled a little, and it
 * respects the reduced-motion preference when choosing the scroll behaviour.
 */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      className="pf-scrolltop"
      type="button"
      aria-label="Back to top"
      data-visible={visible ? 'true' : 'false'}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
    >
      <Icon name="arrow-up" />
    </button>
  )
}
