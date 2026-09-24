import { test, expect } from '@playwright/test';
import config from '../src/assets/config.json';
import { configData, matrixSDO, TA0000, T0001, T0003, T0004 } from '../src/tests/utils/mock-data';

const tactics = [
    { ...TA0000, id: 'tactic-privilege-escalation', name: 'Privilege Escalation', x_mitre_shortname: 'privilege-escalation' },
    { ...TA0000, id: 'tactic-defense-evasion', name: 'Defense Evasion', x_mitre_shortname: 'defense-evasion' },
    { ...TA0000, id: 'tactic-persistence', name: 'Persistence', x_mitre_shortname: 'persistence' },
];
const techniques = [
    {
        ...T0001,
        name: 'Access Token Manipulation',
        kill_chain_phases: tactics.slice(0, 2).map(tactic => ({
            kill_chain_name: 'mitre-attack',
            phase_name: tactic.x_mitre_shortname,
        })),
    },
    {
        ...T0003,
        name: 'Registry Run Keys',
        kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'persistence' }],
    },
    {
        ...T0004,
        name: 'Unrelated Technique',
        kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'persistence' }],
    },
];

test('find, select, and clear techniques', { tag: '@smoke' }, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));

    await test.step('load deterministic ATT&CK data', async () => {
        await page.route('**/assets/config.json', route => route.fulfill({
            json: { ...config, collection_index_url: '', versions: configData },
        }));
        await page.route(configData.entries[0].domains[0].data[0], route => route.fulfill({
            json: {
                type: 'bundle',
                id: 'bundle-selection',
                objects: [{ ...matrixSDO, tactic_refs: tactics.map(tactic => tactic.id) }, ...tactics, ...techniques],
            },
        }));
        // Font loading is irrelevant here; stub the stylesheet so an unavailable font service cannot fail the test.
        await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));

        await page.goto('/');
        await page.getByText('Create New Layer', { exact: true }).click();
        await page.getByRole('button', { name: 'Enterprise', exact: true }).click();
        await expect(page.locator('technique-cell')).toHaveCount(4);
    });

    await test.step('find and select a technique by search', async () => {
        await page.locator('span[alt="search"]').click();
        const search = page.locator('app-search-and-multiselect');
        await search.getByPlaceholder('Search').fill('registry');

        const techniquesPanel = search.locator('mat-expansion-panel').first();
        await expect(techniquesPanel.getByText('Techniques (1)', { exact: true })).toBeVisible();
        const result = techniquesPanel.locator('tr').filter({ hasText: 'Registry Run Keys' });
        await expect(result).toHaveCount(1);
        await result.getByRole('button', { name: 'select', exact: true }).click();
        await search.getByRole('button', { name: 'Close', exact: true }).click();

        await expect(page.locator('technique-cell').filter({ hasText: 'Registry Run Keys' }).locator('.editing')).toHaveCount(1);
        await expect(page.locator('.deselectNumber')).toHaveText('1');
    });

    await test.step('select a technique across tactics by default', async () => {
        await page.locator('span[alt="deselect all"]').click();
        const accessTokenCells = page.locator('technique-cell').filter({ hasText: 'Access Token Manipulation' });
        await accessTokenCells.first().getByText('Access Token Manipulation', { exact: true }).click();

        await expect(accessTokenCells.locator('.editing')).toHaveCount(2);
        await expect(page.locator('.deselectNumber')).toHaveText('1');
    });

    await test.step('limit selection to one tactic and clear it', async () => {
        await page.locator('span[alt="deselect all"]').click();
        await page.locator('.control-row-button.dropdown').filter({ hasText: /^lock$/ }).click();
        const acrossTactics = page.getByLabel('select techniques across tactics', { exact: true });
        await page.getByText('select techniques across tactics', { exact: true }).click();
        await expect(acrossTactics).not.toBeChecked();

        const accessTokenCells = page.locator('technique-cell').filter({ hasText: 'Access Token Manipulation' });
        await accessTokenCells.first().getByText('Access Token Manipulation', { exact: true }).click();
        await expect(accessTokenCells.locator('.editing')).toHaveCount(1);

        await page.locator('span[alt="deselect all"]').click();
        await expect(page.locator('technique-cell .editing')).toHaveCount(0);
        await expect(page.locator('.deselectNumber')).toHaveText('0');
        expect(errors).toEqual([]);
    });
});
