"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, Wrench, LayoutTemplateIcon as Template, Rocket, Plus, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activePanel: "config" | "tools" | "templates" | "deploy"
  onPanelChange: (panel: "config" | "tools" | "templates" | "deploy") => void
  selectedAgent: string | null
  onAgentSelect: (agentId: string | null) => void
}

const mockAgents = [
  { id: "1", name: "Email Assistant", status: "active", type: "Communication" },
  { id: "2", name: "Data Processor", status: "draft", type: "Analytics" },
  { id: "3", name: "Content Moderator", status: "active", type: "Moderation" },
  { id: "4", name: "Lead Qualifier", status: "paused", type: "Sales" },
]

export function Sidebar({ activePanel, onPanelChange, selectedAgent, onAgentSelect }: SidebarProps) {
  const panels = [
    { id: "config" as const, label: "Agent Config", icon: Bot },
    { id: "tools" as const, label: "Tools", icon: Wrench },
    { id: "templates" as const, label: "Templates", icon: Template },
    { id: "deploy" as const, label: "Deploy", icon: Rocket },
  ]

  return (
    <div className="w-64 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm text-gray-900">My Agents</h2>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        </div>

        <ScrollArea className="h-48">
          <div className="space-y-2">
            {mockAgents.map((agent) => (
              <div
                key={agent.id}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-colors",
                  selectedAgent === agent.id ? "border-blue-200 bg-blue-50" : "border-gray-200 hover:border-gray-300",
                )}
                onClick={() => onAgentSelect(agent.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{agent.name}</span>
                  <div className="flex items-center gap-1">
                    {agent.status === "active" && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                    {agent.status === "paused" && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
                    {agent.status === "draft" && <div className="w-2 h-2 bg-gray-400 rounded-full" />}
                    <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {agent.type}
                  </Badge>
                  <span className="text-xs text-gray-500 capitalize">{agent.status}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 p-4">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Panels</h3>
        <div className="space-y-1">
          {panels.map((panel) => {
            const Icon = panel.icon
            return (
              <Button
                key={panel.id}
                variant={activePanel === panel.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onPanelChange(panel.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {panel.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
