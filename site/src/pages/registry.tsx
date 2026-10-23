import { ArrowRight, Package } from "lucide-react"
import { ActionList } from "react-data-form"
import { generateLinkByResource, Link } from "react-resource-view"
import { CodeBlock, definePage, Section, useCssVar } from "@/lib/doc"
import { installCommand, registry, registryUrl } from "@/lib/registry"
import styles from "@/styles.css?raw"
import { Badge } from "@/ui/badge"
import { componentResources } from "./components"
import chatResource from "./components/chat"
import logoHermez from "./identity/logo-hermez"
import colors from "./tokens/colors"

type Item = (typeof registry.items)[number]

// Les tokens du thème : les variables des blocs `:root` de la feuille de style,
// celles que l'item `hermez-theme` publie.
const tokens = [...styles.matchAll(/:root\s*{([^}]*)}/g)].flatMap((block) =>
  [...block[1].matchAll(/^\s*--([\w-]+):/gm)].map((match) => match[1])
)

const groups: { title: string; intro: string; types: string[] }[] = [
  {
    title: "Style et thème",
    intro: "À installer en premier : le style tire le thème, les polices et l'utilitaire cn. Il remplace les couleurs du projet par celles de Hermez.",
    types: ["registry:style", "registry:theme"],
  },
  {
    title: "Identité",
    intro: "Le symbole Hermez en composant React, et les SVG du logo copiés dans public/hermez/.",
    types: ["registry:component"],
  },
  {
    title: "Composants",
    intro: "Les composants shadcn de Resource View (base-luma), chacun avec ses dépendances.",
    types: ["registry:ui"],
  },
]

/** La page du site qui montre l'item, quand il en a une. */
function pageOf(item: Item) {
  if (item.name === "hermez-theme") return colors
  if (item.name === "hermez-logo") return logoHermez
  if (item.name.startsWith("chat")) return chatResource
  return componentResources.find((resource) => resource["@id"] === `component-${item.name}`)
}

function RegistryItem({ item }: { item: Item }) {
  const page = pageOf(item)

  return (
    <li className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base">{item.title}</h3>
        <Badge variant="outline" className="font-mono">{item.name}</Badge>
        <Badge variant="secondary" className="font-mono">{item.type}</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      <pre className="mt-3 overflow-x-auto rounded-md bg-muted/60 px-3 py-2 font-mono text-xs">
        <code>{installCommand(item.name)}</code>
      </pre>
      {page && (
        <Link
          to={generateLinkByResource({ resource: page, resourceAction: ActionList.read })}
          className="mt-3 inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
        >
          Voir la page
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </li>
  )
}

function Token({ name }: { name: string }) {
  const value = useCssVar(`--${name}`)

  return (
    <li className="flex min-w-0 items-center gap-3 border-b border-border py-2">
      <span
        className="size-6 shrink-0 rounded-md border border-border"
        style={value.startsWith("#") ? { background: value } : undefined}
      />
      <span className="truncate font-mono text-xs">--{name}</span>
      <span className="ml-auto truncate font-mono text-xs text-muted-foreground">{value}</span>
    </li>
  )
}

export default definePage({
  id: "registry",
  name: "Registry",
  icon: Package,
  title: "Registry shadcn",
  intro:
    "Le design system s'installe dans n'importe quel projet shadcn : tokens, polices, logo et composants viennent d'ici, au lieu d'être redéfinis dans chaque produit.",
  view: () => (
    <>
      <Section
        title="Installation"
        intro="Dans un projet shadcn (Tailwind CSS v4), installer le style, puis les composants voulus."
      >
        <CodeBlock>{`${installCommand("hermez")}\n${installCommand("button", "card", "dialog")}`}</CodeBlock>
        <p className="text-sm text-muted-foreground">
          Ou déclarer le registry une fois dans <code className="font-mono">components.json</code>, puis
          installer par nom :
        </p>
        <CodeBlock>{`{
  "registries": {
    "@hermez": "${registryUrl}{name}.json"
  }
}

npx shadcn@latest add @hermez/hermez @hermez/button`}</CodeBlock>
      </Section>
      {groups.map((group) => (
        <Section key={group.title} title={group.title} intro={group.intro}>
          <ul className="grid gap-3 lg:grid-cols-2">
            {registry.items
              .filter((item) => group.types.includes(item.type))
              .map((item) => (
                <RegistryItem key={item.name} item={item} />
              ))}
          </ul>
        </Section>
      ))}
      <Section
        title="Tokens"
        intro={`Les ${tokens.length} variables que l'item hermez-theme écrit dans :root, avec leur valeur sur ce site.`}
      >
        <ul className="grid gap-x-8 md:grid-cols-2">
          {tokens.map((name) => (
            <Token key={name} name={name} />
          ))}
        </ul>
      </Section>
    </>
  ),
})
