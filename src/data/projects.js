/**
 * Single source of truth for project content in the React app.
 *
 * Sources used to build this file:
 *   1. assets/js/projects.js  — the audited copy from the previous portfolio.
 *   2. static-original/index-redesigned.html — the previous Projects grid.
 *   3. Live verification run on 17 Oct 2026 (GitHub REST API + the deployed
 *      sites) to confirm links, visibility and demo availability.
 *
 * Corrections made against the older data file, each verified today:
 *   - ChatGPT Clone: the old data said "No public repo". The repository
 *     github.com/yidnekachewsolomon63-oss/GptChatClone is now public
 *     (API returned private=false), so it is linked and the flag is removed.
 *   - Netflix Clone: a live URL is now part of the record
 *     (https://netclone.tsedetech.com/, HTTP 200) and the required TMDB
 *     attribution is attached.
 *   - Apple Clone: this project was missing from the previous data file. It is
 *     added as project 4 using only facts read from its repository tree and its
 *     deployed page. Unknown fields are marked "TO CONFIRM" instead of guessed.
 *   - Forum and ChatGPT Clone: live demo URLs supplied by the owner
 *     (https://evangadiforum.tsedetech.com/ and
 *     https://yidnekachew-gpt-chat.vercel.app/) are now part of the record, so
 *     every project in this file has a live demo.
 *
 * Order is significant: projects are rendered in the order of this array.
 */

import { IMAGES } from './images.js'

