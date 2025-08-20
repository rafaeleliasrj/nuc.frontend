export interface Sale {
  id: string
  numero: string
  cliente: string
  vendedor: string
  valor: number
  status: "pendente" | "aprovada" | "cancelada" | "entregue"
  data: string
  items: SaleItem[]
}

export interface SaleItem {
  id: string
  produto: string
  quantidade: number
  preco: number
  total: number
}

export const salesService = {
  async getAll(): Promise<Sale[]> {
    // Mock data - replace with real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            numero: "VND-001",
            cliente: "João Silva",
            vendedor: "Maria Santos",
            valor: 2500.0,
            status: "aprovada",
            data: "2024-01-15",
            items: [{ id: "1", produto: "Notebook Dell", quantidade: 1, preco: 2500.0, total: 2500.0 }],
          },
          {
            id: "2",
            numero: "VND-002",
            cliente: "Pedro Costa",
            vendedor: "Ana Lima",
            valor: 890.5,
            status: "pendente",
            data: "2024-01-15",
            items: [
              { id: "2", produto: "Mouse Logitech", quantidade: 2, preco: 45.25, total: 90.5 },
              { id: "3", produto: "Teclado Mecânico", quantidade: 1, preco: 800.0, total: 800.0 },
            ],
          },
        ])
      }, 1000)
    })
  },

  async getById(id: string): Promise<Sale | null> {
    const sales = await this.getAll()
    return sales.find((sale) => sale.id === id) || null
  },

  async create(sale: Omit<Sale, "id">): Promise<Sale> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...sale,
          id: Math.random().toString(36).substr(2, 9),
        })
      }, 1000)
    })
  },

  async update(id: string, sale: Partial<Sale>): Promise<Sale> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          ...sale,
        } as Sale)
      }, 1000)
    })
  },

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  },
}
