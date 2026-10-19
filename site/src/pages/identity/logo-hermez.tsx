import { Hexagon } from "lucide-react"
import { definePage, Example, Section, useCssVar } from "@/lib/doc"
import { HermezMark } from "@/identity/hermez-mark"

/** Où les fichiers sont publiés : les autres projets les reprennent à cette adresse. */
const publicBase = "https://salvadorcardona.github.io/brand-assets/hermez/"

/** Un fichier du logo, tel que servi par le site (le préfixe suit `SITE_BASE`). */
const asset = (name: string) => `${import.meta.env.BASE_URL}hermez/${name}`

const files = [
  ["hermez-symbol.svg", "Symbole, version claire"],
  ["hermez-symbol-dark.svg", "Symbole, version sombre"],
  ["hermez-logo.svg", "Logo complet (symbole + logotype en chemins), fond clair"],
  ["hermez-logo-dark.svg", "Logo complet (symbole + logotype en chemins), fond sombre"],
  ["hermez-symbol-512.png", "Symbole PNG 512 px"],
  ["hermez-symbol-192.png", "Symbole PNG 192 px (PWA)"],
  ["apple-touch-icon.png", "Symbole PNG 180 px (apple-touch-icon)"],
  ["hermez-symbol-32.png", "Symbole PNG 32 px"],
  ["hermez-symbol-16.png", "Symbole PNG 16 px"],
  ["favicon.ico", "Favicon, 16 et 32 px"],
  ["og-hermez.png", "Image de partage 1200 × 630, logo centré sur fond clair"],
]

const colors = [
  { token: "--hermez-orange", label: "Orange Hermez" },
  { token: "--hermez-orange-on-dark", label: "Orange sur sombre" },
  { token: "--hermez-ink", label: "Encre" },
  { token: "--hermez-dark", label: "Fond sombre" },
]

/** Une pastille de couleur, relue dans la feuille de style. */
function Swatch({ token, label }: { token: string; label: string }) {
  const value = useCssVar(token)
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <span
        className="size-10 shrink-0 rounded-md border border-border"
        style={{ background: `var(${token})` }}
      />
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="font-mono text-xs text-muted-foreground uppercase">{value || "…"}</p>
        <p className="truncate font-mono text-xs text-muted-foreground">{token}</p>
      </div>
    </div>
  )
}

/** Le logotype « hermez » en texte vivant, pour montrer la police et le « C » à ne pas remettre. */
function Wordmark({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--typeface-logo)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: dark ? "#fafafa" : "var(--hermez-ink)",
      }}
    >
      hermez
    </span>
  )
}

/** Un usage à éviter : l'exemple, barré d'une croix, et ce qu'il ne faut pas faire. */
function Avoid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative flex h-28 items-center justify-center bg-white">
        {children}
        <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-destructive text-sm font-bold text-destructive-foreground">
          ×
        </span>
      </div>
      <p className="border-t border-border px-4 py-3 text-sm">{title}</p>
    </div>
  )
}

