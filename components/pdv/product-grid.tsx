"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone Galaxy",
    price: 1299.99,
    category: "Eletrônicos",
    stock: 15,
    image: "https://m.media-amazon.com/images/I/51uReCdcgTL._UF1000,1000_QL80_.jpg",
  },
  {
    id: "2",
    name: "Notebook Dell",
    price: 2499.99,
    category: "Eletrônicos",
    stock: 8,
    image: "https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/174937",
  },
  {
    id: "3",
    name: "Fone Bluetooth",
    price: 199.99,
    category: "Acessórios",
    stock: 25,
    image: "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/kvdsbpel/file.png",
  },
  {
    id: "4",
    name: "Carregador USB-C",
    price: 49.99,
    category: "Acessórios",
    stock: 50,
    image: "https://m.media-amazon.com/images/I/5166ogGvNYL.jpg",
  },
  {
    id: "5",
    name: "Tablet iPad",
    price: 1899.99,
    category: "Eletrônicos",
    stock: 12,
    image: "https://http2.mlstatic.com/D_803992-MLA52988770428_122022-C.jpg",
  },
  {
    id: "6",
    name: "Mouse Wireless",
    price: 89.99,
    category: "Acessórios",
    stock: 30,
    image: "https://images.tcdn.com.br/img/img_prod/374123/mouse_wireless_m190_1000dpi_preto_e_cinza_logitech_39735_1_6e31417245fbee2ecee39bb5dee7623b.jpg",
  },
  {
    id: "7",
    name: "Teclado Mecânico",
    price: 299.99,
    category: "Acessórios",
    stock: 18,
    image: "https://m.media-amazon.com/images/I/61tZYCa32KL._UF894,1000_QL80_.jpg",
  },
  {
    id: "8",
    name: 'Monitor 24"',
    price: 899.99,
    category: "Eletrônicos",
    stock: 6,
    image: "https://images.tcdn.com.br/img/img_prod/15959/monitor_gamer_24_samsung_full_hd_75hz_freesync_ips_hdmi_lf24t350fh_18411_1_2f723e7daad731d2bcc5e35dd1f2ffc7.jpg",
  },
  {
    id: "9",
    name: "Câmera Digital",
    price: 1599.99,
    category: "Eletrônicos",
    stock: 10,
    image: "https://img.kentfaith.com/cache/catalog/products/us/GW41.0104/GW41.0104-1-1200x1200.jpg",
  },
  {
    id: "10",
    name: "Smartwatch",
    price: 799.99,
    category: "Eletrônicos",
    stock: 20,
    image: "https://picsum.photos/id/1025/200/200",
  },
  {
    id: "11",
    name: "Fone Gamer",
    price: 349.99,
    category: "Acessórios",
    stock: 14,
    image: "https://picsum.photos/id/1026/200/200",
  },
  {
    id: "12",
    name: "HD Externo",
    price: 499.99,
    category: "Eletrônicos",
    stock: 25,
    image: "https://picsum.photos/id/1027/200/200",
  },
  {
    id: "13",
    name: "Cabo HDMI",
    price: 59.99,
    category: "Acessórios",
    stock: 60,
    image: "https://picsum.photos/id/1028/200/200",
  },
  {
    id: "14",
    name: "Suporte Monitor",
    price: 199.99,
    category: "Acessórios",
    stock: 12,
    image: "https://picsum.photos/id/1029/200/200",
  },
  {
    id: "15",
    name: "Roteador Wi-Fi",
    price: 349.99,
    category: "Eletrônicos",
    stock: 18,
    image: "https://picsum.photos/id/1030/200/200",
  },
  {
    id: "16",
    name: "Webcam HD",
    price: 249.99,
    category: "Eletrônicos",
    stock: 22,
    image: "https://picsum.photos/id/1031/200/200",
  },
];

const categories = ["Todos", "Eletrônicos", "Acessórios"];

interface ProductGridProps {
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  }) => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-start gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg p-4 elevation-2 hover:elevation-3 transition-all cursor-pointer group flex flex-col w-50"
              onClick={() => onAddToCart(product)}
            >
              {/* Product Image Placeholder */}
              <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Product Info */}
              <div className="flex flex-col flex-1">
                <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {product.stock}
                  </Badge>
                </div>

                {/* Add Button */}
                <Button
                  size="sm"
                  className="w-full touch-target group-hover:bg-primary group-hover:text-primary-foreground mt-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
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
  );
}
