# Build stage

FROM node:16

# install node packages - cache for faster future builds
WORKDIR /src/nav-app
COPY nav-app/package*.json nav-app/patch-webpack.js .
# install packages and build 
RUN npm install --unsafe-perm

# give user permissions
RUN chown -R node:node ./


# copy over needed files
USER node
COPY nav-app/ ./

WORKDIR /src
COPY layers/*.md ./layers/

COPY *.md ./

WORKDIR /src/nav-app

EXPOSE 4200

CMD npm start

# USER node
