/**
 * Shared section header: eyebrow, title and optional subtitle.
 * Keeps the heading level configurable so each page keeps a sane outline.
 */
export default function SectionHeading({ eyebrow, title, subtitle, id, as: Heading = 'h2', center = false }) {
  return (
    <div className={`pf-section__head${center ? ' pf-section__head--center' : ''}`}>
      {eyebrow ? <p className="pf-eyebrow">{eyebrow}</p> : null}
      <Heading className="pf-title" id={id}>
        {title}
      </Heading>
      {subtitle ? <p className="pf-subtitle">{subtitle}</p> : null}
    </div>
  )
}
