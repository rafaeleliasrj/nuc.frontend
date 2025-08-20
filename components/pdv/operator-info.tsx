"use client"

import { Clock, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Operator {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  status: "online" | "offline"
  permissions: string[]
}

interface OperatorInfoProps {
  operator: Operator
  sessionStart: Date
  onLogout: () => void
}

export function OperatorInfo({ operator, sessionStart, onLogout }: OperatorInfoProps) {
  const formatSessionTime = (start: Date) => {
    const now = new Date()
    const diff = now.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={operator.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {operator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{operator.name}</div>
              <div className="text-xs text-muted-foreground">{operator.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatSessionTime(sessionStart)}
              </div>
              <Badge variant="outline" className="text-xs mt-1">
                Sessão Ativa
              </Badge>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
