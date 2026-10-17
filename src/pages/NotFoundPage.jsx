import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'

/** Shown for unknown routes and unknown project slugs. */
export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page not found',
    description: 'The page you were looking for does not exist on this portfolio.',
  })

  return (
    <section className="pf-section pf-notfound">
      <div className="pf-wrap">
        <p className="pf-eyebrow">Error 404</p>
        <h1 className="pf-title">This page could not be found.</h1>
        <p className="pf-subtitle" style={{ margin: '0 auto 2rem' }}>
          The link may be out of date, or the project you were looking for is no longer listed.
        </p>
        <p>
          <Link className="pf-btn pf-btn--primary" to="/">
            Back to the home page
          </Link>
        </p>
      </div>
    </section>
  )
}
