interface SynologyConfig {
  host: string
  port: string
  username: string
  password: string
  protocol: "http" | "https"
}

interface SynologyApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export class SynologyClient {
  private config: SynologyConfig
  private sessionId?: string

  constructor(config: SynologyConfig) {
    this.config = config
  }

  private getBaseUrl(): string {
    return `${this.config.protocol}://${this.config.host}:${this.config.port}`
  }

  async connect(): Promise<SynologyApiResponse> {
    try {
      const response = await fetch("/api/synology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "connect",
          config: this.config,
        }),
      })

      const result = await response.json()

      if (result.success && result.data?.sessionId) {
        this.sessionId = result.data.sessionId
      }

      return result
    } catch (error) {
      return {
        success: false,
        error: "Erreur de connexion: " + (error instanceof Error ? error.message : "Erreur inconnue"),
      }
    }
  }

  async testConnection(): Promise<SynologyApiResponse> {
    try {
      const response = await fetch("/api/synology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "test",
          config: this.config,
        }),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Erreur de test: " + (error instanceof Error ? error.message : "Erreur inconnue"),
      }
    }
  }

  async getStorageInfo(): Promise<SynologyApiResponse> {
    if (!this.sessionId) {
      return { success: false, error: "Non connecté" }
    }

    try {
      const response = await fetch("/api/synology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getStorageInfo",
          config: this.config,
          sessionId: this.sessionId,
        }),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Erreur de récupération: " + (error instanceof Error ? error.message : "Erreur inconnue"),
      }
    }
  }

  async uploadModel(modelData: any): Promise<SynologyApiResponse> {
    if (!this.sessionId) {
      return { success: false, error: "Non connecté" }
    }

    try {
      const response = await fetch("/api/synology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "uploadModel",
          config: this.config,
          sessionId: this.sessionId,
          modelData,
        }),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Erreur d'upload: " + (error instanceof Error ? error.message : "Erreur inconnue"),
      }
    }
  }

  async downloadModel(modelId: string): Promise<SynologyApiResponse> {
    if (!this.sessionId) {
      return { success: false, error: "Non connecté" }
    }

    try {
      const response = await fetch("/api/synology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "downloadModel",
          config: this.config,
          sessionId: this.sessionId,
          modelId,
        }),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: "Erreur de téléchargement: " + (error instanceof Error ? error.message : "Erreur inconnue"),
      }
    }
  }

  disconnect(): void {
    this.sessionId = undefined
  }
}
