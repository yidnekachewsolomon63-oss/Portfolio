import { useEffect, useRef, useState } from 'react'

/**
 * Decide the initial visibility without an effect, so no state is written
 * during the first render pass. Without an observer (or when the user asked for
 * reduced motion) the content starts visible and never animates.
 */
function shouldStartVisible() {
  if (typeof window === 'undefined') return false
  if (typeof IntersectionObserver === 'undefined') return true
  if (typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Reveal-on-scroll wrapper.
 *
 * Replaces the AOS library used by the static site with a single
 * IntersectionObserver per element.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(shouldStartVisible)

  useEffect(() => {
    if (visible) return undefined

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      className={`pf-reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
