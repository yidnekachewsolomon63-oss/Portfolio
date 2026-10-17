import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import ProjectStatus from './ProjectStatus.jsx'

/**
 * One project card.
 *
 * The whole media block is a link to the detail page so keyboard and pointer
 * users get the same target. `order` is rendered as a small ordinal so the
 * required project order is visible on the card itself.
 */
export default function ProjectCard({ project }) {
  const detailsPath = `/project/${project.slug}`

  return (
    <article className={`pf-card${project.featured ? ' pf-card--featured' : ''}`}>
      <Link
        className={`pf-card__media${project.thumb ? '' : ' pf-card__media--placeholder'}`}
        to={detailsPath}
        aria-label={`View ${project.title} details`}
      >
        {project.flag ? (
          <span
            className={`pf-card__flag${project.flagTone === 'gold' ? ' pf-card__flag--gold' : ''}`}
          >
            {project.flag}
          </span>
        ) : null}

        {project.thumb ? (
          <img src={project.thumb} alt={project.thumbAlt} loading="lazy" decoding="async" />
        ) : (
          <span>
            <Icon name="image" /> Screenshot not available yet
          </span>
        )}
      </Link>

      <div className="pf-card__body">
        <p className="pf-card__kicker">
          <span className="pf-card__order" aria-hidden="true">
            {String(project.order).padStart(2, '0')}
          </span>{' '}
          {project.kicker}
        </p>

        <h3 className="pf-card__title">
          <Link to={detailsPath}>{project.title}</Link>
        </h3>

        <p className="pf-card__desc">{project.summary}</p>

        <ul className="pf-tags">
          {project.tags.map((tag) => (
            <li className="pf-tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>

        <div className="pf-card__actions">
          <Link className="pf-link" to={detailsPath}>
            View Details <Icon name="arrow-right" />
          </Link>
          {project.repo ? (
            <a className="pf-link pf-link--muted" href={project.repo} target="_blank" rel="noopener noreferrer">
              <Icon name="github" /> View Code
            </a>
          ) : (
            <span className="pf-link pf-link--muted">Source not public</span>
          )}
        </div>

        <ProjectStatus live={project.live} />
      </div>
    </article>
  )
}
