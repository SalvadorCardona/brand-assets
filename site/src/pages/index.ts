import { Component, Fingerprint, LayoutTemplate, Palette, Server } from "lucide-react"
import type { ScopeMenuEntry } from "react-resource-view"
import { componentResources } from "./components"
import logoHermez from "./identity/logo-hermez"
import landingResource from "./examples/landing"
import overviewResource from "./overview"
import { adminResource, listsResource, productsResource } from "./resource-view"
import brandColors from "./tokens/brand-colors"
import colors from "./tokens/colors"
import motion from "./tokens/motion"
import radius from "./tokens/radius"
import shadows from "./tokens/shadows"
import spacing from "./tokens/spacing"
import typography from "./tokens/typography"

const tokenResources = [colors, brandColors, typography, spacing, radius, shadows, motion]
const identityResources = [logoHermez]
const implementationResources = [listsResource, adminResource]
const exampleResources = [landingResource]

/** Toutes les pages du site, dans l'ordre du menu. */
export const pages = [
  overviewResource,
  ...tokenResources,
  ...identityResources,
  ...componentResources,
  ...implementationResources,
  ...exampleResources,
]

/** Les ressources que le site sait afficher : les pages, plus celles que les démos montrent. */
export const resources = [...pages, productsResource]

export const menu: ScopeMenuEntry[] = [
  overviewResource,
  { name: "Tokens", icon: Palette, items: tokenResources },
  { name: "Identité", icon: Fingerprint, items: identityResources },
  { name: "Composants", icon: Component, items: componentResources },
  { name: "Resource View", icon: Server, items: implementationResources },
  { name: "Exemples", icon: LayoutTemplate, items: exampleResources },
]

export { overviewResource }
