import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Rocket, Globe, Server, Activity, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface DeploymentPanelProps {
  selectedAgent: string | null
}

export function DeploymentPanel({ selectedAgent }: DeploymentPanelProps) {
  if (!selectedAgent) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Select an agent to configure deployment settings</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 overflow-auto">
      <div>
        <h3 className="font-semibold text-lg mb-4">Deploy Agent</h3>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Active</span>
              </div>
              <Badge variant="secondary">v1.2.0</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Last deployed:</span>
                <span>2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Executions today:</span>
                <span>47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success rate:</span>
                <span className="text-green-600">98.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Server className="w-4 h-4" />
              Environment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="environment">Environment</Label>
              <Select defaultValue="production">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="region">Region</Label>
              <Select defaultValue="us-east-1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="scaling">Auto Scaling</Label>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">Enable auto scaling</span>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="api-endpoint">API Endpoint</Label>
              <Input
                id="api-endpoint"
                value="https://api.example.com/agents/email-assistant"
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="https://your-app.com/webhook" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="rate-limiting">Rate Limiting</Label>
              <Switch defaultChecked />
            </div>

            <div>
              <Label htmlFor="rate-limit">Requests per minute</Label>
              <Input id="rate-limit" type="number" defaultValue="100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">v1.2.0</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-xs text-gray-600">Production deployment successful</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <Clock className="w-4 h-4 text-gray-600" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">v1.1.5</span>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-xs text-gray-600">Staging deployment</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">v1.1.4</span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-xs text-gray-600">Deployment failed - rolled back</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button className="w-full" size="lg">
            <Rocket className="w-4 h-4 mr-2" />
            Deploy to Production
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Deploy to Staging</Button>
            <Button variant="outline">Rollback</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
