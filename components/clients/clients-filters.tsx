"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

export function ClientsFilters() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filtros de Clientes</CardTitle>
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar</Label>
            <Input id="search" placeholder="Nome, empresa, email..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todas as cidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                <SelectItem value="mg">Belo Horizonte</SelectItem>
                <SelectItem value="df">Brasília</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Período de Cadastro</Label>
            <DatePickerWithRange />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="space-y-2">
            <Label>Valor Total em Compras</Label>
            <div className="px-3">
              <Slider defaultValue={[0]} max={50000} step={1000} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>R$ 0</span>
                <span>R$ 50.000+</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="segment">Segmento</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos os segmentos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="tech">Tecnologia</SelectItem>
                <SelectItem value="consulting">Consultoria</SelectItem>
                <SelectItem value="retail">Varejo</SelectItem>
                <SelectItem value="manufacturing">Indústria</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" size="sm">
            Limpar Filtros
          </Button>
          <Button size="sm">Aplicar Filtros</Button>
        </div>
      </CardContent>
    </Card>
  )
}
