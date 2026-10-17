import Icon from './Icon.jsx'

/**
 * Honest demo indicator.
 *
 * When a project has a verified live URL it renders a real link; otherwise it
 * renders a non-interactive pill that says the demo is still pending, so the
 * card never implies a deployment that does not exist.
 */
export default function ProjectStatus({ live, label = 'Live' }) {
  if (!live) {
    return (
      <span className="pf-status pf-status--pending">
        <Icon name="clock-history" /> Live demo pending
      </span>
    )
  }

  return (
    <span className="pf-status pf-status--live">
      <Icon name="broadcast" />
      <a href={live} target="_blank" rel="noopener noreferrer">
        {label} demo
      </a>
    </span>
  )
}
