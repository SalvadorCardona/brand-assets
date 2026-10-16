import { Type } from "lucide-react"
import { definePage, Example, Section } from "@/lib/doc"

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

export default definePage({
  id: "tokens-typography",
  name: "Typographie",
  icon: Type,
  intro:
    "Une seule famille sans empattement, une échelle courte, trois graisses. Les titres sont serrés, le texte courant respire.",
  view: () => (
    <>
      <Section title="Familles" intro="Le sans-serif pour l'interface, la chasse fixe pour le code.">
        <Example label="font-sans">
          <p className="font-sans text-3xl font-semibold tracking-tight">
            Une agence, plusieurs produits
          </p>
          <p className="mt-2 font-sans text-muted-foreground">
            Portez un toast à ce vieux juge blond qui fume.
          </p>
        </Example>
        <Example label="font-mono">
          <p className="font-mono text-sm">createViewResource("articles", {"{ … }"})</p>
        </Example>
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
            Le chapeau en gris ardoise annonce ce qui suit.
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
