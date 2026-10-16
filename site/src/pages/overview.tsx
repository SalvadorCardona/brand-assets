import { Sparkles } from "lucide-react"
import { definePage, Section } from "@/lib/doc"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { Checkbox } from "@/ui/checkbox"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import { productColors } from "./tokens/brand-colors"

const surfaces = ["background", "card", "popover", "muted", "accent", "primary", "destructive", "success", "warning", "info", "glory"]

export default definePage({
  id: "overview",
  name: "Vue d'ensemble",
  title: "Design system",
  icon: Sparkles,
  intro:
    "L'ADN visuel d'une agence digitale et de ses produits. Un fond sombre commun, une couleur par produit, des composants partagés.",
  view: () => (
    <>
      <Section title="Le style d'un coup d'œil" intro="Tout ce que contient le système, sur une page.">
        <div className="relative overflow-hidden rounded-xl border border-border bg-background p-8">
          <div
            aria-hidden
            className="absolute -right-10 -bottom-16 size-64 rounded-full bg-primary/30 blur-3xl"
          />
          <p className="relative text-xs uppercase tracking-wide text-muted-foreground">
            Une agence, plusieurs produits
          </p>
          <h2 className="relative mt-2 text-4xl font-semibold tracking-tight">
            Un seul système visuel
          </h2>
          <p className="relative mt-3 max-w-xl text-lg text-muted-foreground">
            Des tokens, des composants, une implémentation : de quoi livrer des produits qui se
            reconnaissent.
          </p>
          <div className="relative mt-6 flex gap-3">
            <Button>Action principale</Button>
            <Button variant="outline">Secondaire</Button>
          </div>
        </div>
      </Section>

      <Section title="Couleurs" intro="Les rôles sémantiques du thème.">
        <ul className="flex flex-wrap gap-2">
          {surfaces.map((name) => (
            <li key={name} className="flex items-center gap-2 text-xs">
              <span
                className="size-8 rounded-lg border border-border"
                style={{ background: `var(--${name})` }}
              />
              <span className="font-mono">{name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Produits" intro="Une couleur chacun, sur le même fond.">
        <ul className="flex flex-wrap gap-2">
          {productColors.map(([name, , hex]) => (
            <li key={name} title={name} className="size-8 rounded-full" style={{ background: hex }} />
          ))}
        </ul>
      </Section>

      <Section title="Typographie" intro="Une famille, une échelle courte.">
        <div className="space-y-1">
          <p className="text-4xl font-semibold tracking-tight">Titre</p>
          <p className="text-xl">Sous-titre</p>
          <p className="text-sm">Texte courant, quatorze pixels.</p>
          <p className="text-xs text-muted-foreground">Légende en gris ardoise</p>
        </div>
      </Section>

      <Section title="Composants" intro="Les mêmes pièces dans tous les produits.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Une carte</CardTitle>
              <CardDescription>Surface, contour fin, rayon généreux.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Actif</Badge>
                <Badge variant="secondary">Bêta</Badge>
                <Badge variant="outline">Brouillon</Badge>
                <Badge variant="destructive">Erreur</Badge>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ov-name">Nom</Label>
                <Input id="ov-name" placeholder="animalink" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ov-check" defaultChecked />
                <Label htmlFor="ov-check">Publier</Label>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Tabs defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">Aperçu</TabsTrigger>
                <TabsTrigger value="b">Réglages</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Enregistrer</Button>
              <Button size="sm" variant="secondary">Annuler</Button>
              <Button size="sm" variant="ghost">Plus tard</Button>
              <Button size="sm" variant="destructive">Supprimer</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  ),
})
