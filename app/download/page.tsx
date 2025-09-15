"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function DownloadPage() {
  const [buildStatus, setBuildStatus] = useState<"idle" | "building" | "ready">("idle")

  const handleBuild = async () => {
    setBuildStatus("building")
    // Simulation du processus de build
    setTimeout(() => {
      setBuildStatus("ready")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Télécharger ShadowsAI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Intelligence artificielle auto-apprenante avec interface moderne et intégration réseau
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Informations sur l'application */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">🤖 ShadowsAI v1.0.0</CardTitle>
              <CardDescription className="text-gray-300">
                Application native macOS avec toutes les fonctionnalités
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">🧠 IA Auto-apprenante</Badge>
                <Badge variant="secondary">🎤 Interface Vocale</Badge>
                <Badge variant="secondary">🌐 Scanner Réseau</Badge>
                <Badge variant="secondary">💾 Synology</Badge>
              </div>

              <Separator className="bg-slate-600" />

              <div className="space-y-2">
                <h3 className="font-semibold text-white">Fonctionnalités:</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Chat intelligent avec apprentissage en temps réel</li>
                  <li>• Interface vocale avec reconnaissance et synthèse</li>
                  <li>• Graphique de connaissances interactif</li>
                  <li>• Connexion serveur Synology</li>
                  <li>• Scanner de réseau local</li>
                  <li>• Interface moderne et responsive</li>
                </ul>
              </div>

              <Separator className="bg-slate-600" />

              <div className="space-y-2">
                <h3 className="font-semibold text-white">Prérequis système:</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• macOS 10.15 (Catalina) ou plus récent</li>
                  <li>• 4 GB RAM minimum (8 GB recommandé)</li>
                  <li>• 500 MB d'espace disque</li>
                  <li>• Connexion internet pour l'IA</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Processus de téléchargement */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">📥 Processus de Build</CardTitle>
              <CardDescription className="text-gray-300">Créez votre propre build personnalisé</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {buildStatus === "idle" && (
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Pour des raisons de sécurité, nous vous encourageons à compiler l'application vous-même.
                  </p>

                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Étapes rapides:</h4>
                    <ol className="text-sm text-gray-300 space-y-1">
                      <li>1. Clonez le repository</li>
                      <li>2. Installez les dépendances</li>
                      <li>3. Lancez le script de build</li>
                      <li>4. Récupérez le .dmg généré</li>
                    </ol>
                  </div>

                  <Button
                    onClick={handleBuild}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    🚀 Démarrer le Build
                  </Button>
                </div>
              )}

              {buildStatus === "building" && (
                <div className="space-y-4 text-center">
                  <div className="animate-spin text-4xl">⚙️</div>
                  <p className="text-white font-semibold">Compilation en cours...</p>
                  <div className="bg-slate-900/50 p-4 rounded-lg text-left">
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>✅ Installation des dépendances</div>
                      <div>✅ Compilation Next.js</div>
                      <div className="animate-pulse">⚡ Build Electron...</div>
                      <div className="text-gray-500">📦 Création du DMG...</div>
                    </div>
                  </div>
                </div>
              )}

              {buildStatus === "ready" && (
                <div className="space-y-4 text-center">
                  <div className="text-4xl">🎉</div>
                  <p className="text-white font-semibold">Build terminé avec succès!</p>

                  <div className="space-y-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700">📁 Ouvrir le dossier dist/</Button>
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                    >
                      📋 Copier les commandes
                    </Button>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg text-left">
                    <h4 className="font-semibold text-white mb-2">Fichiers générés:</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>📦 ShadowsAI-1.0.0.dmg (Installateur)</div>
                      <div>🗜️ ShadowsAI-1.0.0-mac.zip (Archive)</div>
                      <div>📁 ShadowsAI.app (Application)</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions détaillées */}
        <Card className="bg-slate-800/50 border-slate-700 max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">🛠️ Instructions de Compilation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900/50 p-6 rounded-lg">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`# 1. Cloner le projet
git clone https://github.com/votre-username/shadowsai.git
cd shadowsai

# 2. Installer les dépendances
npm install

# 3. Compiler l'application
npm run build
npm run dist

# 4. Récupérer les fichiers
# Les fichiers seront dans le dossier dist/
# - ShadowsAI-1.0.0.dmg (installateur macOS)
# - ShadowsAI-1.0.0-mac.zip (archive portable)

# 5. Installation
# Double-cliquez sur le .dmg et glissez l'app dans Applications`}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">💡 Conseil de sécurité</h4>
              <p className="text-sm text-gray-300">
                Nous recommandons fortement de compiler l'application vous-même plutôt que de télécharger des binaires
                pré-compilés. Cela garantit la sécurité et vous permet de personnaliser l'application selon vos besoins.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
