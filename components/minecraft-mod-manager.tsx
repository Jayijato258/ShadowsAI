"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MinecraftVersion {
  id: string
  name: string
  type: "release" | "snapshot" | "beta"
  supported: boolean
}

interface ModTemplate {
  id: string
  name: string
  description: string
  category: "learning" | "data-collection" | "automation" | "analysis"
  features: string[]
}

interface GeneratedMod {
  id: string
  name: string
  version: string
  minecraftVersion: string
  features: string[]
  status: "generating" | "ready" | "error"
  downloadUrl?: string
}

const MINECRAFT_VERSIONS: MinecraftVersion[] = [
  { id: "1.21.4", name: "1.21.4", type: "release", supported: true },
  { id: "1.21.3", name: "1.21.3", type: "release", supported: true },
  { id: "1.21.2", name: "1.21.2", type: "release", supported: true },
  { id: "1.21.1", name: "1.21.1", type: "release", supported: true },
  { id: "1.21", name: "1.21", type: "release", supported: true },
  { id: "1.20.6", name: "1.20.6", type: "release", supported: true },
  { id: "1.20.4", name: "1.20.4", type: "release", supported: true },
  { id: "1.19.4", name: "1.19.4", type: "release", supported: false },
]

const MOD_TEMPLATES: ModTemplate[] = [
  {
    id: "player-behavior-tracker",
    name: "Traqueur de Comportement Joueur",
    description: "Collecte des données sur les actions, mouvements et décisions du joueur",
    category: "data-collection",
    features: ["Tracking des mouvements", "Analyse des actions", "Patterns de jeu", "Statistiques temps réel"],
  },
  {
    id: "world-analyzer",
    name: "Analyseur de Monde",
    description: "Analyse l'environnement et les structures construites par le joueur",
    category: "analysis",
    features: ["Scan des constructions", "Analyse des biomes", "Détection de patterns", "Cartographie intelligente"],
  },
  {
    id: "ai-assistant",
    name: "Assistant IA Minecraft",
    description: "Assistant intelligent qui apprend du style de jeu du joueur",
    category: "learning",
    features: ["Suggestions intelligentes", "Apprentissage adaptatif", "Aide contextuelle", "Optimisation automatique"],
  },
  {
    id: "automation-helper",
    name: "Assistant d'Automatisation",
    description: "Automatise les tâches répétitives basées sur les habitudes du joueur",
    category: "automation",
    features: ["Automatisation farming", "Gestion inventaire", "Construction assistée", "Optimisation ressources"],
  },
]

