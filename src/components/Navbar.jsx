import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS, SITE } from '../data/site.js'
import Icon from './Icon.jsx'

/**
 * Sticky site header.
 *
 * The disclosure panel replaces the Bootstrap collapse used before, so the app
 * no longer needs Bootstrap's JavaScript bundle. It closes on navigation,
 * on Escape and when the viewport grows past the mobile breakpoint.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleRef = useRef(null)

  // No effect closes the panel on navigation: the link's own click handler is
  // the event that causes the change, so the state is updated there instead.
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    const media = window.matchMedia('(min-width: 901px)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onChange)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onChange)
    }
  }, [open])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const closePanel = () => setOpen(false)

  return (
    <header className="pf-nav">
      <div className="pf-wrap pf-nav__inner">
        <Link className="pf-brand" to="/" aria-label={`${SITE.name} — home`} onClick={closePanel}>
          <span className="pf-brand__mark">YS</span>
          <span className="pf-brand__name">
            Yidnekachew <span>Solomon</span>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="pf-nav__links" id="navLinks" data-open={open ? 'true' : 'false'}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  className="pf-nav__link"
                  to={item.to}
                  onClick={closePanel}
                  aria-current={isActive(item.to) ? 'true' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pf-nav__actions">
          <a
            className="pf-btn pf-btn--ghost pf-hidden-sm"
            href={SITE.resumeUrl}
            download={SITE.resumeFileName}
          >
            <Icon name="download" /> Resume
          </a>
          <button
            ref={toggleRef}
            className="pf-nav__toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-controls="navLinks"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'x-lg' : 'list'} />
          </button>
        </div>
      </div>
    </header>
  )
}
