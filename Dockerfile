# ARG IMG_DIGEST=e88a35be04478413b7c71c455cd9865de9b9360e1f43456be5951032d7ac1a66
# FROM node:26-alpine3.24@sha256:${IMG_DIGEST} AS base
FROM node:24-alpine3.24 AS base
USER node
WORKDIR /app
COPY --chown=node:node packages/babel-config/package.json ./packages/babel-config/
COPY --chown=node:node packages/eslint-config/package.json ./packages/eslint-config/
COPY --chown=node:node packages/webpack-config/package.json ./packages/webpack-config/
COPY --chown=node:node apps/frontend/package.json ./apps/frontend/
COPY --chown=node:node apps/backend/package.json ./apps/backend/
COPY --chown=node:node package*.json ./
COPY --chown=node:node .env.prod ./
COPY --chown=node:node .env.test ./
COPY --chown=node:node .env.dev ./
COPY --chown=node:node .npmrc ./


FROM base AS deps-dev
RUN echo dummy
# RUN npm ci --package-lock-only=false && npm cache clean --force


FROM deps-dev AS deps-prod
RUN npm prune --package-lock-only=false --omit=dev


FROM deps-dev AS dev
USER root
RUN apk add --no-cache git
USER node
COPY --chown=node:node . .
EXPOSE 7004 8004 9000
CMD ["npm", "run", "dev"]


FROM dev AS check
WORKDIR /app/apps/backend
RUN npm run chk:prettier
# RUN npm run chk:eslint
# RUN npm run chk:typescript
# RUN npm run chk:vitest
WORKDIR /app/apps/frontend
RUN npm run chk:prettier
# RUN npm run chk:eslint


FROM dev AS builder
RUN npm run build:prod


FROM base AS prod
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/packages/cmd ./packages/cmd
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=deps-prod /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=deps-prod /app/packages/babel-config/node_modules ./packages/babel-config/node_modules
COPY --from=deps-prod /app/packages/eslint-config/node_modules ./packages/eslint-config/node_modules
EXPOSE 7704 8804
CMD ["npm", "start"]


