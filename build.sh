#!/bin/bash

echo "🚀 ShadowsAI - Build automatique pour macOS"
echo "=========================================="

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ Environnement vérifié"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Lancer le build
echo "🔨 Lancement du build..."
npm run build-mac-auto

echo "🎉 Build terminé! Vérifiez le dossier 'dist' pour les fichiers d'installation."
