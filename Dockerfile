FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@12.11.2 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json ./server/package.json
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
ARG VITE_FEEDBACK_GITHUB_REPOSITORY
ENV VITE_FEEDBACK_GITHUB_REPOSITORY=$VITE_FEEDBACK_GITHUB_REPOSITORY
RUN pnpm build

FROM nginx:stable-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
