/**
 * Site-wide identity and copy.
 * Every value here was taken from the existing portfolio (index.html) or the
 * audited project data (assets/js/projects.js). Nothing is invented.
 */

import { RESUME_URL } from './images.js'

export const SITE = {
  name: 'Yidnekachew Solomon',
  legalName: 'Yidnekachew Solomon Haile',
  role: 'AI-Powered Full-Stack Developer',
  location: 'Addis Ababa, Ethiopia',
  email: 'solomonyidnekachew@gmail.com',
  github: 'https://github.com/yidnekachewsolomon63-oss',
  githubHandle: 'yidnekachewsolomon63-oss',
  linkedin: 'https://linkedin.com/in/yidnekachewsolomon',
  linkedinHandle: 'in/yidnekachewsolomon',
  resumeUrl: RESUME_URL,
  resumeFileName: 'Yidnekachew_Solomon_Resume.pdf',
}

/** In-page sections of the home page, in the order they appear. */
export const SECTIONS = ['projects', 'skills', 'about', 'contact']

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'projects', label: 'Projects', to: '/projects' },
  { id: 'skills', label: 'Skills', to: '/skills' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

export const HERO = {
  eyebrow: 'AI-Powered Full-Stack Developer',
  titleBefore: 'I build AI-powered web apps that turn raw data into',
  titleAccent: 'useful answers',
  titleAfter: '.',
  lead: "I'm Yidnekachew Solomon, a full-stack developer trained through Evangadi's AI-Powered Full-Stack program. I work across React, Node.js, Express and MySQL, and I integrate large language models and retrieval-augmented generation to ship applications people actually use.",
}

export const ABOUT = {
  title: 'Full-stack, with an AI focus.',
  paragraphs: [
    "I'm Yidnekachew Solomon, a developer based in Addis Ababa, Ethiopia. I build web applications end to end — designing the interface, modelling the data, writing the API, and integrating AI where it genuinely improves the product.",
    'My work centres on practical AI: semantic search, retrieval-augmented generation and assistants that help people get to the right answer faster. I care about clean, maintainable code and interfaces that feel effortless to use.',
  ],
  facts: [
    { icon: 'geo-alt', label: 'Addis Ababa, Ethiopia' },
    { icon: 'mortarboard', label: 'Evangadi — AI-Powered Full-Stack' },
    { icon: 'stars', label: 'Focus: AI-powered web apps' },
    { icon: 'briefcase', label: 'Open to opportunities' },
  ],
}

export const CONTACT = {
  title: "Let's build something.",
  subtitle:
    "I'm open to full-stack and AI application roles, collaborations and freelance work. Send a message below and I'll get back to you.",
  email: SITE.email,
  /** Formspree form id — unchanged from the previous implementation. */
  formspreeId: 'xvkzdrby',
  formspreeEndpoint: 'https://formspree.io/f/xvkzdrby',
}
