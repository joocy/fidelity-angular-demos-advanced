import { test, expect } from '@playwright/test';

test.describe('Fund List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(page.locator('nav strong')).toContainText('Apex Asset Management');
  });

  test('renders fund cards once loaded', async ({ page }) => {
    await expect(page.getByTestId('fund-list')).toBeVisible();
  });
});
