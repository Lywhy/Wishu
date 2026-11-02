FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@12.11.2 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json ./server/package.json

FROM base AS production-dependencies
RUN pnpm --filter @wishu/server... install --prod --frozen-lockfile --ignore-scripts

FROM base AS build
RUN pnpm --filter @wishu/server... install --frozen-lockfile --ignore-scripts
COPY server ./server
RUN pnpm --filter @wishu/server build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=production-dependencies --chown=node:node /app/server/node_modules ./server/node_modules
COPY --from=build --chown=node:node /app/server/dist ./server/dist
COPY --from=build --chown=node:node /app/server/package.json ./server/package.json
USER node
WORKDIR /app/server
EXPOSE 3000
CMD ["node", "dist/main.js"]
