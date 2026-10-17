import { ABOUT } from '../data/site.js'
import { IMAGES } from '../data/images.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

/** Portrait plus the short bio and quick facts kept from the previous site. */
export default function About() {
  return (
    <div className="pf-about__grid">
      <Reveal className="pf-about__photo">
        <img
          src={IMAGES.profileImg}
          alt="Portrait of Yidnekachew Solomon"
          loading="lazy"
          decoding="async"
        />
      </Reveal>

      <Reveal className="pf-about__body">
        <p className="pf-eyebrow">About</p>
        <h2 className="pf-title">{ABOUT.title}</h2>

        {ABOUT.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <ul className="pf-facts">
          {ABOUT.facts.map((fact) => (
            <li key={fact.label}>
              <Icon name={fact.icon} />
              <span>{fact.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
