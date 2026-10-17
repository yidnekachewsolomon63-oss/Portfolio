import { PROJECTS } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import Reveal from './Reveal.jsx'

/**
 * Renders every project in the canonical order defined by src/data/projects.js
 * (forum, chatgpt, netflix, apple). No ordering logic lives in the view.
 */
export default function ProjectGrid() {
  return (
    <div className="pf-projects__grid">
      {PROJECTS.map((project, index) => (
        <Reveal key={project.slug} delay={index * 80}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  )
}
