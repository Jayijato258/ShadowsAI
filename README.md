# IA Auto-Apprenante pour macOS

Un système d'intelligence artificielle auto-apprenant avec interface utilisateur moderne, entièrement en français et compilé pour macOS.

## Fonctionnalités

- **Apprentissage en temps réel** : L'IA s'améliore continuellement
- **Interface française** : Entièrement localisée en français
- **Métriques avancées** : Suivi de la précision, base de connaissances, taux d'apprentissage
- **Graphe de connaissances** : Visualisation des connexions d'apprentissage
- **Module d'entraînement** : Interface pour alimenter l'IA avec de nouvelles données
- **Application macOS native** : Compilée avec Electron pour macOS

## Installation et Compilation

### Prérequis
- Node.js 18+
- npm ou yarn
- macOS (pour la compilation)

### Développement
\`\`\`bash
npm install
npm run dev
\`\`\`

### Compilation pour macOS
\`\`\`bash
# Construire l'application Electron
npm run pack-mac

# Créer un installateur DMG
npm run dist
\`\`\`

### Scripts disponibles
- `npm run dev` : Développement Next.js
- `npm run build` : Construction de production
- `npm run electron-dev` : Développement Electron
- `npm run pack-mac` : Compilation macOS (ZIP + DMG)
- `npm run dist` : Distribution complète

## Architecture

L'application utilise :
- **Next.js 14** : Framework React moderne
- **Electron** : Empaquetage pour macOS
- **Tailwind CSS** : Styles modernes
- **Recharts** : Graphiques et visualisations
- **AI SDK** : Intégration d'intelligence artificielle

## Utilisation

1. Lancez l'application
2. Cliquez sur "Commencer l'Apprentissage"
3. Observez les métriques en temps réel
4. Utilisez les onglets pour explorer les différentes fonctionnalités
5. Entraînez l'IA avec de nouvelles données dans l'onglet "Entraînement"
