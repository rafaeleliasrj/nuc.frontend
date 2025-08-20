"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Users, Eye, MessageSquare, CreditCard, CheckCircle } from "lucide-react"

const funnelData = [
  {
    stage: "Visitantes",
    count: 12500,
    percentage: 100,
    conversion: 100,
    icon: Eye,
    color: "bg-blue-500",
  },
  {
    stage: "Leads",
    count: 2500,
    percentage: 20,
    conversion: 20,
    icon: Users,
    color: "bg-green-500",
  },
  {
    stage: "Qualificados",
    count: 1250,
    percentage: 10,
    conversion: 50,
    icon: MessageSquare,
    color: "bg-yellow-500",
  },
  {
    stage: "Propostas",
    count: 500,
    percentage: 4,
    conversion: 40,
    icon: CreditCard,
    color: "bg-orange-500",
  },
  {
    stage: "Vendas",
    count: 200,
    percentage: 1.6,
    conversion: 40,
    icon: CheckCircle,
    color: "bg-purple-500",
  },
]

export function ConversionFunnel() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <CardTitle>Funil de Conversão</CardTitle>
        <CardDescription>Análise detalhada do processo de vendas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {funnelData.map((stage, index) => (
          <div key={stage.stage} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <div className="flex items-center gap-2">
                  <stage.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{stage.stage}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="font-semibold text-lg">{stage.count.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-2">({stage.percentage}%)</span>
                </div>
                {index > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {stage.conversion}% conversão
                  </Badge>
                )}
              </div>
            </div>
            <div className="relative">
              <Progress value={stage.percentage} className="h-3" />
              {index < funnelData.length - 1 && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1.6%</div>
              <div className="text-sm text-muted-foreground">Taxa de Conversão Geral</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">R$ 2.500</div>
              <div className="text-sm text-muted-foreground">Custo por Lead</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">R$ 6.250</div>
              <div className="text-sm text-muted-foreground">Custo por Venda</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
