import { SquareDashed } from "lucide-react"
import { definePage, Section, useCssVar } from "@/lib/doc"

const radii: [string, string][] = [
  ["radius-sm", "Cases à cocher, pastilles"],
  ["radius-md", "Champs, éléments de liste"],
  ["radius-lg", "Cartes, panneaux"],
  ["radius-xl", "Fenêtres, grands conteneurs"],
]

function Radius({ name, role }: { name: string; role: string }) {
  const base = useCssVar("--radius")

  return (
    <li className="rounded-xl border border-border bg-card p-4">
      <div
        className="size-24 border-2 border-primary bg-primary/10"
        style={{ borderRadius: `var(--${name})` }}
      />
      <p className="mt-3 font-mono text-xs">--{name}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
      {name === "radius-lg" && base && (
        <p className="text-xs text-muted-foreground">= --radius, soit {base}</p>
      )}
    </li>
  )
}

export default definePage({
  id: "tokens-radius",
  name: "Rayons",
  icon: SquareDashed,
  intro:
    "Un rayon de base, quatre dérivés. Les boutons et les badges, eux, sont des pilules : c'est la signature du système.",
  view: () => (
    <>
      <Section title="Rayons" intro="Tout dérive de --radius : changer une valeur change l'ensemble.">
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {radii.map(([name, role]) => (
            <Radius key={name} name={name} role={role} />
          ))}
        </ul>
      </Section>

      <Section title="Pilule" intro="Boutons, badges, onglets : rounded-4xl.">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <span className="h-9 w-32 rounded-4xl bg-primary" />
          <span className="h-6 w-20 rounded-4xl bg-secondary" />
          <span className="font-mono text-xs text-muted-foreground">rounded-4xl</span>
        </div>
      </Section>
    </>
  ),
})
