"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Users, Star, UserPlus } from "lucide-react"

const segmentationData = [
  { name: "VIP", value: 15, count: 185, revenue: 450000, color: "hsl(var(--chart-4))" },
  { name: "Ativos", value: 60, count: 740, revenue: 680000, color: "hsl(var(--primary))" },
  { name: "Prospects", value: 20, count: 246, revenue: 0, color: "hsl(var(--secondary))" },
  { name: "Inativos", value: 5, count: 63, revenue: 25000, color: "hsl(var(--muted-foreground))" },
]

const customerValueData = [
  { segment: "VIP", ltv: 15000, acquisitionCost: 500, retention: 95 },
  { segment: "Ativos", ltv: 5200, acquisitionCost: 300, retention: 85 },
  { segment: "Prospects", ltv: 0, acquisitionCost: 200, retention: 0 },
  { segment: "Inativos", ltv: 800, acquisitionCost: 250, retention: 15 },
]

const customerGrowthData = [
  { month: "Jan", novos: 45, perdidos: 12, liquido: 33 },
  { month: "Fev", novos: 52, perdidos: 8, liquido: 44 },
  { month: "Mar", novos: 38, perdidos: 15, liquido: 23 },
  { month: "Abr", novos: 61, perdidos: 10, liquido: 51 },
  { month: "Mai", novos: 48, perdidos: 7, liquido: 41 },
  { month: "Jun", novos: 55, perdidos: 9, liquido: 46 },
]

export function CustomerSegmentation() {
  return (
    <div className="space-y-6">
      {/* Customer Segments Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {segmentationData.map((segment) => (
          <Card key={segment.name} className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                {segment.name === "VIP" && <Star className="h-4 w-4 text-yellow-500" />}
                {segment.name === "Ativos" && <Users className="h-4 w-4 text-green-500" />}
                {segment.name === "Prospects" && <UserPlus className="h-4 w-4 text-blue-500" />}
                {segment.name === "Inativos" && <Users className="h-4 w-4 text-gray-500" />}
                {segment.name}
              </CardDescription>
              <CardTitle className="text-2xl">{segment.count}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {segment.value}% da base
                {segment.revenue > 0 && (
                  <div className="font-medium text-foreground">R$ {segment.revenue.toLocaleString("pt-BR")}</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Distribution */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle>Distribuição da Base de Clientes</CardTitle>
            <CardDescription>Segmentação por tipo de cliente</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {segmentationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Segmento</span>
                                <span className="font-bold text-muted-foreground">{data.name}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Clientes</span>
                                <span className="font-bold">{data.count}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Growth */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle>Crescimento da Base</CardTitle>
            <CardDescription>Novos clientes vs clientes perdidos</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="novos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="perdidos" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="liquido" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Value Analysis */}
      <Card className="elevation-1">
        <CardHeader>
          <CardTitle>Análise de Valor por Segmento</CardTitle>
          <CardDescription>LTV, custo de aquisição e retenção por tipo de cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerValueData.map((segment) => (
              <div key={segment.segment} className="flex items-center justify-between p-4 rounded-lg bg-accent/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {segment.segment === "VIP" && <Star className="h-5 w-5 text-yellow-500" />}
                    {segment.segment === "Ativos" && <Users className="h-5 w-5 text-green-500" />}
                    {segment.segment === "Prospects" && <UserPlus className="h-5 w-5 text-blue-500" />}
                    {segment.segment === "Inativos" && <Users className="h-5 w-5 text-gray-500" />}
                  </div>
                  <div>
                    <div className="font-medium">{segment.segment}</div>
                    <div className="text-sm text-muted-foreground">{segment.retention}% de retenção</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold">R$ {segment.ltv.toLocaleString("pt-BR")}</div>
                    <div className="text-sm text-muted-foreground">LTV</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">R$ {segment.acquisitionCost.toLocaleString("pt-BR")}</div>
                    <div className="text-sm text-muted-foreground">CAC</div>
                  </div>
                  <Badge variant={segment.ltv > segment.acquisitionCost * 3 ? "default" : "secondary"}>
                    ROI: {segment.ltv > 0 ? Math.round(segment.ltv / segment.acquisitionCost) : 0}x
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
