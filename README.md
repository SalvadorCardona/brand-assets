![Hermez](https://raw.githubusercontent.com/SalvadorCardona/brand-assets/main/projects/hermez/banner.png)

# brand-assets

Identité de Hermez, l'agence digitale qui porte les produits, et icônes et bannières
de ses projets open source (dépôts [@SalvadorCardona](https://github.com/SalvadorCardona)).
Un seul système visuel, une même couleur pour tous les produits.

## Hermez

- **Nom** : « Hermez » en anglais, « Hermez agency » quand il faut préciser
- **Logo** : un h et son point dans un carré arrondi bordé d'orange (variante 4D « contour »), suivi de « hermez » en Outfit 700. Fichiers SVG (texte vectorisé), PNG, favicon et image de partage dans `site/public/hermez/`, publiés sur <https://salvadorcardona.github.io/brand-assets/hermez/> (ex. `hermez-logo.svg`, `hermez-symbol.svg`) ; règles d'usage sur la page « Logo Hermez » du site. Couleurs : orange `#e8611a` (`#f2803f` sur fond sombre), encre `#18181b`, fond sombre `#141414`
- **Logos obsolètes** : le « C » de l'agence Cardona et le H à trois plumes d'aile (`projects/hermez/icon.png`, `banner.png`) ne sont plus le logo actuel ; ne plus les reprendre
- **Couleur** : argent `#e2e8f0`, neutre, pour ne se confondre avec aucun produit
- **Signature** : en pied de page de chaque produit, en texte et en anglais :

  ```
  A Hermez product
  ```

  Le nom de l'éditeur (nom, raison sociale, SIRET) reste dans les mentions légales,
  qui sont obligatoires ; il n'apparaît pas ailleurs dans l'interface.

## Charte

- **Fond** : `#0f172a` (slate-900, repris du favicon du portfolio)
- **Glyphe** : icône de ligne façon Lucide, traits fins, extrémités arrondies, sans remplissage
- **Logo existant** : un projet qui a déjà le sien le garde, avec sa couleur de marque — c'est le cas d'Opoil
- **Icône** : 1024 × 1024, carré à coins arrondis, marge généreuse
- **Bannière** : 1536 × 672 (21:9), glyphe à gauche, nom du projet en blanc, sous-titre **en anglais** en gris ardoise, halo sky en bas à droite (sauf Hermez et Opoil)
- **Génération** : `google/gemini-2.5-flash-image` via OpenRouter

## Projets

Tous les produits portent la même couleur : **sky `#38bdf8`**, pour le halo et le glyphe.

Exceptions :

- `hermez` — argent `#e2e8f0`, l'agence elle-même, pour ne se confondre avec aucun produit
- `opoil` — bleu pétrole `#38869c`, logo maison repris de [SalvadorCardona/opoil](https://github.com/SalvadorCardona/opoil) : `pwa/public/logo/opoil-mark.svg`

Les autres projets, en sky :

- `SalvadorCardona`
- `salvadorcardona.github.io` — site de Hermez : la bannière porte le logo Hermez
- `trader-ia`
- `whisper-desk`
- `ticket-runner`
- `gnome-claude-usage`
- `adam` (anciennement `mobile-factory`)
- `des-3d`
- `react-resource-view`
- `react-data-form`
- `jsonld-api-client`
- `jsonld-repository`
- `jsonld-item`
- `resource-registry`
- `react-jwt-session`
- `react-mini-i18n`
- `ssr-safe-storage`

## Utilisation

En tête du README d'un projet :

```markdown
![nom-du-projet](https://raw.githubusercontent.com/SalvadorCardona/brand-assets/main/projects/nom-du-projet/banner.png)
```

L'icône sert de `favicon`, d'icône d'application et d'icône de page Notion.

## Site du design system

Tokens, composants shadcn et implémentation [Resource View](https://github.com/SalvadorCardona/react-resource-view), une page chacun, plus une vue d'ensemble : <https://salvadorcardona.github.io/brand-assets/>.

```bash
cd site && pnpm install && pnpm dev
```

## Registry shadcn

Brand Assets est la source unique du design system de Hermez : les produits
installent tokens, polices, logo et composants depuis ce registry au lieu de les
redéfinir. Il est publié avec le site sur GitHub Pages :
<https://salvadorcardona.github.io/brand-assets/r/registry.json>. La page
« Registry » du site liste chaque item, sa commande d'installation et les tokens.

### L'ajouter dans un projet

Prérequis : un projet shadcn sur Tailwind CSS v4 (`npx shadcn@latest init`, de
préférence avec la base `base` et le preset `luma`, ceux des composants).

1. Installer le style, qui tire le thème, les polices et l'utilitaire `cn` :

   ```bash
   npx shadcn@latest add https://salvadorcardona.github.io/brand-assets/r/hermez.json
   ```

2. Installer les composants voulus :

   ```bash
   npx shadcn@latest add https://salvadorcardona.github.io/brand-assets/r/button.json
   ```

Pour installer par nom, déclarer le registry une fois dans `components.json` :

```json
{
  "registries": {
    "@hermez": "https://salvadorcardona.github.io/brand-assets/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @hermez/hermez @hermez/button @hermez/dialog @hermez/hermez-logo
```

### Items

| Item | Type | Contenu |
| --- | --- | --- |
| `hermez` | `registry:style` | Le thème, Bricolage Grotesque et Outfit (Fontsource), les règles de base (corps, titres) |
| `hermez-theme` | `registry:theme` | Les tokens : couleurs, palette de données, couleurs du logo, typographie, rayons, ombres, mouvement |
| `hermez-logo` | `registry:component` | `HermezMark` (le symbole en React) et les SVG du logo dans `public/hermez/` |
| `cn` | `registry:ui` | L'utilitaire de classes des composants |
| `button`, `card`, `dialog`… | `registry:ui` | Les composants shadcn de [Resource View](https://github.com/SalvadorCardona/react-resource-view), un item chacun |

### Le maintenir

`site/registry.json` déclare les items ; `pnpm registry:build` (lancé par
`pnpm build`) écrit un fichier par item dans `site/public/r/`. Le script relit les
tokens et les règles de base dans `site/src/styles.css` et les polices dans
`site/src/fonts.ts` : un token se change là, jamais dans le registry. Un nouveau
composant de `site/src/ui` s'ajoute à `registry.json` avec ses dépendances.
`REGISTRY_URL=http://localhost:5199/r/ pnpm registry:build` construit un registry
qui pointe vers un serveur local, pour l'essayer avant de le publier.
