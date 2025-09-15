#!/bin/bash

# Script de publication ShadowsAI
echo "🚀 Publication de ShadowsAI..."

# Vérification des prérequis
echo "📋 Vérification des prérequis..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Nettoyage
echo "🧹 Nettoyage des fichiers temporaires..."
rm -rf dist/
rm -rf out/
rm -rf .next/

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Tests de build
echo "🔨 Test de compilation Next.js..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Échec de la compilation Next.js"
    exit 1
fi

# Build Electron
echo "⚡ Compilation Electron pour macOS..."
npm run dist
if [ $? -ne 0 ]; then
    echo "❌ Échec de la compilation Electron"
    exit 1
fi

# Vérification des fichiers de sortie
echo "✅ Vérification des fichiers générés..."
if [ -d "dist" ]; then
    echo "📁 Fichiers générés dans dist/:"
    ls -la dist/
else
    echo "❌ Dossier dist/ non trouvé"
    exit 1
fi

# Création de l'archive de distribution
echo "📦 Création de l'archive de distribution..."
mkdir -p releases/
cd dist/
zip -r ../releases/ShadowsAI-macOS-v1.0.0.zip *.dmg *.zip
cd ..

echo "🎉 Publication terminée avec succès!"
echo "📁 Fichiers disponibles dans:"
echo "   - dist/ (fichiers Electron)"
echo "   - releases/ (archive de distribution)"
echo ""
echo "🚀 Pour distribuer:"
echo "   1. Testez l'application: ouvrez dist/ShadowsAI-*.dmg"
echo "   2. Partagez releases/ShadowsAI-macOS-v1.0.0.zip"
echo "   3. Publiez sur GitHub Releases ou votre plateforme"
