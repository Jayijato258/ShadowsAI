const { contextBridge, ipcRenderer } = require("electron")

// Exposer des APIs sécurisées au renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  // Système
  platform: process.platform,
  version: process.versions.electron,

  // Notifications
  showNotification: (title, body) => {
    new Notification(title, { body })
  },

  // Stockage local
  store: {
    get: (key) => ipcRenderer.invoke("store-get", key),
    set: (key, value) => ipcRenderer.invoke("store-set", key, value),
    delete: (key) => ipcRenderer.invoke("store-delete", key),
  },

  // Fichiers
  selectFile: () => ipcRenderer.invoke("select-file"),
  saveFile: (data, filename) => ipcRenderer.invoke("save-file", data, filename),

  // IA et apprentissage
  ai: {
    saveModel: (modelData) => ipcRenderer.invoke("ai-save-model", modelData),
    loadModel: (modelId) => ipcRenderer.invoke("ai-load-model", modelId),
    getMetrics: () => ipcRenderer.invoke("ai-get-metrics"),
  },

  // Minecraft
  minecraft: {
    generateMod: (config) => ipcRenderer.invoke("minecraft-generate-mod", config),
    getVersions: () => ipcRenderer.invoke("minecraft-get-versions"),
    installMod: (modPath) => ipcRenderer.invoke("minecraft-install-mod", modPath),
  },
})
