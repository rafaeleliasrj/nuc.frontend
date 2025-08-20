"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, Plus, Minus, X } from "lucide-react"

interface CashRegisterModalProps {
  open: boolean
  onClose: () => void
  type: "open" | "close" | "supply" | "withdrawal"
  onOpenCash: (amount: number) => void
  onCloseCash: () => void
  onSupplyWithdrawal: (amount: number, type: "supply" | "withdrawal") => void
  currentBalance: number
}

export function CashRegisterModal({
  open,
  onClose,
  type,
  onOpenCash,
  onCloseCash,
  onSupplyWithdrawal,
  currentBalance,
}: CashRegisterModalProps) {
  const [amount, setAmount] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    const numAmount = Number.parseFloat(amount) || 0

    switch (type) {
      case "open":
        onOpenCash(numAmount)
        break
      case "close":
        onCloseCash()
        break
      case "supply":
        onSupplyWithdrawal(numAmount, "supply")
        break
      case "withdrawal":
        onSupplyWithdrawal(numAmount, "withdrawal")
        break
    }

    setAmount("")
    setNotes("")
  }

  const getTitle = () => {
    switch (type) {
      case "open":
        return "Abrir Caixa"
      case "close":
        return "Fechar Caixa"
      case "supply":
        return "Suprimento de Caixa"
      case "withdrawal":
        return "Sangria de Caixa"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "open":
        return <DollarSign className="h-5 w-5" />
      case "close":
        return <X className="h-5 w-5" />
      case "supply":
        return <Plus className="h-5 w-5" />
      case "withdrawal":
        return <Minus className="h-5 w-5" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {type === "close" && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Saldo Atual do Caixa</p>
              <p className="text-2xl font-bold">R$ {currentBalance.toFixed(2)}</p>
            </div>
          )}

          {type !== "close" && (
            <div className="space-y-2">
              <Label htmlFor="amount">{type === "open" ? "Valor de Abertura" : "Valor"}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre esta operação..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              {type === "close" ? "Fechar Caixa" : "Confirmar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
