"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Brain, Zap } from "lucide-react"

interface LearningMetrics {
  accuracy: number
  knowledgeBase: number
  learningRate: number
  confidence: number
  sessionsCompleted: number
  totalConcepts: number
}

interface RealtimeFeedbackProps {
  metrics: LearningMetrics
  isLearning: boolean
}

interface FeedbackItem {
  id: string
  type: "success" | "warning" | "info" | "error"
  message: string
  timestamp: Date
  category: string
}

export function RealtimeFeedback({ metrics, isLearning }: RealtimeFeedbackProps) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([
    {
      id: "1",
      type: "success",
      message: "Successfully learned new pattern in natural language processing",
      timestamp: new Date(Date.now() - 120000),
      category: "Learning",
    },
    {
      id: "2",
      type: "info",
      message: "Updated knowledge base with 15 new concepts",
      timestamp: new Date(Date.now() - 300000),
      category: "Knowledge",
    },
    {
      id: "3",
      type: "warning",
      message: "Confidence level below optimal threshold for image recognition",
      timestamp: new Date(Date.now() - 450000),
      category: "Performance",
    },
  ])

  const [currentFocus, setCurrentFocus] = useState("Pattern Analysis")
  const [systemHealth, setSystemHealth] = useState(95)

  useEffect(() => {
    if (isLearning) {
      const interval = setInterval(() => {
        const feedbackMessages = [
          { type: "success" as const, message: "Improved accuracy in decision making", category: "Learning" },
          { type: "info" as const, message: "Discovered new data correlation patterns", category: "Discovery" },
          { type: "success" as const, message: "Enhanced neural pathway connections", category: "Optimization" },
          { type: "info" as const, message: "Processing speed increased by 3%", category: "Performance" },
          { type: "warning" as const, message: "Detected potential overfitting in model", category: "Alert" },
          { type: "success" as const, message: "Successfully validated new learning approach", category: "Validation" },
        ]

        const focusAreas = [
          "Pattern Analysis",
          "Data Processing",
          "Neural Optimization",
          "Knowledge Integration",
          "Performance Tuning",
          "Error Correction",
        ]

        const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]
        const newItem: FeedbackItem = {
          id: Date.now().toString(),
          ...randomFeedback,
          timestamp: new Date(),
        }

        setFeedbackItems((prev) => [newItem, ...prev.slice(0, 9)])
        setCurrentFocus(focusAreas[Math.floor(Math.random() * focusAreas.length)])
        setSystemHealth((prev) => Math.min(100, prev + Math.random() * 2 - 0.5))
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isLearning])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Learning Feed
            </CardTitle>
            <CardDescription>Real-time updates on AI learning activities and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  {getIcon(item.type)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge variant={getBadgeVariant(item.type)} className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatTime(item.timestamp)}</span>
                    </div>
                    <p className="text-sm text-pretty">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Current Focus
            </CardTitle>
            <CardDescription>What the AI is currently working on</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-balance">{currentFocus}</div>
              <div className="text-sm text-muted-foreground">
                {isLearning ? "Active learning in progress" : "Standby mode"}
              </div>
            </div>

            {isLearning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Focus Intensity</span>
                  <span>High</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Overall AI system performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{systemHealth.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Optimal Performance</div>
            </div>

            <Progress value={systemHealth} className="h-3" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Memory Usage</span>
                <span className="text-green-600">Normal</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Speed</span>
                <span className="text-green-600">Optimal</span>
              </div>
              <div className="flex justify-between">
                <span>Error Rate</span>
                <span className="text-green-600">Low</span>
              </div>
              <div className="flex justify-between">
                <span>Learning Efficiency</span>
                <span className="text-green-600">High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Today's Learning</span>
              <Badge variant="outline">+{Math.floor(Math.random() * 50) + 20} concepts</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Accuracy Trend</span>
              <Badge className="bg-green-500 text-white">↑ 2.3%</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Active Connections</span>
              <Badge variant="outline">{Math.floor(Math.random() * 100) + 150}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Learning Streak</span>
              <Badge variant="outline">7 days</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
