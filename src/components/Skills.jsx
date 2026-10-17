import { SKILL_GROUPS } from '../data/skills.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

/** Three grouped skill cards, matching the previous portfolio's Skills block. */
export default function Skills() {
  return (
    <div className="pf-skills__grid">
      {SKILL_GROUPS.map((group, index) => (
        <Reveal
          key={group.id}
          delay={index * 80}
          className={`pf-skill-card${group.highlight ? ' pf-skill-card--ai' : ''}`}
        >
          <div className="pf-skill-card__head">
            <span className="pf-skill-card__icon">
              <Icon name={group.icon} />
            </span>
            <h3 className="pf-skill-card__title">{group.title}</h3>
          </div>
          <ul className="pf-chips">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
