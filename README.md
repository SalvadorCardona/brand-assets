![Hermez](https://raw.githubusercontent.com/SalvadorCardona/brand-assets/main/projects/hermez/banner.png)

# brand-assets

Identité de Hermez, l'agence digitale qui porte les produits, et icônes et bannières
de ses projets open source (dépôts [@SalvadorCardona](https://github.com/SalvadorCardona)).
Un seul système visuel, une même couleur pour tous les produits.

## Hermez

- **Nom** : « Hermez » en anglais, « Hermez agency » quand il faut préciser
- **Logo** (provisoire) : un H à trois plumes d'aile, glyphe de ligne comme les autres — `projects/hermez/icon.png`. Tracé en SVG et rendu par Chrome headless, pas par Gemini, comme la bannière du portfolio
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
