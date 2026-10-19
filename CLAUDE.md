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

Les images sont générées manuellement avec `google/gemini-2.5-flash-image` via OpenRouter. Il n'y a pas de script automatisé dans le dépôt pour ça : le processus se fait à la main, projet par projet.

## Arborescence

```
projects/
  <nom-du-projet>/
    icon.png
    banner.png
```

Chaque projet a son propre dossier sous `projects/`, nommé exactement comme le dépôt GitHub correspondant (ex. `trader-ia`, `react-data-form`). Ce dossier contient `icon.png` et `banner.png`.

## Conventions

- **Fond** : `#0f172a` (slate-900)
- **Glyphe** : icône de ligne façon Lucide, traits fins, extrémités arrondies, sans remplissage
- **Icône** : 1024 × 1024, carré à coins arrondis, marge généreuse
- **Bannière** : 1536 × 672 (21:9), glyphe à gauche, nom du projet en blanc, sous-titre en anglais en gris ardoise, halo sky en bas à droite
- **Une seule couleur pour tous les produits** : sky `#38bdf8`. Exceptions (Hermez, Opoil) dans le README, ne pas les dupliquer ici

## Pièges connus

- Les produits sont signés Hermez (« A Hermez product »), pas « Salvador Cardona » ni « l'agence Cardona » : ce nom ne s'affiche que dans les mentions légales. Les dossiers `SalvadorCardona` et `salvadorcardona.github.io` gardent leur nom parce qu'ils suivent celui du dépôt GitHub.

- Un projet qui a déjà son propre logo (ex. Opoil) **ne doit pas être régénéré** : on garde son logo maison et sa couleur de marque, on ne le remplace pas par le glyphe générique.
