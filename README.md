<div align="center">
  <img src="assets/shadowsai-logo.jpg" alt="ShadowsAI Logo" width="300"/>
  
  # ShadowsAI
  
  **Intelligence Artificielle Auto-Apprenante pour macOS**
  
  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Jayijato258/ShadowsAI)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![macOS](https://img.shields.io/badge/platform-macOS-lightgrey.svg)](https://www.apple.com/macos/)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
  
</div>

---

ShadowsAI est un système d'intelligence artificielle révolutionnaire qui apprend de manière autonome avec une interface utilisateur moderne, entièrement en français et optimisé pour macOS.

## 🚀 Fonctionnalités

- **🧠 Apprentissage Autonome** : L'IA évolue et s'améliore continuellement
- **💬 Interface Conversationnelle** : Chat textuel et vocal intuitif
- **🌐 Connectivité Réseau** : Scanner et interaction avec le réseau local
- **☁️ Stockage Synology** : Intégration avec serveurs Synology pour stockage de données
- **📊 Métriques Avancées** : Suivi en temps réel des performances et de l'apprentissage
- **🔗 Graphe de Connaissances** : Visualisation des connexions d'apprentissage
- **🎯 Module d'Entraînement** : Interface pour alimenter l'IA avec de nouvelles données
- **🍎 Application macOS Native** : Compilée avec Electron pour une expérience native

## 📋 Prérequis

- macOS 10.14 ou plus récent
- Node.js 18+ (pour le développement)
- npm ou yarn (pour le développement)

## 🛠 Installation pour Développeurs

### Développement
\`\`\`bash
# Cloner le projet
git clone https://github.com/votre-repo/shadowsai.git
cd shadowsai

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
\`\`\`

### Développement Electron
\`\`\`bash
# Lancer l'application Electron en développement
npm run electron-dev
\`\`\`

## 📦 Compilation pour macOS

### Créer l'exécutable
\`\`\`bash
# Construire et empaqueter pour macOS
npm run pack-mac

# Créer un installateur DMG complet
npm run dist
\`\`\`

Les fichiers de distribution seront créés dans le dossier `dist/` :
- `ShadowsAI-1.0.0.dmg` : Installateur DMG
- `ShadowsAI-1.0.0-mac.zip` : Archive ZIP de l'application

## 🎮 Utilisation

1. **Lancement** : Double-cliquez sur ShadowsAI.app
2. **Chat** : Interagissez par texte ou voix avec l'IA
3. **Réseau** : Explorez et connectez-vous aux appareils locaux
4. **Synology** : Configurez votre serveur pour le stockage
5. **Apprentissage** : Observez l'évolution en temps réel
6. **Entraînement** : Alimentez l'IA avec vos propres données

## 🏗 Architecture Technique

- **Frontend** : Next.js 14 + React 18
- **UI** : Tailwind CSS + Radix UI
- **Desktop** : Electron pour macOS
- **IA** : AI SDK + OpenAI
- **Graphiques** : Recharts
- **Stockage** : Synology NAS + Local

## 📱 Scripts Disponibles

- `npm run dev` : Développement Next.js
- `npm run build` : Construction de production
- `npm run electron-dev` : Développement Electron
- `npm run pack-mac` : Compilation macOS
- `npm run dist` : Distribution complète avec installateur

## 🔧 Configuration

L'application se configure automatiquement au premier lancement. Vous pouvez :
- Configurer votre serveur Synology
- Ajuster les paramètres d'apprentissage
- Personnaliser l'interface utilisateur
- Gérer les connexions réseau

---

**ShadowsAI** - L'avenir de l'intelligence artificielle personnelle sur macOS.
