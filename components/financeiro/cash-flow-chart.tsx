"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { date: "01/01", entrada: 12000, saida: 8000, saldo: 4000 },
  { date: "05/01", entrada: 8000, saida: 12000, saldo: 0 },
  { date: "10/01", entrada: 15000, saida: 9000, saldo: 6000 },
  { date: "15/01", entrada: 11000, saida: 7000, saldo: 10000 },
  { date: "20/01", entrada: 9000, saida: 11000, saldo: 8000 },
  { date: "25/01", entrada: 18000, saida: 6000, saldo: 20000 },
  { date: "30/01", entrada: 7000, saida: 14000, saldo: 13000 },
]

export function CashFlowChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
          labelFormatter={(label) => `Data: ${label}`}
        />
        <Legend />
        <Line type="monotone" dataKey="entrada" stroke="#10b981" name="Entradas" strokeWidth={2} />
        <Line type="monotone" dataKey="saida" stroke="#ef4444" name="Saídas" strokeWidth={2} />
        <Line type="monotone" dataKey="saldo" stroke="#3b82f6" name="Saldo" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  )
}
