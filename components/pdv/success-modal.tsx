"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Receipt, Printer } from "lucide-react"
import { useEffect, useState } from "react"

interface SuccessModalProps {
  open: boolean
  onClose: () => void
  onNewSale: () => void
  saleData?: {
    total: number
    items: number
    fiscalNumber?: string
  }
}

export function SuccessModal({ open, onClose, onNewSale, saleData }: SuccessModalProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (open && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      handleNewSale()
    }
  }, [open, countdown])

  const handleNewSale = () => {
    setCountdown(5)
    onClose()
    onNewSale()
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center space-y-6 py-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Venda Finalizada!</h2>
            <p className="text-muted-foreground">Venda realizada com sucesso</p>
          </div>

          {saleData && (
            <div className="bg-muted/50 rounded-lg p-4 w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-semibold">R$ {saleData.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Itens:</span>
                <span>{saleData.items}</span>
              </div>
              {saleData.fiscalNumber && (
                <div className="flex justify-between text-sm">
                  <span>NFC-e:</span>
                  <span className="font-mono">{saleData.fiscalNumber}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 w-full">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Receipt className="h-4 w-4 mr-2" />
              Ver Cupom
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
          </div>

          <div className="space-y-3 w-full">
            <Button onClick={handleNewSale} className="w-full" size="lg">
              Nova Venda
            </Button>
            <p className="text-xs text-muted-foreground">Nova venda em {countdown}s...</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
