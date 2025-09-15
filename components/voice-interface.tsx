"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VoiceInterfaceProps {
  expanded?: boolean
}

export function VoiceInterface({ expanded = false }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [lastResponse, setLastResponse] = useState("")
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Vérification du support de la reconnaissance vocale
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "fr-FR"

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
          handleVoiceCommand(finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Erreur de reconnaissance vocale:", event.error)
        setIsListening(false)
      }
    }
  }, [])

  const handleVoiceCommand = async (command: string) => {
    const response = `J'ai entendu: "${command}". En tant qu'IA auto-apprenante, j'analyse votre commande vocale et j'adapte mes réponses selon vos préférences d'interaction.`
    setLastResponse(response)

    if (voiceEnabled) {
      speakResponse(response)
    }
  }

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "fr-FR"
      utterance.rate = 0.9
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
      setTranscript("")
    }
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
    if (isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const stopSpeaking = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <div className={`space-y-4 ${expanded ? "h-full" : ""}`}>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          size="lg"
          className="h-16 w-16 rounded-full"
        >
          {isListening ? "🔇" : "🎤"}
        </Button>

        <div className="flex flex-col items-center gap-2">
          <Badge variant={isListening ? "default" : "secondary"}>{isListening ? "Écoute..." : "Inactif"}</Badge>
          {isListening && (
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button onClick={toggleVoice} variant={voiceEnabled ? "default" : "outline"} size="sm">
          {voiceEnabled ? "🔊" : "🔇"}
          <span className="ml-2">{voiceEnabled ? "Audio Activé" : "Audio Désactivé"}</span>
        </Button>

        {isSpeaking && (
          <Button onClick={stopSpeaking} variant="outline" size="sm">
            ⏹️ <span className="ml-2">Arrêter</span>
          </Button>
        )}
      </div>

      {transcript && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Dernière Commande Vocale:</h4>
            <p className="text-sm text-muted-foreground">{transcript}</p>
          </CardContent>
        </Card>
      )}

      {lastResponse && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Réponse de l'IA:</h4>
            <p className="text-sm text-muted-foreground">{lastResponse}</p>
            {voiceEnabled && (
              <Button
                onClick={() => speakResponse(lastResponse)}
                variant="outline"
                size="sm"
                className="mt-2"
                disabled={isSpeaking}
              >
                ▶️ <span className="ml-2">Répéter</span>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {expanded && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Commandes Vocales Disponibles:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• "Commence l'apprentissage"</li>
              <li>• "Arrête l'apprentissage"</li>
              <li>• "Montre-moi les statistiques"</li>
              <li>• "Scanne le réseau local"</li>
              <li>• "Connecte-toi à Synology"</li>
              <li>• "Explique-moi tes connaissances"</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
