import { test, expect } from '@playwright/test';

test('editor accepts input and mirrors value to textarea', async ({ page }) => {
  await page.goto('example.html');
  await page.waitForSelector('textarea[is="expression-editor"]', { state: 'hidden', timeout: 5000 });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
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

test('editor prevents submitting textarea with invalid expression', async ({ page }) => {
  await page.goto('example.html');
  await page.waitForSelector('textarea[name="multiline"]', { state: 'hidden', timeout: 5000 });
  await page.waitForTimeout(1500); // wait for linter (default delay 750ms)
  await page.click('#template + * > button.btn-primary');

  // Focus invalid element
  expect(await page.evaluate(() => document.querySelector('#template expression-editor-container:focus'))).not.toBeNull();
});
