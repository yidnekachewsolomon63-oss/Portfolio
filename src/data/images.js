/**
 * Asset imports for the React app.
 *
 * Everything is imported from the repo's existing `assets/` folder (exposed as
 * `@assets` in vite.config.js) so images, the résumé and the icon font are
 * stored exactly once and get content-hashed by Vite at build time.
 */

import forumLanding from '@assets/img/projects/forum-landing.png'
import forumDashboard from '@assets/img/projects/forum-dashboard.png'
import forumQuestion from '@assets/img/projects/forum-question.png'
import forumRag from '@assets/img/projects/forum-rag.png'
import forumAuth from '@assets/img/projects/forum-auth.png'
import chatgptChat from '@assets/img/projects/chatgpt-chat.png'
import chatgptArchitecture from '@assets/img/projects/chatgpt-architecture.jpg'
import netflixHome from '@assets/img/projects/netflix-home.jpg'
import appleHome from '@assets/img/projects/apple-home.png'
import profileImg from '@assets/img/profile-img.jpeg'
import resumePdf from '@assets/resume/Yidnekachew_Solomon_Resume.pdf'

export const IMAGES = {
  forumLanding,
  forumDashboard,
  forumQuestion,
  forumRag,
  forumAuth,
  chatgptChat,
  chatgptArchitecture,
  netflixHome,
  appleHome,
  profileImg,
}

export const RESUME_URL = resumePdf
