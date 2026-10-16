import { Ruler } from "lucide-react"
import { definePage, Section } from "@/lib/doc"

/** Le pas est de 0,25 rem ; chaque valeur est un multiple du pas. */
const steps: [string, number][] = [
  ["1", 4],
  ["2", 8],
  ["3", 12],
  ["4", 16],
  ["6", 24],
  ["8", 32],
  ["12", 48],
  ["16", 64],
]

export default definePage({
  id: "tokens-spacing",
  name: "Espacements",
  icon: Ruler,
  intro:
    "Tous les espaces sont des multiples de quatre pixels. Une échelle courte garde les écrans alignés d'un produit à l'autre.",
  view: () => (
    <>
      <Section title="Échelle" intro="Marges, gouttières et paddings piochent dans cette liste, et nulle part ailleurs.">
        <ul className="space-y-2">
          {steps.map(([step, px]) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3"
            >
              <span className="w-24 shrink-0 font-mono text-xs">p-{step} · gap-{step}</span>
              <span className="w-20 shrink-0 text-xs text-muted-foreground">
                {px / 16} rem · {px} px
              </span>
              <span
                className="h-4 rounded-sm bg-primary"
                style={{ width: px }}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Usage" intro="Quel espace pour quel contexte.">
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>
            <code className="font-mono text-foreground">gap-2</code> entre une icône et son
            libellé
          </li>
          <li>
            <code className="font-mono text-foreground">gap-4</code> entre deux champs d'un
            formulaire
          </li>
          <li>
            <code className="font-mono text-foreground">p-4</code> à{" "}
            <code className="font-mono text-foreground">p-6</code> dans une carte
          </li>
          <li>
            <code className="font-mono text-foreground">gap-8</code> à{" "}
            <code className="font-mono text-foreground">gap-12</code> entre deux sections
          </li>
        </ul>
      </Section>
    </>
  ),
})
