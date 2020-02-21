# Build stage

FROM docker.repo.schwarz/node:latest 

WORKDIR /nav-app/

# copy over needed files
COPY nav-app/ ./

# install packages and build 
RUN npm install --unsafe-perm

EXPOSE 4200

CMD npm start
