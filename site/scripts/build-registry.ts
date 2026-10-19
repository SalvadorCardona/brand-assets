/*
 * Construit le registry shadcn de Hermez dans `public/r/`, que Vite copie dans
 * `dist/r/` et que GitHub Pages publie à côté du site.
 *
 * `registry.json` liste les items. Ce script y ajoute ce qui ne doit pas être
 * recopié à la main :
 * - le contenu des fichiers de chaque item ;
 * - les tokens du thème (`registry:theme`), relus dans `src/styles.css` ;
 * - les règles de base et les polices du style (`registry:style`), relues dans
 *   `src/styles.css` et `src/fonts.ts` ;
 * - la version de chaque dépendance npm, celle de `package.json` ;
 * - l'adresse complète des dépendances internes (`button` → `<registry>/button.json`).
 *
 * `REGISTRY_URL` remplace l'adresse publiée, pour essayer le registry en local.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { registryItemSchema, registrySchema } from "shadcn/schema"

type CssTree = { [key: string]: string | CssTree }

interface CssNode {
  prelude: string
  body?: string
}

const root = new URL("../", import.meta.url)
const read = (path: string) => readFileSync(new URL(path, root), "utf8")

const registry = registrySchema.parse(JSON.parse(read("registry.json")))
const base = process.env.REGISTRY_URL ?? `${registry.homepage}r/`
const packageJson = JSON.parse(read("package.json"))
const versions: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies }

/** Les règles et instructions d'un niveau de CSS, sans les commentaires. */
function parseCss(css: string): CssNode[] {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const nodes: CssNode[] = []
  let start = 0
  let depth = 0
  let open = 0

  for (let i = 0; i < source.length; i++) {
    const char = source[i]
    if (char === "{" && depth++ === 0) open = i
    else if (char === "}" && --depth === 0) {
      nodes.push({ prelude: source.slice(start, open).trim(), body: source.slice(open + 1, i) })
      start = i + 1
    } else if (char === ";" && depth === 0) {
      nodes.push({ prelude: source.slice(start, i).trim() })
      start = i + 1
    }
  }

  return nodes
}

/** Un bloc CSS au format `css` de shadcn : déclarations, `@apply` et blocs imbriqués. */
function toTree(body: string): CssTree {
  const tree: CssTree = {}

  for (const node of parseCss(body)) {
    if (node.body !== undefined) tree[node.prelude] = toTree(node.body)
    else if (node.prelude.startsWith("@")) tree[node.prelude] = {}
    else {
      const colon = node.prelude.indexOf(":")
      tree[node.prelude.slice(0, colon).trim()] = node.prelude.slice(colon + 1).trim().replace(/\s+/g, " ")
    }
  }

  return tree
}

/** Les variables CSS d'un bloc, sans leur `--` comme le veut `cssVars`. */
function variables(body: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(toTree(body))
      .filter((entry): entry is [string, string] => entry[0].startsWith("--") && typeof entry[1] === "string")
      .map(([name, value]) => [name.slice(2), value])
  )
}

const styles = parseCss(read("src/styles.css")).filter((node) => node.body !== undefined)
const tokens: Record<string, string> = Object.assign({}, ...styles.filter((node) => node.prelude === ":root").map((node) => variables(node.body!)))
const theme: Record<string, string> = Object.assign({}, ...styles.filter((node) => node.prelude.startsWith("@theme")).map((node) => variables(node.body!)))

// shadcn recopie chaque variable de `cssVars.light` dans `@theme inline`. Seules
// les couleurs (celles qu'une `--color-*` reprend) et le rayon y passent ; les
// autres tokens (polices, ombres, mouvement) vont tels quels dans `:root`.
const isThemed = (name: string) => name === "radius" || `color-${name}` in theme
const split = (themed: boolean) => Object.fromEntries(Object.entries(tokens).filter(([name]) => isThemed(name) === themed))
const light = split(true)
const plain = Object.fromEntries(Object.entries(split(false)).map(([name, value]) => [`--${name}`, value]))
const rules = Object.fromEntries(
  styles
    .filter((node) => node.prelude !== ":root" && !node.prelude.startsWith("@theme"))
    .map((node) => [node.prelude, toTree(node.body!)])
)
const fonts = [...read("src/fonts.ts").matchAll(/^import "(.+)"$/gm)].map((match) => match[1])

const pin = (name: string) => (versions[name] ? `${name}@${versions[name]}` : name)
const packageOf = (path: string) => path.split("/").slice(0, path.startsWith("@") ? 2 : 1).join("/")
const local = new Set(registry.items.map((item) => item.name))

rmSync(new URL("public/r/", root), { recursive: true, force: true })
mkdirSync(new URL("public/r/", root), { recursive: true })

for (const item of registry.items) {
  const built = { $schema: "https://ui.shadcn.com/schema/registry-item.json", ...item }

  if (item.type === "registry:theme") {
    built.cssVars = { theme, light }
    built.css = { ":root": plain }
  }
  if (item.type === "registry:style") {
    built.dependencies = [...(item.dependencies ?? []), ...fonts.map(packageOf)]
    built.css = { ...Object.fromEntries(fonts.map((font) => [`@import "${font}"`, {}])), ...rules }
  }

  built.dependencies = built.dependencies?.map(pin)
  built.registryDependencies = item.registryDependencies?.map((name) => (local.has(name) ? `${base}${name}.json` : name))
  built.files = item.files?.map((file) => ({ ...file, content: read(file.path) }))

  writeFileSync(new URL(`public/r/${item.name}.json`, root), JSON.stringify(registryItemSchema.parse(built), null, 2) + "\n")
}

writeFileSync(new URL("public/r/registry.json", root), JSON.stringify(registry, null, 2) + "\n")
console.log(`Registry : ${registry.items.length} items dans public/r/ (${base})`)
