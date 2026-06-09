import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:3000';
const SHOTS = '/tmp/paoyee-shots';
mkdirSync(SHOTS, { recursive: true });

const br = await chromium.launch({ headless: true });
const ctx = await br.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const log = (msg) => console.log(msg);

// 1. Hero section
await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${SHOTS}/01-hero.png` });
const heroH1 = await page.textContent('h1');
log(`Hero h1: "${heroH1?.trim()}"`);
log(`[1] Tagline: ${await page.locator('text=CURATED TIMEPIECES').first().isVisible()}`);
log(`[1] CTA visible: ${await page.locator('text=EXPLORE THE COLLECTION').isVisible()}`);

// 2. Brand marquee
log(`[2] ROLEX in marquee: ${await page.locator('text=ROLEX').first().isVisible()}`);
log(`[2] Marquee element count: ${await page.locator('.animate-marquee').count()}`);

// 3. Editorial collections
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/02-editorial.png` });
log(`[3] "The Dress Watch Edit": ${await page.locator('text=The Dress Watch Edit').isVisible()}`);
log(`[3] "Icons of Racing": ${await page.locator('text=Icons of Racing').isVisible()}`);
log(`[3] "The Independent Horizon": ${await page.locator('text=The Independent Horizon').isVisible()}`);
log(`[3+4] Total article cards: ${await page.locator('article').count()} (expect 11)`);

// 4. Product showcase
await page.evaluate(() => window.scrollTo(0, 1800));
await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/03-products.png` });
log(`[4] "Cosmograph Daytona" visible: ${await page.locator('text=Cosmograph Daytona').isVisible()}`);
log(`[4] "NT$ 1,880,000" visible: ${await page.locator('text=NT$ 1,880,000').isVisible()}`);
log(`[4] "Inquire for Price" visible: ${await page.locator('text=Inquire for Price').first().isVisible()}`);

// Hover on first product card (index 3, after 3 editorial)
const firstProductCard = page.locator('article').nth(3);
await firstProductCard.hover();
await page.waitForTimeout(900);
await page.screenshot({ path: `${SHOTS}/04-product-hover.png` });
log(`[4] "MOVEMENT VIEW" on hover: ${await page.locator('text=MOVEMENT VIEW').first().isVisible()}`);

// 5. Trust section
await page.evaluate(() => window.scrollTo(0, 5000));
await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/05-trust.png` });
log(`[5] "Authenticity" heading: ${await page.locator('text=Authenticity').first().isVisible()}`);
log(`[5] "BOOK A PRIVATE VIEWING": ${await page.locator('text=BOOK A PRIVATE VIEWING').isVisible()}`);

// 6. Booking modal
await page.locator('text=BOOK A PRIVATE VIEWING').click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/06-modal.png` });
log(`[6] Modal visible: ${await page.locator('text=Request Private Viewing').isVisible()}`);
log(`[6] Name input: ${await page.locator('input[type=text]').nth(0).isVisible()}`);
log(`[6] Beverage "Espresso": ${await page.locator('text=Espresso').isVisible()}`);

await page.locator('input[type=text]').nth(0).fill('Jean-Michel Dupont');
await page.locator('input[type=text]').nth(1).fill('jm@example.com');
await page.locator('text=Espresso').click();
await page.screenshot({ path: `${SHOTS}/07-modal-filled.png` });
await page.locator('text=REQUEST APPOINTMENT').click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/08-modal-success.png` });
log(`[6] Success state: ${await page.locator('text=Your Request is Received').isVisible()}`);

// 7. Navbar scroll
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
const navBgTop = await page.locator('nav').evaluate(el => getComputedStyle(el).backgroundColor);
log(`[7] Navbar bg at top: "${navBgTop}"`);
await page.evaluate(() => window.scrollTo(0, 200));
await page.waitForTimeout(800);
const navBgScrolled = await page.locator('nav').evaluate(el => getComputedStyle(el).backgroundColor);
log(`[7] Navbar bg after scroll: "${navBgScrolled}"`);
await page.screenshot({ path: `${SHOTS}/09-navbar-scrolled.png` });

// Full page
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: `${SHOTS}/00-full-page.png`, fullPage: true });
log(`\nScreenshots saved to ${SHOTS}/`);
await br.close();
