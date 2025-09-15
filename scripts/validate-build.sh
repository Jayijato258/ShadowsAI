#!/bin/bash

echo "🔍 Validation du build ShadowsAI..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2)
echo "✅ Node.js version: $NODE_VERSION"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm version: $NPM_VERSION"

# Vérifier les dépendances
if [ ! -d "node_modules" ]; then
    echo "❌ Dépendances non installées. Exécutez: npm install"
    exit 1
fi

echo "✅ Dépendances installées"

# Vérifier la configuration
if [ ! -f "package.json" ]; then
    echo "❌ package.json manquant"
    exit 1
fi

echo "✅ Configuration valide"

# Test de build
echo "🧪 Test de build..."
npm run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Build Next.js réussi"
else
    echo "❌ Échec du build Next.js"
    exit 1
fi

echo "🎉 Validation terminée avec succès!"
echo "💡 Vous pouvez maintenant exécuter: npm run build:mac"
