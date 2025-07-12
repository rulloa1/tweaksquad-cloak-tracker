"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Database, ArrowRight, Plus, Settings, Play } from "lucide-react"

interface WorkflowCanvasProps {
  selectedAgent: string | null
  onAgentSelect: (agentId: string | null) => void
}

const nodeTypes = {
  trigger: { icon: Play, color: "bg-green-100 border-green-300", textColor: "text-green-700" },
  llm: { icon: MessageSquare, color: "bg-blue-100 border-blue-300", textColor: "text-blue-700" },
  tool: { icon: Settings, color: "bg-purple-100 border-purple-300", textColor: "text-purple-700" },
  action: { icon: Database, color: "bg-orange-100 border-orange-300", textColor: "text-orange-700" },
}

const mockWorkflow = [
  { id: "1", type: "trigger", title: "Email Received", description: "New email trigger" },
  { id: "2", type: "llm", title: "Analyze Content", description: "GPT-4 analysis" },
  { id: "3", type: "tool", title: "Sentiment Check", description: "Sentiment analysis tool" },
  { id: "4", type: "action", title: "Send Response", description: "Auto-reply action" },
]

export function WorkflowCanvas({ selectedAgent, onAgentSelect }: WorkflowCanvasProps) {
  const [draggedNode, setDraggedNode] = useState<string | null>(null)

  if (!selectedAgent) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Agent Selected</h3>
          <p className="text-gray-600 mb-4">Select an agent from the sidebar to view its workflow</p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Agent
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Email Assistant Workflow</h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">4 steps</Badge>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Step
            </Button>
          </div>
        </div>
        <p className="text-gray-600">Automatically processes and responds to incoming emails</p>
      </div>

      <div className="relative">
        <div className="flex items-center gap-6 overflow-x-auto pb-4">
          {mockWorkflow.map((node, index) => {
            const nodeType = nodeTypes[node.type as keyof typeof nodeTypes]
            const Icon = nodeType.icon

            return (
              <div key={node.id} className="flex items-center gap-6">
                <Card
                  className={`p-4 min-w-[200px] cursor-pointer transition-all hover:shadow-md ${nodeType.color}`}
                  onClick={() => {
                    /* Handle node selection */
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${nodeType.color} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${nodeType.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{node.title}</h4>
                      <p className="text-xs text-gray-600">{node.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {node.type === "llm" && (
                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Model:</span>
                          <span className="font-medium">GPT-4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Max tokens:</span>
                          <span className="font-medium">1000</span>
                        </div>
                      </div>
                    )}
                    {node.type === "tool" && (
                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Provider:</span>
                          <span className="font-medium">OpenAI</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {index < mockWorkflow.length - 1 && <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-4">Available Components</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(nodeTypes).map(([type, config]) => {
            const Icon = config.icon
            return (
              <Card
                key={type}
                className={`p-3 cursor-pointer transition-all hover:shadow-md ${config.color}`}
                draggable
                onDragStart={() => setDraggedNode(type)}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${config.textColor}`} />
                  <span className="text-sm font-medium capitalize">{type}</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
