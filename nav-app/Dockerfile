# Build stage

FROM node:latest 

WORKDIR /nav-app/

# copy over needed files
COPY . ./

# install packages and build 
RUN npm install --unsafe-perm && npm rebuild node-sass --force

EXPOSE 4200

CMD npm start