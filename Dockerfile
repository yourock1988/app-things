FROM node:26-alpine3.24 AS base
USER node
WORKDIR /app
COPY --chown=node:node apps/frontend/package.json ./apps/frontend/
COPY --chown=node:node apps/backend/package.json ./apps/backend/
COPY --chown=node:node package*.json ./
COPY --chown=node:node .env.prod ./
COPY --chown=node:node .env.test ./
COPY --chown=node:node .env.dev ./
COPY --chown=node:node packages ./packages


FROM base AS deps-dev
RUN npm ci


FROM deps-dev AS deps-prod
RUN npm prune --omit=dev


FROM deps-dev AS dev
COPY --chown=node:node . .
EXPOSE 7004
EXPOSE 8004
EXPOSE 9000
CMD ["npm", "run", "dev"]


FROM dev AS builder
RUN npm run build:prod


FROM base AS prod
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=deps-prod --chown=node:node /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
