FROM node:12.18-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY ./app/package.json ./app/yarn.lock ./

# Run install using lockfile and with increased net timeout
RUN yarn --frozen-lockfile --network-timeout 100000

COPY ./app/ .

RUN yarn build

FROM node:12.18-alpine

ENV NODE_ENV=production NUXT_HOST=0.0.0.0 NUXT_PORT=3000

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app ./

EXPOSE 3000

CMD ["yarn", "start"]