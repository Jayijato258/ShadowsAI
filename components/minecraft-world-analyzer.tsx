"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WorldData {
  name: string
  size: string
  biomes: string[]
  structures: string[]
  playerStats: {
    playtime: string
    blocksPlaced: number
    blocksBroken: number
    distanceTraveled: number
  }
  aiInsights: string[]
}

interface LearningPattern {
  id: string
  type: "building" | "exploration" | "resource" | "combat"
  description: string
  confidence: number
  frequency: number
}

export function MinecraftWorldAnalyzer() {
  const [worldData, setWorldData] = useState<WorldData | null>(null)
  const [learningPatterns, setLearningPatterns] = useState<LearningPattern[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const mockWorldData: WorldData = {
    name: "Mon Monde Survie",
    size: "2.4 GB",
    biomes: ["Plaines", "Forêt", "Montagne", "Océan", "Désert"],
    structures: ["Maison principale", "Ferme automatique", "Mine", "Tour d'observation", "Portail Nether"],
    playerStats: {
      playtime: "127h 34m",
      blocksPlaced: 45672,
      blocksBroken: 89234,
      distanceTraveled: 234567,
    },
    aiInsights: [
      "Préférence pour les constructions symétriques",
      "Tendance à explorer vers l'est",
      "Spécialisation dans l'agriculture automatisée",
      "Style de construction médiéval",
      "Optimisation des ressources avancée",
    ],
  }

  const mockPatterns: LearningPattern[] = [
    {
      id: "1",
      type: "building",
      description: "Construction de fermes automatiques complexes",
      confidence: 94,
      frequency: 85,
    },
    {
      id: "2",
      type: "exploration",
      description: "Exploration systématique par quadrants",
      confidence: 87,
      frequency: 72,
    },
    {
      id: "3",
      type: "resource",
      description: "Stockage organisé par catégories",
      confidence: 91,
      frequency: 95,
    },
    {
      id: "4",
      type: "combat",
      description: "Évitement des combats, préférence pour la furtivité",
      confidence: 78,
      frequency: 45,
    },
  ]

  const handleAnalyzeWorld = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const steps = [
      "Lecture des fichiers de monde...",
      "Analyse des structures construites...",
      "Extraction des statistiques joueur...",
      "Identification des patterns de jeu...",
      "Génération des insights IA...",
      "Compilation des résultats...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setAnalysisProgress(((i + 1) / steps.length) * 100)
    }

    setWorldData(mockWorldData)
    setLearningPatterns(mockPatterns)
    setIsAnalyzing(false)
    setAnalysisProgress(0)
  }

  const getPatternIcon = (type: string) => {
    switch (type) {
      case "building":
        return "🏗️"
      case "exploration":
        return "🗺️"
      case "resource":
        return "📦"
      case "combat":
        return "⚔️"
      default:
        return "🎮"
    }
  }

  const getPatternColor = (type: string) => {
    switch (type) {
      case "building":
        return "bg-blue-100 text-blue-800"
      case "exploration":
        return "bg-green-100 text-green-800"
      case "resource":
        return "bg-yellow-100 text-yellow-800"
      case "combat":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🌍 Analyseur de Monde Minecraft</CardTitle>
          <CardDescription>Analysez vos mondes Minecraft pour que l'IA apprenne de votre style de jeu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!worldData && !isAnalyzing && (
            <Alert>
              <AlertDescription>
                Sélectionnez un dossier de monde Minecraft pour commencer l'analyse. L'IA étudiera vos constructions,
                patterns de jeu et habitudes pour s'adapter à votre style.
              </AlertDescription>
            </Alert>
          )}

          {isAnalyzing && (
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Analyse du monde en cours...</span>
                    <span>{Math.round(analysisProgress)}%</span>
                  </div>
                  <Progress value={analysisProgress} />
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Button onClick={handleAnalyzeWorld} disabled={isAnalyzing} className="w-full" size="lg">
            {isAnalyzing ? "Analyse en cours..." : "🔍 Analyser le Monde"}
          </Button>
        </CardContent>
      </Card>

      {worldData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Temps de Jeu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{worldData.playerStats.playtime}</div>
                <p className="text-xs text-muted-foreground">dans ce monde</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Blocs Placés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{worldData.playerStats.blocksPlaced.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">constructions totales</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Distance Parcourue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(worldData.playerStats.distanceTraveled / 1000).toFixed(1)}km</div>
                <p className="text-xs text-muted-foreground">exploration totale</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taille du Monde</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{worldData.size}</div>
                <p className="text-xs text-muted-foreground">données stockées</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patterns d'Apprentissage Détectés</CardTitle>
                <CardDescription>Comportements identifiés par l'IA</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {learningPatterns.map((pattern) => (
                      <div key={pattern.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <span className="text-lg">{getPatternIcon(pattern.type)}</span>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge className={getPatternColor(pattern.type)}>{pattern.type}</Badge>
                            <div className="text-xs text-muted-foreground">{pattern.confidence}% confiance</div>
                          </div>
                          <p className="text-sm">{pattern.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Fréquence:</span>
                            <Progress value={pattern.frequency} className="h-1 flex-1" />
                            <span className="text-xs text-muted-foreground">{pattern.frequency}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insights de l'IA</CardTitle>
                <CardDescription>Analyse comportementale avancée</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {worldData.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <span className="text-lg">🧠</span>
                        <p className="text-sm flex-1">{insight}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations du Monde</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Biomes Explorés</h4>
                    <div className="flex flex-wrap gap-1">
                      {worldData.biomes.map((biome, index) => (
                        <Badge key={index} variant="outline">
                          {biome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Structures Principales</h4>
                    <div className="flex flex-wrap gap-1">
                      {worldData.structures.map((structure, index) => (
                        <Badge key={index} variant="secondary">
                          {structure}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
