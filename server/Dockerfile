FROM node:16-alpine3.14

WORKDIR /app


COPY package.json /app/
RUN yarn cache clean && yarn install --silent

COPY . /app
COPY .env /app

EXPOSE 3000
EXPOSE 5432

RUN yarn build

CMD yarn dev:server
