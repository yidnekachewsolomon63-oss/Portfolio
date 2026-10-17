/**
 * Skip link.
 *
 * It has to be a button rather than an "#main" anchor: the hash router owns the
 * URL fragment, so a plain fragment link would be interpreted as a route change.
 */
export default function SkipLink() {
  const focusMain = () => {
    const main = document.getElementById('main')
    if (!main) return
    main.focus()
    main.scrollIntoView({ block: 'start' })
  }

  return (
    <button type="button" className="pf-skip-link" onClick={focusMain}>
      Skip to content
    </button>
  )
}
