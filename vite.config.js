import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Single copy of the original static assets (images, resume, icon font).
      // Nothing is duplicated into src/, so the legacy site and the React app
      // keep sharing one asset folder.
      '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
