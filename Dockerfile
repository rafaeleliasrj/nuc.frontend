# Etapa de build
FROM node:24-alpine3.21 AS builder

WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm && \
    echo "✅ pnpm instalado com sucesso, versão:" && \
    pnpm -v

# Copia arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala dependências usando pnpm
RUN pnpm install --frozen-lockfile

# Copia todo o projeto
COPY . .

# Build da aplicação em modo standalone
RUN pnpm build

# Etapa final: imagem de runtime
FROM node:24-alpine3.21 AS runtime

WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm && \
    echo "✅ pnpm instalado com sucesso, versão:" && \
    pnpm -v

# Copia build e node_modules do builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Porta que o Next.js vai expor
EXPOSE 3000

# Comando para rodar em produção sem depender do pnpm
CMD ["pnpm", "start"]
