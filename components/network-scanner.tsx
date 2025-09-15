"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, Server, Smartphone, Laptop, Router, Search, RefreshCw } from "lucide-react"

interface NetworkDevice {
  ip: string
  hostname: string
  mac: string
  vendor: string
  type: "router" | "computer" | "mobile" | "server" | "unknown"
  status: "online" | "offline"
  services: string[]
}

interface NetworkScannerProps {
  expanded?: boolean
}

export function NetworkScanner({ expanded = false }: NetworkScannerProps) {
  const [devices, setDevices] = useState<NetworkDevice[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [networkInfo, setNetworkInfo] = useState({
    localIP: "192.168.1.100",
    gateway: "192.168.1.1",
    subnet: "192.168.1.0/24",
    connectedDevices: 0,
  })

  // Simulation de données réseau
  const mockDevices: NetworkDevice[] = [
    {
      ip: "192.168.1.1",
      hostname: "router.local",
      mac: "00:11:22:33:44:55",
      vendor: "TP-Link",
      type: "router",
      status: "online",
      services: ["HTTP", "SSH", "DHCP"],
    },
    {
      ip: "192.168.1.10",
      hostname: "synology-nas",
      mac: "00:11:22:33:44:66",
      vendor: "Synology",
      type: "server",
      status: "online",
      services: ["HTTP", "HTTPS", "SSH", "SMB", "FTP"],
    },
    {
      ip: "192.168.1.15",
      hostname: "desktop-pc",
      mac: "00:11:22:33:44:77",
      vendor: "Intel",
      type: "computer",
      status: "online",
      services: ["SSH", "RDP"],
    },
    {
      ip: "192.168.1.25",
      hostname: "iphone-john",
      mac: "00:11:22:33:44:88",
      vendor: "Apple",
      type: "mobile",
      status: "online",
      services: ["AirPlay"],
    },
  ]

  const startNetworkScan = async () => {
    setIsScanning(true)
    setScanProgress(0)
    setDevices([])

    // Simulation du scan
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setScanProgress(i)

      if (i === 50) {
        setDevices(mockDevices.slice(0, 2))
      } else if (i === 80) {
        setDevices(mockDevices)
      }
    }

    setNetworkInfo((prev) => ({
      ...prev,
      connectedDevices: mockDevices.length,
    }))
    setIsScanning(false)
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "router":
        return <Router className="h-4 w-4" />
      case "server":
        return <Server className="h-4 w-4" />
      case "computer":
        return <Laptop className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      default:
        return <Wifi className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    return status === "online" ? "default" : "secondary"
  }

  useEffect(() => {
    // Scan initial au chargement
    startNetworkScan()
  }, [])

  return (
    <div className={`space-y-6 ${expanded ? "h-full" : ""}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Informations Réseau
          </CardTitle>
          <CardDescription>Configuration réseau actuelle</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">IP Locale</p>
            <p className="text-sm text-muted-foreground">{networkInfo.localIP}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Passerelle</p>
            <p className="text-sm text-muted-foreground">{networkInfo.gateway}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Sous-réseau</p>
            <p className="text-sm text-muted-foreground">{networkInfo.subnet}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Appareils Connectés</p>
            <p className="text-sm text-muted-foreground">{networkInfo.connectedDevices}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button onClick={startNetworkScan} disabled={isScanning} className="flex items-center gap-2">
          {isScanning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {isScanning ? "Scan en cours..." : "Scanner le Réseau"}
        </Button>

        {isScanning && (
          <div className="flex-1">
            <Progress value={scanProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">Progression: {scanProgress}%</p>
          </div>
        )}
      </div>

      {expanded ? (
        <Tabs defaultValue="devices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="devices">Appareils Détectés</TabsTrigger>
            <TabsTrigger value="services">Services Réseau</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-4">
            {devices.map((device) => (
              <Card key={device.ip}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.type)}
                      <div>
                        <p className="font-medium">{device.hostname}</p>
                        <p className="text-sm text-muted-foreground">{device.ip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(device.status)}>{device.status}</Badge>
                      <Badge variant="outline">{device.vendor}</Badge>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1">Services:</p>
                    <div className="flex gap-1 flex-wrap">
                      {device.services.map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services Réseau Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Serveurs Web (HTTP/HTTPS)</span>
                    <Badge>3 détectés</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Serveurs SSH</span>
                    <Badge>2 détectés</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Partages SMB</span>
                    <Badge>1 détecté</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Services FTP</span>
                    <Badge>1 détecté</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Analyse de Sécurité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Ports ouverts détectés</span>
                    <Badge variant="destructive">Attention</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Appareils non sécurisés</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Connexions chiffrées</span>
                    <Badge variant="default">75%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-3">
          {devices.slice(0, 3).map((device) => (
            <div key={device.ip} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                {getDeviceIcon(device.type)}
                <span className="text-sm">{device.hostname}</span>
              </div>
              <Badge variant={getStatusColor(device.status)} className="text-xs">
                {device.status}
              </Badge>
            </div>
          ))}
          {devices.length > 3 && (
            <p className="text-xs text-muted-foreground text-center">+{devices.length - 3} autres appareils</p>
          )}
        </div>
      )}
    </div>
  )
}
