const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Construction de ShadowsAI pour macOS...\n")

try {
  // Nettoyer les anciens builds
  console.log("🧹 Nettoyage des anciens builds...")
  if (fs.existsSync("out")) {
    fs.rmSync("out", { recursive: true, force: true })
  }
  if (fs.existsSync("dist")) {
    fs.rmSync("dist", { recursive: true, force: true })
  }

  // Build Next.js
  console.log("⚡ Construction de l'application Next.js...")
  execSync("npm run build", { stdio: "inherit" })

  // Vérifier que le build Next.js a réussi
  if (!fs.existsSync("out")) {
    throw new Error('Le build Next.js a échoué - dossier "out" non trouvé')
  }

  // Build Electron
  console.log("📦 Empaquetage avec Electron...")
  execSync("npx electron-builder --mac --publish=never", { stdio: "inherit" })

  // Vérifier les fichiers de sortie
  const distFiles = fs.readdirSync("dist")
  const dmgFile = distFiles.find((file) => file.endsWith(".dmg"))
  const zipFile = distFiles.find((file) => file.endsWith(".zip"))

  console.log("\n✅ Build terminé avec succès!")
  console.log('📁 Fichiers créés dans le dossier "dist":')

  if (dmgFile) {
    console.log(`   📀 ${dmgFile} (Installateur DMG)`)
  }
  if (zipFile) {
    console.log(`   📦 ${zipFile} (Archive ZIP)`)
  }

  console.log("\n🎉 ShadowsAI est prêt pour macOS!")
  console.log("💡 Pour installer: Double-cliquez sur le fichier .dmg")
} catch (error) {
  console.error("\n❌ Erreur lors du build:", error.message)
  process.exit(1)
}
