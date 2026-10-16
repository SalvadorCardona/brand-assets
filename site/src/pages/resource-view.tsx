import { ActionList } from "react-data-form"
import { LayoutDashboard, TableProperties } from "lucide-react"
import { localStorageRepository } from "jsonld-repository"
import { setInStorage } from "ssr-safe-storage"
import {
  createViewResource,
  layout,
  ViewResourceContextProvider,
} from "react-resource-view"
import { CodeBlock, definePage, Example, Section } from "@/lib/doc"

interface Product {
  "@id": string
  "@type": string
  id: string
  name: string
  tagline: string
  active: boolean
}

const PRODUCTS: Product[] = [
  { "@id": "/api/products/1", "@type": "Product", id: "1", name: "Animalink", tagline: "Le réseau des animaux", active: true },
  { "@id": "/api/products/2", "@type": "Product", id: "2", name: "Trader IA", tagline: "Des signaux, sans bruit", active: true },
  { "@id": "/api/products/3", "@type": "Product", id: "3", name: "Whisper Desk", tagline: "La dictée au bureau", active: false },
]

/** Les produits de démonstration, lus dans le stockage du navigateur : pas de serveur. */
export function seedDemoData(): void {
  setInStorage("showcase_products", {
    "@id": "showcase_products",
    "@type": "Collection",
    member: PRODUCTS,
    totalItems: PRODUCTS.length,
  })
}

const storage = localStorageRepository({ path: "showcase_products" })

export const productsResource = createViewResource<Product>("showcase_products", {
  name: "Produits",
  storage: "local",
  repository: {
    createItem: storage.createItem as never,
    updateItem: storage.updateItem as never,
    removeItem: storage.removeItem as never,
  },
  form: {
    inputs: {
      name: { label: "Nom", required: true },
      tagline: { label: "Accroche" },
      active: { label: "Actif" },
    },
  },
  views: {
    list: {
      filters: { inputs: { name: { label: "Chercher un nom" } } },
      layouts: [layout.table(), layout.cards({ columns: 2 })],
      rowActions: ["read", "update", "delete"],
    },
    read: { open: "drawer" },
    update: { open: "dialog" },
  },
})

const declaration = `createViewResource("showcase_products", {
  name: "Produits",
  storage: "local",
  form: {
    inputs: {
      name: { label: "Nom", required: true },
      tagline: { label: "Accroche" },
      active: { label: "Actif" },
    },
  },
  views: {
    list: {
      layouts: [layout.table(), layout.cards({ columns: 2 })],
      rowActions: ["read", "update", "delete"],
    },
  },
})`

const scopeCode = `const scope: ScopeInterface = {
  name: "design-system",
  decoratorComponent: createAdminLayout({ logo, footerMenu }),
  resources: [...pages],
  menu: [overviewResource, { name: "Tokens", items: tokenPages }, …],
}`

export const listsResource = definePage({
  id: "resource-view-lists",
  name: "Listes et formulaires",
  icon: TableProperties,
  intro:
    "L'implémentation de référence : une ressource déclarée, et Resource View dessine la liste, le détail, les formulaires et la confirmation de suppression, avec les composants de ce système.",
  view: () => (
    <>
      <Section
        title="En marche"
        intro="Filtrez, passez du tableau aux cartes, ouvrez un produit. Rien ne quitte votre navigateur."
      >
        <Example label="Une ressource, intégrée dans la page">
          <ViewResourceContextProvider
            resource={productsResource}
            resourceAction={ActionList.list}
            scope="design-system"
          />
        </Example>
      </Section>
      <Section title="Ce qui est déclaré">
        <CodeBlock>{declaration}</CodeBlock>
      </Section>
    </>
  ),
})

export const adminResource = definePage({
  id: "resource-view-admin",
  name: "Gabarit d'administration",
  icon: LayoutDashboard,
  intro:
    "Ce site est construit sur le gabarit d'administration de Resource View : barre latérale repliable, barre du haut, fil d'Ariane, et barre de navigation en bas sur mobile.",
  view: () => (
    <>
      <Section
        title="Rien d'écrit à la main"
        intro="Chaque page est une ressource ; le menu est celui de la portée."
      >
        <p className="max-w-2xl text-sm text-muted-foreground">
          La barre latérale que vous utilisez est <code className="font-mono">AdminLayout</code>,
          nourrie par le menu ci-dessous. Les produits de l'agence peuvent reprendre le même
          gabarit : ils héritent ainsi des tokens, des composants et de la navigation.
        </p>
        <CodeBlock>{scopeCode}</CodeBlock>
      </Section>
    </>
  ),
})
