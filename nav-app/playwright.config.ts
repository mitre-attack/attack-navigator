import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './smoke',
    workers: 1,
    retries: 0,
    use: {
        browserName: 'chromium',
        baseURL: 'http://127.0.0.1:4173',
        trace: 'retain-on-failure',
    },
    webServer: {
        command: 'python3 -m http.server 4173 --bind 127.0.0.1 --directory dist/browser',
        url: 'http://127.0.0.1:4173',
    },
});
