ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app

FROM base as build

RUN npm i -g pnpm

COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install

COPY --link . .

RUN pnpm build

FROM base

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/migrations /app/migrations
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/drizzle.config.ts /app/drizzle.config.ts

EXPOSE 8080

CMD ["node", "--run", "start"]