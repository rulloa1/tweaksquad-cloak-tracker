import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface AgentConfigPanelProps {
  selectedAgent: string | null
}

export function AgentConfigPanel({ selectedAgent }: AgentConfigPanelProps) {
  if (!selectedAgent) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Select an agent to configure its settings</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 overflow-auto">
      <div>
        <h3 className="font-semibold text-lg mb-4">Agent Configuration</h3>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Basic Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input id="agent-name" defaultValue="Email Assistant" />
            </div>

            <div>
              <Label htmlFor="agent-description">Description</Label>
              <Textarea
                id="agent-description"
                defaultValue="Automatically processes and responds to incoming emails"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="agent-model">AI Model</Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Model Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="temperature">Temperature: 0.7</Label>
              <input
                type="range"
                id="temperature"
                min="0"
                max="2"
                step="0.1"
                defaultValue="0.7"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <Label htmlFor="max-tokens">Max Tokens</Label>
              <Input id="max-tokens" type="number" defaultValue="1000" />
            </div>

            <div>
              <Label htmlFor="max-steps">Max Steps</Label>
              <Input id="max-steps" type="number" defaultValue="5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">System Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter system prompt for your agent..."
              defaultValue="You are a helpful email assistant. Analyze incoming emails and provide appropriate responses based on the content and context."
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Execution Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-execute">Auto Execute</Label>
              <Switch id="auto-execute" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="require-approval">Require Approval</Label>
              <Switch id="require-approval" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="logging">Enable Logging</Label>
              <Switch id="logging" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Connected Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Email API</Badge>
                  <span className="text-sm text-gray-600">Connected</span>
                </div>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Sentiment Analysis</Badge>
                  <span className="text-sm text-gray-600">Connected</span>
                </div>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>

              <Separator />

              <Button variant="outline" size="sm" className="w-full">
                Add Tool
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button className="flex-1">Save Changes</Button>
          <Button variant="outline">Reset</Button>
        </div>
      </div>
    </div>
  )
}
