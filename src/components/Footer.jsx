import { Link } from 'react-router-dom'
import { NAV_ITEMS, SITE } from '../data/site.js'
import Icon from './Icon.jsx'

// Resolved once at module scope: reading the clock during render is impure.
const CURRENT_YEAR = new Date().getFullYear()

const SOCIALS = [
  { href: SITE.github, label: 'GitHub', icon: 'github' },
  { href: SITE.linkedin, label: 'LinkedIn', icon: 'linkedin' },
  { href: `mailto:${SITE.email}`, label: 'Email', icon: 'envelope', external: false },
]

export default function Footer() {
  return (
    <footer className="pf-footer">
      <div className="pf-wrap pf-footer__inner">
        <div>
          <p style={{ margin: 0 }}>
            © {CURRENT_YEAR} {SITE.name}. Built and maintained by me.
          </p>
          <nav aria-label="Footer">
            <ul className="pf-footer__links">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ul className="pf-footer__socials">
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
    </footer>
  )
}
