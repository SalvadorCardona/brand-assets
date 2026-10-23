/*
 * Dessine les visuels des produits dans `../projects/<produit>/` : `icon.png`
 * (1024 × 1024) et son `icon.svg` (aussi le favicon SVG), les favicons
 * `favicon-32.png`, `favicon-180.png` et `favicon-512.png`, `banner.png`
 * (1536 × 672) et `card.png` (1280 × 600, le 32:15 des cards du portfolio),
 * plus la planche `../previews/products.png`. Pour Hermez, les visuels de la
 * page LinkedIn dans `../projects/hermez/` : `linkedin-logo.png` (300 × 300) et
 * `linkedin-banner.png` (1128 × 191).
 *
 * Chaque visuel est une page HTML (polices Fontsource du site, mascotte ou
 * glyphe de `scripts/visuals/`) que Chrome sans tête photographie : le nom du
 * produit est donc du vrai texte, juste et entier, et la page le réduit
 * jusqu'à ce qu'il tienne dans sa colonne. Les mascottes sont celles des
 * produits, recopiées telles quelles et jamais redessinées :
 * - `ponos.svg` : la mascotte à plat de `ponos-robot.js` (the-ponos.app), état idle, en clair ;
 * - `leadzy.svg` : `<Leadzy state="repos">` de leadz-ninja, rendu en SVG ;
 * - `opoil.svg` : `pwa/public/logo/opoil-mark.svg` d'opoil, logo maison.
 * Les trois autres glyphes reprennent le trait du symbole Hermez.
 *
 * Ponos a un logo à part, le logo A « Écran » (`logoPonos()`) : c'est son
 * `icon.svg`, ses favicons et la marque de sa bannière et de sa card. La
 * mascotte ne sert qu'aux états de la page du produit.
 *
 * `CHROME` remplace le binaire (`google-chrome` par défaut).
 */
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
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
const logo = pathToFileURL(path(new URL("public/hermez/hermez-logo.svg", root))).href
const markUrl = (file: string) => pathToFileURL(path(new URL(`scripts/visuals/${file}`, root))).href

const css = `
  @font-face { font-family: "Bricolage"; src: url("${bricolage}"); font-weight: 200 800; }
  * { box-sizing: border-box; margin: 0; }
  html, body { background: transparent; }
  body { font-family: "Bricolage", system-ui, sans-serif; color: #1c1917; }
`

const hex = (color: string, alpha: number) =>
  `${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`

/** Taille de la mascotte ou du glyphe dans la tuile 1024 × 1024. */
function iconBox(p: Product): { w: number; h: number } {
  if (p.mark.ratio < 1) return { h: 760, w: 760 * p.mark.ratio }
  const w = p.mark.file === "opoil.svg" ? 560 : p.slug === "ponos" ? 840 : 520
  return { w, h: w / p.mark.ratio }
}

/** Logo A « Écran » de Ponos, dans le cadre 1024 des autres icônes (les 120 du dessin d'origine réduits au cadre 980). */
function logoPonos(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024"><rect x="22" y="22" width="980" height="980" rx="208" fill="#fff" stroke="${orange}" stroke-width="44"/><g transform="translate(-13 -13) scale(8.75)"><path d="M60 20C67 27 69 32 66 36C64 39 56 39 54 36C51 32 53 27 60 20Z" fill="${orange}"/><rect x="28" y="44" width="64" height="50" rx="16" fill="#1c1917"/><circle cx="48" cy="69" r="7" fill="#FFE1CC"/><circle cx="72" cy="69" r="7" fill="#FFE1CC"/></g></svg>\n`
}

/** Même tuile que `icon.png`, en vectoriel : la mascotte est incrustée telle quelle. */
function iconSvg(p: Product): string {
  if (p.slug === "ponos") return logoPonos()
  const mark = readFileSync(path(new URL(`scripts/visuals/${p.mark.file}`, root)), "utf8").trim()
  const { w, h } = iconBox(p)
  const place = `x="${(1024 - w) / 2}" y="${(1024 - h) / 2}" width="${w}" height="${h}"`
  const nested = mark.replace(/^<svg\b[^>]*>/, (root) => `<svg ${place}${root.slice(4).replace(/ (width|height)="[^"]*"/g, "")}`)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024"><rect x="22" y="22" width="980" height="980" rx="208" fill="#fff" stroke="${p.color}" stroke-width="44"/>${nested}</svg>\n`
}

/** Un favicon : le SVG de l'icône à la taille du PNG. */
function favicon(svgUrl: string, size: number): string {
  return `<style>* { margin: 0 } html, body { background: transparent } img { display: block; width: ${size}px; height: ${size}px }</style><img src="${svgUrl}" alt="">`
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
    <div class="mark"><img src="${p.slug === "ponos" ? pathToFileURL(path(new URL("projects/ponos/icon.svg", repo))).href : markUrl(p.mark.file)}" alt=""></div>
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

/** Logo de la page LinkedIn : le symbole Hermez sur le fond clair. */
function linkedinLogo(): string {
  return `<style>${css}
    .frame { width: 300px; height: 300px; display: grid; place-items: center; background: #fafaf9; }
    .frame img { width: 220px; height: 220px; }
  </style><div class="frame"><img src="${symbol}" alt=""></div>`
}

/** Bannière de la page LinkedIn : le logo à droite, la photo de la page recouvre le coin bas gauche. */
function linkedinBanner(): string {
  return `<style>${css}
    .frame { width: 1128px; height: 191px; padding: 0 72px; display: flex; flex-direction: column; align-items: flex-end; justify-content: center; gap: 10px;
      background: radial-gradient(60% 90% at 100% 100%, ${hex(orange, 0.18)}, transparent 70%), #fafaf9; }
    .frame img { display: block; height: 64px; }
    .tagline { font-size: 22px; font-weight: 500; color: #57534e; }
  </style><div class="frame"><img src="${logo}" alt=""><p class="tagline">Digital agency</p></div>`
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
    const svg = join(dir, "icon.svg")
    writeFileSync(svg, iconSvg(p))
    shoot(favicon(pathToFileURL(svg).href, 1024), join(dir, "icon.png"), 1024, 1024, work)
    for (const size of [32, 180, 512]) {
      shoot(favicon(pathToFileURL(svg).href, size), join(dir, `favicon-${size}.png`), size, size, work)
    }
    shoot(banner(p, 1536, 672, 112, 400), join(dir, "banner.png"), 1536, 672, work)
    shoot(banner(p, 1280, 600, 100, 340), join(dir, "card.png"), 1280, 600, work)
    console.log(`${p.slug}: icon, favicons, banner, card`)
  }
  const hermez = path(new URL("projects/hermez/", repo))
  shoot(linkedinLogo(), join(hermez, "linkedin-logo.png"), 300, 300, work)
  shoot(linkedinBanner(), join(hermez, "linkedin-banner.png"), 1128, 191, work)
  console.log("hermez: linkedin-logo, linkedin-banner")
  mkdirSync(path(new URL("previews/", repo)), { recursive: true })
  shoot(sheet(), path(new URL("previews/products.png", repo)), 2400, 3340, work)
  console.log("previews/products.png")
} finally {
  rmSync(work, { recursive: true, force: true })
}
