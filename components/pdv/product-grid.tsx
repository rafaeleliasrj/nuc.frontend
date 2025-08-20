"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  category: string
  image?: string
  stock: number
}

const mockProducts: Product[] = [
  { id: "1", name: "Smartphone Galaxy", price: 1299.99, category: "Eletrônicos", stock: 15 },
  { id: "2", name: "Notebook Dell", price: 2499.99, category: "Eletrônicos", stock: 8 },
  { id: "3", name: "Fone Bluetooth", price: 199.99, category: "Acessórios", stock: 25 },
  { id: "4", name: "Carregador USB-C", price: 49.99, category: "Acessórios", stock: 50 },
  { id: "5", name: "Tablet iPad", price: 1899.99, category: "Eletrônicos", stock: 12 },
  { id: "6", name: "Mouse Wireless", price: 89.99, category: "Acessórios", stock: 30 },
  { id: "7", name: "Teclado Mecânico", price: 299.99, category: "Acessórios", stock: 18 },
  { id: "8", name: 'Monitor 24"', price: 899.99, category: "Eletrônicos", stock: 6 },
]

const categories = ["Todos", "Eletrônicos", "Acessórios"]

interface ProductGridProps {
  onAddToCart: (product: { id: string; name: string; price: number; image?: string }) => void
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col h-full">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 flex-shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-12 text-lg"
          />
        </div>

        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="h-12 px-6"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="pdv-grid pb-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg p-4 elevation-2 hover:elevation-3 transition-all cursor-pointer group"
              onClick={() => onAddToCart(product)}
            >
              {/* Product Image Placeholder */}
              <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{product.name.charAt(0)}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                  <Badge variant="secondary" className="text-xs">
                    {product.stock}
                  </Badge>
                </div>

                {/* Add Button */}
                <Button
                  size="sm"
                  className="w-full touch-target group-hover:bg-primary group-hover:text-primary-foreground"
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddToCart(product)
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
