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

# Build da aplicação em modo standalone
RUN pnpm build

# Etapa final: imagem de runtime
FROM node:20-alpine AS runtime

WORKDIR /app

# Copia build standalone do Next.js
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Porta que o Next.js vai expor
EXPOSE 3000

# Comando para rodar em produção sem depender do pnpm
CMD ["node", "server.js"]
