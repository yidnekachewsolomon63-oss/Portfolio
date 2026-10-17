import { useParams } from 'react-router-dom'
import About from '../components/About.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Hero from '../components/Hero.jsx'
import Icon from '../components/Icon.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Skills from '../components/Skills.jsx'
import { CONTACT, SECTIONS, SITE } from '../data/site.js'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import useSectionScroll from '../hooks/useSectionScroll.js'
import NotFoundPage from './NotFoundPage.jsx'

const CONTACT_LINKS = [
  { icon: 'envelope', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    value: SITE.linkedinHandle,
    href: SITE.linkedin,
    external: true,
  },
  {
    icon: 'github',
    label: 'GitHub',
    value: SITE.githubHandle,
    href: SITE.github,
    external: true,
  },
]

export default function HomePage() {
  const { section } = useParams()
  const isKnownSection = !section || SECTIONS.includes(section)

  useDocumentMeta()
  useSectionScroll(isKnownSection ? section : null)

  if (!isKnownSection) {
    return <NotFoundPage />
  }

  return (
    <>
      <Hero />

      <section className="pf-section pf-section--light" id="projects">
        <div className="pf-wrap">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects"
            subtitle="Four applications that show how I design, build and connect a full stack — from AI features to the interfaces people use."
          />
          <ProjectGrid />
        </div>
      </section>

      <section className="pf-section" id="skills">
        <div className="pf-wrap">
          <SectionHeading
            eyebrow="Toolkit"
            title="Skills"
            subtitle="The technologies I reach for when turning an idea into a working product."
          />
          <Skills />
        </div>
      </section>

      <section className="pf-section pf-section--light" id="about">
        <div className="pf-wrap">
          <About />
        </div>
      </section>

      <section className="pf-section" id="contact">
        <div className="pf-wrap">
          <SectionHeading eyebrow="Get in touch" title={CONTACT.title} subtitle={CONTACT.subtitle} />

          <div className="pf-contact__grid">
            <div className="pf-contact__aside">
              <p className="pf-contact__lead">Prefer email or a quick connect? Use any of these.</p>

              <div className="pf-contact__cards">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    className="pf-contact__card"
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon name={link.icon} />
                    <span>
                      <small>{link.label}</small>
                      <strong>{link.value}</strong>
                    </span>
                  </a>
                ))}
              </div>

              <div className="pf-resume-actions">
                <a
                  className="pf-btn pf-btn--outline"
                  href={SITE.resumeUrl}
                  download={SITE.resumeFileName}
                >
                  <Icon name="download" /> Download Resume
                </a>
                <a
                  className="pf-btn pf-btn--outline"
                  href={SITE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume <Icon name="box-arrow-up-right" />
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
