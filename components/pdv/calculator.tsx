"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Delete } from "lucide-react"

interface CalculatorProps {
  onClose: () => void
}

export function Calculator({ onClose }: CalculatorProps) {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  const buttons = [
    ["C", "CE", "⌫", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ]

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "C":
        clear()
        break
      case "CE":
        clearEntry()
        break
      case "⌫":
        if (display.length > 1) {
          setDisplay(display.slice(0, -1))
        } else {
          setDisplay("0")
        }
        break
      case "=":
        performCalculation()
        break
      case "+":
      case "-":
      case "×":
      case "÷":
        inputOperation(value)
        break
      case ".":
        if (display.indexOf(".") === -1) {
          inputNumber(value)
        }
        break
      default:
        if (!isNaN(Number(value))) {
          inputNumber(value)
        }
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Calculadora</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Display */}
          <div className="bg-muted p-4 rounded-lg text-right">
            <div className="text-3xl font-mono font-bold text-primary">{display}</div>
          </div>

          {/* Buttons */}
          <div className="grid gap-2">
            {buttons.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-2">
                {row.map((button) => (
                  <Button
                    key={button}
                    variant={
                      ["C", "CE", "⌫"].includes(button)
                        ? "destructive"
                        : ["+", "-", "×", "÷", "="].includes(button)
                          ? "default"
                          : "outline"
                    }
                    className={`h-12 text-lg font-medium touch-target ${button === "0" ? "col-span-2" : ""}`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button === "⌫" ? <Delete className="h-4 w-4" /> : button}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
