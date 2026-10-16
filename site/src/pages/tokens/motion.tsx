import { Zap } from "lucide-react"
import { definePage, Section, useCssVar } from "@/lib/doc"

const durations: [string, string][] = [
  ["duration-fast", "Survol, focus"],
  ["duration-base", "Ouverture d'un menu, changement d'onglet"],
  ["duration-slow", "Entrée d'une fenêtre ou d'un tiroir"],
]

function Duration({ name, role }: { name: string; role: string }) {
  const value = useCssVar(`--${name}`)

  return (
    <li className="group rounded-xl border border-border bg-card p-4">
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full w-0 rounded-full bg-primary group-hover:w-full"
          style={{
            transition: `width var(--${name}) var(--ease-standard)`,
          }}
        />
      </div>
      <p className="mt-3 font-mono text-xs">
        --{name} · {value}
      </p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </li>
  )
}

export default definePage({
  id: "tokens-motion",
  name: "Mouvement",
  icon: Zap,
  intro:
    "Trois durées et une seule courbe. Survolez une carte pour voir la durée jouer.",
  view: () => (
    <>
      <Section title="Durées">
        <ul className="grid gap-3 sm:grid-cols-3">
          {durations.map(([name, role]) => (
            <Duration key={name} name={name} role={role} />
          ))}
        </ul>
      </Section>
      <Section title="Courbe" intro="Départ vif, arrivée douce.">
        <p className="font-mono text-sm text-muted-foreground">
          --ease-standard · cubic-bezier(0.2, 0, 0, 1)
        </p>
      </Section>
    </>
  ),
})
