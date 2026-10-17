/**
 * Runs scripts/render-smoke.jsx.
 *
 * The smoke test is React + JSX, so it is bundled for Node with the project's
 * own Vite (Vite 8 ships rolldown, not esbuild) and then imported. Output goes
 * to node_modules/.cache so nothing is added to the repository.
 *
 * Run with: npm run verify
 */
import { rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const outDir = path.join('node_modules', '.cache', 'verify-render')

await build({
  configFile: path.join(root, 'vite.config.js'),
  logLevel: 'error',
  build: {
    ssr: path.join(root, 'scripts', 'render-smoke.jsx'),
    outDir,
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
  },
})

const bundlePath = path.join(root, outDir, 'render-smoke.js')
const { runChecks } = await import(pathToFileURL(bundlePath).href)
const results = runChecks()

let failed = 0
for (const result of results) {
  if (!result.ok) failed += 1
  const detail = result.detail ? `  (${result.detail})` : ''
  console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${result.name}${detail}`)
}

console.log(`\n${results.length - failed}/${results.length} checks passed`)

await rm(path.join(root, outDir), { recursive: true, force: true })

if (failed > 0) {
  process.exitCode = 1
}
