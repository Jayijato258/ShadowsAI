const { app, BrowserWindow, Menu, shell } = require("electron")
const path = require("path")
const isDev = process.env.NODE_ENV === "development"

let mainWindow

function createWindow() {
  // Créer la fenêtre principale
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "../assets/icon.png"),
    show: false,
  })

  // Charger l'application
  const startUrl = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../out/index.html")}`

  mainWindow.loadURL(startUrl)

  // Afficher la fenêtre quand elle est prête
  mainWindow.once("ready-to-show", () => {
    mainWindow.show()

    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  // Gérer la fermeture de fenêtre
  mainWindow.on("closed", () => {
    mainWindow = null
  })

  // Ouvrir les liens externes dans le navigateur
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: "deny" }
  })
}

// Menu de l'application
function createMenu() {
  const template = [
    {
      label: "ShadowsAI",
      submenu: [
        {
          label: "À propos de ShadowsAI",
          role: "about",
        },
        { type: "separator" },
        {
          label: "Préférences...",
          accelerator: "Cmd+,",
          click: () => {
            // Ouvrir les préférences
          },
        },
        { type: "separator" },
        {
          label: "Masquer ShadowsAI",
          accelerator: "Cmd+H",
          role: "hide",
        },
        {
          label: "Masquer les autres",
          accelerator: "Cmd+Alt+H",
          role: "hideothers",
        },
        {
          label: "Tout afficher",
          role: "unhide",
        },
        { type: "separator" },
        {
          label: "Quitter ShadowsAI",
          accelerator: "Cmd+Q",
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: "Édition",
      submenu: [
        { label: "Annuler", accelerator: "Cmd+Z", role: "undo" },
        { label: "Rétablir", accelerator: "Shift+Cmd+Z", role: "redo" },
        { type: "separator" },
        { label: "Couper", accelerator: "Cmd+X", role: "cut" },
        { label: "Copier", accelerator: "Cmd+C", role: "copy" },
        { label: "Coller", accelerator: "Cmd+V", role: "paste" },
        { label: "Tout sélectionner", accelerator: "Cmd+A", role: "selectall" },
      ],
    },
    {
      label: "Affichage",
      submenu: [
        { label: "Recharger", accelerator: "Cmd+R", role: "reload" },
        { label: "Forcer le rechargement", accelerator: "Cmd+Shift+R", role: "forceReload" },
        { label: "Outils de développement", accelerator: "F12", role: "toggleDevTools" },
        { type: "separator" },
        { label: "Taille réelle", accelerator: "Cmd+0", role: "resetZoom" },
        { label: "Agrandir", accelerator: "Cmd+Plus", role: "zoomIn" },
        { label: "Réduire", accelerator: "Cmd+-", role: "zoomOut" },
        { type: "separator" },
        { label: "Plein écran", accelerator: "Ctrl+Cmd+F", role: "togglefullscreen" },
      ],
    },
    {
      label: "Fenêtre",
      submenu: [
        { label: "Réduire", accelerator: "Cmd+M", role: "minimize" },
        { label: "Fermer", accelerator: "Cmd+W", role: "close" },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// Événements de l'application
app.whenReady().then(() => {
  createWindow()
  createMenu()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// Sécurité
app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", (event, navigationUrl) => {
    event.preventDefault()
    shell.openExternal(navigationUrl)
  })
})
