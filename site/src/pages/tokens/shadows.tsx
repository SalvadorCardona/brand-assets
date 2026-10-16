import { Layers } from "lucide-react"
import { definePage, Section } from "@/lib/doc"

const shadows: [string, string, string][] = [
  ["shadow-sm", "shadow-sm", "Contrôles, éléments posés"],
  ["shadow-md", "shadow-md", "Cartes survolées, menus"],
  ["shadow-lg", "shadow-lg", "Fenêtres, tiroirs"],
  ["shadow-glow", "shadow-glow", "Mise en avant, couleur primaire"],
]

export default definePage({
  id: "tokens-shadows",
  name: "Ombres",
  icon: Layers,
  intro:
    "Sur un fond sombre, l'ombre se lit peu : elle sert à séparer les plans, le halo à attirer l'œil.",
  view: () => (
    <Section title="Élévations">
      <ul className="grid gap-6 rounded-xl border border-border bg-background p-6 sm:grid-cols-2 xl:grid-cols-4">
        {shadows.map(([name, className, role]) => (
          <li key={name}>
            <div className={`h-24 rounded-xl border border-border bg-card ${className}`} />
            <p className="mt-3 font-mono text-xs">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </li>
        ))}
      </ul>
    </Section>
  ),
})
