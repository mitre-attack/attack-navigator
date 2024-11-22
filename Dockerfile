FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY /nav-app/package.json .
COPY /nav-app/package-lock.json .
RUN npm install

COPY /nav-app .
RUN npm run build -- --configuration production

FROM nginxinc/nginx-unprivileged:1.27-alpine3.19
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
