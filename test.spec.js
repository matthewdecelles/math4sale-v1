const { test, expect } = require('@playwright/test');

const URL = 'https://matthewdecelles.github.io/math4sale-mockup/';

test.describe('Math4Sale Landing Page', () => {

  test('page loads with correct title', async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle(/Math4Sale/i);
  });

  test('hero headline is visible', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('.hero h1')).toContainText('8,000+ Schools');
  });

  test('hero has calculator photo', async ({ page }) => {
    await page.goto(URL);
    const img = page.locator('.hero-calculators img');
    await expect(img).toBeVisible();
    await expect(img).toHaveCount(1);
  });

  test('hero stats bar has 4 stats', async ({ page }) => {
    await page.goto(URL);
    const stats = page.locator('.hero-stat');
    await expect(stats).toHaveCount(4);
  });

  test('centered form has email, phone, textarea', async ({ page }) => {
    await page.goto(URL);
    const form = page.locator('.form-card form');
    await expect(form).toBeVisible();
    await expect(form.locator('input[type="email"]')).toBeVisible();
    await expect(form.locator('input[type="tel"]')).toBeVisible();
    await expect(form.locator('textarea')).toBeVisible();
  });

  test('CTA button has pulse animation', async ({ page }) => {
    await page.goto(URL);
    const btn = page.locator('.form-submit');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText(/Quote in Seconds/i);
    const animation = await btn.evaluate(el => getComputedStyle(el).animationName);
    expect(animation).toContain('btnPulse');
  });

  test('trust badges has 6 items inside form card', async ({ page }) => {
    await page.goto(URL);
    const items = page.locator('.trust-badge-item');
    await expect(items).toHaveCount(6);
  });

  test('highlight bar shows 3 Price Tiers and Test Approved', async ({ page }) => {
    await page.goto(URL);
    const bar = page.locator('.highlight-bar');
    await expect(bar).toContainText('3 Price Tiers');
    await expect(bar).toContainText('Test Approved');
  });

  test('value props row has 4 items', async ({ page }) => {
    await page.goto(URL);
    const props = page.locator('.value-prop');
    await expect(props).toHaveCount(4);
  });

  test('all 5 organization logos load', async ({ page }) => {
    await page.goto(URL);
    const logos = page.locator('.logo-item img');
    await expect(logos).toHaveCount(5);
  });

  test('pricing section has 3 tiers', async ({ page }) => {
    await page.goto(URL);
    const cards = page.locator('.pricing-card');
    await expect(cards).toHaveCount(3);
    await expect(page.locator('.pricing-card.featured')).toBeVisible();
  });

  test('testimonials section has 3 reviews', async ({ page }) => {
    await page.goto(URL);
    const cards = page.locator('.testimonial-card');
    await expect(cards).toHaveCount(3);
  });

  test('footer has copyright and BBB mention', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('footer')).toContainText('2026');
    await expect(page.locator('footer')).toContainText('BBB');
  });

  test('page is responsive - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(URL);
    await expect(page.locator('.form-card')).toBeVisible();
    await expect(page.locator('.nav-links')).toBeHidden();
  });

  test('no console errors on page load', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto(URL);
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });
});
