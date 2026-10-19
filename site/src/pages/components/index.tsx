import type { ReactNode } from "react"
import {
  AppWindow,
  Bell,
  BookOpen,
  ChartColumn,
  CheckSquare,
  ChevronsUpDown,
  CreditCard,
  FormInput,
  Inbox,
  Layers,
  MousePointerClick,
  PanelTop,
  Minus,
  Tag,
  TextCursorInput,
  Table2,
  ScrollText,
  MessageSquare,
  ShieldAlert,
  Star,
} from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/ui/alert-dialog"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/ui/button-group"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/ui/chart"
import { Checkbox } from "@/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/ui/field"
import { Input } from "@/ui/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/ui/item"
import { Label } from "@/ui/label"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/ui/popover"
import { ScrollArea } from "@/ui/scroll-area"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select"
import { Separator } from "@/ui/separator"
import { Toaster } from "@/ui/sonner"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { CodeBlock, definePage, Example, Section } from "@/lib/doc"
import { installCommand } from "@/lib/registry"

interface Demo {
  label: string
  node: ReactNode
}

interface ComponentPage {
  id: string
  name: string
  icon: Parameters<typeof definePage>[0]["icon"]
  intro: string
  file: string
  demos: Demo[]
  usage: string
}

const row = "flex flex-wrap items-center gap-3"

const chartData = [
  { month: "Jan", web: 186, mobile: 80 },
  { month: "Fév", web: 305, mobile: 200 },
  { month: "Mar", web: 237, mobile: 120 },
  { month: "Avr", web: 173, mobile: 190 },
  { month: "Mai", web: 209, mobile: 130 },
  { month: "Juin", web: 264, mobile: 140 },
]

