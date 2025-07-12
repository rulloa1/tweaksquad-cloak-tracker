import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Save, Settings, HelpCircle } from "lucide-react"

export function Header() {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h1 className="text-xl font-semibold">Agent Builder</h1>
        </div>
        <Badge variant="secondary" className="text-xs">
          Beta
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button size="sm">
          <Play className="w-4 h-4 mr-2" />
          Test Agent
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
