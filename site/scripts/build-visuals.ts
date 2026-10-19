/*
 * Dessine les visuels des produits dans `../projects/<produit>/` : `icon.png`
 * (1024 × 1024), `banner.png` (1536 × 672) et `card.png` (1280 × 600, le 32:15
 * des cards du portfolio), plus la planche `../previews/products.png`.
 *
 * Chaque visuel est une page HTML (polices Fontsource du site, mascotte ou
 * glyphe de `scripts/visuals/`) que Chrome sans tête photographie : le nom du
 * produit est donc du vrai texte, juste et entier, et la page le réduit
 * jusqu'à ce qu'il tienne dans sa colonne. Les mascottes sont celles des
 * produits, recopiées telles quelles et jamais redessinées :
 * - `ponos.svg` : `standalone()` de `ponos-robot.js` (the-ponos.app), en clair ;
 * - `leadzy.svg` : `<Leadzy state="repos">` de leadz-ninja, rendu en SVG ;
 * - `opoil.svg` : `pwa/public/logo/opoil-mark.svg` d'opoil, logo maison.
 * Les trois autres glyphes reprennent le trait du symbole Hermez.
 *
 * `CHROME` remplace le binaire (`google-chrome` par défaut).
 */
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

interface Product {
  /** Nom du dossier : celui du dépôt GitHub. */
  slug: string
  name: string
  /** Sous-titre en anglais. */
  tagline: string
  /** Fichier de `scripts/visuals/` et ses proportions (largeur / hauteur). */
  mark: { file: string; ratio: number }
  /** Glyphe en trait du symbole Hermez, plus petit qu'une mascotte à l'œil. */
  glyph?: true
  /** Orange Hermez, sauf un logo maison qui garde sa couleur de marque. */
  color: string
}

const orange = "#e8611a"

const products: Product[] = [
  { slug: "ponos", name: "Ponos", tagline: "Write the ticket. It comes back done.", mark: { file: "ponos.svg", ratio: 1 }, color: orange },
  { slug: "leadz-ninja", name: "Leadz", tagline: "Find the leads the others don't see.", mark: { file: "leadzy.svg", ratio: 240 / 270 }, color: orange },
  { slug: "react-resource-view", name: "react-resource-view", tagline: "The back office of your REST API, generated from a declaration", mark: { file: "react-resource-view.svg", ratio: 1 }, glyph: true, color: orange },
  { slug: "react-data-form", name: "react-data-form", tagline: "Data-driven React forms", mark: { file: "react-data-form.svg", ratio: 1 }, glyph: true, color: orange },
  { slug: "whisper-desk", name: "Whisper Desk", tagline: "Offline voice dictation for Linux, WSL and macOS", mark: { file: "whisper-desk.svg", ratio: 1 }, glyph: true, color: orange },
  { slug: "opoil", name: "Opoil", tagline: "Find and book animal care professionals", mark: { file: "opoil.svg", ratio: 341.7 / 328.6 }, color: "#38869c" },
]

const root = new URL("../", import.meta.url)
const repo = new URL("../../", import.meta.url)
const path = (url: URL) => fileURLToPath(url)
const chrome = process.env.CHROME ?? "google-chrome"

const font = (file: string) =>
  pathToFileURL(path(new URL(`node_modules/${file}`, root))).href
const bricolage = font("@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2")
const symbol = pathToFileURL(path(new URL("public/hermez/hermez-symbol.svg", root))).href
const markUrl = (file: string) => pathToFileURL(path(new URL(`scripts/visuals/${file}`, root))).href

const css = `
  @font-face { font-family: "Bricolage"; src: url("${bricolage}"); font-weight: 200 800; }
  * { box-sizing: border-box; margin: 0; }
  html, body { background: transparent; }
  body { font-family: "Bricolage", system-ui, sans-serif; color: #1c1917; }
`

const hex = (color: string, alpha: number) =>
  `${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`

function icon(p: Product): string {
  const box = p.mark.ratio < 1 ? { h: 760, w: 760 * p.mark.ratio } : { w: p.mark.file === "opoil.svg" ? 560 : p.slug === "ponos" ? 840 : 520, h: 0 }
  const size = box.h ? `height: ${box.h}px; width: ${box.w}px` : `width: ${box.w}px`
  return `<style>${css}
    .tile { width: 1024px; height: 1024px; border-radius: 230px; background: #fff; border: 44px solid ${p.color}; display: grid; place-items: center; }
    img { display: block; ${size} }
  </style><div class="tile"><img src="${markUrl(p.mark.file)}" alt=""></div>`
}

