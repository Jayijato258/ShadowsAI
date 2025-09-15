"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Brain, Network, Lightbulb, Database } from "lucide-react"

interface KnowledgeNode {
  id: string
  label: string
  category: string
  connections: number
  strength: number
}

export function KnowledgeGraph() {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([
    { id: "1", label: "Natural Language Processing", category: "Core", connections: 12, strength: 95 },
    { id: "2", label: "Pattern Recognition", category: "Core", connections: 8, strength: 88 },
    { id: "3", label: "Machine Learning", category: "Core", connections: 15, strength: 92 },
    { id: "4", label: "Data Analysis", category: "Applied", connections: 6, strength: 85 },
    { id: "5", label: "Computer Vision", category: "Applied", connections: 9, strength: 78 },
    { id: "6", label: "Reinforcement Learning", category: "Advanced", connections: 4, strength: 72 },
    { id: "7", label: "Neural Networks", category: "Core", connections: 11, strength: 90 },
    { id: "8", label: "Deep Learning", category: "Advanced", connections: 7, strength: 82 },
  ])

  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          strength: Math.min(100, node.strength + Math.random() * 0.5),
          connections: node.connections + (Math.random() > 0.8 ? 1 : 0),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Core":
        return <Brain className="h-4 w-4" />
      case "Applied":
        return <Database className="h-4 w-4" />
      case "Advanced":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Network className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Core":
        return "bg-primary text-primary-foreground"
      case "Applied":
        return "bg-secondary text-secondary-foreground"
      case "Advanced":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Knowledge Network
            </CardTitle>
            <CardDescription>Interactive visualization of AI knowledge connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedNode?.id === node.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(node.category)}
                      <Badge variant="outline" className={getCategoryColor(node.category)}>
                        {node.category}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-sm text-balance">{node.label}</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Strength</span>
                        <span>{node.strength.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${node.strength}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Connections</span>
                        <span>{node.connections}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Node Details</CardTitle>
            <CardDescription>
              {selectedNode ? "Information about selected knowledge node" : "Select a node to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-balance">{selectedNode.label}</h3>
                  <Badge className={getCategoryColor(selectedNode.category)}>{selectedNode.category}</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Knowledge Strength</span>
                    <span className="font-medium">{selectedNode.strength.toFixed(1)}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Active Connections</span>
                    <span className="font-medium">{selectedNode.connections}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Learning Status</span>
                    <Badge variant="outline" className="text-xs">
                      {selectedNode.strength > 90 ? "Mastered" : selectedNode.strength > 75 ? "Advanced" : "Learning"}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>• Strengthened connection to Neural Networks</p>
                    <p>• Learned new pattern in data processing</p>
                    <p>• Updated knowledge base with recent findings</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click on a knowledge node to explore its connections and details.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
