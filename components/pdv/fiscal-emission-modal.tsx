"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Receipt, Printer, Send, CheckCircle, AlertCircle } from "lucide-react"
import type { CartItem } from "@/app/pdv/page"

interface FiscalEmissionModalProps {
  open: boolean
  onClose: () => void
  cartItems: CartItem[]
  total: number
  onEmissionComplete: (fiscalData: any) => void
}

export function FiscalEmissionModal({ open, onClose, cartItems, total, onEmissionComplete }: FiscalEmissionModalProps) {
  const [documentType, setDocumentType] = useState<"nfce" | "nfe">("nfce")
  const [customerData, setCustomerData] = useState({
    name: "",
    document: "",
    email: "",
    phone: "",
  })
  const [emissionStatus, setEmissionStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [fiscalNumber, setFiscalNumber] = useState("")

  const handleEmission = async () => {
    setEmissionStatus("processing")

    // Simular emissão fiscal
    setTimeout(() => {
      const mockFiscalNumber = `${documentType.toUpperCase()}-${Date.now().toString().slice(-6)}`
      setFiscalNumber(mockFiscalNumber)
      setEmissionStatus("success")

      onEmissionComplete({
        documentType,
        fiscalNumber: mockFiscalNumber,
        customerData,
        items: cartItems,
        total,
        emissionDate: new Date(),
      })
    }, 3000)
  }

  const resetModal = () => {
    setEmissionStatus("idle")
    setFiscalNumber("")
    setCustomerData({ name: "", document: "", email: "", phone: "" })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={resetModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Emissão de Documento Fiscal
          </DialogTitle>
        </DialogHeader>

        {emissionStatus === "idle" && (
          <div className="space-y-6">
            {/* Tipo de Documento */}
            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Select value={documentType} onValueChange={(value: "nfce" | "nfe") => setDocumentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nfce">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4" />
                      NFC-e (Nota Fiscal de Consumidor Eletrônica)
                    </div>
                  </SelectItem>
                  <SelectItem value="nfe">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      NF-e (Nota Fiscal Eletrônica)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dados do Cliente */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Dados do Cliente</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Nome/Razão Social</Label>
                  <Input
                    id="customerName"
                    value={customerData.name}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={documentType === "nfce" ? "Nome do consumidor" : "Razão social"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerDocument">{documentType === "nfce" ? "CPF" : "CNPJ"}</Label>
                  <Input
                    id="customerDocument"
                    value={customerData.document}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, document: e.target.value }))}
                    placeholder={documentType === "nfce" ? "000.000.000-00" : "00.000.000/0000-00"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">E-mail</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Telefone</Label>
                  <Input
                    id="customerPhone"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Resumo dos Itens */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Itens da Venda</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">Qtd: {item.quantity}</span>
                    </div>
                    <span className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded font-bold">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={resetModal} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button onClick={handleEmission} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Emitir {documentType.toUpperCase()}
              </Button>
            </div>
          </div>
        )}

        {emissionStatus === "processing" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <div className="text-center">
              <h3 className="font-semibold">Processando Emissão</h3>
              <p className="text-sm text-muted-foreground">Enviando dados para a SEFAZ...</p>
            </div>
          </div>
        )}

        {emissionStatus === "success" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-green-700">Documento Emitido com Sucesso!</h3>
              <p className="text-muted-foreground">
                {documentType.toUpperCase()} Nº {fiscalNumber}
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Autorizado pela SEFAZ
              </Badge>
            </div>

            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Send className="w-4 h-4 mr-2" />
                Enviar por E-mail
              </Button>
            </div>

            <Button onClick={resetModal} className="w-full">
              Finalizar Venda
            </Button>
          </div>
        )}

        {emissionStatus === "error" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-red-700">Erro na Emissão</h3>
              <p className="text-muted-foreground">Não foi possível emitir o documento fiscal</p>
            </div>

            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={() => setEmissionStatus("idle")} className="flex-1">
                Tentar Novamente
              </Button>
              <Button onClick={resetModal} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
