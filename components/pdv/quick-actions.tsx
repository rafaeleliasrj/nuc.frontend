"use client"

import { Button } from "@/components/ui/button"
import { Calculator, RotateCcw, Printer, Users } from "lucide-react"

interface QuickActionsProps {
  onShowCalculator: () => void
  onNewSale: () => void
}

export function QuickActions({ onShowCalculator, onNewSale }: QuickActionsProps) {
  return (
    <div className="bg-card rounded-lg p-4 elevation-1">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ações Rápidas</h2>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onShowCalculator} className="touch-target bg-transparent">
            <Calculator className="h-4 w-4 mr-2" />
            Calculadora
          </Button>

          <Button variant="outline" size="sm" onClick={onNewSale} className="touch-target bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Nova Venda
          </Button>

          <Button variant="outline" size="sm" className="touch-target bg-transparent">
            <Users className="h-4 w-4 mr-2" />
            Clientes
          </Button>

          <Button variant="outline" size="sm" className="touch-target bg-transparent">
            <Printer className="h-4 w-4 mr-2" />
            Reimprimir
          </Button>
        </div>
      </div>
    </div>
  )
}