export default definePage({
  id: "identity-logo-hermez",
  name: "Logo Hermez",
  icon: Hexagon,
  intro:
    "Un h et son point dans un carré arrondi bordé d'orange, suivi du mot « hermez » en minuscules. Défini ici une fois, repris par chaque site.",
  view: () => (
    <>
      <Section
        title="Versions"
        intro="Le symbole seul et le logo complet, sur fond clair et sur fond sombre."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Example label="Fond clair" className="flex flex-col items-center gap-8">
            <img src={asset("hermez-symbol.svg")} alt="Symbole Hermez, version claire" className="size-24" />
            <img src={asset("hermez-logo.svg")} alt="Logo Hermez, version claire" className="h-16" />
          </Example>
          <div className="overflow-hidden rounded-xl border border-border bg-hermez-dark">
            <p className="border-b border-white/15 px-4 py-2 text-xs font-medium tracking-wide text-white/60 uppercase">
              Fond sombre
            </p>
            <div className="flex flex-col items-center gap-8 p-6">
              <img src={asset("hermez-symbol-dark.svg")} alt="Symbole Hermez, version sombre" className="size-24" />
              <img src={asset("hermez-logo-dark.svg")} alt="Logo Hermez, version sombre" className="h-16" />
            </div>
          </div>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Version sombre : fond du carré <span className="font-mono">#141414</span>, bordure{" "}
          <span className="font-mono">#E8611A</span>, h et point <span className="font-mono">#F2803F</span>.
          Le logotype passe de <span className="font-mono">#18181B</span> à{" "}
          <span className="font-mono">#FAFAFA</span>.
        </p>
      </Section>

      <Section
        title="Logotype"
        intro="« hermez » en minuscules, Outfit 700, interlettrage −0,02 em. Dans les fichiers SVG il est vectorisé en chemins : aucune police à installer."
      >
        <Example label="Proportions" className="flex flex-wrap items-center gap-x-8 gap-y-6">
          <span className="flex items-center" style={{ gap: 16 }}>
            <HermezMark style={{ width: 64, height: 64 }} />
            <Wordmark className="text-[60px] leading-none" />
          </span>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Symbole à gauche, haut ≈ 1,07 × la taille de police</li>
            <li>Espace symbole / texte ≈ 0,27 × la taille de police</li>
            <li>Par exemple : symbole 64 px, texte 60 px, espace 16 px</li>
          </ul>
        </Example>
      </Section>

      <Section title="Couleurs et police" intro="Les tokens vivent dans styles.css ; cette page les relit.">
        <div className="grid gap-3 sm:grid-cols-2">
          {colors.map((color) => (
            <Swatch key={color.token} {...color} />
          ))}
        </div>
        <LogoFont />
      </Section>

      <Section title="Tailles" intro="Le symbole se met à l'échelle sans changer de proportions.">
        <Example label="Symbole" className="flex flex-wrap items-end gap-8">
          {[16, 32, 64, 128].map((size) => (
            <figure key={size} className="flex flex-col items-center gap-2">
              <img src={asset("hermez-symbol.svg")} alt="" width={size} height={size} />
              <figcaption className="font-mono text-xs text-muted-foreground">{size} px</figcaption>
            </figure>
          ))}
        </Example>
        <Example label="Logo complet" className="flex flex-wrap items-end gap-8">
          {[24, 32, 48, 64].map((height) => (
            <figure key={height} className="flex flex-col items-center gap-2">
              <img src={asset("hermez-logo.svg")} alt="" style={{ height }} />
              <figcaption className="font-mono text-xs text-muted-foreground">{height} px de haut</figcaption>
            </figure>
          ))}
        </Example>
      </Section>

      <Section
        title="Zone de protection"
        intro="Laisser libre, tout autour du symbole, au moins la largeur du point (14 sur 120 de la largeur du symbole)."
      >
        <Example label="Zone de protection" className="flex justify-center">
          {/* 14/120 de la largeur du symbole = le diamètre du point */}
          <div
            className="relative"
            style={{ padding: (14 / 120) * 160, background: "var(--accent)", outline: "1px dashed var(--hermez-orange)" }}
          >
            <img src={asset("hermez-symbol.svg")} alt="Symbole Hermez" width={160} height={160} />
          </div>
        </Example>
      </Section>

      <Section title="Taille minimale">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <img src={asset("hermez-symbol.svg")} alt="" width={16} height={16} />
            <p className="mt-3 text-sm font-medium">Symbole : 16 px</p>
            <p className="text-xs text-muted-foreground">Le favicon s'appuie sur cette taille.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <img src={asset("hermez-logo.svg")} alt="" style={{ height: 24 }} />
            <p className="mt-3 text-sm font-medium">Logo complet : 24 px de haut</p>
            <p className="text-xs text-muted-foreground">En dessous, n'afficher que le symbole.</p>
          </div>
        </div>
      </Section>

      <Section title="À éviter">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Avoid title="Ne pas déformer : garder les proportions.">
            <img src={asset("hermez-symbol.svg")} alt="" style={{ width: 96, height: 48 }} />
          </Avoid>
          <Avoid title="Ne pas changer les couleurs.">
            <img
              src={asset("hermez-symbol.svg")}
              alt=""
              className="size-16"
              style={{ filter: "hue-rotate(170deg) saturate(1.4)" }}
            />
          </Avoid>
          <Avoid title="Ne pas retirer le contour.">
            <svg viewBox="0 0 120 120" aria-hidden className="size-16">
              <path
                d="M36 28V90M36 64C36 52 44 46 54 46C64 46 72 52 72 64V90"
                fill="none"
                stroke="#E8611A"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="87" cy="33" r="7" fill="#E8611A" />
            </svg>
          </Avoid>
          <Avoid title="Ne pas remettre le « C » de l'ancien logo.">
            <span className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl border-4 border-hermez-orange text-2xl font-bold text-hermez-orange">
                C
              </span>
              <Wordmark className="text-3xl" />
            </span>
          </Avoid>
        </div>
      </Section>

      <Section
        title="Fichiers"
        intro="Les adresses publiques : les autres projets reprennent les fichiers directement."
      >
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {files.map(([name, usage]) => (
            <div key={name} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4">
              <a
                href={publicBase + name}
                className="font-mono text-sm break-all text-primary hover:underline"
              >
                {publicBase + name}
              </a>
              <span className="text-xs text-muted-foreground sm:ml-auto sm:text-right">{usage}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  ),
})

/** La police du logotype, relue dans la feuille de style. */
function LogoFont() {
  const stack = useCssVar("--typeface-logo")
  return (
    <Example label="font-logo · logotype">
      <Wordmark className="text-5xl" />
      <p className="mt-2 font-mono text-xs text-muted-foreground">
        {stack.split(",")[0]?.replace(/['"]/g, "") || "…"} · 700 · −0,02 em
      </p>
    </Example>
  )
}
