"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Mic, MessageSquare, Network, Database, Brain, Zap } from "lucide-react"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const demoSteps = [
    {
      title: "Interface d'Accueil",
      description: "Tableau de bord principal avec métriques en temps réel",
      icon: <Brain className="w-6 h-6" />,
      features: ["Métriques d'apprentissage", "Graphiques de performance", "État du système"],
    },
    {
      title: "Interaction Textuelle",
      description: "Chat intelligent avec l'IA auto-apprenante",
      icon: <MessageSquare className="w-6 h-6" />,
      features: ["Conversation naturelle", "Apprentissage contextuel", "Historique des échanges"],
    },
    {
      title: "Interface Vocale",
      description: "Reconnaissance et synthèse vocale avancées",
      icon: <Mic className="w-6 h-6" />,
      features: ["Reconnaissance vocale", "Synthèse vocale", "Commandes vocales"],
    },
    {
      title: "Scanner Réseau",
      description: "Découverte et interaction avec le réseau local",
      icon: <Network className="w-6 h-6" />,
      features: ["Scan automatique", "Détection d'appareils", "Interaction réseau"],
    },
    {
      title: "Stockage Synology",
      description: "Intégration complète avec serveur Synology",
      icon: <Database className="w-6 h-6" />,
      features: ["Stockage distant", "Synchronisation", "Gestion des données"],
    },
    {
      title: "Apprentissage Autonome",
      description: "IA qui s'améliore continuellement",
      icon: <Zap className="w-6 h-6" />,
      features: ["Auto-amélioration", "Adaptation", "Optimisation continue"],
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((current) => (current + 1) % demoSteps.length)
            return 0
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, demoSteps.length])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
  }

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
    setProgress(0)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Démonstration - IA Auto-Apprenante</h1>
          <p className="text-xl text-slate-300 mb-6">
            Découvrez les fonctionnalités avancées de notre intelligence artificielle
          </p>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Button onClick={handlePlayPause} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isPlaying ? "Pause" : "Lecture"}
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="w-5 h-5 mr-2" />
              Recommencer
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">
              Étape {currentStep + 1} sur {demoSteps.length}
            </span>
            <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Demo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Step Display */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 rounded-lg text-white">{demoSteps[currentStep].icon}</div>
                  <div>
                    <CardTitle className="text-white text-xl">{demoSteps[currentStep].title}</CardTitle>
                    <CardDescription className="text-slate-400">{demoSteps[currentStep].description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Fonctionnalités clés :</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {demoSteps[currentStep].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step Navigation */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            {demoSteps.map((step, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 ${
                  index === currentStep
                    ? "bg-emerald-600/20 border-emerald-500"
                    : "bg-slate-800/50 border-slate-700 hover:bg-slate-700/50"
                }`}
                onClick={() => handleStepClick(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        index === currentStep ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h4 className={`font-medium ${index === currentStep ? "text-white" : "text-slate-300"}`}>
                        {step.title}
                      </h4>
                      <Badge variant={index === currentStep ? "default" : "secondary"} className="mt-1">
                        Étape {index + 1}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Spécifications Techniques</CardTitle>
            <CardDescription className="text-slate-400">Technologies et fonctionnalités implémentées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Frontend</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>• Next.js 14 avec App Router</li>
                  <li>• React 18 avec TypeScript</li>
                  <li>• Tailwind CSS pour le styling</li>
                  <li>• Shadcn/ui pour les composants</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">IA & Apprentissage</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>• AI SDK de Vercel</li>
                  <li>• Apprentissage en temps réel</li>
                  <li>• Reconnaissance vocale Web API</li>
                  <li>• Synthèse vocale intégrée</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Intégrations</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>• Serveur Synology NAS</li>
                  <li>• Scanner réseau local</li>
                  <li>• API WebDAV</li>
                  <li>• Electron pour macOS</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
