FROM node:lts-alpine

RUN corepack enable pnpm && corepack install -g pnpm@latest

WORKDIR /app

# Игнорируем наши self-signed сертификаты при сборке
# ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY pnpm-lock.yaml package.json ./

RUN pnpm install
COPY . .
RUN pnpm build

CMD ["pnpm", "start"]
