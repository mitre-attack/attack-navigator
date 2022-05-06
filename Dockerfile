# Build stage

FROM node:16

WORKDIR /src

# copy over needed files
COPY nav-app/ /src/nav-app/
COPY layers/*.md /src/layers/
COPY *.md /src/

WORKDIR /src/nav-app

# give user permissions
RUN chown -R node:node ./

# install packages and build 
RUN npm install --unsafe-perm

EXPOSE 4200

CMD npm start

USER node
