const { app, BrowserWindow, Menu } = require("electron")
const path = require("path")
const isDev = process.env.ELECTRON_IS_DEV === "1"

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    titleBarStyle: "hiddenInset",
    show: false,
    icon: path.join(__dirname, "public/icon.png"),
  })

  // Load the app
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000")
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, "out/index.html"))
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })

  const template = [
    {
      label: "IA Auto-Apprenante",
      submenu: [
        { label: "À propos de IA Auto-Apprenante", role: "about" },
        { type: "separator" },
        { label: "Services", role: "services", submenu: [] },
        { type: "separator" },
        { label: "Masquer IA Auto-Apprenante", accelerator: "Command+H", role: "hide" },
        { label: "Masquer les autres", accelerator: "Command+Shift+H", role: "hideothers" },
        { label: "Tout afficher", role: "unhide" },
        { type: "separator" },
        { label: "Quitter", accelerator: "Command+Q", click: () => app.quit() },
      ],
    },
    {
      label: "Fichier",
      submenu: [
        { label: "Nouveau", accelerator: "Command+N" },
        { label: "Ouvrir", accelerator: "Command+O" },
        { type: "separator" },
        { label: "Fermer", accelerator: "Command+W", role: "close" },
      ],
    },
    {
      label: "Édition",
      submenu: [
        { label: "Annuler", accelerator: "Command+Z", role: "undo" },
        { label: "Rétablir", accelerator: "Shift+Command+Z", role: "redo" },
        { type: "separator" },
        { label: "Couper", accelerator: "Command+X", role: "cut" },
        { label: "Copier", accelerator: "Command+C", role: "copy" },
        { label: "Coller", accelerator: "Command+V", role: "paste" },
      ],
    },
    {
      label: "Affichage",
      submenu: [
        { label: "Recharger", accelerator: "Command+R", role: "reload" },
        { label: "Forcer le rechargement", accelerator: "Command+Shift+R", role: "forceReload" },
        { label: "Outils de développement", accelerator: "F12", role: "toggleDevTools" },
        { type: "separator" },
        { label: "Taille réelle", accelerator: "Command+0", role: "resetZoom" },
        { label: "Agrandir", accelerator: "Command+Plus", role: "zoomIn" },
        { label: "Réduire", accelerator: "Command+-", role: "zoomOut" },
        { type: "separator" },
        { label: "Plein écran", accelerator: "Ctrl+Command+F", role: "togglefullscreen" },
      ],
    },
    {
      label: "Fenêtre",
      submenu: [
        { label: "Réduire", accelerator: "Command+M", role: "minimize" },
        { label: "Fermer", accelerator: "Command+W", role: "close" },
        { type: "separator" },
        { label: "Tout au premier plan", role: "front" },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
