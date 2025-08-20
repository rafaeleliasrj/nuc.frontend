"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Seg", receita: 2400 },
  { day: "Ter", receita: 1398 },
  { day: "Qua", receita: 9800 },
  { day: "Qui", receita: 3908 },
  { day: "Sex", receita: 4800 },
  { day: "Sáb", receita: 3800 },
  { day: "Dom", receita: 4300 },
]

const chartConfig = {
  receita: {
    label: "Receita",
    color: "hsl(var(--primary))",
  },
}

export function RevenueChart() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <CardTitle>Receita Semanal</CardTitle>
        <CardDescription>Receita dos últimos 7 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="receita" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
