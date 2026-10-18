/**
 * Render smoke test.
 *
 * There is no browser available in this environment, so the React tree is
 * rendered to static markup with react-dom/server and the resulting HTML is
 * asserted against the requirements (project count, project order, verified
 * links, form wiring, accessibility hooks, no leaked "undefined" values).
 *
 * Run with: npm run verify
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import ContactForm from '../src/components/ContactForm.jsx'
import Footer from '../src/components/Footer.jsx'
import Navbar from '../src/components/Navbar.jsx'
import ProjectDetails from '../src/components/ProjectDetails.jsx'
import SkipLink from '../src/components/SkipLink.jsx'
import { RESUME_URL } from '../src/data/images.js'
import { PROJECTS } from '../src/data/projects.js'
import { SECTIONS, SITE } from '../src/data/site.js'
import HomePage from '../src/pages/HomePage.jsx'
import NotFoundPage from '../src/pages/NotFoundPage.jsx'

const results = []

function check(name, condition, detail = '') {
  results.push({ name, ok: Boolean(condition), detail })
}

function renderHome() {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={['/']}>
      <SkipLink />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/:section?" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </MemoryRouter>,
  )
}

function renderDetails(slug) {
  const project = PROJECTS.find((item) => item.slug === slug)
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[`/project/${slug}`]}>
      <main id="main">
        <ProjectDetails project={project} />
      </main>
    </MemoryRouter>,
  )
}

export function runChecks() {
  const home = renderHome()

  /* ---- project grid ---------------------------------------------------- */
  const cardTitles = [...home.matchAll(/class="pf-card__title"[^>]*><a[^>]*>([^<]+)<\/a>/g)].map(
    (match) => match[1],
  )
  check('home renders exactly 4 project cards', cardTitles.length === 4, `found ${cardTitles.length}`)

  const requiredOrder = [
    'AI-Powered Evangadi Forum',
    'ChatGPT Clone',
    'Netflix Clone',
    'Apple Clone',
  ]
  check(
    'projects render in the required order',
    JSON.stringify(cardTitles) === JSON.stringify(requiredOrder),
    cardTitles.join(' | '),
  )

  /* ---- links ----------------------------------------------------------- */
  const repoLinks = [
    'ai-powered-forum',
    'GptChatClone',
    'YidNetMovieBD',
    'AppleBootstrapProject',
  ]
  repoLinks.forEach((fragment) => {
    check(`home links to the ${fragment} repository`, home.includes(fragment))
  })

  check('forum live demo link is rendered', home.includes('https://evangadiforum.tsedetech.com/'))
  check('chatgpt live demo link is rendered', home.includes('https://yidnekachew-gpt-chat.vercel.app/'))
  check('netflix live demo link is rendered', home.includes('https://netclone.tsedetech.com/'))
  check('apple live demo link is rendered', home.includes('https://nigist.tsedetech.com/'))

  const pendingCount = (home.match(/Live demo pending/g) ?? []).length
  check(
    'no project shows "Live demo pending" now that every project has a demo',
    pendingCount === 0,
    `found ${pendingCount}`,
  )

  /* ---- sections -------------------------------------------------------- */
  SECTIONS.forEach((section) => {
    check(`home renders the #${section} section`, home.includes(`id="${section}"`))
  })
  check('home renders a single h1', (home.match(/<h1/g) ?? []).length === 1)

  /* ---- contact form ---------------------------------------------------- */
  const form = renderToStaticMarkup(
    <MemoryRouter>
      <ContactForm />
    </MemoryRouter>,
  )
  check(
    'form posts to the Formspree endpoint',
    form.includes('action="https://formspree.io/f/xvkzdrby"') && form.includes('method="POST"'),
  )
  ;['name="name"', 'name="email"', 'name="message"', 'name="_gotcha"', 'name="_subject"'].forEach(
    (needle) => check(`form keeps field ${needle}`, form.includes(needle)),
  )
  check('form has a polite status region', form.includes('role="status"') && form.includes('aria-live="polite"'))
  check('form fields have required and invalid hooks', form.includes('aria-invalid') || form.includes('required'))
  // React serialises the noValidate prop preserving its case; HTML attributes are
  // case-insensitive, so assert without regard to case.
  check('form uses noValidate so custom messages show', /novalidate/i.test(form))

  /* ---- shared chrome --------------------------------------------------- */
  check('skip link is rendered', home.includes('Skip to content'))
  /* ---- resume actions (Download + View) -------------------------------- */
  const anchors = home.match(/<a\b[^>]*>/g) ?? []
  const resumeAnchors = anchors.filter((tag) => tag.includes(RESUME_URL))
  check('resume asset resolves to a PDF', /\.pdf(\?|$)/.test(RESUME_URL), RESUME_URL)
  check('home renders the "Download Resume" action', home.includes('Download Resume'))
  check('home renders the "View Resume" action', home.includes('View Resume'))
  check(
    'every resume action points at the same PDF',
    resumeAnchors.length >= 2 && resumeAnchors.every((tag) => tag.includes(RESUME_URL)),
    `${resumeAnchors.length} anchors`,
  )

  const downloadAnchors = resumeAnchors.filter((tag) => /\bdownload=/.test(tag))
  const viewAnchors = resumeAnchors.filter((tag) => /\btarget="_blank"/.test(tag))
  check('a resume action requests a download', downloadAnchors.length >= 1)
  check(
    'the download action uses the resume file name',
    downloadAnchors.some((tag) => tag.includes(`download="${SITE.resumeFileName}"`)),
  )
  check('a resume action opens the PDF in a new tab', viewAnchors.length >= 1)
  check(
    'the new-tab resume action carries noopener noreferrer',
    viewAnchors.length >= 1 && viewAnchors.every((tag) => /rel="noopener noreferrer"/.test(tag)),
  )
  check(
    'the download and view resume actions are distinct',
    downloadAnchors.length >= 1 && viewAnchors.some((tag) => !/\bdownload=/.test(tag)),
  )
  check('footer renders nav links', home.includes('pf-footer__links'))

  /* ---- detail pages ---------------------------------------------------- */
  PROJECTS.forEach((project) => {
    const html = renderDetails(project.slug)
    check(`detail page renders for ${project.slug}`, html.includes(project.title))
    check(`detail page keeps the repo link for ${project.slug}`, html.includes(project.repo))
    if (project.live) {
      check(`detail page keeps the demo link for ${project.slug}`, html.includes(project.live))
    }
    if (project.disclaimer) {
      check(`detail page shows the disclaimer for ${project.slug}`, html.includes(project.disclaimer))
    }
  })

  const apple = renderDetails('apple')
  check('apple page shows the supplied screenshot', apple.includes('Apple Clone home page'))
  check(
    'apple page no longer shows the missing-screenshot placeholder',
    !apple.includes('No verified screenshot is available'),
  )
  check(
    'no project page falls back to the missing-screenshot placeholder',
    PROJECTS.every((project) => !renderDetails(project.slug).includes('No verified screenshot is available')),
  )
  check(
    'every project card renders a real thumbnail',
    PROJECTS.every((project) => Boolean(project.thumb)) &&
      !home.includes('Screenshot not available yet'),
  )

  const netflix = renderDetails('netflix')
  check('netflix page carries TMDB attribution', netflix.includes('not endorsed or certified by TMDB'))

  /* ---- guards ---------------------------------------------------------- */
  const notFound = renderToStaticMarkup(
    <MemoryRouter initialEntries={['/nope']}>
      <main id="main">
        <Routes>
          <Route path="/:section?" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </MemoryRouter>,
  )
  check('unknown route renders the 404 page', notFound.includes('Error 404'))

  const allHtml = [home, form, apple, netflix, notFound, ...PROJECTS.map((p) => renderDetails(p.slug))]
  const leaks = allHtml.filter((html) => /undefined|NaN|\[object Object\]/.test(html))
  check('no rendered output leaks undefined/NaN/[object Object]', leaks.length === 0)

  const badImgAlt = allHtml.filter((html) => /<img(?![^>]*\balt=)[^>]*>/.test(html))
  check('every rendered image has an alt attribute', badImgAlt.length === 0)

  // Any anchor that opens a new tab must carry a noopener rel, so the opened
  // page can never reach back through window.opener.
  const blankTargets = allHtml.flatMap((html) => html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? [])
  const unsafeTargets = blankTargets.filter((tag) => !/rel="noopener/.test(tag))
  check(
    'every target="_blank" link carries rel="noopener"',
    unsafeTargets.length === 0,
    `${blankTargets.length} checked`,
  )

  return results
}
