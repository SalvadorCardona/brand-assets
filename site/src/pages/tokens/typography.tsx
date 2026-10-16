import { Type } from "lucide-react"
import { definePage, Example, Section, useCssVar } from "@/lib/doc"

const scale: [string, string, string][] = [
  ["text-xs", "0.75 rem · 12 px", "text-xs"],
  ["text-sm", "0.875 rem · 14 px", "text-sm"],
  ["text-base", "1 rem · 16 px", "text-base"],
  ["text-lg", "1.125 rem · 18 px", "text-lg"],
  ["text-xl", "1.25 rem · 20 px", "text-xl"],
  ["text-2xl", "1.5 rem · 24 px", "text-2xl"],
  ["text-4xl", "2.25 rem · 36 px", "text-4xl"],
]

const weights: [string, string][] = [
  ["font-normal", "font-normal"],
  ["font-medium", "font-medium"],
  ["font-semibold", "font-semibold"],
]

/** Le nom de la première police d'une pile : celle qui s'affiche. */
function FontName({ token }: { token: string }) {
  const stack = useCssVar(token)
  const name = stack.split(",")[0]?.replace(/['"]/g, "").replace(/ Variable$/, "")
  return <>{name || "…"}</>
}

/** Un réglage des titres, relu dans la feuille de style. */
function HeadingSetting({ token, label }: { token: string; label: string }) {
  const value = useCssVar(token)
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="font-mono text-sm">{value || "…"}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export default definePage({
  id: "tokens-typography",
  name: "Typographie",
  icon: Type,
  intro:
    "Bricolage Grotesque, très grasse, pour les titres ; la police du système pour le texte. Une échelle courte, trois graisses.",
  view: () => (
    <>
      <Section
        title="Familles"
        intro="Une police de caractère pour les titres, celle du système pour le reste."
      >
        <Example label="font-heading · titres">
          <h3 className="text-3xl">Une agence, plusieurs produits</h3>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            <FontName token="--typeface-heading" />
          </p>
        </Example>
        <Example label="font-sans · texte">
          <p className="text-lg">Portez un toast à ce vieux juge blond qui fume.</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            <FontName token="--typeface-body" />
          </p>
        </Example>
        <Example label="font-mono · code">
          <p className="font-mono text-sm">createViewResource("articles", {"{ … }"})</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            <FontName token="--typeface-mono" />
          </p>
        </Example>
      </Section>

      <Section title="Titres" intro="Tous les titres prennent cette graisse et cette approche, quelle que soit la page.">
        <div className="grid gap-3 sm:grid-cols-2">
          <HeadingSetting token="--heading-weight" label="Graisse des titres" />
          <HeadingSetting token="--heading-tracking" label="Approche des titres" />
        </div>
      </Section>

      <Section title="Échelle" intro="Sept tailles suffisent à toute l'interface.">
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {scale.map(([name, size, className]) => (
            <div key={name} className="flex items-baseline gap-4 px-4 py-3">
              <span className="w-24 shrink-0 font-mono text-xs">{name}</span>
              <span className="w-36 shrink-0 text-xs text-muted-foreground">{size}</span>
              <span className={`${className} truncate`}>Le design system</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Graisses">
        <div className="grid gap-3 sm:grid-cols-3">
          {weights.map(([name, className]) => (
            <div key={name} className="rounded-xl border border-border bg-card p-4">
              <p className={`${className} text-2xl`}>Aa</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Hiérarchie" intro="Titre, chapeau, texte, légende.">
        <Example label="Exemple">
          <h3 className="text-2xl font-semibold tracking-tight">Titre de section</h3>
          <p className="mt-2 max-w-xl text-lg text-muted-foreground">
            Le chapeau en gris pierre annonce ce qui suit.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed">
            Le texte courant reste lisible : quatorze pixels, interligne généreux, une
            mesure qui ne dépasse pas soixante-dix caractères.
          </p>
          <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
            Légende
          </p>
        </Example>
      </Section>
    </>
  ),
})
