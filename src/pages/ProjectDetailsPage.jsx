import { Link, useParams } from 'react-router-dom'
import ProjectDetails from '../components/ProjectDetails.jsx'
import { getProject } from '../data/projects.js'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import useSectionScroll from '../hooks/useSectionScroll.js'
import NotFoundPage from './NotFoundPage.jsx'

/**
 * Detail route: /project/:slug (rendered as "#/project/:slug" by the hash
 * router, which keeps direct links and refreshes working on any static host).
 */
export default function ProjectDetailsPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  useDocumentMeta({
    title: project ? `${project.title} — Project` : 'Project not found',
    description: project ? project.summary : undefined,
  })
  useSectionScroll(null)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <>
      <ProjectDetails project={project} />

      <section className="pf-section pf-section--light">
        <div className="pf-wrap">
          <p>
            <Link className="pf-link" to="/projects">
              Back to all projects
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
