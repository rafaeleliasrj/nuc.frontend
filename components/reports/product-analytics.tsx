"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Package } from "lucide-react"

const productSalesData = [
  { name: "Produto Premium A", value: 35, sales: 450, revenue: 112500, color: "hsl(var(--primary))" },
  { name: "Serviço Consultoria", value: 25, sales: 320, revenue: 96000, color: "hsl(var(--secondary))" },
  { name: "Produto Standard B", value: 20, sales: 280, revenue: 56000, color: "hsl(var(--chart-3))" },
  { name: "Pacote Enterprise", value: 15, sales: 150, revenue: 75000, color: "hsl(var(--chart-4))" },
  { name: "Outros", value: 5, sales: 80, revenue: 16000, color: "hsl(var(--chart-5))" },
]

const monthlyProductData = [
  { month: "Jan", premiumA: 35, consultoria: 28, standardB: 22, enterprise: 15 },
  { month: "Fev", premiumA: 38, consultoria: 25, standardB: 24, enterprise: 18 },
  { month: "Mar", premiumA: 42, consultoria: 30, standardB: 20, enterprise: 22 },
  { month: "Abr", premiumA: 40, consultoria: 32, standardB: 25, enterprise: 20 },
  { month: "Mai", premiumA: 45, consultoria: 35, standardB: 28, enterprise: 25 },
  { month: "Jun", premiumA: 48, consultoria: 38, standardB: 30, enterprise: 28 },
]

const topProducts = [
  {
    name: "Produto Premium A",
    sales: 450,
    revenue: 112500,
    growth: 12,
    margin: 45,
    trend: "up",
  },
  {
    name: "Serviço Consultoria",
    sales: 320,
    revenue: 96000,
    growth: 8,
    margin: 60,
    trend: "up",
  },
  {
    name: "Produto Standard B",
    sales: 280,
    revenue: 56000,
    growth: -3,
    margin: 35,
    trend: "down",
  },
  {
    name: "Pacote Enterprise",
    sales: 150,
    revenue: 75000,
    growth: 15,
    margin: 55,
    trend: "up",
  },
]

export function ProductAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Distribution */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle>Distribuição de Vendas por Produto</CardTitle>
            <CardDescription>Participação de cada produto no total de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productSalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productSalesData.map((entry, index) => (
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
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Produto</span>
                                <span className="font-bold text-muted-foreground">{data.name}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Participação</span>
                                <span className="font-bold">{data.value}%</span>
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

        {/* Monthly Product Trends */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle>Tendência Mensal por Produto</CardTitle>
            <CardDescription>Evolução das vendas dos principais produtos</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProductData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="premiumA" stackId="a" fill="hsl(var(--primary))" />
                  <Bar dataKey="consultoria" stackId="a" fill="hsl(var(--secondary))" />
                  <Bar dataKey="standardB" stackId="a" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="enterprise" stackId="a" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card className="elevation-1">
        <CardHeader>
          <CardTitle>Ranking de Produtos</CardTitle>
          <CardDescription>Performance detalhada dos principais produtos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 rounded-lg bg-accent/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.sales} unidades vendidas</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold">R$ {product.revenue.toLocaleString("pt-BR")}</div>
                    <div className="text-sm text-muted-foreground">Receita</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{product.margin}%</div>
                    <div className="text-sm text-muted-foreground">Margem</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <Badge variant={product.growth > 0 ? "default" : "destructive"}>
                      {product.growth > 0 ? "+" : ""}
                      {product.growth}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
