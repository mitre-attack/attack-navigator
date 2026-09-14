FROM node:22.22.2-bookworm

WORKDIR /app/nav-app
COPY nav-app/package.json nav-app/package-lock.json ./
RUN npm ci --ignore-scripts
RUN --mount=type=secret,id=extra_ca \
    if [ -f /run/secrets/extra_ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/extra_ca; fi; \
    ./node_modules/.bin/playwright install --with-deps chromium --only-shell

COPY nav-app/angular.json nav-app/tsconfig*.json nav-app/playwright.config.ts ./
COPY nav-app/src ./src
COPY nav-app/e2e ./e2e
COPY layers /app/layers
COPY *.md /app/
RUN npm run build -- --configuration production --aot=false

CMD ["npm", "run", "test:e2e"]
