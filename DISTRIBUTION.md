# Guide de Distribution - ShadowsAI

## 📦 Fichiers de Distribution

Après compilation, vous trouverez dans le dossier `dist/` :

### Fichiers macOS
- `ShadowsAI-1.0.0.dmg` - Installateur macOS (recommandé)
- `ShadowsAI-1.0.0-mac.zip` - Archive portable
- `ShadowsAI-1.0.0-arm64.dmg` - Version Apple Silicon
- `ShadowsAI-1.0.0-x64.dmg` - Version Intel

## 🚀 Publication

### 1. Compilation
\`\`\`bash
# Compilation complète
./scripts/publish.sh

# Ou étape par étape
npm install
npm run build
npm run dist
\`\`\`

### 2. Test Local
\`\`\`bash
# Ouvrir l'installateur DMG
open dist/ShadowsAI-*.dmg
\`\`\`

### 3. Distribution

#### GitHub Releases
1. Créez une nouvelle release sur GitHub
2. Uploadez les fichiers `.dmg` et `.zip`
3. Ajoutez les notes de version du CHANGELOG.md

#### Distribution Directe
- Partagez le fichier `ShadowsAI-macOS-v1.0.0.zip` depuis `releases/`
- Les utilisateurs peuvent télécharger et installer directement

## 📋 Checklist de Publication

- [ ] Tests de compilation réussis
- [ ] Application testée sur macOS
- [ ] Fichiers DMG générés correctement
- [ ] Documentation à jour
- [ ] CHANGELOG.md mis à jour
- [ ] Version incrémentée dans package.json
- [ ] Archive de distribution créée

## 🔧 Signature de Code (Optionnel)

Pour une distribution professionnelle :

\`\`\`bash
# Signature avec certificat développeur Apple
codesign --deep --force --verify --verbose --sign "Developer ID Application: Votre Nom" dist/ShadowsAI.app

# Notarisation Apple
xcrun notarytool submit dist/ShadowsAI-*.dmg --keychain-profile "notarytool-profile" --wait
\`\`\`

## 📊 Métriques

- Taille de l'application : ~200MB
- Temps de compilation : 2-5 minutes
- Compatibilité : macOS 10.15+
- Architectures : x64, ARM64 (Apple Silicon)
