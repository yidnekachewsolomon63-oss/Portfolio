/**
 * Contrast verification.
 *
 * Parses the real values out of src/styles/tokens.css, then checks every
 * foreground/background pairing the app relies on against WCAG 2.1 relative
 * luminance. The hero pairing is asserted at >= 7:1 (AAA for normal text),
 * which is the fix for the previous design where the hero text colour and the
 * hero background were both #111827 (a 1.00 : 1 collision).
 *
 * Run with: npm run verify:contrast
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const css = readFileSync(path.join(root, 'src', 'styles', 'tokens.css'), 'utf8')

// Only the base :root block is checked. The prefers-contrast: more block later
// in the file raises these values further, so using it here would overstate the
// default ratios.
const baseCss = css.split('@media')[0]

const tokens = new Map()
for (const match of baseCss.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6});/g)) {
  tokens.set(match[1], match[2].toLowerCase())
}

function resolve(name) {
  if (!tokens.has(name)) throw new Error(`Token --${name} is not defined in tokens.css`)
  return tokens.get(name)
}

function luminance(hex) {
  const channels = [1, 3, 5]
    .map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function ratio(foreground, background) {
  const a = luminance(foreground)
  const b = luminance(background)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

/** [label, foreground token, background token, minimum ratio] */
const PAIRS = [
  ['hero title on hero background', 'pf-on-dark', 'pf-dark', 7],
  ['hero lead on hero background', 'pf-on-dark-muted', 'pf-dark', 7],
  ['hero accent word on hero background', 'pf-accent-on-dark', 'pf-dark', 7],
  ['hero accent (cyan) on hero background', 'pf-cyan-on-dark', 'pf-dark', 7],
  ['hero eyebrow on hero background', 'pf-on-dark-muted', 'pf-dark', 7],
  ['nav link on header background', 'pf-on-dark-muted', 'pf-dark', 7],
  ['footer text on footer background', 'pf-on-dark-subtle', 'pf-dark', 7],
  ['mobile nav panel link', 'pf-on-dark-muted', 'pf-dark-2', 7],
  ['body text on paper', 'pf-text', 'pf-paper', 7],
  ['muted text on paper', 'pf-muted', 'pf-paper', 7],
  ['muted text on soft paper', 'pf-muted', 'pf-paper-2', 7],
  ['labelled link on paper', 'pf-accent-on-light', 'pf-paper', 7],
  ['form error text on paper', 'pf-danger', 'pf-paper', 7],
  ['form success text on paper', 'pf-success', 'pf-paper', 7],
  ['primary button label on brand fill', 'pf-paper', 'pf-accent', 7],
  ['form control boundary on paper', 'pf-border-strong', 'pf-paper', 3],
  ['focus ring on paper', 'pf-focus-light', 'pf-paper', 3],
  ['focus ring on dark', 'pf-focus-dark', 'pf-dark', 3],
]

let failed = 0
console.log('Contrast checks (WCAG 2.1 relative luminance)\n')

for (const [label, fgToken, bgToken, min] of PAIRS) {
  const fg = resolve(fgToken)
  const bg = resolve(bgToken)
  const value = ratio(fg, bg)
  const ok = value >= min
  if (!ok) failed += 1

  const mark = ok ? 'PASS' : 'FAIL'
  console.log(
    `${mark}  ${value.toFixed(2).padStart(6)} : 1  (min ${min})  ${label}  [${fgToken} on ${bgToken}]`,
  )
}

// Regression guard: the previous hero used the same colour (#111827) for both
// text and background. Reproduce that pairing so the number stays visible.
const legacy = ratio('#111827', '#111827')
console.log(
  `\nINFO  ${legacy.toFixed(2).padStart(6)} : 1  previous hero bug: #111827 text on #111827 background (fixed above)`,
)

console.log(`\n${PAIRS.length - failed}/${PAIRS.length} contrast checks passed`)

if (failed > 0) process.exitCode = 1
