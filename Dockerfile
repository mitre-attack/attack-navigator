# Build stage

FROM node:21.5.0-slim

ENV NODE_OPTIONS=--openssl-legacy-provider

# install node packages - cache for faster future builds
WORKDIR /src/nav-app
COPY ./nav-app/package*.json ./

# install packages and build 
RUN npm install

# copy over needed files
COPY ./nav-app/ ./

WORKDIR /src
COPY layers/*.md ./layers/

COPY *.md ./

WORKDIR /src/nav-app
EXPOSE 4200

CMD npm start
