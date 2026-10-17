/**
 * Skill groups.
 * Lifted verbatim from the previous portfolio's Skills section so the React app
 * and the static site describe the same toolkit.
 */

export const SKILL_GROUPS = [
  {
    id: 'frontend',
    icon: 'window',
    title: 'Frontend',
    items: ['React 19', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Vite', 'React Router', 'Responsive UI'],
  },
  {
    id: 'backend',
    icon: 'hdd-stack',
    title: 'Backend & Data',
    items: ['Node.js', 'Express 5', 'MySQL', 'REST APIs', 'JWT auth', 'bcrypt', 'Git & GitHub'],
  },
  {
    id: 'ai',
    icon: 'cpu',
    title: 'AI Application',
    highlight: true,
    items: [
      'Google Gemini API',
      'Text embeddings',
      'Semantic search',
      'RAG pipelines',
      'Prompt design',
      'Cosine similarity',
    ],
  },
]
