const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  // Expose safe APIs to the renderer process
  platform: process.platform,
  versions: process.versions,
})
