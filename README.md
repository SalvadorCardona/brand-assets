![Hermez](https://raw.githubusercontent.com/hermez-agency/brand-assets/main/projects/hermez/banner.png)

# brand-assets

Identité de Hermez, l'agence digitale qui porte les produits, et icônes et bannières
de ses projets open source.
Un seul système visuel : celui du portfolio Hermez.

## Hermez

- **Nom** : « Hermez » en anglais, « Hermez agency » quand il faut préciser
- **Logo** : un h et son point dans un carré arrondi bordé d'orange (variante 4D « contour »), suivi de « hermez » en Outfit 700. Fichiers SVG (texte vectorisé), PNG, favicon et image de partage dans `site/public/hermez/`, publiés sur <https://hermez.dev/brand-assets/hermez/> (ex. `hermez-logo.svg`, `hermez-symbol.svg`) ; règles d'usage sur la page « Logo Hermez » du site. Couleurs : orange `#e8611a` (`#f2803f` sur fond sombre), encre `#18181b`, fond sombre `#141414`
- **Visuels** : `projects/hermez/icon.png` (1024 × 1024) et `banner.png` (1536 × 672) reprennent le logo du portfolio, orange sur fond clair `#fafaf9`, sous-titre en gris pierre
- **LinkedIn** : `projects/hermez/linkedin-logo.png` (300 × 300, le symbole) et `linkedin-banner.png` (1128 × 191, le logo à droite, hors de la photo de la page), générés par `pnpm visuals:build`
- **Logos obsolètes** : le « C » de l'agence Cardona et le H à trois plumes d'aile sur fond bleu nuit (ancien `projects/hermez/icon.png`, supprimé) ne sont plus le logo actuel ; ne plus les reprendre
- **Signature** : en pied de page de chaque produit, en texte et en anglais :

  ```
  A Hermez product
  ```

  Le nom de l'éditeur (nom, raison sociale, SIRET) reste dans les mentions légales,
  qui sont obligatoires ; il n'apparaît pas ailleurs dans l'interface.

## Charte

La DA est celle du portfolio de l'agence (<https://hermez.dev>), reprise de `site/src/styles.css`, seule source des tokens :

- **Logo Hermez** : le h et son point en carré arrondi bordé d'orange (variante 4D « contour »), « hermez » en Outfit 700
- **Fond** : clair, « stone » — `#fafaf9` (page), `#ffffff` (cartes), bordures `#e7e5e4`. Le sombre n'existe pas
- **Orange Hermez** : `#e8611a` (logo, glyphes et halo), `#e46212` (anneau de focus), `#bf4a02` sous un texte blanc ; encre `#18181b` / `#1c1917`, texte secondaire `#57534e`
- **Polices** : Bricolage Grotesque 800 pour les titres et les noms (Fontsource), Outfit 700 pour le logotype Hermez seul. Le texte courant prend la police du système sur le site ; les visuels, eux, composent le sous-titre en Bricolage 500 pour que le rendu ne dépende pas de la machine
- **Arrondis** : base `0.75rem` ; carré d'icône à 22,5 % de rayon
- **Fonds** : plats, avec un halo radial de la couleur du produit (18 %) en bas à droite, jamais de dégradé franc ni de texture
- **Identité produit** : chaque produit garde sa mascotte ou son logo et ne les change pas : le logo « Écran » de Ponos (un écran sombre à deux yeux sous une flamme, dans le cadre du symbole Hermez) et sa mascotte à plat, en trois formes et deux oranges, le ninja Leadzy, le logo maison d'Opoil. Les autres ont un glyphe en gros trait arrondi, dans l'esprit du symbole Hermez
- **Icône** : 1024 × 1024, carré à coins arrondis, fond blanc, bordure orange de 44 px, mascotte ou glyphe centré
- **Bannière** : 1536 × 672 — mascotte à gauche, nom du produit en Bricolage 800 (réduit jusqu'à tenir entier dans sa colonne, jamais coupé), sous-titre **en anglais**, signature « A Hermez product », halo en bas à droite
- **Card** : `card.png`, 1280 × 600 (32:15, le cadre des cards du portfolio), même mise en page avec des marges plus larges pour qu'un recadrage ne morde pas le texte
- **Génération** : `cd site && pnpm visuals:build` (Chrome sans tête), qui lit `site/scripts/build-visuals.ts`. Le nom est du vrai texte, pas une image générée : plus de nom faux ou tronqué

## Projets

Refaits dans cette DA (aperçu : [`previews/products.png`](previews/products.png)) :

| Dossier | Produit | Site | Mascotte / logo | Couleur |
| --- | --- | --- | --- | --- |
| `ponos` | Ponos — « Write the ticket. It comes back done. » (« Écrivez le ticket, il revient fait. ») | <https://the-ponos.app> | logo « Écran » et mascotte à plat | orange |
| `leadz-ninja` | Leadz | <https://leadz.ninja> | ninja Leadzy | orange |
| `react-resource-view` | react-resource-view | <https://hermez.dev/react-resource-view> | glyphe | orange |
| `react-data-form` | react-data-form | <https://hermez.dev/react-data-form> | glyphe | orange |
| `whisper-desk` | Whisper Desk | <https://hermez.dev/whisper-desk> | glyphe micro | orange |
| `opoil` | Opoil | <https://opoil.app> | logo maison (dépôt privé `hermez-agency/opoil` : `pwa/public/logo/opoil-mark.svg`) | bleu pétrole `#38869c` |

Déjà dans la DA du portfolio, par un autre ticket : `hermez` et `hermez.dev` (logo Hermez, orange sur fond clair).

La mascotte de Ponos (état idle), celle de Leadzy et le logo d'Opoil sont recopiés de leurs dépôts dans `site/scripts/visuals/`, jamais redessinés. `ticket-runner` est le nom d'avant Ponos : le dossier a disparu.

Pas encore repris dans la DA Hermez (ancien système : fond slate-900, glyphe Lucide sky `#38bdf8`), à refaire par un ticket à part :

- `trader-ia`, `gnome-claude-usage`, `adam` (anciennement `mobile-factory`), `des-3d`
- `jsonld-api-client`, `jsonld-repository`, `jsonld-item`, `resource-registry`, `react-jwt-session`, `react-mini-i18n`, `ssr-safe-storage`

## Utilisation

En tête du README d'un projet :

```markdown
![nom-du-projet](https://raw.githubusercontent.com/hermez-agency/brand-assets/main/projects/nom-du-projet/banner.png)
```

L'icône sert de `favicon`, d'icône d'application et d'icône de page Notion. Les produits refaits ont aussi `icon.svg` (favicon SVG) et `favicon-32.png`, `favicon-180.png`, `favicon-512.png` (générés par `pnpm visuals:build`).

## Site du design system

Tokens, composants shadcn et implémentation [Resource View](https://github.com/hermez-agency/react-resource-view), une page chacun, plus une vue d'ensemble : <https://hermez.dev/brand-assets/>.

```bash
cd site && pnpm install && pnpm dev
```

## Registry shadcn

Brand Assets est la source unique du design system de Hermez : les produits
installent tokens, polices, logo et composants depuis ce registry au lieu de les
redéfinir. Il est publié avec le site sur GitHub Pages :
<https://hermez.dev/brand-assets/r/registry.json>. La page
« Registry » du site liste chaque item, sa commande d'installation et les tokens.

### L'ajouter dans un projet

Prérequis : un projet shadcn sur Tailwind CSS v4 (`npx shadcn@latest init`, de
préférence avec la base `base` et le preset `luma`, ceux des composants).

1. Installer le style, qui tire le thème, les polices et l'utilitaire `cn` :

   ```bash
   npx shadcn@latest add https://hermez.dev/brand-assets/r/hermez.json
   ```

2. Installer les composants voulus :

   ```bash
   npx shadcn@latest add https://hermez.dev/brand-assets/r/button.json
   ```

Pour installer par nom, déclarer le registry une fois dans `components.json` :

```json
{
  "registries": {
    "@hermez": "https://hermez.dev/brand-assets/r/{name}.json"
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
| `chat`, `chat-message`, `chat-parts`… | `registry:ui` | Le kit de chat IA (messages et parts au format TanStack AI, saisie, sélecteur de modèle, historique, progression), thèmes clair et sombre ; `chat` les installe tous |
| `button`, `card`, `dialog`… | `registry:ui` | Les composants shadcn de [Resource View](https://github.com/hermez-agency/react-resource-view), un item chacun |

### Le maintenir

`site/registry.json` déclare les items ; `pnpm registry:build` (lancé par
`pnpm build`) écrit un fichier par item dans `site/public/r/`. Le script relit les
tokens et les règles de base dans `site/src/styles.css` et les polices dans
`site/src/fonts.ts` : un token se change là, jamais dans le registry. Un nouveau
composant de `site/src/ui` s'ajoute à `registry.json` avec ses dépendances.
`REGISTRY_URL=http://localhost:5199/r/ pnpm registry:build` construit un registry
qui pointe vers un serveur local, pour l'essayer avant de le publier.
