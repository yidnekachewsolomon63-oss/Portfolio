import { Link } from 'react-router-dom'
import { HERO, SITE } from '../data/site.js'
import Icon from './Icon.jsx'

const SOCIALS = [
  { href: SITE.github, label: 'GitHub profile', icon: 'github' },
  { href: SITE.linkedin, label: 'LinkedIn profile', icon: 'linkedin' },
  { href: `mailto:${SITE.email}`, label: 'Email', icon: 'envelope', external: false },
]

/** Decorative code panel that illustrates the RAG work described in the copy. */
function TerminalVisual() {
  return (
    <div className="pf-hero__visual">
      <div className="pf-terminal">
        <div className="pf-terminal__bar">
          <i className="r" />
          <i className="y" />
          <i className="g" />
          <span className="pf-terminal__name">semantic-search.js</span>
        </div>
        <pre className="pf-terminal__body" aria-hidden="true">{`// find meaning, not keywords
const q = await embedText(question);
const rows = await vectorStore.search({
  table: 'question_vectors',
  topK:  10,
  score: cosineSimilarity
});

// answer with your own documents (RAG)
const ctx = await rag.retrieve(q, userId);
return gemini.answer(q, ctx);`}</pre>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="pf-hero" id="home">
      <div className="pf-hero__bg" aria-hidden="true" />
      <div className="pf-wrap pf-hero__grid">
        <div className="pf-hero__content">
          <p className="pf-hero__eyebrow">
            <span className="pf-dot" aria-hidden="true" /> {HERO.eyebrow}
          </p>

          <h1 className="pf-hero__title">
            {HERO.titleBefore} <span className="pf-hero__accent">{HERO.titleAccent}</span>
            {HERO.titleAfter}
          </h1>

          <p className="pf-hero__lead">{HERO.lead}</p>

          <div className="pf-hero__actions">
            <Link className="pf-btn pf-btn--primary" to="/projects">
              View Projects <Icon name="arrow-right" />
            </Link>
            <a
              className="pf-btn pf-btn--ghost"
              href={SITE.resumeUrl}
              download={SITE.resumeFileName}
            >
              <Icon name="download" /> Download Resume
            </a>
            <a
              className="pf-btn pf-btn--ghost"
              href={SITE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume <Icon name="box-arrow-up-right" />
            </a>
          </div>

          <ul className="pf-hero__socials">
            {SOCIALS.map((social) => (
              <li key={social.icon}>
                <a
                  href={social.href}
                  {...(social.external === false ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={social.label}
                >
                  <Icon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <TerminalVisual />
      </div>
    </section>
  )
}
