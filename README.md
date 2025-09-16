<div align="center">
  <img src="assets/shadowsai-logo.jpg" alt="ShadowsAI Logo" width="300"/>
  
  # ShadowsAI
  
  **Intelligence Artificielle Auto-Apprenante pour macOS**
  
  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Jayijato258/ShadowsAI)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![Platform](https://img.shields.io/badge/platform-macOS-lightgrey.svg)](https://github.com/Jayijato258/ShadowsAI)
  [![Electron](https://img.shields.io/badge/Electron-32-47848f.svg)](https://electronjs.org/)
  [![Minecraft](https://img.shields.io/badge/Minecraft-Mod%20Support-green.svg)](https://minecraft.net/)
  
</div>

---

ShadowsAI est une application native macOS d'intelligence artificielle révolutionnaire qui apprend de manière autonome. Avec une interface utilisateur moderne entièrement en français, elle offre des fonctionnalités avancées d'apprentissage automatique et d'intégration Minecraft.

## 🚀 Fonctionnalités Principales

### 🧠 Intelligence Artificielle Native
- **Apprentissage Autonome** : L'IA évolue et s'améliore continuellement
- **Chat Conversationnel** : Interface textuelle et vocale intuitive
- **Analyse Comportementale** : Compréhension des patterns d'utilisation
- **Métriques Avancées** : Suivi en temps réel des performances
- **Stockage Local** : Données d'apprentissage stockées localement sur votre Mac

### 🎮 Générateur de Mods Minecraft
- **🔧 Création Automatique** : Génération de mods Minecraft personnalisés
- **📊 Collecte de Données** : Analyse du comportement de jeu en temps réel
- **🎯 Apprentissage Adaptatif** : L'IA apprend de vos habitudes de jeu
- **⚙️ Support Multi-Versions** : Compatible Minecraft 1.20+ (Forge/Fabric)
- **🤖 Assistant IA In-Game** : Aide contextuelle pendant le jeu

### 🌐 Connectivité Avancée
- **Scanner Réseau Local** : Détection automatique des appareils
- **Intégration Synology** : Stockage sur serveurs NAS
- **Synchronisation Cloud** : Sauvegarde des données d'apprentissage
- **APIs Natives** : Accès aux fonctionnalités système macOS

### 📊 Visualisation & Analytics
- **Graphe de Connaissances** : Visualisation interactive des connexions
- **Dashboard Temps Réel** : Métriques de performance instantanées
- **Historique d'Apprentissage** : Suivi complet de l'évolution de l'IA
- **Rapports Détaillés** : Analyses approfondies des performances

## 🎮 Templates de Mods Minecraft

### Générateur Intelligent
- **🎯 Behavior Tracker** : Analyse complète des actions du joueur
- **🌍 World Analyzer** : Étude des constructions et explorations
- **🤖 AI Assistant** : Aide contextuelle et suggestions intelligentes
- **⚡ Smart Automation** : Automatisation avancée des tâches répétitives

### Apprentissage du Gameplay
- **Pattern Recognition** : Détection des habitudes de construction
- **Resource Management** : Optimisation de la gestion des ressources
- **Combat Analysis** : Amélioration des stratégies de combat
- **Exploration Mapping** : Cartographie intelligente des mondes

## 📋 Prérequis Système

### Configuration Minimale
- **macOS** : 10.15 (Catalina) ou plus récent
- **RAM** : 4 GB minimum, 8 GB recommandé
- **Stockage** : 500 MB d'espace libre
- **Processeur** : Intel x64 ou Apple Silicon (M1/M2/M3)

### Configuration Recommandée
- **macOS** : 12.0 (Monterey) ou plus récent
- **RAM** : 16 GB pour les performances optimales
- **Stockage** : 2 GB pour les données d'apprentissage
- **Connexion** : Internet pour les fonctionnalités IA

## 🛠 Installation

### 📦 Installation Rapide
1. Téléchargez le fichier `ShadowsAI-1.0.0.dmg` depuis les [Releases](https://github.com/Jayijato258/ShadowsAI/releases)
2. Montez le fichier DMG en double-cliquant
3. Glissez `ShadowsAI.app` vers le dossier `Applications`
4. Lancez l'application depuis le Launchpad ou Applications

### 🔒 Première Utilisation
1. **Autorisation de Sécurité** : Autorisez l'application dans Préférences Système > Sécurité
2. **Configuration IA** : Configurez votre clé API OpenAI (optionnel)
3. **Permissions** : Accordez les permissions réseau et fichiers si demandées
4. **Calibration** : Laissez l'IA se calibrer lors du premier lancement

## 🚀 Développement & Compilation

### Installation des Dépendances
\`\`\`bash
# Cloner le projet
git clone https://github.com/Jayijato258/ShadowsAI.git
cd ShadowsAI

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
\`\`\`

### Scripts de Build
\`\`\`bash
# Développement
npm run dev              # Mode développement avec hot-reload
npm run dev:electron     # Lancement Electron en développement

# Production
npm run build            # Build de l'interface Next.js
npm run build:electron   # Compilation Electron complète
npm run build:mac        # Build spécifique macOS (Universal)
npm run build:mac-arm64  # Build pour Apple Silicon
npm run build:mac-x64    # Build pour Intel

# Distribution
npm run dist             # Création des installateurs
npm run pack             # Empaquetage sans installateur
\`\`\`

### Structure du Projet
\`\`\`
ShadowsAI/
├── app/                 # Interface utilisateur Next.js
├── components/          # Composants React réutilisables
├── electron/           # Code Electron (main, preload)
├── assets/             # Icônes et ressources macOS
├── scripts/            # Scripts de build et utilitaires
└── dist/               # Fichiers de distribution générés
\`\`\`

## 🎯 Utilisation

### Interface Principale
1. **Dashboard IA** : Vue d'ensemble des métriques d'apprentissage
2. **Chat Intelligent** : Conversation avec l'IA auto-apprenante
3. **Interface Vocale** : Reconnaissance et synthèse vocale
4. **Générateur Minecraft** : Création de mods personnalisés
5. **Scanner Réseau** : Découverte d'appareils locaux
6. **Configuration Synology** : Stockage sur serveur NAS

### Génération de Mods Minecraft
1. **Sélection Template** : Choisissez parmi les templates prédéfinis
2. **Configuration** : Personnalisez les paramètres du mod
3. **Génération** : L'IA crée le mod selon vos spécifications
4. **Installation** : Téléchargez et installez automatiquement
5. **Apprentissage** : Le mod collecte des données pour l'IA

## 🏗 Architecture Technique

### Frontend Native
- **Framework** : Next.js 14 avec export statique
- **UI Components** : Radix UI + Tailwind CSS v4
- **Charts** : Recharts pour les visualisations
- **Icons** : Lucide React
- **Animations** : Framer Motion

### Backend Electron
- **Runtime** : Electron 32 avec sécurité renforcée
- **Process** : Main process + Renderer isolé
- **Storage** : Electron Store pour la persistance
- **APIs** : IPC sécurisé avec contextBridge
- **Security** : Context isolation + Preload scripts

### Intelligence Artificielle
- **AI SDK** : Vercel AI SDK + OpenAI GPT-4
- **Learning** : Apprentissage local avec sauvegarde
- **Models** : Stockage des modèles entraînés
- **Analytics** : Métriques de performance en temps réel

### Intégration Minecraft
- **Mod Generation** : Templates Java/Kotlin dynamiques
- **Data Collection** : APIs JSON pour les métriques
- **Version Support** : Forge 1.20+ / Fabric 1.20+
- **Auto-Install** : Installation automatique des mods

## 🔧 Configuration Avancée

### Variables d'Environnement
\`\`\`env
# Configuration IA
OPENAI_API_KEY=your_openai_key
AI_MODEL=gpt-4
AI_LEARNING_RATE=0.01

# Minecraft Integration
MINECRAFT_DIR=/Users/username/Library/Application Support/minecraft
MOD_TEMPLATES_PATH=./templates/minecraft

# Synology NAS
SYNOLOGY_HOST=your_nas_ip
SYNOLOGY_PORT=5000
SYNOLOGY_PROTOCOL=https
\`\`\`

### Personnalisation
- **Thèmes** : Mode sombre/clair avec adaptation système
- **Langue** : Interface entièrement en français
- **IA** : Paramètres d'apprentissage ajustables
- **Minecraft** : Templates de mods personnalisables
- **Raccourcis** : Raccourcis clavier macOS natifs

## 📊 Métriques & Performance

### Suivi d'Apprentissage
- **Précision** : Taux de réussite des prédictions
- **Base de Connaissances** : Nombre de concepts appris
- **Vitesse d'Apprentissage** : Progression par session
- **Confiance** : Niveau de certitude des réponses

### Analytics Minecraft
- **Temps de Jeu** : Durée et fréquence des sessions
- **Patterns de Construction** : Styles et préférences
- **Gestion des Ressources** : Efficacité et optimisation
- **Exploration** : Zones visitées et découvertes

## 🔒 Sécurité & Confidentialité

### Protection des Données
- **Stockage Local** : Toutes les données restent sur votre Mac
- **Chiffrement** : Données sensibles chiffrées AES-256
- **Permissions** : Accès minimal aux ressources système
- **Sandbox** : Application sandboxée pour la sécurité

### Conformité
- **RGPD** : Respect des réglementations européennes
- **Apple Guidelines** : Conformité aux standards macOS
- **Open Source** : Code source disponible pour audit
- **Transparence** : Aucune collecte de données personnelles

## 🤝 Contribution

### Comment Contribuer
1. **Fork** le projet sur GitHub
2. **Clone** votre fork localement
3. **Créez** une branche feature (`git checkout -b feature/NouvelleFonctionnalite`)
4. **Développez** votre fonctionnalité avec tests
5. **Commit** vos changements (`git commit -m 'Ajout NouvelleFonctionnalite'`)
6. **Push** vers votre branche (`git push origin feature/NouvelleFonctionnalite`)
7. **Ouvrez** une Pull Request détaillée

### Guidelines de Développement
- **Code Style** : ESLint + Prettier configurés
- **Tests** : Tests unitaires requis pour nouvelles fonctionnalités
- **Documentation** : Commentaires et README à jour
- **Performance** : Optimisation pour macOS native

## 📄 Licence

Distribué sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

Cette licence permet l'utilisation, la modification et la distribution libre du code source.
