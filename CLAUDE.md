# brand-assets

Icônes et bannières des projets open source de [@SalvadorCardona](https://github.com/SalvadorCardona), rassemblées dans un système visuel unique.

## Stack

Aucune. Ce dépôt ne contient que des images (`.png`) organisées par projet. Pas de code applicatif, pas de dépendances.

## Commandes

Il n'y a ni installation, ni build, ni test, ni lint : rien à exécuter ici. Ne pas inventer de commandes `npm install`, `npm run build`, etc. — elles n'existent pas dans ce dépôt.

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

- Un projet qui a déjà son propre logo (ex. Opoil) **ne doit pas être régénéré** : on garde son logo maison et sa couleur de marque, on ne le remplace pas par le glyphe générique.
