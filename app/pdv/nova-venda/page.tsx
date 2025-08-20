"use client"
import { ProductGrid } from "@/components/pdv/product-grid"
import { Cart } from "@/components/pdv/cart"
import { Calculator } from "@/components/pdv/calculator"
import { PaymentMethods } from "@/components/pdv/payment-methods"
import { OperatorSelectionModal } from "@/components/pdv/operator-selection-modal"
import { OperatorInfo } from "@/components/pdv/operator-info"
import { FiscalEmissionModal } from "@/components/pdv/fiscal-emission-modal"
import { SuccessModal } from "@/components/pdv/success-modal"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface Operator {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  status: "online" | "offline"
  permissions: string[]
}

export default function NovaVendaPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCalculator, setShowCalculator] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null)
  const [sessionStart, setSessionStart] = useState<Date | null>(null)
  const [showOperatorModal, setShowOperatorModal] = useState(false)
  const [showFiscalEmission, setShowFiscalEmission] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [saleData, setSaleData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const savedOperator = localStorage.getItem("pdv-operator")
    if (savedOperator) {
      const operator = JSON.parse(savedOperator)
      setCurrentOperator(operator)
      setSessionStart(new Date(localStorage.getItem("pdv-session-start") || new Date()))
    } else {
      setShowOperatorModal(true)
    }
  }, [])

  const addToCart = (product: { id: string; name: string; price: number; image?: string }) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const handleOperatorSelected = (operator: Operator) => {
    setCurrentOperator(operator)
    const sessionStartTime = new Date()
    setSessionStart(sessionStartTime)
    setShowOperatorModal(false)

    localStorage.setItem("pdv-operator", JSON.stringify(operator))
    localStorage.setItem("pdv-session-start", sessionStartTime.toISOString())
  }

  const handleLogout = () => {
    setCurrentOperator(null)
    setSessionStart(null)
    clearCart()

    localStorage.removeItem("pdv-operator")
    localStorage.removeItem("pdv-session-start")
    router.push("/")
  }

  const handlePaymentComplete = () => {
    setShowPayment(false)
    setShowFiscalEmission(true)
  }

  const handleFiscalEmissionComplete = (fiscalData: any) => {
    console.log("[v0] Fiscal document emitted:", fiscalData)
    setShowFiscalEmission(false)

    setSaleData({
      total,
      items: cartItems.length,
      fiscalNumber: fiscalData.fiscalNumber || "000123456",
    })

    setShowSuccessModal(true)
  }

  const handleNewSale = () => {
    clearCart()
    setShowSuccessModal(false)
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCancel = () => {
    router.push("/")
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="bg-card border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancelar Venda
          </Button>
          <h1 className="text-xl font-semibold">Nova Venda</h1>
        </div>

        {currentOperator && sessionStart && (
          <OperatorInfo operator={currentOperator} sessionStart={sessionStart} onLogout={handleLogout} />
        )}
      </div>

      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-hidden">
            <ProductGrid onAddToCart={addToCart} />
          </div>
        </div>

        {/* Right Sidebar - Cart */}
        <div className="w-96 flex flex-col">
          <Cart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onClearCart={clearCart}
            onCheckout={() => setShowPayment(true)}
            total={total}
          />

          <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setShowCalculator(true)}>
            Calculadora
          </Button>
        </div>
      </div>

      {/* Modals */}
      {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}

      {showPayment && (
        <PaymentMethods total={total} onClose={() => setShowPayment(false)} onPaymentComplete={handlePaymentComplete} />
      )}

      {showFiscalEmission && (
        <FiscalEmissionModal
          open={showFiscalEmission}
          onClose={() => setShowFiscalEmission(false)}
          cartItems={cartItems}
          total={total}
          onEmissionComplete={handleFiscalEmissionComplete}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          onNewSale={handleNewSale}
          saleData={saleData}
        />
      )}

      <OperatorSelectionModal
        open={showOperatorModal}
        onClose={() => {}} // Cannot close without selecting operator
        onOperatorSelected={handleOperatorSelected}
      />
    </div>
  )
}
