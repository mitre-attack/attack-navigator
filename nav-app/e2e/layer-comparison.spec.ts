import { test, expect, Page } from '@playwright/test';
import config from '../src/assets/config.json';
import { configData, G0000, matrixSDO, TA0000, T0001, T0003, T0004 } from '../src/tests/utils/mock-data';

// Start with the smallest useful overlap: one technique unique to each group
// and one shared by both. This gives the layer sum three distinct outcomes
// without depending on changes to real-world group mappings.
const techniques = [
    { ...T0001, id: 'attack-pattern-3', name: 'APT3 only' },
    { ...T0003, id: 'attack-pattern-5', name: 'Shared technique' },
    { ...T0004, id: 'attack-pattern-6', name: 'APT29 only' },
];
const groups = [
    { ...G0000, id: 'intrusion-set-0', name: 'APT3', external_references: [{ external_id: 'G0022' }] },
    { ...G0000, id: 'intrusion-set-1', name: 'APT29', external_references: [{ external_id: 'G0016' }] },
];
const relationships = [
    ['intrusion-set-0', 'attack-pattern-3'],
    ['intrusion-set-0', 'attack-pattern-5'],
    ['intrusion-set-1', 'attack-pattern-5'],
    ['intrusion-set-1', 'attack-pattern-6'],
].map(([source_ref, target_ref], index) => ({
    type: 'relationship',
    id: `relationship-${index}`,
    relationship_type: 'uses',
    source_ref,
    target_ref,
}));

async function createGroupLayer(page: Page, group: string, score: string): Promise<void> {
    await page.getByText('Create New Layer', { exact: true }).click();
    await page.getByRole('button', { name: 'Enterprise', exact: true }).click();
    await expect(page.locator('technique-cell')).toHaveCount(3);

    await page.locator('span[alt="search"]').click();
    await page.getByPlaceholder('Search').fill(group);
    const groupsPanel = page.locator('mat-expansion-panel.stixType').filter({ hasText: 'Threat Groups' });
    await groupsPanel.locator('mat-expansion-panel-header').click();
    const groupRow = groupsPanel.locator('tr').filter({ has: page.getByRole('cell', { name: group, exact: true }) });
    await groupRow.getByRole('button', { name: 'select', exact: true }).click();
    await page.getByRole('button', { name: 'Close', exact: true }).click();

    await page.getByText('Technique Controls', { exact: true }).click();
    await page.locator('span[alt="score"]').click();
    await page.getByLabel('score', { exact: true }).fill(score);

    await page.getByText('Layer Controls', { exact: true }).click();
    await page.locator('span[alt="layer information"]').click();
    await page.getByLabel('Name', { exact: true }).fill(group);
    await expect(page.locator('.tab-title.active')).toContainText(group);
}

async function expectTechniqueScore(page: Page, name: string, score: string): Promise<void> {
    const cell = page.locator('technique-cell').filter({ hasText: name });
    await cell.hover();
    await expect(cell.locator('app-tooltip')).toContainText(`Score:${score}`);
}

// Test strategy: replay MITRE's documented threat-intelligence workflow with
// deterministic synthetic data. Create a layer from each threat group's mapped
// techniques, score APT3 as 1 and APT29 as 2, then combine them and verify their
// shared technique becomes the score-3 visual priority.
test('compare APT3 and APT29 technique scores', { tag: '@smoke' }, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));

    await test.step('load deterministic ATT&CK data', async () => {
        await page.route('**/assets/config.json', route => route.fulfill({
            json: { ...config, collection_index_url: '', versions: configData },
        }));
        await page.route(configData.entries[0].domains[0].data[0], route => route.fulfill({
            json: {
                type: 'bundle',
                id: 'bundle-layer-comparison',
                objects: [matrixSDO, TA0000, ...techniques, ...groups, ...relationships],
            },
        }));
        // Font loading is irrelevant here; stub the stylesheet so an unavailable font service cannot fail the test.
        await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));
        await page.goto('/');
    });

    await test.step('create and score the APT3 layer', async () => {
        await createGroupLayer(page, 'APT3', '1');
    });

    await test.step('create and score the APT29 layer', async () => {
        await page.locator('.add-tab').click();
        await createGroupLayer(page, 'APT29', '2');
    });

    await test.step('combine the layers and verify the overlap', async () => {
        await page.locator('.add-tab').click();
        await page.getByText('Create Layer from Other Layers', { exact: true }).click();
        await page.getByLabel('domain', { exact: true }).click();
        await page.getByRole('option', { name: /Enterprise ATT&CK v13/ }).click();
        await expect(page.locator('li').filter({ hasText: /a\s*\(APT3\)/ })).toBeVisible();
        await expect(page.locator('li').filter({ hasText: /b\s*\(APT29\)/ })).toBeVisible();
        await page.getByLabel('score expression', { exact: true }).fill('a+b');
        await page.getByRole('button', { name: 'Create layer', exact: true }).click();

        await page.getByText('Layer Controls', { exact: true }).click();
        await page.locator('span[alt="layer information"]').click();
        await page.getByLabel('Name', { exact: true }).fill('APT3 + APT29');
        await expect(page.locator('.tab-title.active')).toContainText('APT3 + APT29');

        await expectTechniqueScore(page, 'APT3 only', '1');
        await expectTechniqueScore(page, 'APT29 only', '2');
        await expectTechniqueScore(page, 'Shared technique', '3');

        const sharedCell = page.locator('technique-cell').filter({ hasText: 'Shared technique' });
        // Hover highlighting suppresses score colors; move away before checking
        // that score 3 renders at the gradient's green high end.
        await page.locator('.tab-title.active').hover();
        await expect(sharedCell.locator('.technique-cell')).toHaveCSS('background-color', 'rgb(142, 200, 67)');
        expect(errors).toEqual([]);
    });
});
