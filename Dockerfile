FROM node:22-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GRAPHQL_API_URL
ARG NODE_ENV

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_GRAPHQL_API_URL=$NEXT_PUBLIC_GRAPHQL_API_URL
ENV NODE_ENV=$NODE_ENV

COPY . .
RUN npm run build

# ---- production image ----
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
