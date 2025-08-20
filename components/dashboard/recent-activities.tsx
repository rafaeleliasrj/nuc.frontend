import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, User, FileText } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "sale",
    title: "Nova venda registrada",
    description: "Venda #1234 para Maria Silva",
    amount: "R$ 2.500,00",
    time: "2 min atrás",
    icon: DollarSign,
    user: "João Vendedor",
  },
  {
    id: 2,
    type: "client",
    title: "Novo cliente cadastrado",
    description: "Pedro Santos foi adicionado",
    time: "15 min atrás",
    icon: User,
    user: "Ana Gestora",
  },
  {
    id: 3,
    type: "proposal",
    title: "Proposta enviada",
    description: "Proposta #5678 enviada para ABC Corp",
    amount: "R$ 15.000,00",
    time: "1 hora atrás",
    icon: FileText,
    user: "Carlos Vendedor",
  },
  {
    id: 4,
    type: "sale",
    title: "Venda concluída",
    description: "Pagamento confirmado - Venda #1233",
    amount: "R$ 1.800,00",
    time: "2 horas atrás",
    icon: DollarSign,
    user: "João Vendedor",
  },
]

export function RecentActivities() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>Últimas atividades da equipe de vendas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/5 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <activity.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">por {activity.user}</p>
                {activity.amount && (
                  <Badge variant="outline" className="text-xs">
                    {activity.amount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