/** Bannière et card : même mise en page, deux cadres. */
function banner(p: Product, width: number, height: number, pad: number, markHeight: number): string {
  const markWidth = Math.min(markHeight * p.mark.ratio, markHeight) * (p.glyph ? 0.8 : 1)
  return `<style>${css}
    .frame { width: ${width}px; height: ${height}px; padding: ${pad}px; display: flex; align-items: center; gap: ${Math.round(pad * 0.75)}px; overflow: hidden;
      background: radial-gradient(60% 90% at 100% 100%, ${hex(p.color, 0.18)}, transparent 70%), #fafaf9; }
    .mark { flex: none; width: ${markHeight}px; display: grid; place-items: center; }
    .mark img { display: block; width: ${markWidth}px; height: auto; }
    .text { flex: 1; min-width: 0; }
    .name { display: inline-block; white-space: nowrap; font-weight: 800; font-size: ${Math.round(height * 0.2)}px; line-height: 1.05; letter-spacing: -0.02em; }
    .tagline { margin-top: ${Math.round(height * 0.03)}px; font-size: ${Math.round(height * 0.058)}px; font-weight: 500; line-height: 1.25; color: #57534e; }
    .sign { margin-top: ${Math.round(height * 0.07)}px; display: flex; align-items: center; gap: 12px; font-size: ${Math.round(height * 0.04)}px; font-weight: 600; color: #78716c; }
    .sign img { width: ${Math.round(height * 0.06)}px; height: ${Math.round(height * 0.06)}px; }
  </style>
  <div class="frame">
    <div class="mark"><img src="${markUrl(p.mark.file)}" alt=""></div>
    <div class="text">
      <div class="name" id="name">${p.name}</div>
      <p class="tagline">${p.tagline}</p>
      <p class="sign"><img src="${symbol}" alt="">A Hermez product</p>
    </div>
  </div>
  <script>
    document.fonts.ready.then(() => {
      const name = document.getElementById("name"), column = name.parentElement
      let size = parseFloat(getComputedStyle(name).fontSize)
      while (name.getBoundingClientRect().width > column.clientWidth && size > 40) name.style.fontSize = (size -= 2) + "px"
      document.title = "ready"
    })
  </script>`
}

function sheet(): string {
  const cells = products.map((p) => {
    const dir = pathToFileURL(path(new URL(`projects/${p.slug}/`, repo))).href
    return `<figure><img class="b" src="${dir}banner.png"><img class="c" src="${dir}card.png"><img class="i" src="${dir}icon.png"><figcaption>${p.slug}</figcaption></figure>`
  }).join("")
  return `<style>${css}
    body { width: 2400px; padding: 56px; background: #fafaf9; }
    h1 { font-size: 44px; font-weight: 800; margin-bottom: 40px; }
    figure { display: grid; grid-template-columns: 1136px 592px 180px; gap: 32px; align-items: center; margin-bottom: 36px; position: relative; }
    figcaption { position: absolute; top: -26px; left: 0; font-size: 20px; color: #78716c; }
    img.b { width: 1136px; border-radius: 12px; box-shadow: 0 0 0 1px #e7e5e4; }
    img.c { width: 592px; border-radius: 12px; box-shadow: 0 0 0 1px #e7e5e4; }
    img.i { width: 180px; }
  </style><h1>Produits Hermez — bannière, card, icône</h1>${cells}`
}

function shoot(html: string, out: string, width: number, height: number, work: string): void {
  const file = join(work, "page.html")
  writeFileSync(file, `<!doctype html><meta charset="utf-8">${html}`)
  execFileSync(chrome, [
    "--headless", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
    "--allow-file-access-from-files", "--default-background-color=00000000",
    "--virtual-time-budget=4000", `--window-size=${width},${height}`,
    `--screenshot=${out}`, pathToFileURL(file).href,
  ], { stdio: "ignore" })
}

const work = mkdtempSync(join(tmpdir(), "visuals-"))
try {
  for (const p of products) {
    const dir = path(new URL(`projects/${p.slug}/`, repo))
    mkdirSync(dir, { recursive: true })
    shoot(icon(p), join(dir, "icon.png"), 1024, 1024, work)
    shoot(banner(p, 1536, 672, 112, 400), join(dir, "banner.png"), 1536, 672, work)
    shoot(banner(p, 1280, 600, 100, 340), join(dir, "card.png"), 1280, 600, work)
    console.log(`${p.slug}: icon, banner, card`)
  }
  mkdirSync(path(new URL("previews/", repo)), { recursive: true })
  shoot(sheet(), path(new URL("previews/products.png", repo)), 2400, 3340, work)
  console.log("previews/products.png")
} finally {
  rmSync(work, { recursive: true, force: true })
}
