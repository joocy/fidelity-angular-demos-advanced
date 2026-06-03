import { test, expect } from '@playwright/test';

test.describe('Fund Card', () => {
  test('view button is present', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.getByTestId('view-btn').first();
    await expect(firstCard).toBeVisible();
  });
});
