FROM node:22.22.2-bookworm AS test-base

WORKDIR /app/nav-app
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
COPY nav-app/package.json nav-app/package-lock.json ./
RUN npm ci --ignore-scripts
RUN --mount=type=secret,id=extra_ca \
    if [ -f /run/secrets/extra_ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/extra_ca; fi; \
    ./node_modules/.bin/playwright install --with-deps chromium --only-shell

COPY nav-app/playwright.config.ts ./
COPY nav-app/src ./src
COPY nav-app/e2e ./e2e
RUN mkdir -p tmp && chown node:node tmp

CMD ["npm", "run", "test:e2e"]

FROM test-base AS runner
USER node

FROM test-base AS standalone
COPY nav-app/angular.json nav-app/tsconfig*.json ./
COPY layers /app/layers
COPY *.md /app/
RUN npm run build -- --configuration production --aot=false
USER node
