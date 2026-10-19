import registry from "../../registry.json"

/** Le registry shadcn de Hermez : la liste des items, telle que `registry.json` la déclare. */
export { registry }

/** L'adresse publiée du registry, où `pnpm registry:build` écrit un fichier JSON par item. */
export const registryUrl = `${registry.homepage}r/`

/** La commande qui installe un item du registry dans un projet shadcn. */
export function installCommand(...names: string[]) {
  return `npx shadcn@latest add ${names.map((name) => `${registryUrl}${name}.json`).join(" ")}`
}
