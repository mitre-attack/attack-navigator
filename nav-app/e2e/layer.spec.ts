import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import config from '../src/assets/config.json';
import { configData, matrixSDO, TA0000, T0001, T0003 } from '../src/tests/utils/mock-data';

test('create, score, rename, and export an Enterprise layer', { tag: '@smoke' }, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));

    // Reuse existing synthetic STIX fixtures; only data responses are replaced.
    await page.route('**/assets/config.json', route => route.fulfill({
        json: { ...config, collection_index_url: '', versions: configData },
    }));
    await page.route(configData.entries[0].domains[0].data[0], route => route.fulfill({
        json: {
            type: 'bundle',
            id: 'bundle-smoke',
            objects: [matrixSDO, TA0000, { ...T0001, name: 'Smoke technique' }, { ...T0003, name: 'Untouched technique' }],
        },
    }));
    // Avoid an external font dependency; assertions use text and attributes, not icon appearance.
    await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));

    await page.goto('/');
    await page.getByText('Create New Layer', { exact: true }).click();
    await page.getByRole('button', { name: 'Enterprise', exact: true }).click();
    await expect(page.locator('technique-cell')).toHaveCount(2);
    await page.locator('technique-cell').getByText('Smoke technique', { exact: true }).click();

    await page.getByText('Technique Controls', { exact: true }).click();
    await page.locator('span[alt="score"]').click();
    await page.getByLabel('score', { exact: true }).fill('1');

    await page.getByText('Layer Controls', { exact: true }).click();
    await page.locator('span[alt="layer information"]').click();
    await page.getByLabel('Name', { exact: true }).fill('Smoke layer');
    await expect(page.locator('.tab-title.active')).toContainText('Smoke layer');

    await page.locator('span[alt="export"]').click();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('span[alt="save layer"]').filter({ hasText: /^code$/ }).click();
    const download = await downloadPromise;
    const file = testInfo.outputPath('layer.json');
    await download.saveAs(file);
    const layer = JSON.parse(await readFile(file, 'utf8'));
    expect(layer).toMatchObject({
        name: 'Smoke layer',
        domain: 'enterprise-attack',
        versions: { attack: '13', layer: '4.5', navigator: expect.any(String) },
    });
    expect(layer.techniques).toHaveLength(1);
    expect(layer.techniques[0]).toMatchObject({ techniqueID: 'T0001', tactic: 'tactic-name', score: 1 });
    expect(errors).toEqual([]);
});
