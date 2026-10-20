import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ActionList } from "react-data-form"
import {
  configurePorts,
  createAdminLayout,
  parseLink,
  ResourceViewProvider,
  type ScopeInterface,
} from "react-resource-view"
import { Github } from "lucide-react"
import { menu, overviewResource, resources } from "./pages"
import { seedDemoData } from "./pages/resource-view"
import { Logo } from "./logo"
import "./fonts"
import "./styles.css"

/**
 * Le site du design system, construit avec le gabarit d'administration de
 * Resource View : chaque page est une ressource, le menu est celui de la portée.
 */
const SCOPE = "design-system"

// GitHub Pages sert le site sous /<dépôt>/ et n'a aucun serveur pour répondre à
// un chemin profond : tout le contexte de la vue voyage donc dans la query string.
configurePorts({
  routing: { mode: "query", param: "view", basePath: import.meta.env.BASE_URL },
  appName: "Design system",
  description: "Tokens, composants et implémentation Resource View.",
  appUrl: window.location.origin,
})

seedDemoData()

const scope: ScopeInterface = {
  name: SCOPE,
  label: "Design system",
  resources,
  menu,
  decoratorComponent: createAdminLayout({
    logo: <Logo />,
    footerMenu: [
      {
        name: "Brand Assets",
        icon: Github,
        href: "https://github.com/hermez-agency/brand-assets",
      },
    ],
  }),
  defaultViewResourceContextParams: {
    resourceId: overviewResource["@id"] as string,
    resourceAction: ActionList.read,
  },
}

const params = parseLink(window.location.pathname + window.location.search)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResourceViewProvider
      viewResourceContextParams={{
        resourceId: overviewResource["@id"] as string,
        resourceAction: ActionList.read,
        ...params,
        scope: SCOPE,
      }}
      configuration={{
        scopes: { [SCOPE]: async () => scope },
        defaultScope: SCOPE,
      }}
    />
  </StrictMode>
)
