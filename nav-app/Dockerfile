# Build stage

FROM node:latest 

WORKDIR /nav-app/

# copy over needed files
COPY . ./

# give user permissions
RUN chown -R node:node ./

# install packages and build 
RUN npm install --unsafe-perm

EXPOSE 4200

CMD npm start

USER node
