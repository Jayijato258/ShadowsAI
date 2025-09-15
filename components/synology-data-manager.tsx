"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Download, Trash2, RefreshCw, FileText, Database, Brain } from "lucide-react"

interface DataFile {
  id: string
  name: string
  type: "model" | "dataset" | "log"
  size: string
  lastModified: string
  accuracy?: string
}

interface SynologyDataManagerProps {
  isConnected: boolean
}

export function SynologyDataManager({ isConnected }: SynologyDataManagerProps) {
  const [files, setFiles] = useState<DataFile[]>([
    {
      id: "1",
      name: "neural_network_v2.1.pkl",
      type: "model",
      size: "125 MB",
      lastModified: "2024-01-15 14:30",
      accuracy: "94.2%",
    },
    {
      id: "2",
      name: "training_dataset_2024.csv",
      type: "dataset",
      size: "45 MB",
      lastModified: "2024-01-14 09:15",
    },
    {
      id: "3",
      name: "learning_session_log.txt",
      type: "log",
      size: "2.3 MB",
      lastModified: "2024-01-15 16:45",
    },
    {
      id: "4",
      name: "deep_learning_model.h5",
      type: "model",
      size: "89 MB",
      lastModified: "2024-01-13 11:20",
      accuracy: "91.8%",
    },
    {
      id: "5",
      name: "validation_data.json",
      type: "dataset",
      size: "12 MB",
      lastModified: "2024-01-12 16:30",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simuler le rafraîchissement des données depuis Synology
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const handleUpload = async () => {
    setIsLoading(true)
    setUploadProgress(0)

    // Simuler l'upload avec progression
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          // Ajouter un nouveau fichier simulé
          const newFile: DataFile = {
            id: Date.now().toString(),
            name: `nouveau_modele_${Date.now()}.pkl`,
            type: "model",
            size: "67 MB",
            lastModified: new Date().toLocaleString("fr-FR"),
            accuracy: "96.1%",
          }
          setFiles((prev) => [newFile, ...prev])
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDownload = async (fileId: string) => {
    const file = files.find((f) => f.id === fileId)
    if (file) {
      // Simuler le téléchargement
      alert(`Téléchargement de ${file.name} commencé...`)
    }
  }

  const handleDelete = async (fileId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) {
      setFiles((prev) => prev.filter((f) => f.id !== fileId))
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "model":
        return <Brain className="h-4 w-4 text-blue-600" />
      case "dataset":
        return <Database className="h-4 w-4 text-green-600" />
      case "log":
        return <FileText className="h-4 w-4 text-orange-600" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case "model":
        return "Modèle"
      case "dataset":
        return "Dataset"
      case "log":
        return "Log"
      default:
        return "Fichier"
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Database className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Connectez-vous à votre serveur Synology pour gérer vos données d'IA
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gestionnaire de Données Synology</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button size="sm" onClick={handleUpload} disabled={isLoading}>
                <Upload className="h-4 w-4 mr-2" />
                Uploader
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Gérez vos modèles IA, datasets et logs stockés sur Synology</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && uploadProgress > 0 && (
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Upload en cours...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <ScrollArea className="h-96">
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {file.size} • {file.lastModified}
                        {file.accuracy && ` • Précision: ${file.accuracy}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{getFileTypeLabel(file.type)}</Badge>

                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(file.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Modèles IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{files.filter((f) => f.type === "model").length}</div>
            <p className="text-xs text-muted-foreground">fichiers stockés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Datasets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{files.filter((f) => f.type === "dataset").length}</div>
            <p className="text-xs text-muted-foreground">jeux de données</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{files.filter((f) => f.type === "log").length}</div>
            <p className="text-xs text-muted-foreground">fichiers de log</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
