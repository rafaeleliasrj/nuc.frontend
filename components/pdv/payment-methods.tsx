"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Banknote, Smartphone, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaymentMethodsProps {
  total: number
  onClose: () => void
  onPaymentComplete: () => void
}

type PaymentMethod = "cash" | "card" | "pix"

export function PaymentMethods({ total, onClose, onPaymentComplete }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("cash")
  const [cashReceived, setCashReceived] = useState("")
  const [processing, setProcessing] = useState(false)

  const paymentMethods = [
    { id: "cash" as PaymentMethod, name: "Dinheiro", icon: Banknote },
    { id: "card" as PaymentMethod, name: "Cartão", icon: CreditCard },
    { id: "pix" as PaymentMethod, name: "PIX", icon: Smartphone },
  ]

  const cashAmount = Number.parseFloat(cashReceived) || 0
  const change = cashAmount - total

  const handlePayment = async () => {
    setProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setProcessing(false)
    onPaymentComplete()
  }

  const canComplete = () => {
    if (selectedMethod === "cash") {
      return cashAmount >= total
    }
    return true // Card and PIX are always valid for demo
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Finalizar Pagamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Total */}
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Total a pagar</p>
            <p className="text-3xl font-bold text-primary">R$ {total.toFixed(2)}</p>
          </div>

          {/* Payment Methods */}
          <div>
            <Label className="text-base font-medium">Forma de Pagamento</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  variant={selectedMethod === method.id ? "default" : "outline"}
                  className={cn(
                    "h-20 flex-col gap-2 touch-target",
                    selectedMethod === method.id && "ring-2 ring-primary",
                  )}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <method.icon className="h-6 w-6" />
                  <span className="text-sm">{method.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Cash Payment Details */}
          {selectedMethod === "cash" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cash-received">Valor Recebido</Label>
                <Input
                  id="cash-received"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              {cashAmount > 0 && (
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Valor recebido:</span>
                    <span className="font-medium">R$ {cashAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total:</span>
                    <span className="font-medium">R$ {total.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Troco:</span>
                    <span className={cn("font-bold text-lg", change >= 0 ? "text-green-600" : "text-destructive")}>
                      R$ {Math.max(0, change).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Card Payment */}
          {selectedMethod === "card" && (
            <div className="bg-muted p-4 rounded-lg text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Insira ou aproxime o cartão na máquina</p>
            </div>
          )}

          {/* PIX Payment */}
          {selectedMethod === "pix" && (
            <div className="bg-muted p-4 rounded-lg text-center">
              <Smartphone className="h-12 w-12 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Escaneie o QR Code ou use a chave PIX</p>
              <div className="mt-3 p-3 bg-white rounded border-2 border-dashed border-border">
                <div className="w-24 h-24 bg-primary/20 mx-auto rounded flex items-center justify-center">
                  <span className="text-xs text-primary">QR Code</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={handlePayment} disabled={!canComplete() || processing} className="flex-1 h-12">
              {processing ? (
                "Processando..."
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Confirmar Pagamento
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
