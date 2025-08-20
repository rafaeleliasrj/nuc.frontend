import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Users, DollarSign } from "lucide-react"

const goals = [
  {
    title: "Meta Mensal de Vendas",
    current: 85000,
    target: 100000,
    unit: "R$",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Novos Clientes",
    current: 23,
    target: 30,
    unit: "",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Taxa de Conversão",
    current: 68,
    target: 75,
    unit: "%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Propostas Enviadas",
    current: 45,
    target: 50,
    unit: "",
    icon: Target,
    color: "text-orange-600",
  },
]

export function GoalsProgress() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <CardTitle>Progresso das Metas</CardTitle>
        <CardDescription>Acompanhe o progresso das metas mensais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100
          const isCompleted = progress >= 100

          return (
            <div key={goal.title} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-accent/10`}>
                    <goal.icon className={`h-4 w-4 ${goal.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {goal.unit}
                      {goal.current.toLocaleString()} de {goal.unit}
                      {goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Badge variant={isCompleted ? "default" : "secondary"} className="text-xs">
                  {Math.round(progress)}%
                </Badge>
              </div>
              <Progress value={Math.min(progress, 100)} className="h-2" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
