"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamData = [
  { name: "João", vendas: 125000, meta: 100000, leads: 45, conversao: 68 },
  { name: "Ana", vendas: 98000, meta: 90000, leads: 38, conversao: 72 },
  { name: "Carlos", vendas: 87000, meta: 85000, leads: 42, conversao: 65 },
  { name: "Maria", vendas: 112000, meta: 95000, leads: 51, conversao: 70 },
  { name: "Pedro", vendas: 76000, meta: 80000, leads: 35, conversao: 63 },
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

export function TeamPerformanceChart() {
  return (
    <div className="space-y-6">
      <Card className="elevation-1">
        <CardHeader>
          <CardTitle>Performance da Equipe</CardTitle>
          <CardDescription>Vendas realizadas vs metas por vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="meta" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} opacity={0.7} />
                <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="elevation-1">
        <CardHeader>
          <CardTitle>Ranking da Equipe</CardTitle>
          <CardDescription>Detalhamento de performance individual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamData
              .sort((a, b) => b.vendas - a.vendas)
              .map((member, index) => (
                <div key={member.name} className="flex items-center justify-between p-4 rounded-lg bg-accent/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder-user-${index + 1}.png`} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.leads} leads trabalhados</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">R$ {member.vendas.toLocaleString("pt-BR")}</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((member.vendas / member.meta) * 100)}% da meta
                      </div>
                    </div>
                    <Badge variant={member.conversao >= 70 ? "default" : "secondary"}>
                      {member.conversao}% conversão
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
