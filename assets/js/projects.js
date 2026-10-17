/* Single source of truth for project content.
   Every statement here was verified against the project source code and the
   GitHub repositories during the audit. No invented metrics, links, or demos. */

window.PF_PROJECTS = {
  forum: {
    slug: "forum",
    title: "AI-Powered Evangadi Forum",
    kicker: "Full-Stack \u00b7 AI / RAG",
    featured: true,
    flag: "Flagship",
    flagClass: "pf-card__flag--flag",
    thumb: "assets/img/projects/forum-landing.png",
    cardSummary:
      "A community Q&A forum where Gemini-powered semantic search, retrieval-augmented answers over user PDFs, and an AI draft coach help members ask sharper questions and find answers faster.",
    tags: ["Node.js", "Express 5", "MySQL", "React 19", "Google Gemini", "RAG", "JWT"],
    repo: "https://github.com/yidnekachewsolomon63-oss/ai-powered-forum",
    live: null,
    lead:
      "A full-stack community forum that layers semantic search and retrieval-augmented generation on top of a classic questions-and-answers workflow.",
    meta: [
      { k: "Role", v: "Full-stack developer" },
      { k: "Stack", v: "Express 5, MySQL, React 19, Google Gemini" },
      { k: "Core idea", v: "Semantic search + RAG over user documents" },
      { k: "Status", v: "Source available on GitHub" }
    ],
    overview: [
      "Members register, sign in, ask questions, answer, and vote. Every question and answer is embedded with Google's Gemini embedding model and compared with cosine similarity, so the forum can surface related discussions and rank the most relevant replies instead of relying on keyword matching alone.",
      "Beyond Q&A, users can upload their own PDF documents. The backend extracts the text, splits it into overlapping chunks, embeds each chunk, and answers questions grounded in that material through a retrieval-augmented generation pipeline."
    ],
    built: [
      "JWT authentication with bcrypt password hashing, role guards for user / admin / owner, and live account-status enforcement.",
      "Semantic question search and a 'similar questions' feature backed by an embeddings store and a custom cosine-similarity utility.",
      "AI answer ranking that blends a Gemini relevance score with community votes.",
      "An AI draft coach that reviews a question before posting, and an answer-fit assistant that checks how well an answer matches the question.",
      "A RAG pipeline for user PDFs: upload, text extraction, sentence-aware chunking, embedding, and cosine retrieval with an async worker that recovers interrupted documents.",
      "REST API with validation, notifications, admin moderation, and a health endpoint."
    ],
    technical: [
      "Gemini text embeddings are written as batched `batchEmbedContents` and grouped into batches of up to 100 vectors; the client retries with backoff on rate-limit (429) responses.",
      "Chunking is sentence-aware at roughly 900 characters with 120 characters of overlap to preserve context across boundaries.",
      "Database tables include users, questions, answers, notifications and dedicated vector stores for question, answer and document chunks.",
      "The React 19 frontend uses React Router 7, axios and framer-motion, with Vitest and Testing Library covering components."
    ],
    gallery: [
      { src: "assets/img/projects/forum-landing.png", caption: "Landing page" },
      { src: "assets/img/projects/forum-dashboard.png", caption: "Dashboard" },
      { src: "assets/img/projects/forum-question.png", caption: "Question detail with AI-assisted answers" },
      { src: "assets/img/projects/forum-rag.png", caption: "RAG documents workspace" },
      { src: "assets/img/projects/forum-auth.png", caption: "Authentication" }
    ],
    architecture: null
  },

  chatgpt: {
    slug: "chatgpt",
    title: "ChatGPT Clone",
    kicker: "Full-Stack \u00b7 AI Assistant",
    featured: false,
    flag: "No public repo",
    flagClass: "pf-card__flag--gold",
    thumb: "assets/img/projects/chatgpt-chat.png",
    cardSummary:
      "A ChatGPT-style chat interface: a React single-page app talking to an Express API that stores conversation history in MySQL and returns replies from Google Gemini.",
    tags: ["React 19", "Node.js", "Express 5", "MySQL", "Google Gemini"],
    repo: null,
    live: null,
    lead:
      "A conversational assistant that recreates the core ChatGPT experience end to end, from the chat UI down to stored conversation history and Gemini responses.",
    meta: [
      { k: "Role", v: "Full-stack developer" },
      { k: "Stack", v: "React 19, Express 5, MySQL, Google Gemini" },
      { k: "Core idea", v: "Stored multi-turn chat history" },
      { k: "Repository", v: "Not public" },
      { k: "Status", v: "Runs locally (frontend + backend)" }
    ],
    overview: [
      "The frontend is a React single-page app with a sidebar of conversations, a message thread, and a composer. It calls an Express backend through a small API client to load existing conversations and send new messages.",
      "The backend keeps each conversation in MySQL and calls Google Gemini for the reply. The most recent messages are sent to the model as context so the assistant can follow a multi-turn conversation, and a system prompt focuses it on programming help."
    ],
    built: [
      "A componentised React UI: sidebar, chat header, message list and chat input, with markdown and syntax-highlighted code in replies.",
      "An Express service that reads and writes conversation history to MySQL.",
      "A Gemini integration with a system prompt scoped to a programming assistant and a rolling window of recent messages as context.",
      "Environment-based configuration for the database and the model key."
    ],
    technical: [
      "Request flow: React client to Express route, controller, then service, which reads history from MySQL and calls Gemini before persisting the exchange.",
      "The last five messages are supplied as conversational context to keep replies coherent across turns.",
      "There is no public GitHub repository for this project, so no source link is shown here \u2014 the description reflects the verified local implementation."
    ],
    gallery: [
      { src: "assets/img/projects/chatgpt-chat.png", caption: "Chat interface" }
    ],
    architecture: {
      src: "assets/img/projects/chatgpt-architecture.jpg",
      caption: "Request flow: client to Express API, MySQL conversation history, and Gemini"
    }
  },

  netflix: {
    slug: "netflix",
    title: "Netflix Clone",
    kicker: "Frontend \u00b7 API Integration",
    featured: false,
    flag: null,
    flagClass: null,
    thumb: "assets/img/projects/netflix-home.jpg",
    cardSummary:
      "A responsive Netflix-style streaming interface powered by the TMDB API \u2014 a featured hero banner plus genre rows with hover-preview movie cards.",
    tags: ["React 19", "Vite", "TMDB API", "Swiper", "React Router"],
    repo: "https://github.com/yidnekachewsolomon63-oss/YidNetMovieBD",
    live: null,
    lead:
      "A media-browsing front end that recreates the Netflix layout and wires it to live movie data from TMDB.",
    meta: [
      { k: "Role", v: "Frontend developer" },
      { k: "Stack", v: "React 19, Vite, TMDB API, Swiper" },
      { k: "Core idea", v: "Data-driven streaming UI" },
      { k: "Status", v: "Source available on GitHub" }
    ],
    overview: [
      "The app fetches movie data from the TMDB REST API and arranges it into the familiar Netflix layout: a large hero banner that features a random original title, followed by horizontally scrolling rows.",
      "Rows cover trending titles, Netflix originals, top rated, and several genres. Each title is rendered as a card that scales up on hover to reveal a preview, and the rows are powered by Swiper."
    ],
    built: [
      "A hero banner that picks and displays a featured title from the fetched data.",
      "Reusable content rows for trending, originals, top rated and multiple genres.",
      "Hover-preview movie cards with poster artwork pulled from TMDB image paths.",
      "A responsive header with navigation and search affordances.",
      "Environment-based API key configuration so the TMDB credential is not committed."
    ],
    technical: [
      "Data is requested from `api.themoviedb.org/3` using an axios instance, with the API key supplied through a Vite environment variable.",
      "The layout uses component composition: header, banner, content rows, movie card, slider and footer.",
      "The project exposes its source on GitHub; there is no verified live deployment, so no demo link is shown."
    ],
    gallery: [
      { src: "assets/img/projects/netflix-home.jpg", caption: "Home page with hero banner and genre rows" }
    ],
    architecture: null
  }
};
