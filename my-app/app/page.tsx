"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { WorkflowCanvas } from "@/components/workflow-canvas"
import { AgentConfigPanel } from "@/components/agent-config-panel"
import { ToolsPanel } from "@/components/tools-panel"
import { TemplatesPanel } from "@/components/templates-panel"
import { DeploymentPanel } from "@/components/deployment-panel"
import { Header } from "@/components/header"

export default function AgentBuilder() {
  const [activePanel, setActivePanel] = useState<"config" | "tools" | "templates" | "deploy">("config")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activePanel={activePanel}
          onPanelChange={setActivePanel}
          selectedAgent={selectedAgent}
          onAgentSelect={setSelectedAgent}
        />

        <main className="flex-1 flex">
          <WorkflowCanvas selectedAgent={selectedAgent} onAgentSelect={setSelectedAgent} />

          <div className="w-80 border-l bg-white">
            {activePanel === "config" && <AgentConfigPanel selectedAgent={selectedAgent} />}
            {activePanel === "tools" && <ToolsPanel />}
            {activePanel === "templates" && <TemplatesPanel />}
            {activePanel === "deploy" && <DeploymentPanel selectedAgent={selectedAgent} />}
          </div>
        </main>
      </div>
    </div>
  )
}
