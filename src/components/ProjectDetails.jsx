import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import ProjectStatus from './ProjectStatus.jsx'

/**
 * Full project presentation used by the detail route.
 *
 * Every block is optional: a project without a gallery renders a clearly
 * labelled placeholder instead of an empty grid, and a project without a
 * verified demo shows the "pending" status rather than a dead link.
 */
export default function ProjectDetails({ project }) {
  return (
    <>
      <section className="pf-section pf-section--dark pf-dark-surface">
        <div className="pf-wrap">
          <p className="pf-detail__back">
            <Link className="pf-link" to="/projects">
              <Icon name="arrow-left" /> All projects
            </Link>
          </p>

          <div className="pf-detail__head">
            <div>
              <p className="pf-eyebrow">{project.kicker}</p>
              <h1 className="pf-hero__title">{project.title}</h1>
              <p className="pf-detail__lead">{project.lead}</p>

              <div className="pf-hero__actions">
                {project.live ? (
                  <a className="pf-btn pf-btn--primary" href={project.live} target="_blank" rel="noopener noreferrer">
                    <Icon name="box-arrow-up-right" /> Visit live site
                  </a>
                ) : null}
                {project.repo ? (
                  <a className="pf-btn pf-btn--ghost" href={project.repo} target="_blank" rel="noopener noreferrer">
                    <Icon name="github" /> View source
                  </a>
                ) : null}
              </div>

              <ProjectStatus live={project.live} />
            </div>

            {project.thumb ? (
              <div>
                <img
                  src={project.thumb}
                  alt={project.thumbAlt}
                  className="pf-detail__shot"
                  decoding="async"
                />
              </div>
            ) : null}
          </div>

          <ul className="pf-detail__meta">
            {project.meta.map((item) => (
              <li key={item.k}>
                <span className="pf-meta__k">{item.k}</span>
                <span className="pf-meta__v">{item.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pf-section">
        <div className="pf-wrap pf-detail__body">
          <div>
            <h2 className="pf-title">Overview</h2>
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <h2 className="pf-title pf-detail__subhead">What it does</h2>
            <ul className="pf-built">
              {project.built.map((item) => (
                <li key={item}>
                  <Icon name="check-circle" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="pf-detail__aside">
            <div className="pf-panel">
              <h2 className="pf-panel__title">Technical notes</h2>
              <ul className="pf-built">
                {project.technical.map((item) => (
                  <li key={item}>
                    <Icon name="dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pf-panel">
              <h2 className="pf-panel__title">Stack</h2>
              <ul className="pf-chips">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <p className="pf-note">
                {project.repo ? (
                  <>
                    Source: <a href={project.repo} target="_blank" rel="noopener noreferrer">GitHub repository</a>
                  </>
                ) : (
                  'Source: not public'
                )}
                {project.live ? (
                  <>
                    {' · '}
                    Live: <a href={project.live} target="_blank" rel="noopener noreferrer">open demo</a>
                  </>
                ) : (
                  ' · Live demo pending'
                )}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="pf-section pf-section--light">
        <div className="pf-wrap">
          <h2 className="pf-title">Screens &amp; diagrams</h2>

          {project.gallery.length > 0 ? (
            <ul className="pf-gallery">
              {project.gallery.map((shot) => (
                <li key={shot.caption}>
                  <figure>
                    <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" />
                    <figcaption>{shot.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pf-placeholder">
              <Icon name="image" /> No verified screenshot is available for this project yet. A real
              capture still needs to be supplied before one can be published here.
            </p>
          )}

          {project.architecture ? (
            <figure className="pf-gallery pf-gallery--single">
              <div className="pf-panel">
                <img
                  src={project.architecture.src}
                  alt={project.architecture.caption}
                  loading="lazy"
                  decoding="async"
                  className="pf-detail__shot"
                />
              </div>
              <figcaption>{project.architecture.caption}</figcaption>
            </figure>
          ) : null}

          {project.disclaimer ? <p className="pf-note">{project.disclaimer}</p> : null}
        </div>
      </section>
    </>
  )
}
