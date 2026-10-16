import { Swords } from "lucide-react"
import { definePage, Section } from "@/lib/doc"

/**
 * Une couleur par produit, sur le fond commun. Mêmes valeurs que le tableau du
 * README, qui reste la référence pour les visuels.
 */
export const productColors: [string, string, string][] = [
  ["animalink", "Corail", "#f87171"],
  ["animalink-lead", "Violet clair", "#c084fc"],
  ["opoil", "Bleu pétrole", "#38869c"],
  ["trader-ia", "Vert", "#22c55e"],
  ["whisper-desk", "Ambre", "#fbbf24"],
  ["ticket-runner", "Violet", "#a78bfa"],
  ["gnome-claude-usage", "Émeraude", "#34d399"],
  ["adam", "Orange", "#fb923c"],
  ["des-3d", "Rose", "#fb7185"],
  ["react-resource-view", "Cyan", "#22d3ee"],
  ["react-data-form", "Lime", "#a3e635"],
  ["jsonld-api-client", "Turquoise", "#2dd4bf"],
  ["jsonld-repository", "Bleu", "#60a5fa"],
  ["jsonld-item", "Indigo", "#818cf8"],
  ["resource-registry", "Fuchsia", "#e879f9"],
  ["react-jwt-session", "Jaune", "#facc15"],
  ["react-mini-i18n", "Rose vif", "#f472b6"],
  ["ssr-safe-storage", "Vert tendre", "#4ade80"],
]

export default definePage({
  id: "tokens-brand-colors",
  name: "Couleurs produits",
  icon: Swords,
  intro:
    "Chaque produit a sa couleur, qui colore son halo et son glyphe. Le fond, lui, ne change jamais : c'est ce qui fait la famille.",
  view: () => (
    <Section
      title="Une couleur par produit"
      intro="Un produit qui a déjà son propre logo le garde, avec sa couleur de marque."
    >
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {productColors.map(([name, label, hex]) => (
          <li
            key={name}
            className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-background p-3"
          >
            <span
              aria-hidden
              className="absolute -right-6 -bottom-8 size-24 rounded-full opacity-30 blur-2xl"
              style={{ background: hex }}
            />
            <span
              className="relative size-12 shrink-0 rounded-lg border border-border"
              style={{ background: hex }}
            />
            <span className="relative min-w-0 text-sm">
              <span className="block truncate font-medium">{name}</span>
              <span className="block text-muted-foreground">
                {label} · <span className="font-mono text-xs uppercase">{hex}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  ),
})
