"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, Zap, Target, BookOpen, Activity } from "lucide-react"
import { LearningChart } from "@/components/learning-chart"
import { KnowledgeGraph } from "@/components/knowledge-graph"
import { TrainingModule } from "@/components/training-module"
import { RealtimeFeedback } from "@/components/realtime-feedback"

interface LearningMetrics {
  accuracy: number
  knowledgeBase: number
  learningRate: number
  confidence: number
  sessionsCompleted: number
  totalConcepts: number
}

export default function SelfLearningAI() {
  const [metrics, setMetrics] = useState<LearningMetrics>({
    accuracy: 78,
    knowledgeBase: 1247,
    learningRate: 92,
    confidence: 85,
    sessionsCompleted: 156,
    totalConcepts: 89,
  })

  const [isLearning, setIsLearning] = useState(false)
  const [currentTask, setCurrentTask] = useState("Analyse des modèles dans les données...")

  // Simulate real-time learning updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLearning) {
        setMetrics((prev) => ({
          ...prev,
          accuracy: Math.min(100, prev.accuracy + Math.random() * 0.5),
          knowledgeBase: prev.knowledgeBase + Math.floor(Math.random() * 3),
          learningRate: Math.min(100, prev.learningRate + Math.random() * 0.3),
          confidence: Math.min(100, prev.confidence + Math.random() * 0.2),
        }))

        const tasks = [
          "Traitement de nouvelles informations...",
          "Mise à jour des voies neuronales...",
          "Optimisation des arbres de décision...",
          "Analyse des modèles de rétroaction...",
          "Renforcement des connexions de connaissances...",
        ]
        setCurrentTask(tasks[Math.floor(Math.random() * tasks.length)])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isLearning])

  const handleStartLearning = () => {
    setIsLearning(!isLearning)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-balance">Système IA Auto-Apprenant</h1>
          </div>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Observez notre IA apprendre continuellement, s'adapter et améliorer sa compréhension grâce aux retours en
            temps réel et à l'auto-optimisation.
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Centre de Contrôle d'Apprentissage
            </CardTitle>
            <CardDescription>Surveillez et contrôlez le processus d'apprentissage de l'IA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Statut Actuel</p>
                <p className="text-sm text-muted-foreground">
                  {isLearning ? currentTask : "L'IA est inactive, prête à apprendre"}
                </p>
              </div>
              <Button
                onClick={handleStartLearning}
                variant={isLearning ? "destructive" : "default"}
                size="lg"
                className="min-w-32"
              >
                {isLearning ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Arrêter l'Apprentissage
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Commencer l'Apprentissage
                  </>
                )}
              </Button>
            </div>
            {isLearning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progrès d'Apprentissage</span>
                  <span>Actif</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Précision</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.accuracy.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">+2.1% depuis la dernière session</p>
              <Progress value={metrics.accuracy} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Base de Connaissances</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.knowledgeBase.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">concepts appris</p>
              <Badge variant="secondary" className="mt-2">
                +{metrics.totalConcepts} nouveaux
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux d'Apprentissage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.learningRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">score d'efficacité</p>
              <Progress value={metrics.learningRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confiance</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.confidence.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">dans les prédictions</p>
              <Progress value={metrics.confidence} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'Ensemble</TabsTrigger>
            <TabsTrigger value="knowledge">Graphe de Connaissances</TabsTrigger>
            <TabsTrigger value="training">Entraînement</TabsTrigger>
            <TabsTrigger value="feedback">Retour Temps Réel</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LearningChart metrics={metrics} isLearning={isLearning} />
              <Card>
                <CardHeader>
                  <CardTitle>Sessions d'Apprentissage</CardTitle>
                  <CardDescription>Activité d'entraînement récente et performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sessions Terminées</span>
                    <Badge variant="outline">{metrics.sessionsCompleted}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Durée Moyenne de Session</span>
                    <Badge variant="outline">12.3 min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taux de Réussite</span>
                    <Badge variant="outline">94.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Série d'Apprentissage</span>
                    <Badge variant="outline">7 jours</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeGraph />
          </TabsContent>

          <TabsContent value="training">
            <TrainingModule
              onTrainingComplete={(newData) => {
                setMetrics((prev) => ({
                  ...prev,
                  sessionsCompleted: prev.sessionsCompleted + 1,
                  knowledgeBase: prev.knowledgeBase + Math.floor(Math.random() * 10) + 5,
                }))
              }}
            />
          </TabsContent>

          <TabsContent value="feedback">
            <RealtimeFeedback metrics={metrics} isLearning={isLearning} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
