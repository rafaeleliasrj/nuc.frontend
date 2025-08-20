"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", vendas: 65000, meta: 60000, anterior: 55000 },
  { month: "Fev", vendas: 72000, meta: 65000, anterior: 58000 },
  { month: "Mar", vendas: 85000, meta: 70000, anterior: 62000 },
  { month: "Abr", vendas: 78000, meta: 75000, anterior: 68000 },
  { month: "Mai", vendas: 92000, meta: 80000, anterior: 72000 },
  { month: "Jun", vendas: 88000, meta: 85000, anterior: 75000 },
  { month: "Jul", vendas: 105000, meta: 90000, anterior: 82000 },
  { month: "Ago", vendas: 98000, meta: 95000, anterior: 85000 },
  { month: "Set", vendas: 112000, meta: 100000, anterior: 88000 },
  { month: "Out", vendas: 125000, meta: 105000, anterior: 95000 },
  { month: "Nov", vendas: 118000, meta: 110000, anterior: 98000 },
  { month: "Dez", vendas: 135000, meta: 115000, anterior: 105000 },
]

const chartConfig = {
  vendas: {
    label: "Vendas Realizadas",
    color: "hsl(var(--primary))",
  },
  meta: {
    label: "Meta",
    color: "hsl(var(--secondary))",
  },
  anterior: {
    label: "Ano Anterior",
    color: "hsl(var(--muted-foreground))",
  },
}

export function SalesPerformanceChart() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <CardTitle>Performance de Vendas</CardTitle>
        <CardDescription>Comparação mensal de vendas vs metas e período anterior</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="meta"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="anterior"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--muted-foreground))", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
