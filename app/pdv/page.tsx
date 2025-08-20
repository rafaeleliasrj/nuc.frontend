"use client"

import { PDVLayout } from "@/components/layout/pdv-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CashRegisterModal } from "@/components/pdv/cash-register-modal"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, DollarSign, TrendingUp, Users, Plus, Minus, Calculator, Receipt } from "lucide-react"

interface CashRegister {
  id: string
  isOpen: boolean
  openingBalance: number
  currentBalance: number
  openedAt?: Date
  openedBy?: string
}

export default function PDVPage() {
  const [cashRegister, setCashRegister] = useState<CashRegister | null>(null)
  const [showCashModal, setShowCashModal] = useState(false)
  const [modalType, setModalType] = useState<"open" | "close" | "supply" | "withdrawal">("open")
  const router = useRouter()

  useEffect(() => {
    const savedRegister = localStorage.getItem("cash-register")
    if (savedRegister) {
      setCashRegister(JSON.parse(savedRegister))
    }
  }, [])

  const handleOpenCashRegister = (openingBalance: number) => {
    const newRegister: CashRegister = {
      id: Date.now().toString(),
      isOpen: true,
      openingBalance,
      currentBalance: openingBalance,
      openedAt: new Date(),
      openedBy: "Operador Atual",
    }

    setCashRegister(newRegister)
    localStorage.setItem("cash-register", JSON.stringify(newRegister))
    setShowCashModal(false)
  }

  const handleCloseCashRegister = () => {
    setCashRegister(null)
    localStorage.removeItem("cash-register")
    localStorage.removeItem("pdv-operator")
    localStorage.removeItem("pdv-session-start")
    setShowCashModal(false)
  }

  const handleSupplyWithdrawal = (amount: number, type: "supply" | "withdrawal") => {
    if (cashRegister) {
      const updatedRegister = {
        ...cashRegister,
        currentBalance: type === "supply" ? cashRegister.currentBalance + amount : cashRegister.currentBalance - amount,
      }
      setCashRegister(updatedRegister)
      localStorage.setItem("cash-register", JSON.stringify(updatedRegister))
    }
    setShowCashModal(false)
  }

  const handleNewSale = () => {
    if (!cashRegister?.isOpen) {
      alert("É necessário abrir o caixa antes de iniciar uma venda!")
      return
    }
    router.push("/pdv/nova-venda")
  }

  return (
    <PDVLayout onCancel={() => router.push("/")} showCancelButton={true}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Ponto de Venda</h1>
            <p className="text-muted-foreground">Gerencie suas vendas e controle de caixa</p>
          </div>

          <div className="flex gap-3">
            {!cashRegister?.isOpen ? (
              <Button
                size="lg"
                onClick={() => {
                  setModalType("open")
                  setShowCashModal(true)
                }}
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Abrir Caixa
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setModalType("close")
                    setShowCashModal(true)
                  }}
                >
                  Fechar Caixa
                </Button>
                <Button size="lg" onClick={handleNewSale}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Nova Venda
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Cash Register Status */}
        {cashRegister?.isOpen && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Status do Caixa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Inicial</p>
                  <p className="text-2xl font-bold">R$ {cashRegister.openingBalance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Atual</p>
                  <p className="text-2xl font-bold">R$ {cashRegister.currentBalance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aberto em</p>
                  <p className="text-lg">{cashRegister.openedAt?.toLocaleTimeString()}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setModalType("supply")
                    setShowCashModal(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Suprimento
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setModalType("withdrawal")
                    setShowCashModal(true)
                  }}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Sangria
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Vendas Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">R$ 0,00</p>
                  <p className="text-sm text-muted-foreground">Faturamento</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">R$ 0,00</p>
                  <p className="text-sm text-muted-foreground">Ticket Médio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Clientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {cashRegister?.isOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às funcionalidades do PDV</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Calculator className="h-6 w-6 mb-2" />
                  Calculadora
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Receipt className="h-6 w-6 mb-2" />
                  Reimprimir Cupom
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <DollarSign className="h-6 w-6 mb-2" />
                  Consultar Preço
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <CashRegisterModal
        open={showCashModal}
        onClose={() => setShowCashModal(false)}
        type={modalType}
        onOpenCash={handleOpenCashRegister}
        onCloseCash={handleCloseCashRegister}
        onSupplyWithdrawal={handleSupplyWithdrawal}
        currentBalance={cashRegister?.currentBalance || 0}
      />
    </PDVLayout>
  )
}
