/**
 * Decorative icon wrapper around the bootstrap-icons font that already lives in
 * assets/vendor/bootstrap-icons. Keeping it in one place means every icon is
 * hidden from assistive tech and accessible names come from the surrounding
 * text (or an explicit aria-label on the interactive element).
 */
export default function Icon({ name, className = '', ...rest }) {
  return <i className={`bi bi-${name} pf-icon ${className}`.trim()} aria-hidden="true" {...rest} />
}
