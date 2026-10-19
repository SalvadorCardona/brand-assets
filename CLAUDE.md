# brand-assets

Identité de Hermez (l'agence digitale qui porte les produits) et icônes et bannières des projets open source de [@SalvadorCardona](https://github.com/SalvadorCardona), rassemblées dans un système visuel unique.

## Stack

- `projects/` : des images (`.png`) organisées par projet, sans code.
- `site/` : le site du design system — React 19, Vite, Tailwind CSS v4, composants shadcn (base-luma) et `react-resource-view` (gabarit d'administration `AdminLayout`). Statique, sans backend, publié sur GitHub Pages par `.github/workflows/pages.yml` à chaque push sur `main`. Gestionnaire : pnpm.

## Commandes

Rien à exécuter à la racine. Dans `site/` :

- `pnpm install`
- `pnpm dev` : serveur de développement (port 3000)
- `pnpm typecheck`
- `pnpm build` : sortie dans `site/dist` ; `SITE_BASE=/brand-assets/` pour le préfixe de GitHub Pages
- `pnpm registry:build` : le registry shadcn dans `site/public/r` (lancé par `pnpm build`, non versionné)

Il n'y a ni test ni lint.

## Site (`site/`)

- Les tokens vivent dans `site/src/styles.css`, seule source. Les pages de tokens relisent les variables dans le navigateur (`useCssVar`), elles ne les recopient pas.
- Les composants shadcn sont dans `site/src/ui` (copie de ceux de Resource View).
- Un seul thème, celui du portfolio de l'agence (`salvadorcardona.github.io`) : gris « stone », orange `#e46212` (en `#bf4a02` sous un texte blanc), Bricolage Grotesque pour les titres (Fontsource, `src/fonts.ts`), police du système pour le texte. Clair seulement : `dark:` ne dépend que d'une classe `.dark` jamais posée.
- Les titres (`h1`–`h6`) prennent la police, la graisse et l'approche du thème par une règle hors couche dans `styles.css` : elle prime sur les utilitaires `font-semibold` ou `tracking-tight` posés dans les pages.
- Chaque page est une ressource Resource View (`definePage` dans `src/lib/doc.tsx`) ; le menu est dans `src/pages/index.ts`. Une page par famille de tokens (`src/pages/tokens`) et par composant (`src/pages/components/index.tsx`) : ajouter un token ou un composant, c'est ajouter sa page.
- Routage en mode `query` (`?view=…`) : GitHub Pages n'a pas de serveur pour les chemins profonds.
- Registry shadcn : `registry.json` déclare les items, `scripts/build-registry.ts` les construit. Les tokens (`registry:theme`) et les règles de base (`registry:style`) sont relus dans `styles.css` et `fonts.ts`, jamais recopiés dans `registry.json`. Un composant ajouté à `src/ui` s'ajoute aussi à `registry.json`.
- Communication abstraite : une agence digitale avec plusieurs produits, sans mettre un nom de personne en avant.

## Génération des visuels

Les visuels des produits refaits (Ponos, Leadz, react-resource-view, react-data-form, Whisper Desk, Opoil) sont dessinés en HTML et photographiés par Chrome sans tête : `cd site && pnpm visuals:build` (`site/scripts/build-visuals.ts`, mascottes et glyphes dans `site/scripts/visuals/`). Ajouter un produit, c'est ajouter une ligne à `products` et son SVG. Les autres projets gardent leurs anciennes images, générées à la main avec `google/gemini-2.5-flash-image` via OpenRouter, en attendant leur ticket.

## Arborescence

```
projects/
  <nom-du-projet>/
    icon.png
    icon.svg
    favicon-32.png / favicon-180.png / favicon-512.png
    banner.png
```

Chaque projet a son propre dossier sous `projects/`, nommé exactement comme le dépôt GitHub correspondant (ex. `trader-ia`, `react-data-form`). Ce dossier contient `icon.png` et `banner.png` ; les six produits refaits ont aussi `icon.svg` (aussi le favicon SVG) et `favicon-32|180|512.png`, produits par `pnpm visuals:build`.

## Conventions

- **DA** : celle du portfolio Hermez, décrite dans le README (fond clair `#fafaf9`, orange `#e8611a`, Bricolage Grotesque). L'ancien système (slate-900, glyphe Lucide, sky `#38bdf8`) ne reste que sur les projets pas encore refaits
- **Icône** : 1024 × 1024, carré à coins arrondis, bordure orange ; **bannière** : 1536 × 672 ; **card** : `card.png`, 1280 × 600
- **Une mascotte ou un logo validé ne se redessine pas** : on le recopie de son dépôt. Orange pour tous les produits, sauf Opoil (son bleu pétrole) et Hermez, exceptions décrites dans le README, ne pas les dupliquer ici

## Pièges connus

- Les produits sont signés Hermez (« A Hermez product »), pas « Salvador Cardona » ni « l'agence Cardona » : ce nom ne s'affiche que dans les mentions légales. Les dossiers `SalvadorCardona` et `salvadorcardona.github.io` gardent leur nom parce qu'ils suivent celui du dépôt GitHub.

- Un projet qui a déjà son propre logo (ex. Opoil) **ne doit pas être remplacé** : on garde son logo maison et sa couleur de marque.

- « ticket-runner » est l'ancien nom de Ponos : ne plus l'écrire (le dossier est `projects/ponos`).
