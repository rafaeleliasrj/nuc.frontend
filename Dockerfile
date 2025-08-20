# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala dependências usando pnpm
RUN pnpm install --frozen-lockfile

# Copia todo o projeto
COPY . .

# Build da aplicação
RUN pnpm build

# Etapa final: imagem de runtime
FROM node:20-alpine

WORKDIR /app

# Copia build e node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Porta que o Next.js vai expor
EXPOSE 3000

# Comando para rodar em produção
CMD ["pnpm", "start"]
