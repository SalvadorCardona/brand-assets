import { Swords } from "lucide-react"
import { definePage, Section } from "@/lib/doc"

/**
 * La couleur commune des produits, celle de leur halo et de leur glyphe. Mêmes
 * valeurs que le README, qui reste la référence pour les visuels.
 */
export const productColor = { label: "Sky", hex: "#38bdf8" }

/**
 * Les projets pas encore refaits dans la DA Hermez : ils gardent le sky. Les
 * produits refaits (Ponos, Leadz, react-resource-view, react-data-form, Whisper
 * Desk, Opoil) suivent le README.
 */
export const products = [
  "trader-ia",
  "gnome-claude-usage",
  "adam",
  "des-3d",
  "jsonld-api-client",
  "jsonld-repository",
  "jsonld-item",
  "resource-registry",
  "react-jwt-session",
  "react-mini-i18n",
  "ssr-safe-storage",
]

/** Les produits qui avaient déjà leur marque : ils gardent leur logo et leur couleur. */
export const productExceptions = [
  { name: "opoil", label: "Bleu pétrole", hex: "#38869c", reason: "Logo maison" },
]

export default definePage({
  id: "tokens-brand-colors",
  name: "Couleur produits",
  icon: Swords,
  intro:
    "Tous les produits partagent la même couleur, qui colore leur halo et leur glyphe, sur le même fond. C'est ce qui fait la famille.",
  view: () => (
    <>
      <Section title="La couleur commune">
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
          <span
            className="size-16 shrink-0 rounded-lg border border-border"
            style={{ background: productColor.hex }}
          />
          <div>
            <p className="font-medium">{productColor.label}</p>
            <p className="font-mono text-sm text-muted-foreground uppercase">{productColor.hex}</p>
          </div>
        </div>
      </Section>

      <Section title="Les produits" intro={`${products.length} produits, une seule couleur.`}>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          {products.map((name) => (
            <li key={name} className="truncate">
              {name}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Exception"
        intro="Un produit qui avait déjà son propre logo le garde, avec sa couleur de marque."
      >
        <ul className="space-y-2">
          {productExceptions.map(({ name, label, hex, reason }) => (
            <li key={name} className="flex items-center gap-3 text-sm">
              <span className="size-3 shrink-0 rounded-full" style={{ background: hex }} />
              <span className="font-medium">{name}</span>
              <span className="text-muted-foreground">
                {reason} · {label} <span className="font-mono text-xs uppercase">{hex}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  ),
})