export function MinecraftModManager() {
  const [selectedVersion, setSelectedVersion] = useState<string>("")
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [modName, setModName] = useState("")
  const [modDescription, setModDescription] = useState("")
  const [customFeatures, setCustomFeatures] = useState("")
  const [generatedMods, setGeneratedMods] = useState<GeneratedMod[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const handleGenerateMod = async () => {
    if (!selectedVersion || !selectedTemplate || !modName) {
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    const template = MOD_TEMPLATES.find((t) => t.id === selectedTemplate)
    const newMod: GeneratedMod = {
      id: Date.now().toString(),
      name: modName,
      version: "1.0.0",
      minecraftVersion: selectedVersion,
      features: template?.features || [],
      status: "generating",
    }

    setGeneratedMods((prev) => [newMod, ...prev])

    // Simulation de génération de mod
    const steps = [
      "Initialisation du projet Forge/Fabric...",
      "Génération des classes principales...",
      "Création des handlers d'événements...",
      "Implémentation de la collecte de données...",
      "Configuration des systèmes d'apprentissage...",
      "Compilation et packaging...",
      "Tests de compatibilité...",
      "Finalisation du mod...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }

    setGeneratedMods((prev) =>
      prev.map((mod) =>
        mod.id === newMod.id
          ? {
              ...mod,
              status: "ready",
              downloadUrl: `/mods/${mod.name.toLowerCase().replace(/\s+/g, "-")}-${mod.version}.jar`,
            }
          : mod,
      ),
    )

    setIsGenerating(false)
    setGenerationProgress(0)
  }

  const getVersionBadgeVariant = (version: MinecraftVersion) => {
    if (!version.supported) return "destructive"
    if (version.type === "snapshot") return "secondary"
    return "default"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🎮 Générateur de Mod Minecraft IA</CardTitle>
          <CardDescription>
            Créez des mods Minecraft personnalisés qui permettent à ShadowsAI d'apprendre de votre style de jeu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generator" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generator">Générateur</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="mods">Mes Mods</TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minecraft-version">Version Minecraft</Label>
                    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une version" />
                      </SelectTrigger>
                      <SelectContent>
                        {MINECRAFT_VERSIONS.map((version) => (
                          <SelectItem key={version.id} value={version.id} disabled={!version.supported}>
                            <div className="flex items-center gap-2">
                              <span>{version.name}</span>
                              <Badge variant={getVersionBadgeVariant(version)} className="text-xs">
                                {version.supported ? version.type : "Non supporté"}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template">Template de Mod</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez un template" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOD_TEMPLATES.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            <div className="space-y-1">
                              <div className="font-medium">{template.name}</div>
                              <div className="text-xs text-muted-foreground">{template.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mod-name">Nom du Mod</Label>
                    <Input
                      id="mod-name"
                      value={modName}
                      onChange={(e) => setModName(e.target.value)}
                      placeholder="Mon Mod IA Minecraft"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mod-description">Description</Label>
                    <Textarea
                      id="mod-description"
                      value={modDescription}
                      onChange={(e) => setModDescription(e.target.value)}
                      placeholder="Description de votre mod..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedTemplate && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Aperçu du Template</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const template = MOD_TEMPLATES.find((t) => t.id === selectedTemplate)
                          return template ? (
                            <div className="space-y-3">
                              <div>
                                <Badge variant="outline" className="mb-2">
                                  {template.category}
                                </Badge>
                                <p className="text-sm text-muted-foreground">{template.description}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Fonctionnalités incluses:</h4>
                                <ul className="text-sm space-y-1">
                                  {template.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : null
                        })()}
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="custom-features">Fonctionnalités Personnalisées</Label>
                    <Textarea
                      id="custom-features"
                      value={customFeatures}
                      onChange={(e) => setCustomFeatures(e.target.value)}
                      placeholder="Ajoutez des fonctionnalités spécifiques (une par ligne)..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {isGenerating && (
                <Alert>
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Génération du mod en cours...</span>
                        <span>{Math.round(generationProgress)}%</span>
                      </div>
                      <Progress value={generationProgress} />
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleGenerateMod}
                disabled={!selectedVersion || !selectedTemplate || !modName || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? "Génération en cours..." : "🚀 Générer le Mod"}
              </Button>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOD_TEMPLATES.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Fonctionnalités:</h4>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mods" className="space-y-4">
              {generatedMods.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Aucun mod généré pour le moment.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Utilisez l'onglet Générateur pour créer votre premier mod.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {generatedMods.map((mod) => (
                      <Card key={mod.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{mod.name}</CardTitle>
                              <CardDescription>
                                Version {mod.version} • Minecraft {mod.minecraftVersion}
                              </CardDescription>
                            </div>
                            <Badge
                              variant={
                                mod.status === "ready"
                                  ? "default"
                                  : mod.status === "generating"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {mod.status === "ready" ? "Prêt" : mod.status === "generating" ? "En cours" : "Erreur"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm mb-2">Fonctionnalités:</h4>
                              <div className="flex flex-wrap gap-1">
                                {mod.features.map((feature, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            {mod.status === "ready" && mod.downloadUrl && (
                              <Button variant="outline" className="w-full bg-transparent">
                                📥 Télécharger le Mod
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