export const PROJECTS = [
  /* 1 ─────────────────────────────────────────────────────────────────── */
  {
    slug: 'forum',
    order: 1,
    title: 'AI-Powered Evangadi Forum',
    kicker: 'Full-Stack · AI / RAG',
    flag: 'Flagship',
    flagTone: 'flag',
    featured: true,
    thumb: IMAGES.forumLanding,
    thumbAlt: 'AI-Powered Evangadi Forum landing page',
    summary:
      'A community Q&A forum where Gemini-powered semantic search, RAG over user PDFs and an AI draft coach help members ask sharper questions and find answers faster.',
    tags: ['Node.js', 'Express 5', 'MySQL', 'React 19', 'Google Gemini', 'RAG'],
    repo: 'https://github.com/yidnekachewsolomon63-oss/ai-powered-forum',
    live: 'https://evangadiforum.tsedetech.com/',
    lead: 'A full-stack community forum that layers semantic search and retrieval-augmented generation on top of a classic questions-and-answers workflow.',
    meta: [
      { k: 'Role', v: 'Full-stack developer' },
      { k: 'Stack', v: 'Express 5, MySQL, React 19, Google Gemini' },
      { k: 'Core idea', v: 'Semantic search + RAG over user documents' },
      { k: 'Status', v: 'Source on GitHub + live demo' },
    ],
    overview: [
      "Members register, sign in, ask questions, answer, and vote. Every question and answer is embedded with Google's Gemini embedding model and compared with cosine similarity, so the forum can surface related discussions and rank the most relevant replies instead of relying on keyword matching alone.",
      'Beyond Q&A, users can upload their own PDF documents. The backend extracts the text, splits it into overlapping chunks, embeds each chunk, and answers questions grounded in that material through a retrieval-augmented generation pipeline.',
    ],
    built: [
      'JWT authentication with bcrypt password hashing, role guards for user / admin / owner, and live account-status enforcement.',
      "Semantic question search and a 'similar questions' feature backed by an embeddings store and a custom cosine-similarity utility.",
      'AI answer ranking that blends a Gemini relevance score with community votes.',
      'An AI draft coach that reviews a question before posting, and an answer-fit assistant that checks how well an answer matches the question.',
      'A RAG pipeline for user PDFs: upload, text extraction, sentence-aware chunking, embedding, and cosine retrieval with an async worker that recovers interrupted documents.',
      'REST API with validation, notifications, admin moderation, and a health endpoint.',
    ],
    technical: [
      'Gemini text embeddings are written as batched `batchEmbedContents` and grouped into batches of up to 100 vectors; the client retries with backoff on rate-limit (429) responses.',
      'Chunking is sentence-aware at roughly 900 characters with 120 characters of overlap to preserve context across boundaries.',
      'Database tables include users, questions, answers, notifications and dedicated vector stores for question, answer and document chunks.',
      'The React 19 frontend uses React Router 7, axios and framer-motion, with Vitest and Testing Library covering components.',
    ],
    gallery: [
      { src: IMAGES.forumLanding, caption: 'Landing page' },
      { src: IMAGES.forumDashboard, caption: 'Dashboard' },
      { src: IMAGES.forumQuestion, caption: 'Question detail with AI-assisted answers' },
      { src: IMAGES.forumRag, caption: 'RAG documents workspace' },
      { src: IMAGES.forumAuth, caption: 'Authentication' },
    ],
    architecture: null,
    disclaimer: null,
  },

  /* 2 ─────────────────────────────────────────────────────────────────── */
  {
    slug: 'chatgpt',
    order: 2,
    title: 'ChatGPT Clone',
    kicker: 'Full-Stack · AI Assistant',
    flag: null,
    flagTone: null,
    featured: false,
    thumb: IMAGES.chatgptChat,
    thumbAlt: 'ChatGPT Clone chat interface',
    summary:
      'A ChatGPT-style chat interface: a React single-page app talking to an Express API that stores conversation history in MySQL and returns replies from Google Gemini.',
    tags: ['React 19', 'Node.js', 'Express 5', 'MySQL', 'Google Gemini'],
    repo: 'https://github.com/yidnekachewsolomon63-oss/GptChatClone',
    live: 'https://yidnekachew-gpt-chat.vercel.app/',
    lead: 'A conversational assistant that recreates the core ChatGPT experience end to end, from the chat UI down to stored conversation history and Gemini responses.',
    meta: [
      { k: 'Role', v: 'Full-stack developer' },
      { k: 'Stack', v: 'React 19, Express 5, MySQL, Google Gemini' },
      { k: 'Core idea', v: 'Stored multi-turn chat history' },
      { k: 'Repository', v: 'Available on GitHub' },
      { k: 'Status', v: 'Source on GitHub + live demo' },
    ],
    overview: [
      'The frontend is a React single-page app with a sidebar of conversations, a message thread, and a composer. It calls an Express backend through a small API client to load existing conversations and send new messages.',
      'The backend keeps each conversation in MySQL and calls Google Gemini for the reply. The most recent messages are sent to the model as context so the assistant can follow a multi-turn conversation, and a system prompt focuses it on programming help.',
    ],
    built: [
      'A componentised React UI: sidebar, chat header, message list and chat input, with markdown and syntax-highlighted code in replies.',
      'An Express service that reads and writes conversation history to MySQL.',
      'A Gemini integration with a system prompt scoped to a programming assistant and a rolling window of recent messages as context.',
      'Environment-based configuration for the database and the model key.',
    ],
    technical: [
      'Request flow: React client to Express route, controller, then service, which reads history from MySQL and calls Gemini before persisting the exchange.',
      'The last five messages are supplied as conversational context to keep replies coherent across turns.',
      'The repository is public on GitHub and the project is deployed; the live demo link points at the running app, with the repository as the fallback.',
    ],
    gallery: [{ src: IMAGES.chatgptChat, caption: 'Chat interface' }],
    architecture: {
      src: IMAGES.chatgptArchitecture,
      caption: 'Request flow: client to Express API, MySQL conversation history, and Gemini',
    },
    disclaimer: null,
  },

  /* 3 ─────────────────────────────────────────────────────────────────── */
  {
    slug: 'netflix',
    order: 3,
    title: 'Netflix Clone',
    kicker: 'Frontend · API Integration',
    flag: null,
    flagTone: null,
    featured: false,
    thumb: IMAGES.netflixHome,
    thumbAlt: 'Netflix Clone home page with hero banner and genre rows',
    summary:
      'A responsive Netflix-style streaming interface powered by the TMDB API — a featured hero banner plus genre rows with hover-preview movie cards.',
    tags: ['React 19', 'Vite', 'TMDB API', 'Swiper', 'React Router'],
    repo: 'https://github.com/yidnekachewsolomon63-oss/YidNetMovieBD',
    live: 'https://netclone.tsedetech.com/',
    lead: 'A media-browsing front end that recreates the Netflix layout and wires it to live movie data from TMDB.',
    meta: [
      { k: 'Role', v: 'Frontend developer' },
      { k: 'Stack', v: 'React 19, Vite, TMDB API, Swiper' },
      { k: 'Core idea', v: 'Data-driven streaming UI' },
      { k: 'Status', v: 'Source on GitHub + live demo' },
    ],
    overview: [
      'The app fetches movie data from the TMDB REST API and arranges it into the familiar Netflix layout: a large hero banner that features a random original title, followed by horizontally scrolling rows.',
      'Rows cover trending titles, Netflix originals, top rated, and several genres. Each title is rendered as a card that scales up on hover to reveal a preview, and the rows are powered by Swiper.',
    ],
    built: [
      'A hero banner that picks and displays a featured title from the fetched data.',
      'Reusable content rows for trending, originals, top rated and multiple genres.',
      'Hover-preview movie cards with poster artwork pulled from TMDB image paths.',
      'A responsive header with navigation and search affordances.',
      'Environment-based API key configuration so the TMDB credential is not committed.',
    ],
    technical: [
      'Data is requested from `api.themoviedb.org/3` using an axios instance, with the API key supplied through a Vite environment variable.',
      'The layout uses component composition: header, banner, content rows, movie card, slider and footer.',
      'The live demo was reachable when this portfolio was last verified; if it does not load, the GitHub repository is the fallback.',
    ],
    gallery: [{ src: IMAGES.netflixHome, caption: 'Home page with hero banner and genre rows' }],
    architecture: null,
    disclaimer:
      'This product uses the TMDB API but is not endorsed or certified by TMDB. This project is an independent educational clone and is not affiliated with Netflix, Inc.',
  },

  /* 4 ─────────────────────────────────────────────────────────────────── */
  {
    slug: 'apple',
    order: 4,
    title: 'Apple Clone',
    kicker: 'Frontend · Responsive Replica',
    flag: null,
    flagTone: null,
    featured: false,
    thumb: IMAGES.appleHome,
    thumbAlt: "Apple Clone home page, a responsive replica of Apple's website",
    summary:
      "A responsive replica of Apple's website built as a static HTML, CSS and Bootstrap front end, published live at nigist.tsedetech.com.",
    tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    repo: 'https://github.com/yidnekachewsolomon63-oss/AppleBootstrapProject',
    live: 'https://nigist.tsedetech.com/',
    lead: "A front-end rebuild of Apple's marketing pages: a responsive layout assembled with HTML, CSS and Bootstrap and delivered as a plain static site.",
    meta: [
      { k: 'Role', v: 'Frontend developer' },
      { k: 'Stack', v: 'HTML, CSS, Bootstrap, JavaScript' },
      { k: 'Type', v: 'Static site (no build step)' },
      { k: 'Status', v: 'Source on GitHub + live demo' },
    ],
    overview: [
      "This is a front-end study that recreates Apple's product marketing pages. The repository holds a single index.html together with three stylesheets and Bootstrap's JavaScript, with all artwork stored locally under images/.",
      "Verified from the repository: the page covers iPhone, iPad, Mac, Apple Watch, Apple TV, AirPods and Apple Card sections — their imagery ships in the project — and the deployed page describes itself as \"A responsive replica of Apple's website\".",
    ],
    built: [
      "A responsive layout built with HTML and CSS, using Bootstrap's stylesheet for the grid and component basics.",
      'Product sections for iPhone, iPad, Mac, Apple Watch, Apple TV, AirPods and Apple Card, using locally stored artwork and icons.',
      "Interactive behaviour comes from Bootstrap's bundled JavaScript — there is no custom framework and no build step.",
    ],
    technical: [
      'Repository tree: index.html, css/bootstrap.css, css/styles.css, css/styles1.css, js/bootstrap.js and images/.',
      "Live URL verified with an HTTP 200 response and the page title \"Apple Responsive Replica\".",
      'The screenshot shown is a capture of the deployed page, supplied by the owner.',
    ],
    gallery: [{ src: IMAGES.appleHome, caption: 'Apple Clone home page' }],
    architecture: null,
    disclaimer:
      'Apple is a trademark of Apple Inc. This project is an independent replica created for learning and is not affiliated with, sponsored by, or endorsed by Apple Inc.',
  },
]

/** Lookup map keyed by slug, so the router can resolve a project in O(1). */
export const PROJECTS_BY_SLUG = Object.fromEntries(PROJECTS.map((project) => [project.slug, project]))

export function getProject(slug) {
  return PROJECTS_BY_SLUG[slug] ?? null
}
