"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Jan", vendas: 4000, meta: 3500 },
  { name: "Fev", vendas: 3000, meta: 3500 },
  { name: "Mar", vendas: 5000, meta: 4000 },
  { name: "Abr", vendas: 4500, meta: 4000 },
  { name: "Mai", vendas: 6000, meta: 4500 },
  { name: "Jun", vendas: 5500, meta: 4500 },
  { name: "Jul", vendas: 7000, meta: 5000 },
]

const chartConfig = {
  vendas: {
    label: "Vendas",
    color: "hsl(var(--primary))",
  },
  meta: {
    label: "Meta",
    color: "hsl(var(--secondary))",
  },
}

export function SalesChart() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <CardTitle>Vendas vs Meta</CardTitle>
        <CardDescription>Comparação mensal de vendas realizadas com metas estabelecidas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="meta"
                stackId="1"
                stroke="hsl(var(--secondary))"
                fillOpacity={1}
                fill="url(#colorMeta)"
              />
              <Area
                type="monotone"
                dataKey="vendas"
                stackId="2"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorVendas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
