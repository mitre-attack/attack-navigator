# Build stage

FROM node:16

# Install node packages - cache for faster future builds
WORKDIR /src/nav-app
COPY nav-app/package*.json nav-app/patch-webpack.js ./
# Install packages and build
RUN npm install --unsafe-perm

# Give user permissions
RUN chown -R node:node ./

# Copy over needed files
USER node
COPY nav-app/ ./

WORKDIR /src
COPY layers/*.md ./layers/

COPY *.md ./

WORKDIR /src/nav-app

EXPOSE 4200

CMD npm start
