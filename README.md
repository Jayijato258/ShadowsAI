<div align="center">
  <img src="assets/shadowsai-logo.jpg" alt="ShadowsAI Logo" width="300"/>
  
  # ShadowsAI
  
  **Intelligence Artificielle Auto-Apprenante Multiplateforme**
  
  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Jayijato258/ShadowsAI)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![Platform](https://img.shields.io/badge/platform-Web%20%7C%20macOS-lightgrey.svg)](https://shadowsai.vercel.app)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
  [![Minecraft](https://img.shields.io/badge/Minecraft-Mod%20Support-green.svg)](https://minecraft.net/)
  
</div>

---

ShadowsAI est un système d'intelligence artificielle révolutionnaire qui apprend de manière autonome avec une interface utilisateur moderne, entièrement en français et disponible sur web et macOS.

## 🚀 Fonctionnalités Principales

### 🧠 Intelligence Artificielle
- **Apprentissage Autonome** : L'IA évolue et s'améliore continuellement
- **Chat Conversationnel** : Interface textuelle et vocale intuitive
- **Analyse Comportementale** : Compréhension des patterns d'utilisation
- **Métriques Avancées** : Suivi en temps réel des performances

### 🎮 Intégration Minecraft
- **🔧 Générateur de Mods** : Création automatique de mods Minecraft
- **📊 Collecte de Données** : Analyse du comportement de jeu
- **🎯 Apprentissage Adaptatif** : L'IA apprend de vos habitudes de jeu
- **⚙️ Support Multi-Versions** : Compatible avec les versions récentes de Minecraft
- **🤖 Assistant IA In-Game** : Aide contextuelle pendant le jeu

### 🌐 Connectivité & Stockage
- **Scanner Réseau** : Détection et interaction avec appareils locaux
- **Synology Integration** : Stockage sur serveurs NAS
- **Cloud Sync** : Synchronisation des données d'apprentissage

### 📊 Visualisation & Analytics
- **Graphe de Connaissances** : Visualisation des connexions d'apprentissage
- **Dashboard Temps Réel** : Métriques de performance instantanées
- **Historique d'Apprentissage** : Suivi de l'évolution de l'IA

## 🎮 Fonctionnalités Minecraft

### Générateur de Mods Intelligent
- **Templates Prédéfinis** :
  - 🎯 **Behavior Tracker** : Analyse des actions du joueur
  - 🌍 **World Analyzer** : Étude des constructions et explorations
  - 🤖 **AI Assistant** : Aide contextuelle in-game
  - ⚡ **Smart Automation** : Automatisation intelligente des tâches

### Apprentissage du Gameplay
- **Pattern Recognition** : Détection des habitudes de construction
- **Resource Management** : Optimisation de la gestion des ressources
- **Combat Analysis** : Amélioration des stratégies de combat
- **Exploration Mapping** : Cartographie intelligente des mondes

## 📋 Prérequis

### Application Web
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet pour les fonctionnalités IA

### Application macOS
- macOS 10.14 ou plus récent
- 4 GB RAM minimum, 8 GB recommandé

### Développement
- Node.js 18+ 
- npm ou pnpm
- Git

## 🛠 Installation

### 🌐 Version Web (Recommandée)
Accédez directement à [shadowsai.vercel.app](https://shadowsai.vercel.app) - aucune installation requise !

### 💻 Version macOS
1. Téléchargez le fichier `.dmg` depuis les [Releases](https://github.com/Jayijato258/ShadowsAI/releases)
2. Montez le fichier DMG
3. Glissez ShadowsAI.app vers Applications
4. Lancez l'application

### 🎮 Mods Minecraft
1. Utilisez l'interface web pour générer votre mod
2. Téléchargez le fichier `.jar` généré
3. Placez-le dans votre dossier `mods/` de Minecraft
4. Lancez Minecraft avec Forge/Fabric

## 🚀 Développement

### Installation
\`\`\`bash
# Cloner le projet
git clone https://github.com/Jayijato258/ShadowsAI.git
cd ShadowsAI

# Installer les dépendances
pnpm install

# Lancer en mode développement
pnpm dev
\`\`\`

### Scripts Disponibles
\`\`\`bash
# Développement web
pnpm dev              # Serveur de développement
pnpm build            # Build de production
pnpm start            # Serveur de production

# Compilation macOS (branche séparée)
pnpm electron-dev     # Développement Electron
pnpm pack-mac         # Compilation macOS
pnpm dist             # Distribution avec installateur

# Utilitaires
pnpm lint             # Vérification du code
pnpm type-check       # Vérification TypeScript
\`\`\`

## 🎯 Utilisation

### Interface Web
1. **Chat IA** : Conversez avec l'intelligence artificielle
2. **Générateur Minecraft** : Créez des mods personnalisés
3. **Analytics** : Visualisez les données d'apprentissage
4. **Configuration** : Personnalisez les paramètres

### Mods Minecraft
1. **Génération** : Sélectionnez un template et configurez
2. **Installation** : Téléchargez et installez le mod
3. **Jeu** : L'IA collecte et analyse vos données
4. **Évolution** : L'assistant s'améliore avec votre style de jeu

## 🏗 Architecture Technique

### Frontend
- **Framework** : Next.js 14 + React 18
- **Styling** : Tailwind CSS v4 + Radix UI
- **Charts** : Recharts pour les visualisations
- **Icons** : Lucide React

### Backend & IA
- **AI SDK** : Vercel AI SDK + OpenAI
- **API Routes** : Next.js API Routes
- **Real-time** : WebSocket pour les mises à jour live

### Minecraft Integration
- **Mod Generation** : Templates Java/Kotlin
- **Data Collection** : JSON API pour les métriques
- **Version Support** : Forge 1.20+ / Fabric 1.20+

### Déploiement
- **Web** : Vercel (Production)
- **Desktop** : Electron + GitHub Releases
- **CI/CD** : GitHub Actions

## 🔧 Configuration

### Variables d'Environnement
\`\`\`env
# IA Configuration
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_AI_MODEL=gpt-4

# Minecraft Integration
NEXT_PUBLIC_MINECRAFT_API_URL=your_api_url
MINECRAFT_MOD_TEMPLATES_PATH=./templates

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
\`\`\`

### Personnalisation
- **Thèmes** : Mode sombre/clair automatique
- **Langue** : Interface entièrement en français
- **IA** : Paramètres d'apprentissage ajustables
- **Minecraft** : Templates de mods personnalisables

## 📊 Métriques & Analytics

- **Interactions IA** : Nombre et qualité des conversations
- **Apprentissage** : Progression des modèles
- **Minecraft** : Statistiques de gameplay collectées
- **Performance** : Temps de réponse et utilisation ressources

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Distribué sous licence MIT. Voir `LICENSE` pour plus d'informations.

## 🔗 Liens Utiles

- **🌐 Application Web** : [shadowsai.vercel.app](https://shadowsai.vercel.app)
- **📱 Téléchargements** : [GitHub Releases](https://github.com/Jayijato258/ShadowsAI/releases)
- **📖 Documentation** : [Wiki du projet](https://github.com/Jayijato258/ShadowsAI/wiki)
- **🐛 Signaler un Bug** : [Issues GitHub](https://github.com/Jayijato258/ShadowsAI/issues)
- **💬 Discussions** : [GitHub Discussions](https://github.com/Jayijato258/ShadowsAI/discussions)

---

<div align="center">
  
**ShadowsAI** - L'avenir de l'intelligence artificielle personnelle et gaming
  
*Développé avec ❤️ en France*

</div>
