import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail, MessageSquare, FileText, Users, ShoppingCart, Calendar, BarChart, Shield } from "lucide-react"

const templates = [
  {
    id: "1",
    name: "Email Auto-Responder",
    description: "Automatically respond to customer emails with intelligent replies",
    icon: Mail,
    category: "Communication",
    complexity: "Beginner",
    steps: 4,
    tags: ["Email", "Customer Service", "Automation"],
  },
  {
    id: "2",
    name: "Content Moderator",
    description: "Review and moderate user-generated content across platforms",
    icon: Shield,
    category: "Moderation",
    complexity: "Intermediate",
    steps: 6,
    tags: ["Content", "Moderation", "Safety"],
  },
  {
    id: "3",
    name: "Lead Qualification Bot",
    description: "Qualify and score leads from various sources automatically",
    icon: Users,
    category: "Sales",
    complexity: "Advanced",
    steps: 8,
    tags: ["Sales", "CRM", "Lead Generation"],
  },
  {
    id: "4",
    name: "Social Media Manager",
    description: "Schedule posts and respond to mentions across social platforms",
    icon: MessageSquare,
    category: "Marketing",
    complexity: "Intermediate",
    steps: 5,
    tags: ["Social Media", "Marketing", "Engagement"],
  },
  {
    id: "5",
    name: "Document Processor",
    description: "Extract and process information from various document types",
    icon: FileText,
    category: "Data Processing",
    complexity: "Intermediate",
    steps: 7,
    tags: ["Documents", "OCR", "Data Extraction"],
  },
  {
    id: "6",
    name: "Meeting Scheduler",
    description: "Automatically schedule meetings based on availability",
    icon: Calendar,
    category: "Productivity",
    complexity: "Beginner",
    steps: 3,
    tags: ["Calendar", "Scheduling", "Meetings"],
  },
  {
    id: "7",
    name: "Sales Analytics Agent",
    description: "Generate sales reports and insights from CRM data",
    icon: BarChart,
    category: "Analytics",
    complexity: "Advanced",
    steps: 9,
    tags: ["Analytics", "Sales", "Reporting"],
  },
  {
    id: "8",
    name: "E-commerce Assistant",
    description: "Handle customer inquiries and order processing",
    icon: ShoppingCart,
    category: "E-commerce",
    complexity: "Intermediate",
    steps: 6,
    tags: ["E-commerce", "Customer Service", "Orders"],
  },
]

const complexityColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
}

export function TemplatesPanel() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-2">Agent Templates</h3>
        <p className="text-sm text-gray-600 mb-4">Start with pre-built templates and customize them for your needs</p>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {templates.map((template) => {
              const Icon = template.icon
              return (
                <Card key={template.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${complexityColors[template.complexity as keyof typeof complexityColors]}`}
                        >
                          {template.complexity}
                        </Badge>
                      </div>

                      <p className="text-xs text-gray-600 mb-2">{template.description}</p>

                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs text-gray-500">{template.steps} steps</span>
                        <span className="text-xs text-gray-500">{template.category}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Use Template
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
