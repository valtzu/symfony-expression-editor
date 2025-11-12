import { test, expect } from '@playwright/test';

test('editor accepts input and mirrors value to textarea', async ({ page }) => {
  await page.goto('example.html');
  await page.waitForSelector('textarea[is="expression-editor"]', { state: 'hidden', timeout: 5000 });
  await page.waitForTimeout(500);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await page.keyboard.type("'latest' ends ", { delay: 100 });
  await page.waitForTimeout(500);
  await page.keyboard.press('Tab');
  await page.keyboard.type("'test'");
  await page.waitForTimeout(300);

  const value = await page.evaluate(() => (document.querySelector('textarea[is="expression-editor"]') as HTMLTextAreaElement).value);
  expect(value).toEqual("'latest' ends with 'test'");
});
