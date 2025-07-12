import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Plus,
  Mail,
  Database,
  Calculator,
  Globe,
  FileText,
  Calendar,
  MessageSquare,
  Settings,
} from "lucide-react"

const toolCategories = [
  {
    name: "Communication",
    tools: [
      { id: "1", name: "Email Sender", description: "Send emails via SMTP", icon: Mail, connected: true },
      { id: "2", name: "Slack Bot", description: "Post messages to Slack", icon: MessageSquare, connected: false },
      { id: "3", name: "SMS Gateway", description: "Send SMS messages", icon: MessageSquare, connected: false },
    ],
  },
  {
    name: "Data & Analytics",
    tools: [
      { id: "4", name: "Database Query", description: "Execute SQL queries", icon: Database, connected: true },
      { id: "5", name: "Calculator", description: "Perform calculations", icon: Calculator, connected: true },
      { id: "6", name: "Data Processor", description: "Process CSV/JSON data", icon: FileText, connected: false },
    ],
  },
  {
    name: "Web & APIs",
    tools: [
      { id: "7", name: "Web Scraper", description: "Extract web content", icon: Globe, connected: false },
      { id: "8", name: "REST API Client", description: "Make HTTP requests", icon: Globe, connected: true },
      { id: "9", name: "Calendar API", description: "Manage calendar events", icon: Calendar, connected: false },
    ],
  },
]

export function ToolsPanel() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Tools Library</h3>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search tools..." className="pl-10" />
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Custom Tool
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {toolCategories.map((category) => (
              <div key={category.name}>
                <h4 className="font-medium text-sm text-gray-900 mb-3">{category.name}</h4>
                <div className="space-y-2">
                  {category.tools.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <Card key={tool.id} className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{tool.name}</span>
                              {tool.connected && (
                                <Badge variant="secondary" className="text-xs">
                                  Connected
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600">{tool.description}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Settings className="w-3 h-3" />
                            </Button>
                            <Button variant={tool.connected ? "secondary" : "default"} size="sm">
                              {tool.connected ? "Configure" : "Connect"}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
