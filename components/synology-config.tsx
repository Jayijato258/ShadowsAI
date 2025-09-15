"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Wifi, Shield, FolderOpen, Database, AlertCircle, CheckCircle } from "lucide-react"
import { SynologyDataManager } from "@/components/synology-data-manager"

interface SynologyConfigProps {
  onConnectionChange: (connected: boolean, status: string) => void
}

interface ConnectionConfig {
  host: string
  port: string
  username: string
  password: string
  protocol: "http" | "https"
}

interface StorageInfo {
  totalSpace: number
  usedSpace: number
  availableSpace: number
  modelCount: number
  datasetCount: number
}

export function SynologyConfig({ onConnectionChange }: SynologyConfigProps) {
  const [config, setConfig] = useState<ConnectionConfig>({
    host: "",
    port: "5000",
    username: "",
    password: "",
    protocol: "https",
  })

  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState("")
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({
    totalSpace: 500,
    usedSpace: 2.4,
    availableSpace: 497.6,
    modelCount: 15,
    datasetCount: 8,
  })

  const handleConnect = async () => {
    setIsConnecting(true)
    setConnectionError("")

    try {
      // Simulate connection attempt
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate connection validation
      if (!config.host || !config.username || !config.password) {
        throw new Error("Veuillez remplir tous les champs requis")
      }

      // Simulate successful connection
      setIsConnected(true)
      onConnectionChange(true, `Connecté à ${config.host}:${config.port}`)
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : "Erreur de connexion")
      setIsConnected(false)
      onConnectionChange(false, "Erreur de connexion")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setConnectionError("")
    onConnectionChange(false, "Déconnecté")
  }

  const handleTestConnection = async () => {
    setIsConnecting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Simulate test result
      alert("Test de connexion réussi !")
    } catch (error) {
      alert("Échec du test de connexion")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Configuration du Serveur Synology
          </CardTitle>
          <CardDescription>
            Configurez la connexion à votre serveur Synology pour le stockage des données d'IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="connection" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="connection">Connexion</TabsTrigger>
              <TabsTrigger value="storage">Stockage</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="data">Données</TabsTrigger>
            </TabsList>

            <TabsContent value="connection" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="host">Adresse du Serveur</Label>
                  <Input
                    id="host"
                    placeholder="192.168.1.100 ou monsynology.synology.me"
                    value={config.host}
                    onChange={(e) => setConfig((prev) => ({ ...prev, host: e.target.value }))}
                    disabled={isConnected}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    placeholder="5000"
                    value={config.port}
                    onChange={(e) => setConfig((prev) => ({ ...prev, port: e.target.value }))}
                    disabled={isConnected}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    placeholder="admin"
                    value={config.username}
                    onChange={(e) => setConfig((prev) => ({ ...prev, username: e.target.value }))}
                    disabled={isConnected}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={config.password}
                    onChange={(e) => setConfig((prev) => ({ ...prev, password: e.target.value }))}
                    disabled={isConnected}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label>Protocole:</Label>
                <div className="flex gap-2">
                  <Button
                    variant={config.protocol === "https" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setConfig((prev) => ({ ...prev, protocol: "https" }))}
                    disabled={isConnected}
                  >
                    HTTPS
                  </Button>
                  <Button
                    variant={config.protocol === "http" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setConfig((prev) => ({ ...prev, protocol: "http" }))}
                    disabled={isConnected}
                  >
                    HTTP
                  </Button>
                </div>
              </div>

              {connectionError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800">{connectionError}</span>
                </div>
              )}

              {isConnected && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    Connecté avec succès à {config.host}:{config.port}
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                {!isConnected ? (
                  <>
                    <Button onClick={handleConnect} disabled={isConnecting} className="flex-1">
                      {isConnecting ? (
                        <>
                          <Wifi className="h-4 w-4 mr-2 animate-pulse" />
                          Connexion...
                        </>
                      ) : (
                        <>
                          <Server className="h-4 w-4 mr-2" />
                          Se Connecter
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleTestConnection} disabled={isConnecting}>
                      Tester
                    </Button>
                  </>
                ) : (
                  <Button variant="destructive" onClick={handleDisconnect} className="flex-1">
                    Se Déconnecter
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="storage" className="space-y-4">
              {isConnected ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Utilisation du Stockage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Espace Utilisé</span>
                          <span>
                            {storageInfo.usedSpace} GB / {storageInfo.totalSpace} GB
                          </span>
                        </div>
                        <Progress value={(storageInfo.usedSpace / storageInfo.totalSpace) * 100} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <Database className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="text-2xl font-bold text-blue-900">{storageInfo.modelCount}</div>
                          <div className="text-sm text-blue-700">Modèles IA</div>
                        </div>

                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <FolderOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold text-green-900">{storageInfo.datasetCount}</div>
                          <div className="text-sm text-green-700">Jeux de Données</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Dossiers de Stockage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">/AI_Models/</span>
                          <Badge variant="outline">15 fichiers</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">/Training_Data/</span>
                          <Badge variant="outline">8 datasets</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">/Logs/</span>
                          <Badge variant="outline">142 fichiers</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Connectez-vous d'abord pour voir les informations de stockage</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Paramètres de Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chiffrement SSL/TLS</span>
                      <Badge variant={config.protocol === "https" ? "default" : "secondary"}>
                        {config.protocol === "https" ? "Activé" : "Désactivé"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Authentification 2FA</span>
                      <Badge variant="outline">Recommandé</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sauvegarde Automatique</span>
                      <Badge variant="default">Activé</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chiffrement des Données</span>
                      <Badge variant="default">AES-256</Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      <strong>Conseil de Sécurité:</strong> Utilisez toujours HTTPS et activez l'authentification à deux
                      facteurs sur votre Synology pour une sécurité optimale.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <SynologyDataManager isConnected={isConnected} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
