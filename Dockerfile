FROM node:lts-alpine

RUN corepack enable pnpm && corepack install -g pnpm@latest

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install
COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]