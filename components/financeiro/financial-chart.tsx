"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { month: "Ago", receitas: 38000, despesas: 22000 },
  { month: "Set", receitas: 42000, despesas: 25000 },
  { month: "Out", receitas: 39000, despesas: 28000 },
  { month: "Nov", receitas: 44000, despesas: 26000 },
  { month: "Dez", receitas: 41000, despesas: 29000 },
  { month: "Jan", receitas: 45600, despesas: 28400 },
]

export function FinancialChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
          labelFormatter={(label) => `Mês: ${label}`}
        />
        <Legend />
        <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
        <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
      </BarChart>
    </ResponsiveContainer>
  )
}
