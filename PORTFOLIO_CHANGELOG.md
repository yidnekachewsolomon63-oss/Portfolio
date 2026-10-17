# Portfolio Changelog

Summary of the redesign of the `Yidnekachew-portfolio` static site. The goal was a
minimal, visual, evidence-based portfolio for Yidnekachew Solomon Haile featuring three
real projects, with every claim and screenshot verified.

## Added

- `assets/css/portfolio.css` — the portfolio design system. Centralised design tokens
  (colors, fonts, radii, shadows) and all components, using `pf-` prefixed class names so
  nothing collides with the existing template styles. Includes responsive breakpoints and a
  `prefers-reduced-motion` block.
- `assets/js/projects.js` — a single source of truth for the three projects (summary, tags,
  repository links, verified highlights, screenshots). Exposed as `window.PF_PROJECTS`.
- `assets/js/portfolio.js` — dependency-free behavior: mobile navigation, nav background on
  scroll, active-section highlighting, back-to-top, AOS reveal (auto-disabled for reduced
  motion), automatic footer year, and the data-driven project detail renderer.
- `assets/img/projects/` — genuine project imagery:
  - `forum-landing.png`, `forum-dashboard.png`, `forum-question.png`, `forum-rag.png`,
    `forum-auth.png` (real application screenshots from the forum project).
  - `chatgpt-chat.png`, `chatgpt-architecture.jpg` (the app UI captured from the running
    project, plus its architecture diagram).
  - `netflix-home.jpg` (captured from the running Netflix clone).
- `PORTFOLIO_AUDIT.md` — the pre-implementation audit of the existing site and the verified
  project evidence.
- `PORTFOLIO_CHANGELOG.md` — this file.

## Changed

- `index.html` — fully rewritten content and structure:
  - Sticky translucent navigation (Home, Projects, Skills, About, Contact + Resume),
    responsive with an accessible mobile toggle (`aria-expanded`, `aria-controls`).
  - Dark hero (`#111827`) with an ambient violet/cyan gradient, the headline, a short
    positioning statement, primary/secondary calls to action, social links, and a small
    terminal panel that illustrates the forum's semantic-search/RAG idea.
  - Light "Projects" section with three consistent cards (flagship first), each with a real
    screenshot, description, tech tags, "View Details" and — only where a real repository
    exists — "View Code".
  - Compact "Skills" section grouped into Frontend, Backend & Data, and AI Application.
  - Short "About" with portrait and concise facts (no lecturing / banking / academic content).
  - "Contact" with email, LinkedIn and GitHub cards plus a resume download — no fake form.
  - Minimal footer and a back-to-top button.
- `portfolio-details.html` — repurposed from the template placeholder into a single,
  data-driven project detail page that renders from `?id=forum|chatgpt|netflix`. It shows an
  overview, an optional architecture diagram, "What I built", "Technical notes", screenshots,
  a details sidebar and the correct repo link (or a note when none is public).
- Font loading switched to the non-blocking `preload` + `media="print"` pattern (with a
  `<noscript>` fallback) so the web fonts no longer block rendering or page scripts.
- Favicon replaced: the template's "B" icon is now a branded "Y" on a violet→cyan rounded
  tile. Added `assets/img/favicon.svg` (referenced first for crisp scaling) and regenerated
  `assets/img/favicon.png` (64×64) and `assets/img/apple-touch-icon.png` (180×180).

## Removed

- `service-details.html` and `starter-page.html` — unused placeholder template pages.
- All template placeholder copy from the main page: Lorem ipsum, "App 1"/"Product 1", fake
  services, fake pricing, and fake testimonials/stats.

## Preserved

- The existing static architecture (no build step, plain HTML/CSS/JS).
- `assets/css/main.css` and its CSS-variable system (still linked; the portfolio tokens also
  re-point the template accent so any remaining template surface stays on-brand).
- Bootstrap CSS/JS, Bootstrap Icons and AOS vendor assets.
- `assets/resume/Yidnekachew_Solomon_Resume.pdf` (linked for download).

## Content accuracy notes

- No live demo buttons are shown: the two known Netlify URLs for the Netflix clone return
  HTTP 404 and no other project has a verified deployment.
- The ChatGPT clone has no public repository, so it shows "View Code" nowhere and instead
  documents that the source is not public.
- Featured GitHub profile: `github.com/yidnekachewsolomon63-oss` (hosts the featured repos).
- All project descriptions were checked against the source code; no fabricated metrics,
  technologies, certifications or deployments were added.

## Files now unused (kept on disk, safe to delete)

These are no longer referenced by any page and can be removed to slim the repo:

- Template imagery: `assets/img/portfolio/app-*.jpg`, `books-*.jpg`, `branding-*.jpg`,
  `product-*.jpg`; `assets/img/testimonials/*`; `assets/img/hero-img.jpg`,
  `assets/img/hero-img1.jpg`, `assets/img/services.jpg`, `assets/img/stats-bg.jpg`,
  `assets/img/testimonials-bg.jpg`.
- `assets/js/main.js` (template behavior) and the template-only vendor libraries it used:
  `isotope-layout`, `swiper`, `typed.js`, `waypoints`, `purecounter`, `imagesloaded`,
  `glightbox`, `php-email-form`. They are no longer loaded, so they add no runtime cost.
- `forms/contact.php` (non-functional BootstrapMade Pro form handler).

## How to view / run

The site is plain static files — no install or build step.

Option A — open directly:
1. Open `index.html` in a browser (double-click, or right-click → Open with → browser).

Option B — local server (recommended, so the resume download and fonts behave like production):
1. From the project root run one of:
   - Python: `python -m http.server 8099`
   - Node (if installed): `npx serve .`
2. Visit `http://localhost:8099/`.

Project detail pages: `portfolio-details.html?id=forum`, `?id=chatgpt`, `?id=netflix`.

## Verification performed

- Served the site locally and loaded it in headless Chrome at desktop (1440px) and mobile
  (390px) widths.
- Confirmed: navigation links, three project cards, hero, all sections present; all project
  and detail images load; **zero console errors and zero uncaught exceptions**.
- Confirmed conditional detail-page behavior: forum and Netflix show the correct "View Code"
  repository link, the ChatGPT clone shows the no-public-repo note, and an unknown `id` shows
  a "Project not found" state.
- Confirmed every local file referenced by the HTML exists.
