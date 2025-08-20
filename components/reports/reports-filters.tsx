"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

export function ReportsFilters() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filtros de Relatório</CardTitle>
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>Período</Label>
            <DatePickerWithRange />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comparison">Comparar com</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Período anterior" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="previous-period">Período anterior</SelectItem>
                <SelectItem value="previous-year">Ano anterior</SelectItem>
                <SelectItem value="previous-quarter">Trimestre anterior</SelectItem>
                <SelectItem value="previous-month">Mês anterior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="team">Equipe</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Toda a equipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toda a equipe</SelectItem>
                <SelectItem value="joao">João Vendedor</SelectItem>
                <SelectItem value="ana">Ana Gestora</SelectItem>
                <SelectItem value="carlos">Carlos Vendedor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Região</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todas as regiões" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="southeast">Sudeste</SelectItem>
                <SelectItem value="south">Sul</SelectItem>
                <SelectItem value="northeast">Nordeste</SelectItem>
                <SelectItem value="north">Norte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <Label>Métricas a Incluir</Label>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="revenue" defaultChecked />
              <Label htmlFor="revenue" className="text-sm">
                Receita
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sales-count" defaultChecked />
              <Label htmlFor="sales-count" className="text-sm">
                Número de Vendas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="avg-ticket" defaultChecked />
              <Label htmlFor="avg-ticket" className="text-sm">
                Ticket Médio
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="conversion" defaultChecked />
              <Label htmlFor="conversion" className="text-sm">
                Taxa de Conversão
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="new-customers" defaultChecked />
              <Label htmlFor="new-customers" className="text-sm">
                Novos Clientes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="retention" />
              <Label htmlFor="retention" className="text-sm">
                Taxa de Retenção
              </Label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" size="sm">
            Limpar Filtros
          </Button>
          <Button size="sm">Aplicar Filtros</Button>
          <Button variant="outline" size="sm">
            Salvar como Preset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
