export interface Product {
  id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  estoque: number
  estoqueMinimo: number
  codigo: string
  imagens: string[]
  grades?: ProductGrade[]
  status: "ativo" | "inativo"
}

export interface ProductGrade {
  id: string
  tipo: "tamanho" | "cor" | "modelo"
  valores: string[]
}

export const productsService = {
  async getAll(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            nome: "Camiseta Básica",
            descricao: "Camiseta 100% algodão",
            preco: 29.9,
            categoria: "Roupas",
            estoque: 150,
            estoqueMinimo: 20,
            codigo: "CAM001",
            imagens: ["/plain-tshirt.png"],
            grades: [
              { id: "1", tipo: "tamanho", valores: ["P", "M", "G", "GG"] },
              { id: "2", tipo: "cor", valores: ["Branco", "Preto", "Azul", "Vermelho"] },
            ],
            status: "ativo",
          },
          {
            id: "2",
            nome: "Calça Jeans",
            descricao: "Calça jeans masculina",
            preco: 89.9,
            categoria: "Roupas",
            estoque: 75,
            estoqueMinimo: 15,
            codigo: "CAL001",
            imagens: ["/jeans-display.png"],
            grades: [{ id: "3", tipo: "tamanho", valores: ["36", "38", "40", "42", "44"] }],
            status: "ativo",
          },
        ])
      }, 1000)
    })
  },

  async getById(id: string): Promise<Product | null> {
    const products = await this.getAll()
    return products.find((product) => product.id === id) || null
  },

  async create(product: Omit<Product, "id">): Promise<Product> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...product,
          id: Math.random().toString(36).substr(2, 9),
        })
      }, 1000)
    })
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          ...product,
        } as Product)
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
