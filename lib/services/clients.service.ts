export interface Client {
  id: string
  nome: string
  email: string
  telefone: string
  empresa?: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  status: "ativo" | "inativo" | "prospect" | "vip"
  totalCompras: number
  ultimaCompra?: string
}

export const clientsService = {
  async getAll(): Promise<Client[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            nome: "João Silva",
            email: "joao@email.com",
            telefone: "(11) 99999-9999",
            empresa: "Silva & Associados",
            endereco: "Rua das Flores, 123",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01234-567",
            status: "ativo",
            totalCompras: 15000.0,
            ultimaCompra: "2024-01-10",
          },
          {
            id: "2",
            nome: "Maria Santos",
            email: "maria@email.com",
            telefone: "(11) 88888-8888",
            endereco: "Av. Paulista, 456",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01310-100",
            status: "vip",
            totalCompras: 25000.0,
            ultimaCompra: "2024-01-12",
          },
        ])
      }, 1000)
    })
  },

  async getById(id: string): Promise<Client | null> {
    const clients = await this.getAll()
    return clients.find((client) => client.id === id) || null
  },

  async create(client: Omit<Client, "id">): Promise<Client> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...client,
          id: Math.random().toString(36).substr(2, 9),
        })
      }, 1000)
    })
  },

  async update(id: string, client: Partial<Client>): Promise<Client> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          ...client,
        } as Client)
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
