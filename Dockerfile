FROM node:lts-alpine AS builder

WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN corepack enable pnpm && corepack install -g pnpm@latest
RUN pnpm install
COPY . .
RUN pnpm build


FROM node:lts-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

CMD ["node", "server.js"]