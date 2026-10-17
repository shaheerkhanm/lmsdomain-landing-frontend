# ============================================
# Dependencies
# ============================================

FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --include=dev


# ============================================
# Build
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG BACKEND_URL=http://backend:3000
ARG NEXT_PUBLIC_BACKEND_URL

ENV BACKEND_URL=$BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


# ============================================
# Production
# ============================================

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

ENV PORT=8080
ENV HOSTNAME=0.0.0.0

USER root

RUN (addgroup --system --gid 1001 nodejs 2>/dev/null || true) \
    && (adduser --system --uid 1001 nextjs 2>/dev/null || true)

COPY --from=builder /app/public ./public

COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/.next/standalone ./

COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

CMD ["node", "server.js"]