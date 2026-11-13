import type { Page } from '@playwright/test';
import config from '../src/assets/config.json';
import { configData } from '../src/tests/utils/mock-data';

export async function mockAttackData(page: Page, objects: unknown[]): Promise<void> {
    await page.route('**/assets/config.json', route => route.fulfill({
        json: { ...config, collection_index_url: '', versions: configData },
    }));
    await page.route(configData.entries[0].domains[0].data[0], route => route.fulfill({
        json: { type: 'bundle', id: 'bundle-e2e', objects },
    }));
    // Font loading is irrelevant here; an unavailable font service must not fail these tests.
    await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));
}
