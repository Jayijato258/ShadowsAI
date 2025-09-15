"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Upload, Play, CheckCircle, AlertCircle, BookOpen } from "lucide-react"

interface TrainingModuleProps {
  onTrainingComplete: (data: any) => void
}

export function TrainingModule({ onTrainingComplete }: TrainingModuleProps) {
  const [trainingData, setTrainingData] = useState("")
  const [trainingLabel, setTrainingLabel] = useState("")
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [trainingResults, setTrainingResults] = useState<any>(null)

  const handleStartTraining = async () => {
    if (!trainingData.trim() || !trainingLabel.trim()) return

    setIsTraining(true)
    setTrainingProgress(0)
    setTrainingResults(null)

    // Simulate training process
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          setTrainingResults({
            accuracy: 85 + Math.random() * 10,
            confidence: 80 + Math.random() * 15,
            newConcepts: Math.floor(Math.random() * 5) + 3,
            processingTime: (Math.random() * 2 + 1).toFixed(1),
          })
          onTrainingComplete({
            data: trainingData,
            label: trainingLabel,
          })
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 500)
  }

  const sampleData = [
    {
      label: "Sentiment Analysis",
      data: "This product is amazing! I love how easy it is to use and the quality is outstanding.",
    },
    {
      label: "Pattern Recognition",
      data: "1, 1, 2, 3, 5, 8, 13, 21, 34, 55",
    },
    {
      label: "Classification",
      data: "Email: 'Congratulations! You've won $1000! Click here to claim your prize now!'",
    },
  ]

  const loadSampleData = (sample: (typeof sampleData)[0]) => {
    setTrainingData(sample.data)
    setTrainingLabel(sample.label)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Training Input
          </CardTitle>
          <CardDescription>Provide data for the AI to learn from</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Training Label</label>
            <Input
              placeholder="e.g., Sentiment Analysis, Pattern Recognition"
              value={trainingLabel}
              onChange={(e) => setTrainingLabel(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Training Data</label>
            <Textarea
              placeholder="Enter the data you want the AI to learn from..."
              value={trainingData}
              onChange={(e) => setTrainingData(e.target.value)}
              rows={6}
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Sample Training Data</p>
            <div className="space-y-2">
              {sampleData.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => loadSampleData(sample)}
                  className="w-full justify-start text-left h-auto p-3"
                >
                  <div>
                    <div className="font-medium">{sample.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{sample.data.substring(0, 60)}...</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleStartTraining}
            disabled={!trainingData.trim() || !trainingLabel.trim() || isTraining}
            className="w-full"
            size="lg"
          >
            {isTraining ? (
              <>
                <Play className="h-4 w-4 mr-2 animate-pulse" />
                Training in Progress...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Start Training
              </>
            )}
          </Button>

          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span>{trainingProgress.toFixed(0)}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Training Results
          </CardTitle>
          <CardDescription>Analysis of the training session</CardDescription>
        </CardHeader>
        <CardContent>
          {trainingResults ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Training Completed Successfully</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-2xl font-bold">{trainingResults.accuracy.toFixed(1)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Confidence</p>
                  <p className="text-2xl font-bold">{trainingResults.confidence.toFixed(1)}%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">New Concepts Learned</span>
                  <Badge variant="secondary">{trainingResults.newConcepts}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Processing Time</span>
                  <Badge variant="outline">{trainingResults.processingTime}s</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Training Status</span>
                  <Badge className="bg-green-500 text-white">Success</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Learning Insights</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Successfully identified key patterns in the data</p>
                  <p>• Updated neural pathways with new information</p>
                  <p>• Improved overall understanding of {trainingLabel.toLowerCase()}</p>
                  <p>• Ready for similar training scenarios</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No training results yet.</p>
              <p className="text-sm">Start a training session to see results here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
