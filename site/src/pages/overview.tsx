import type { ReactNode } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { ActionList } from "react-data-form"
import { generateLinkByResource, Link, type ViewResource } from "react-resource-view"
import { definePage, useCssVar } from "@/lib/doc"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Checkbox } from "@/ui/checkbox"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import { componentResources } from "./components"
import brandColors, { productColor, productExceptions, products } from "./tokens/brand-colors"
import colors from "./tokens/colors"
import radius from "./tokens/radius"
import typography from "./tokens/typography"

const surfaces = ["background", "card", "muted", "accent", "foreground", "muted-foreground"]
const roles = ["primary", "success", "info", "glory", "warning", "destructive"]

const typeScale = [
  { size: "36", weight: "Extrabold", className: "font-heading text-4xl font-extrabold tracking-tight", sample: "Système visuel" },
  { size: "20", weight: "Regular", className: "text-xl", sample: "Une famille de produits" },
  { size: "14", weight: "Regular", className: "text-sm", sample: "Texte courant, pour tout ce qui se lit." },
  { size: "12", weight: "Regular", className: "text-xs text-muted-foreground", sample: "Légende en gris pierre" },
]

const shapes = [
  { label: "sm", className: "rounded-sm" },
  { label: "md", className: "rounded-md" },
  { label: "lg", className: "rounded-lg" },
  { label: "xl", className: "rounded-xl" },
]

function linkTo(resource: ViewResource) {
  return generateLinkByResource({ resource, resourceAction: ActionList.read })
}

/** Une rangée de la fiche : un numéro, un titre, un lien, puis le spécimen. */
function Row({
  index,
  title,
  caption,
  to,
  children,
}: {
  index: number
  title: string
  caption: string
  to: ViewResource
  children: ReactNode
}) {
  return (
    <section className="grid gap-6 border-t border-border py-10 lg:grid-cols-[11rem_1fr] lg:gap-10">
      <div>
        <p className="font-mono text-xs text-muted-foreground">{String(index).padStart(2, "0")}</p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{caption}</p>
        <Link
          to={linkTo(to)}
          className="mt-3 inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
        >
          Détails
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function Swatch({ name }: { name: string }) {
  const value = useCssVar(`--${name}`)

  return (
    <li className="min-w-0">
      <span
        className="block h-12 rounded-md border border-border"
        style={{ background: `var(--${name})` }}
      />
      <p className="mt-2 truncate text-xs font-medium">{name}</p>
      <p className="truncate font-mono text-[11px] text-muted-foreground uppercase">{value}</p>
    </li>
  )
}

export default definePage({
  id: "overview",
  name: "Vue d'ensemble",
  title: "Design system",
  icon: Sparkles,
  intro:
    "L'ADN visuel d'une agence digitale et de ses produits. Des gris chauds, un orange pour la marque, des composants partagés.",
  view: () => (
    <div className="border-b border-border">
      <Row index={1} title="Couleurs" caption="Des surfaces neutres, puis des rôles." to={colors}>
        <div className="space-y-6">
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {surfaces.map((name) => (
              <Swatch key={name} name={name} />
            ))}
          </ul>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {roles.map((name) => (
              <Swatch key={name} name={name} />
            ))}
          </ul>
        </div>
      </Row>

      <Row
        index={2}
        title="Produits"
        caption="Une seule couleur pour tous, sur le même fond."
        to={brandColors}
      >
        <div className="flex items-center gap-3">
          <span className="size-10 shrink-0 rounded-md" style={{ background: productColor.hex }} />
          <div className="text-sm">
            <p className="font-medium">{productColor.label}</p>
            <p className="font-mono text-[11px] text-muted-foreground uppercase">{productColor.hex}</p>
          </div>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-3">
          {products.map((name) => (
            <li key={name} className="truncate">
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Sauf {productExceptions.map(({ name }) => name).join(", ")}, qui garde son logo maison et sa couleur.
        </p>
      </Row>

      <Row index={3} title="Typographie" caption="Bricolage Grotesque pour les titres, le système pour le texte." to={typography}>
        <dl className="divide-y divide-border">
          {typeScale.map(({ size, weight, className, sample }) => (
            <div key={size} className="flex items-baseline gap-6 py-3 first:pt-0 last:pb-0">
              <dt className="w-24 shrink-0 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                {size} · {weight}
              </dt>
              <dd className={`min-w-0 truncate ${className}`}>{sample}</dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row index={4} title="Forme" caption="Des angles arrondis, dérivés d'une seule base." to={radius}>
        <ul className="flex flex-wrap gap-6">
          {shapes.map(({ label, className }) => (
            <li key={label} className="text-center">
              <span className={`block size-16 border border-border bg-card shadow-sm ${className}`} />
              <span className="mt-2 block font-mono text-[11px] text-muted-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </Row>

      <Row
        index={5}
        title="Composants"
        caption="Les mêmes pièces dans tous les produits."
        to={componentResources[0]}
      >
        <div className="grid gap-8 rounded-lg border border-border bg-card p-6 xl:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="ov-name">Nom du produit</Label>
              <Input id="ov-name" placeholder="trader-ia" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="ov-check" defaultChecked />
              <Label htmlFor="ov-check">Publier</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Enregistrer</Button>
              <Button size="sm" variant="outline">Annuler</Button>
            </div>
          </div>
          <div className="space-y-4">
            <Tabs defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">Aperçu</TabsTrigger>
                <TabsTrigger value="b">Réglages</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-wrap gap-2">
              <Badge>Actif</Badge>
              <Badge variant="secondary">Bêta</Badge>
              <Badge variant="outline">Brouillon</Badge>
              <Badge variant="destructive">Erreur</Badge>
            </div>
          </div>
        </div>
      </Row>
    </div>
  ),
})
