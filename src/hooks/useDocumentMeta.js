import { useEffect } from 'react'
import { SITE } from '../data/site.js'

const DEFAULT_TITLE = `${SITE.name} — ${SITE.role}`
const DEFAULT_DESCRIPTION =
  'Portfolio of Yidnekachew Solomon, a full-stack developer building AI-powered web applications with React, Node.js, Express, MySQL and Google Gemini.'

function upsertMeta(attribute, key, content) {
  if (typeof document === 'undefined' || !content) return
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * Keeps the document title, description and Open Graph tags in sync with the
 * active route. Without this, every route would keep the home-page title.
 */
export default function useDocumentMeta({ title, description } = {}) {
  useEffect(() => {
    const nextTitle = title ? `${title} — ${SITE.name}` : DEFAULT_TITLE
    const nextDescription = description || DEFAULT_DESCRIPTION

    document.title = nextTitle
    upsertMeta('name', 'description', nextDescription)
    upsertMeta('property', 'og:title', nextTitle)
    upsertMeta('property', 'og:description', nextDescription)
  }, [title, description])
}