// Les séries nomment un token de la palette de données, jamais un hexadécimal.
const chartConfig = {
  web: { label: "Web", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const pages: ComponentPage[] = [
  {
    id: "button",
    name: "Bouton",
    icon: MousePointerClick,
    file: "button",
    intro: "L'action. Une pilule, dont la variante dit le poids : pleine pour l'action principale, discrète pour le reste.",
    demos: [
      {
        label: "Variantes",
        node: (
          <div className={row}>
            {(["default", "secondary", "outline", "ghost", "destructive", "link", "success", "info", "glory", "warning"] as const).map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        ),
      },
      {
        label: "Tailles",
        node: (
          <div className={row}>
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button>default</Button>
            <Button size="lg">lg</Button>
            <Button size="icon" aria-label="Étoile"><Star /></Button>
          </div>
        ),
      },
      { label: "Désactivé", node: <Button disabled>Indisponible</Button> },
    ],
    usage: `<Button variant="secondary" size="sm">Enregistrer</Button>`,
  },
  {
    id: "badge",
    name: "Badge",
    icon: Tag,
    file: "badge",
    intro: "Une étiquette courte : un statut, un compteur, une catégorie.",
    demos: [
      {
        label: "Variantes",
        node: (
          <div className={row}>
            {(["default", "secondary", "destructive", "outline", "ghost", "success", "info", "glory", "warning"] as const).map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
        ),
      },
    ],
    usage: `<Badge variant="outline">Brouillon</Badge>`,
  },
  {
    id: "card",
    name: "Carte",
    icon: CreditCard,
    file: "card",
    intro: "Le plan de base : un en-tête, un contenu, un pied. Posée sur le fond, elle regroupe ce qui va ensemble.",
    demos: [
      {
        label: "Carte complète",
        node: (
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Nouveau produit</CardTitle>
              <CardDescription>Un fond, un glyphe, une couleur.</CardDescription>
              <CardAction>
                <Badge variant="secondary">Bêta</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Le contenu de la carte respire, quatre pixels à la fois.
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Ouvrir</Button>
              <Button size="sm" variant="ghost">Plus tard</Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
    usage: `<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>`,
  },
  {
    id: "checkbox",
    name: "Case à cocher",
    icon: CheckSquare,
    file: "checkbox",
    intro: "Un choix binaire, toujours accompagné de son libellé.",
    demos: [
      {
        label: "États",
        node: (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="chk-1" defaultChecked />
              <Label htmlFor="chk-1">Cochée</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="chk-2" />
              <Label htmlFor="chk-2">Décochée</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="chk-3" disabled />
              <Label htmlFor="chk-3">Désactivée</Label>
            </div>
          </div>
        ),
      },
    ],
    usage: `<Checkbox id="cgu" />
<Label htmlFor="cgu">J'accepte les conditions</Label>`,
  },
  {
    id: "dialog",
    name: "Fenêtre",
    icon: AppWindow,
    file: "dialog",
    intro: "Une fenêtre modale pour une tâche courte, qui garde le contexte derrière elle.",
    demos: [
      {
        label: "Fenêtre",
        node: (
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Ouvrir la fenêtre</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Renommer le projet</DialogTitle>
                <DialogDescription>Le nom apparaît sur la bannière.</DialogDescription>
              </DialogHeader>
              <Input defaultValue="trader-ia" />
              <DialogFooter>
                <Button>Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
      },
    ],
    usage: `<Dialog>
  <DialogTrigger render={<Button />}>Ouvrir</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titre</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  },
  {
    id: "alert-dialog",
    name: "Confirmation",
    icon: ShieldAlert,
    file: "alert-dialog",
    intro: "Pour une action qu'on ne défait pas : elle demande une réponse explicite avant d'aller plus loin.",
    demos: [
      {
        label: "Confirmation de suppression",
        node: (
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>Supprimer</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer cet élément ?</AlertDialogTitle>
                <AlertDialogDescription>Cette action est définitive.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction>Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
    ],
    usage: `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>Supprimer</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Supprimer ?</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Annuler</AlertDialogCancel>
      <AlertDialogAction>Supprimer</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  {
    id: "field",
    name: "Champ de formulaire",
    icon: FormInput,
    file: "field",
    intro: "Assemble un libellé, un contrôle, une aide et une erreur. Les formulaires de Resource View s'y appuient.",
    demos: [
      {
        label: "Groupe de champs",
        node: (
          <FieldSet className="max-w-sm">
            <FieldLegend>Profil</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fld-name">Nom</FieldLabel>
                <Input id="fld-name" placeholder="Ada" />
                <FieldDescription>Affiché sur la bannière.</FieldDescription>
              </Field>
              <Field data-invalid>
                <FieldLabel htmlFor="fld-mail">E-mail</FieldLabel>
                <Input id="fld-mail" aria-invalid defaultValue="ada@" />
                <FieldError>Adresse invalide.</FieldError>
              </Field>
            </FieldGroup>
          </FieldSet>
        ),
      },
    ],
    usage: `<Field>
  <FieldLabel htmlFor="nom">Nom</FieldLabel>
  <Input id="nom" />
  <FieldDescription>Affiché sur la bannière.</FieldDescription>
</Field>`,
  },
  {
    id: "input",
    name: "Champ texte",
    icon: TextCursorInput,
    file: "input",
    intro: "Une ligne de saisie, arrondie comme les autres contrôles.",
    demos: [
      {
        label: "États",
        node: (
          <div className="grid max-w-sm gap-3">
            <Input placeholder="Placeholder" />
            <Input defaultValue="Valeur saisie" />
            <Input disabled defaultValue="Désactivé" />
            <Input aria-invalid defaultValue="Invalide" />
          </div>
        ),
      },
    ],
    usage: `<Input placeholder="Rechercher" />`,
  },
  {
    id: "label",
    name: "Libellé",
    icon: Tag,
    file: "label",
    intro: "Nomme un contrôle ; cliquer dessus le sélectionne.",
    demos: [
      {
        label: "Libellé associé",
        node: (
          <div className="grid max-w-sm gap-2">
            <Label htmlFor="lbl-1">Nom du produit</Label>
            <Input id="lbl-1" />
          </div>
        ),
      },
    ],
    usage: `<Label htmlFor="id">Libellé</Label>`,
  },
  {
    id: "popover",
    name: "Popover",
    icon: MessageSquare,
    file: "popover",
    intro: "Un panneau flottant ancré à son déclencheur, pour une information ou un réglage rapide.",
    demos: [
      {
        label: "Popover",
        node: (
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>Ouvrir</PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Dimensions</PopoverTitle>
                <PopoverDescription>Icône : 1024 × 1024. Bannière : 1536 × 672.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
    usage: `<Popover>
  <PopoverTrigger render={<Button />}>Ouvrir</PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>`,
  },
  {
    id: "scroll-area",
    name: "Zone défilante",
    icon: ScrollText,
    file: "scroll-area",
    intro: "Un défilement à la barre discrète, identique sur tous les systèmes.",
    demos: [
      {
        label: "Zone de 160 px",
        node: (
          <ScrollArea className="h-40 w-64 rounded-xl border border-border">
            <div className="space-y-2 p-4 text-sm">
              {Array.from({ length: 14 }, (_, i) => (
                <p key={i}>Ligne {i + 1}</p>
              ))}
            </div>
          </ScrollArea>
        ),
      },
    ],
    usage: `<ScrollArea className="h-40">…</ScrollArea>`,
  },
  {
    id: "select",
    name: "Sélecteur",
    icon: ChevronsUpDown,
    file: "select",
    intro: "Un choix parmi une liste fermée.",
    demos: [
      {
        label: "Sélecteur",
        node: (
          <Select defaultValue="list">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Disposition</SelectLabel>
                <SelectItem value="list">Tableau</SelectItem>
                <SelectItem value="cards">Cartes</SelectItem>
                <SelectItem value="board">Tableau kanban</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ),
      },
    ],
    usage: `<Select defaultValue="list">
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="list">Tableau</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    id: "separator",
    name: "Séparateur",
    icon: Minus,
    file: "separator",
    intro: "Un trait fin entre deux groupes.",
    demos: [
      {
        label: "Horizontal et vertical",
        node: (
          <div className="max-w-sm space-y-3 text-sm">
            <p>Au-dessus</p>
            <Separator />
            <div className="flex h-5 items-center gap-3">
              <span>Gauche</span>
              <Separator orientation="vertical" />
              <span>Droite</span>
            </div>
          </div>
        ),
      },
    ],
    usage: `<Separator />`,
  },
  {
    id: "table",
    name: "Tableau",
    icon: Table2,
    file: "table",
    intro: "Des données alignées en lignes et colonnes. Resource View en dérive ses listes.",
    demos: [
      {
        label: "Tableau",
        node: (
          <Table>
            <TableCaption>Quelques produits.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Couleur</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>adam</TableCell>
                <TableCell>Orange</TableCell>
                <TableCell><Badge>Actif</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>trader-ia</TableCell>
                <TableCell>Vert</TableCell>
                <TableCell><Badge variant="secondary">Bêta</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
      },
    ],
    usage: `<Table>
  <TableHeader>
    <TableRow><TableHead>Nom</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>…</TableCell></TableRow>
  </TableBody>
</Table>`,
  },
  {
    id: "tabs",
    name: "Onglets",
    icon: PanelTop,
    file: "tabs",
    intro: "Plusieurs vues d'un même objet, une à la fois.",
    demos: [
      {
        label: "Onglets",
        node: (
          <Tabs defaultValue="apercu" className="max-w-md">
            <TabsList>
              <TabsTrigger value="apercu">Aperçu</TabsTrigger>
              <TabsTrigger value="reglages">Réglages</TabsTrigger>
            </TabsList>
            <TabsContent value="apercu" className="text-sm text-muted-foreground">
              Le contenu de l'aperçu.
            </TabsContent>
            <TabsContent value="reglages" className="text-sm text-muted-foreground">
              Le contenu des réglages.
            </TabsContent>
          </Tabs>
        ),
      },
      {
        label: "Variante ligne",
        node: (
          <Tabs defaultValue="a">
            <TabsList variant="line">
              <TabsTrigger value="a">Un</TabsTrigger>
              <TabsTrigger value="b">Deux</TabsTrigger>
            </TabsList>
          </Tabs>
        ),
      },
    ],
    usage: `<Tabs defaultValue="apercu">
  <TabsList>
    <TabsTrigger value="apercu">Aperçu</TabsTrigger>
  </TabsList>
  <TabsContent value="apercu">…</TabsContent>
</Tabs>`,
  },
  {
    id: "sonner",
    name: "Notification",
    icon: Bell,
    file: "sonner",
    intro: "Un retour bref après une action, qui disparaît seul.",
    demos: [
      {
        label: "Notifications",
        node: (
          <div className={row}>
            <Button variant="outline" onClick={() => toast("Brouillon enregistré")}>Neutre</Button>
            <Button variant="outline" onClick={() => toast.success("Publié")}>Succès</Button>
            <Button variant="outline" onClick={() => toast.error("Échec de l'envoi")}>Erreur</Button>
          </div>
        ),
      },
    ],
    usage: `// Une fois, à la racine : <Toaster />
toast.success("Publié")`,
  },
  {
    id: "item",
    name: "Élément de liste",
    icon: Inbox,
    file: "item",
    intro: "Une ligne riche : média, titre, description, actions.",
    demos: [
      {
        label: "Liste d'éléments",
        node: (
          <ItemGroup className="max-w-md">
            <Item variant="outline">
              <ItemMedia variant="icon"><BookOpen /></ItemMedia>
              <ItemContent>
                <ItemTitle>Charte graphique</ItemTitle>
                <ItemDescription>Fond, glyphe, couleur.</ItemDescription>
              </ItemContent>
              <ItemActions><Button size="sm" variant="outline">Voir</Button></ItemActions>
            </Item>
            <ItemSeparator />
            <Item variant="muted" size="sm">
              <ItemContent>
                <ItemTitle>Variante muted</ItemTitle>
              </ItemContent>
            </Item>
          </ItemGroup>
        ),
      },
    ],
    usage: `<Item variant="outline">
  <ItemContent>
    <ItemTitle>Titre</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
</Item>`,
  },
  {
    id: "button-group",
    name: "Groupe de boutons",
    icon: Layers,
    file: "button-group",
    intro: "Des boutons accolés qui partagent une même bordure.",
    demos: [
      {
        label: "Groupe",
        node: (
          <ButtonGroup>
            <Button variant="outline">Jour</Button>
            <Button variant="outline">Semaine</Button>
            <ButtonGroupSeparator />
            <ButtonGroupText>Mois</ButtonGroupText>
          </ButtonGroup>
        ),
      },
    ],
    usage: `<ButtonGroup>
  <Button variant="outline">Jour</Button>
  <Button variant="outline">Semaine</Button>
</ButtonGroup>`,
  },
  {
    id: "chart",
    name: "Graphique",
    icon: ChartColumn,
    intro:
      "Des graphiques Recharts habillés par le thème : chaque série prend un token de la palette de données, l'infobulle et la légende suivent les surfaces.",
    file: "chart",
    demos: [
      {
        label: "Barres",
        node: (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="web" fill="var(--color-web)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        ),
      },
      {
        label: "Aires empilées",
        node: (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.3} stroke="var(--color-mobile)" stackId="a" />
              <Area dataKey="web" type="natural" fill="var(--color-web)" fillOpacity={0.3} stroke="var(--color-web)" stackId="a" />
            </AreaChart>
          </ChartContainer>
        ),
      },
      {
        label: "Lignes",
        node: (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Line dataKey="web" type="monotone" stroke="var(--color-web)" strokeWidth={2} dot={false} />
              <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        ),
      },
    ],
    usage: `const chartConfig = {
  web: { label: "Web", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-64 w-full">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="web" fill="var(--color-web)" radius={4} />
  </BarChart>
</ChartContainer>`,
  },
]

/** Une page par composant shadcn, générée depuis la liste ci-dessus. */
export const componentResources = pages.map((page) =>
  definePage({
    id: `component-${page.id}`,
    name: page.name,
    icon: page.icon,
    intro: page.intro,
    view: () => (
      <>
        <Section title="Aperçu">
          {page.demos.map((demo) => (
            <Example key={demo.label} label={demo.label}>
              {demo.node}
            </Example>
          ))}
          {page.id === "sonner" && <Toaster />}
        </Section>
        <Section title="Installation" intro="Depuis le registry, dans un projet où le style hermez est installé.">
          <CodeBlock>{installCommand(page.file)}</CodeBlock>
        </Section>
        <Section title="Utilisation" intro={<>Source : <code className="font-mono text-sm">src/ui/{page.file}.tsx</code></>}>
          <CodeBlock>{`import { … } from "@/ui/${page.file}"\n\n${page.usage}`}</CodeBlock>
        </Section>
      </>
    ),
  })
)
