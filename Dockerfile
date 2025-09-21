FROM oven/bun AS base


RUN apt-get update && apt-get install -y openjdk-17-jre-headless \
    && rm -rf /var/lib/apt/lists/*

FROM base AS deps

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run api:code-gen
RUN bun run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:bun .next

COPY --from=builder --chown=nextjs:bun /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bun /app/.next/static ./.next/static

USER nextjs

CMD ["bun", "server.js"]