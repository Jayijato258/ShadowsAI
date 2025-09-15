"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

interface LearningMetrics {
  accuracy: number
  knowledgeBase: number
  learningRate: number
  confidence: number
  sessionsCompleted: number
  totalConcepts: number
}

interface LearningChartProps {
  metrics: LearningMetrics
  isLearning: boolean
}

export function LearningChart({ metrics, isLearning }: LearningChartProps) {
  const [chartData, setChartData] = useState([
    { time: "00:00", accuracy: 65, knowledge: 1200, confidence: 70 },
    { time: "00:05", accuracy: 68, knowledge: 1210, confidence: 72 },
    { time: "00:10", accuracy: 71, knowledge: 1225, confidence: 75 },
    { time: "00:15", accuracy: 74, knowledge: 1235, confidence: 78 },
    { time: "00:20", accuracy: 76, knowledge: 1240, confidence: 82 },
  ])

  useEffect(() => {
    if (isLearning) {
      const interval = setInterval(() => {
        const now = new Date()
        const timeStr = `${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`

        setChartData((prev) => {
          const newData = [
            ...prev.slice(-9),
            {
              time: timeStr,
              accuracy: metrics.accuracy,
              knowledge: metrics.knowledgeBase,
              confidence: metrics.confidence,
            },
          ]
          return newData
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isLearning, metrics])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
        <CardDescription>Real-time visualization of AI learning metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                name="Accuracy (%)"
              />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Confidence (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
