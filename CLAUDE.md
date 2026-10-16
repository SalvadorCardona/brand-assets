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

Il n'y a ni test ni lint.

## Site (`site/`)

- Les tokens vivent dans `site/src/styles.css`, seule source. Les pages de tokens relisent les variables dans le navigateur (`useCssVar`), elles ne les recopient pas.
- Les composants shadcn sont dans `site/src/ui` (copie de ceux de Resource View).
- Chaque page est une ressource Resource View (`definePage` dans `src/lib/doc.tsx`) ; le menu est dans `src/pages/index.ts`. Une page par famille de tokens (`src/pages/tokens`) et par composant (`src/pages/components/index.tsx`) : ajouter un token ou un composant, c'est ajouter sa page.
- Routage en mode `query` (`?view=…`) : GitHub Pages n'a pas de serveur pour les chemins profonds.
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

Chaque projet a son propre dossier sous `projects/`, nommé exactement comme le dépôt GitHub correspondant (ex. `animalink`, `react-data-form`). Ce dossier contient `icon.png` et `banner.png`.

## Conventions

- **Fond** : `#0f172a` (slate-900)
- **Glyphe** : icône de ligne façon Lucide, traits fins, extrémités arrondies, sans remplissage
- **Icône** : 1024 × 1024, carré à coins arrondis, marge généreuse
- **Bannière** : 1536 × 672 (21:9), glyphe à gauche, nom du projet en blanc, sous-titre en anglais en gris ardoise, halo de la couleur du projet en bas à droite
- **Une couleur par projet** — voir le tableau du README pour la liste complète, ne pas la dupliquer ici

## Pièges connus

- Les produits sont signés Hermez (« A Hermez product »), pas « Salvador Cardona » ni « l'agence Cardona » : ce nom ne s'affiche que dans les mentions légales. Les dossiers `SalvadorCardona` et `salvadorcardona.github.io` gardent leur nom parce qu'ils suivent celui du dépôt GitHub.

- Un projet qui a déjà son propre logo (ex. Opoil) **ne doit pas être régénéré** : on garde son logo maison et sa couleur de marque, on ne le remplace pas par le glyphe générique.
