import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const funnelStages = [
  {
    stage: "Leads Gerados",
    count: 1250,
    percentage: 100,
    color: "bg-blue-500",
  },
  {
    stage: "Leads Qualificados",
    count: 875,
    percentage: 70,
    color: "bg-green-500",
  },
  {
    stage: "Propostas Enviadas",
    count: 350,
    percentage: 28,
    color: "bg-yellow-500",
  },
  {
    stage: "Negociações",
    count: 175,
    percentage: 14,
    color: "bg-orange-500",
  },
  {
    stage: "Vendas Fechadas",
    count: 87,
    percentage: 7,
    color: "bg-purple-500",
  },
]

export function SalesFunnel() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <CardTitle>Funil de Vendas</CardTitle>
        <CardDescription>Acompanhe a conversão em cada etapa do processo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {funnelStages.map((stage, index) => (
          <div key={stage.stage} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <span className="font-medium text-sm">{stage.stage}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-sm">{stage.count}</span>
                <span className="text-xs text-muted-foreground ml-2">({stage.percentage}%)</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${stage.color} transition-all duration-500`}
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
