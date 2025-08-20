"use client"

import { useState } from "react"
import { Lock, LogIn, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Operator {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  status: "online" | "offline"
  permissions: string[]
}

interface OperatorSelectionModalProps {
  open: boolean
  onClose: () => void
  onOperatorSelected: (operator: Operator) => void
}

const mockOperators: Operator[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana@empresa.com",
    role: "Gerente",
    status: "online",
    permissions: ["vendas", "desconto", "cancelamento", "relatorios"],
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "carlos@empresa.com",
    role: "Vendedor",
    status: "online",
    permissions: ["vendas", "desconto"],
  },
  {
    id: "3",
    name: "Maria Oliveira",
    email: "maria@empresa.com",
    role: "Vendedor",
    status: "offline",
    permissions: ["vendas"],
  },
  {
    id: "4",
    name: "João Costa",
    email: "joao@empresa.com",
    role: "Supervisor",
    status: "online",
    permissions: ["vendas", "desconto", "cancelamento"],
  },
]

export function OperatorSelectionModal({ open, onClose, onOperatorSelected }: OperatorSelectionModalProps) {
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null)
  const [password, setPassword] = useState("")
  const [step, setStep] = useState<"select" | "authenticate">("select")

  const handleOperatorSelect = (operator: Operator) => {
    if (operator.status === "offline") return
    setSelectedOperator(operator)
    setStep("authenticate")
  }

  const handleAuthenticate = () => {
    if (selectedOperator && password) {
      onOperatorSelected(selectedOperator)
      onClose()
      setStep("select")
      setPassword("")
      setSelectedOperator(null)
    }
  }

  const handleBack = () => {
    setStep("select")
    setSelectedOperator(null)
    setPassword("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            {step === "select" ? "Selecionar Operador" : "Autenticação"}
          </DialogTitle>
          <DialogDescription>
            {step === "select"
              ? "Escolha o operador para iniciar uma nova sessão de vendas"
              : `Digite a senha para ${selectedOperator?.name}`}
          </DialogDescription>
        </DialogHeader>

        {step === "select" && (
          <div className="grid grid-cols-2 gap-4 py-4">
            {mockOperators.map((operator) => (
              <Card
                key={operator.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  operator.status === "offline" ? "opacity-50 cursor-not-allowed" : "hover:border-primary"
                }`}
                onClick={() => handleOperatorSelect(operator)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={operator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {operator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{operator.name}</CardTitle>
                      <CardDescription className="text-sm">{operator.email}</CardDescription>
                    </div>
                    <Badge variant={operator.status === "online" ? "default" : "secondary"} className="text-xs">
                      {operator.status === "online" ? "Online" : "Offline"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{operator.role}</span>
                    <div className="flex gap-1">
                      {operator.permissions.slice(0, 2).map((perm) => (
                        <Badge key={perm} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                      {operator.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{operator.permissions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === "authenticate" && selectedOperator && (
          <div className="py-4 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {selectedOperator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{selectedOperator.name}</CardTitle>
                    <CardDescription>{selectedOperator.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="password">Senha do Operador</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAuthenticate()}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                Voltar
              </Button>
              <Button onClick={handleAuthenticate} disabled={!password} className="flex-1">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sessão
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
