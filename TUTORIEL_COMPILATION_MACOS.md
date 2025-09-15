# 🍎 Tutoriel de Compilation ShadowsAI pour macOS

## 📋 Prérequis

### 1. Outils de développement requis

\`\`\`bash
# Installer Xcode Command Line Tools
xcode-select --install

# Installer Homebrew (si pas déjà installé)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Node.js (version 18 ou supérieure)
brew install node

# Vérifier les versions
node --version  # Doit être >= 18.0.0
npm --version   # Doit être >= 8.0.0
\`\`\`

### 2. Dépendances système

\`\`\`bash
# Installer Python (requis pour certaines dépendances natives)
brew install python

# Installer les outils de build natifs
npm install -g node-gyp
\`\`\`

## 🚀 Installation et Configuration

### 1. Cloner le projet

\`\`\`bash
# Cloner le repository
git clone https://github.com/votre-username/ShadowsAI.git
cd ShadowsAI

# Ou si vous avez téléchargé le ZIP
unzip ShadowsAI.zip
cd ShadowsAI
\`\`\`

### 2. Installer les dépendances

\`\`\`bash
# Installer toutes les dépendances
npm install

# Si vous rencontrez des erreurs, essayez :
npm install --legacy-peer-deps
\`\`\`

### 3. Configuration des variables d'environnement

\`\`\`bash
# Créer le fichier de configuration (optionnel)
cp .env.example .env.local

# Éditer les variables si nécessaire
nano .env.local
\`\`\`

## 🔧 Compilation

### Méthode 1: Script automatique (Recommandé)

\`\`\`bash
# Exécuter le script de build automatique
npm run build:mac

# Ou directement avec Node.js
node scripts/build-mac.js
\`\`\`

### Méthode 2: Étapes manuelles

\`\`\`bash
# 1. Nettoyer les anciens builds
rm -rf out dist

# 2. Build de l'application Next.js
npm run build

# 3. Vérifier que le dossier 'out' a été créé
ls -la out/

# 4. Build Electron pour macOS
npx electron-builder --mac --publish=never

# 5. Vérifier les fichiers générés
ls -la dist/
\`\`\`

### Méthode 3: Script shell

\`\`\`bash
# Rendre le script exécutable
chmod +x build.sh

# Exécuter le script
./build.sh
\`\`\`

## 📦 Résultats de la compilation

Après une compilation réussie, vous trouverez dans le dossier `dist/` :

- **ShadowsAI-1.0.0.dmg** : Installateur DMG pour distribution
- **ShadowsAI-1.0.0-mac.zip** : Archive ZIP de l'application
- **mac/** : Dossier contenant l'application non empaquetée

## 🔍 Résolution des problèmes courants

### Erreur: "command not found: electron-builder"

\`\`\`bash
# Installer electron-builder globalement
npm install -g electron-builder

# Ou utiliser npx (recommandé)
npx electron-builder --version
\`\`\`

### Erreur: "Python not found"

\`\`\`bash
# Installer Python via Homebrew
brew install python

# Ou spécifier le chemin Python
npm config set python /usr/bin/python3
\`\`\`

### Erreur: "node-gyp rebuild failed"

\`\`\`bash
# Nettoyer le cache npm
npm cache clean --force

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Erreur de permissions

\`\`\`bash
# Donner les permissions nécessaires
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
\`\`\`

### Build Next.js échoue

\`\`\`bash
# Vérifier la configuration
npm run lint
npm run type-check

# Build en mode développement pour déboguer
npm run dev
\`\`\`

## 🧪 Test de l'application

### 1. Test en mode développement

\`\`\`bash
# Démarrer l'application en mode dev
npm run dev

# Dans un autre terminal, tester Electron
npm run electron:dev
\`\`\`

### 2. Test de l'exécutable

\`\`\`bash
# Installer l'application depuis le DMG
open dist/ShadowsAI-1.0.0.dmg

# Ou extraire et tester le ZIP
unzip dist/ShadowsAI-1.0.0-mac.zip
open ShadowsAI.app
\`\`\`

## 📋 Checklist de validation

- [ ] Node.js version >= 18.0.0 installé
- [ ] Toutes les dépendances npm installées sans erreur
- [ ] Build Next.js réussi (dossier `out/` créé)
- [ ] Build Electron réussi (fichiers dans `dist/`)
- [ ] Application démarre sans erreur
- [ ] Toutes les fonctionnalités testées :
  - [ ] Interface de chat
  - [ ] Reconnaissance vocale
  - [ ] Scanner réseau
  - [ ] Connexion Synology
  - [ ] Graphique de connaissances

## 🚀 Distribution

### Créer un installateur signé (optionnel)

\`\`\`bash
# Obtenir un certificat de développeur Apple
# Configurer dans electron-builder
export CSC_LINK="path/to/certificate.p12"
export CSC_KEY_PASSWORD="certificate-password"

# Build avec signature
npm run build:mac -- --publish=never
\`\`\`

### Notarisation Apple (pour distribution publique)

\`\`\`bash
# Configurer les identifiants Apple
export APPLE_ID="your-apple-id@email.com"
export APPLE_ID_PASS="app-specific-password"

# Build avec notarisation
npm run build:mac -- --publish=never --mac.notarize.teamId="TEAM_ID"
\`\`\`

## 📞 Support

En cas de problème :

1. Vérifiez les logs dans `dist/builder-debug.yml`
2. Consultez la documentation Electron Builder
3. Ouvrez une issue sur le repository GitHub

## 🎉 Félicitations !

Votre application ShadowsAI est maintenant compilée et prête à être utilisée sur macOS !

---

*Dernière mise à jour : $(date)*
