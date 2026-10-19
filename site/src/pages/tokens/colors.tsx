import { Palette } from "lucide-react"
import { definePage, Section, useCssVar } from "@/lib/doc"

const groups: { title: string; intro: string; tokens: [string, string][] }[] = [
  {
    title: "Surfaces",
    intro: "Le fond de la page et les plans posés dessus.",
    tokens: [
      ["background", "Fond de page — stone-50"],
      ["card", "Cartes, tableaux, panneaux"],
      ["popover", "Menus, fenêtres flottantes"],
      ["muted", "Zones en retrait"],
      ["secondary", "Boutons et badges secondaires"],
      ["accent", "Survol, ligne active"],
    ],
  },
  {
    title: "Texte",
    intro: "Une valeur par rôle, jamais une couleur ad hoc.",
    tokens: [
      ["foreground", "Texte courant"],
      ["muted-foreground", "Sous-titres, légendes, gris pierre"],
      ["card-foreground", "Texte sur une carte"],
      ["primary-foreground", "Texte sur la couleur primaire"],
    ],
  },
  {
    title: "Action et état",
    intro: "La couleur primaire porte l'action ; les autres disent un état.",
    tokens: [
      ["primary", "Action principale, lien, focus"],
      ["destructive", "Suppression, erreur"],
      ["success", "Succès"],
      ["warning", "Avertissement"],
      ["info", "Information"],
      ["glory", "Mise en avant"],
    ],
  },
  {
    title: "Contours",
    intro: "Des traits fins, semi-transparents, qui suivent le fond.",
    tokens: [
      ["border", "Séparateurs et bordures"],
      ["input", "Bordure des champs"],
      ["ring", "Anneau de focus"],
    ],
  },
  {
    title: "Données",
    intro: "Cinq teintes pour distinguer des séries, dans cet ordre.",
    tokens: [
      ["chart-1", "Série 1"],
      ["chart-2", "Série 2"],
      ["chart-3", "Série 3"],
      ["chart-4", "Série 4"],
      ["chart-5", "Série 5"],
    ],
  },
]

function Swatch({ name, role }: { name: string; role: string }) {
  const value = useCssVar(`--${name}`)

  return (
    <li className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
      <span
        className="size-12 shrink-0 rounded-lg border border-border"
        style={{ background: `var(--${name})` }}
      />
      <span className="min-w-0 text-sm">
        <span className="block font-mono text-xs">--{name}</span>
        <span className="block uppercase text-muted-foreground">{value}</span>
        <span className="block truncate text-muted-foreground">{role}</span>
      </span>
    </li>
  )
}

export default definePage({
  id: "tokens-colors",
  name: "Couleurs",
  icon: Palette,
  intro:
    "Les couleurs sémantiques du thème. Un composant ne cite jamais un hexadécimal : il nomme un rôle, et le thème décide de la valeur.",
  view: () => (
    <>
      {groups.map((group) => (
        <Section key={group.title} title={group.title} intro={group.intro}>
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.tokens.map(([name, role]) => (
              <Swatch key={name} name={name} role={role} />
            ))}
          </ul>
        </Section>
      ))}
    </>
  ),
})
