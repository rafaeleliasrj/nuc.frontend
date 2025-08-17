# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia todo o projeto
COPY . .

# Build da aplicação
RUN npm run build

# Etapa final: imagem de runtime
FROM node:20-alpine

WORKDIR /app

# Copia apenas o build final e node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Porta que o Next.js vai expor
EXPOSE 3000

# Comando para rodar em produção
CMD ["npm", "start"]
