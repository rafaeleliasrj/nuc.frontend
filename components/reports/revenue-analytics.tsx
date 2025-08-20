"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Target, Percent } from "lucide-react"

const revenueData = [
  { month: "Jan", receita: 85000, recorrente: 45000, unica: 40000 },
  { month: "Fev", receita: 92000, recorrente: 48000, unica: 44000 },
  { month: "Mar", receita: 105000, recorrente: 52000, unica: 53000 },
  { month: "Abr", receita: 98000, recorrente: 55000, unica: 43000 },
  { month: "Mai", receita: 115000, recorrente: 58000, unica: 57000 },
  { month: "Jun", receita: 125000, recorrente: 62000, unica: 63000 },
  { month: "Jul", receita: 135000, recorrente: 65000, unica: 70000 },
  { month: "Ago", receita: 128000, recorrente: 68000, unica: 60000 },
  { month: "Set", receita: 142000, recorrente: 72000, unica: 70000 },
  { month: "Out", receita: 155000, recorrente: 75000, unica: 80000 },
  { month: "Nov", receita: 148000, recorrente: 78000, unica: 70000 },
  { month: "Dez", receita: 165000, recorrente: 82000, unica: 83000 },
]

const revenueMetrics = [
  {
    title: "Receita Total",
    value: "R$ 1.593.000",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Receita Recorrente",
    value: "R$ 760.000",
    change: "+22%",
    trend: "up",
    icon: Target,
    color: "text-blue-600",
  },
  {
    title: "Margem Bruta",
    value: "68%",
    change: "+3%",
    trend: "up",
    icon: Percent,
    color: "text-purple-600",
  },
  {
    title: "Crescimento MoM",
    value: "12%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function RevenueAnalytics() {
  return (
    <div className="space-y-6">
      {/* Revenue Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {revenueMetrics.map((metric) => (
          <Card key={metric.title} className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                {metric.title}
              </CardDescription>
              <CardTitle className="text-2xl">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="text-xs">
                {metric.change} vs período anterior
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="elevation-1">
        <CardHeader>
          <CardTitle>Evolução da Receita</CardTitle>
          <CardDescription>Receita total, recorrente e única ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRecorrente" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="receita"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorReceita)"
                />
                <Area
                  type="monotone"
                  dataKey="recorrente"
                  stackId="2"
                  stroke="hsl(var(--secondary))"
                  fillOpacity={1}
                  fill="url(#colorRecorrente)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
