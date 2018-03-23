# Build stage

FROM node:latest 

WORKDIR /nav-app/

# configure npm for proxy (if on mitre network)
# RUN npm config set proxy http://gatekeeper.mitre.org:80 \
	# && npm config set https-proxy http://gatekeeper.mitre.org:80

# copy over needed files
COPY . ./

# install packages and build 
RUN npm install && npm rebuild node-sass --force

EXPOSE 4200

CMD npm start