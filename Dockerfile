FROM node:12.18-alpine

WORKDIR /usr/src/app

COPY ./app/package.json ./
COPY ./app/yarn.lock ./

RUN yarn install --network-timeout 100000

COPY ./app/ .

# ENV NODE_ENV production

RUN yarn build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]