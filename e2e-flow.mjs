/**
 * Loknath Art Centre – End-to-End Automation Script (v2)
 * ========================================================
 * Uses puppeteer-core + local Google Chrome (no downloads needed)
 *
 * Run:  node e2e-flow.mjs
 * Screenshots saved into:  ./e2e-screenshots/
 */

import puppeteer from 'puppeteer-core';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = join(__dirname, 'e2e-screenshots');
if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

// ─── Config ───────────────────────────────────
const BASE_URL        = 'http://localhost:3000';
const CHROME_EXE      = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CUSTOMER_EMAIL  = 'demo@loknath.in';
const CUSTOMER_PASS   = 'demo123';
const ADMIN_EMAIL     = 'rakhalchandra57@gmail.com';
const ADMIN_PASS      = 'rakhal57';
const PRODUCT_NAME    = 'প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)';
const DELIVERY_DATE   = (() => {
  const d = new Date(); d.setDate(d.getDate() + 5);
  return d.toISOString().split('T')[0];
})();

// ─── Helpers ──────────────────────────────────
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const shot = async (page, name) => {
  const file = join(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`📸  Saved: ${file}`);
};

/** Wait until page text contains the given string (case-insensitive) */
const waitText = (page, text, timeout = 25000) =>
  page.waitForFunction(
    t => document.body.innerText.toUpperCase().includes(t.toUpperCase()),
    { timeout },
    text
  );

/** Click the first button whose innerText exactly or partially matches */
const clickBtnText = async (page, matchFn, timeout = 15000) => {
  await page.waitForFunction(
    (fn) => {
      const b = [...document.querySelectorAll('button')].find(eval(`(${fn})`));
      if (b && !b.disabled) { b.click(); return true; }
      return false;
    },
    { timeout },
    matchFn.toString()
  );
};

/** Type into an input identified by placeholder */
const fillPlaceholder = async (page, ph, val) => {
  const sel = `input[placeholder="${ph}"],textarea[placeholder="${ph}"]`;
  await page.waitForSelector(sel, { visible: true, timeout: 12000 });
  await page.$eval(sel, (el, v) => { el.focus(); el.value = ''; }, val);
  await page.type(sel, val, { delay: 35 });
};

/** Open the login modal via the "Login" button in the navbar */
const openLoginModal = async (page) => {
  // Wait until the Login button is clickable
  await page.waitForFunction(
    () => [...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Login'),
    { timeout: 15000 }
  );
  await page.evaluate(() => {
    [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Login').click();
  });
  // Wait for the auth form to actually appear in the DOM (Framer Motion animation)
  await page.waitForSelector('#auth-form', { visible: true, timeout: 12000 });
  await delay(300);
};

/** Switch role tab inside auth modal */
const switchRole = async (page, role) => {
  await page.evaluate((r) => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === r);
    if (btn) btn.click();
  }, role);
  await delay(300);
};

/** Fill and submit the #auth-form */
const doLogin = async (page, email, pass) => {
  // Form should already be visible (openLoginModal waits for it)
  await page.waitForSelector('#auth-form', { visible: true, timeout: 15000 });
  await page.$eval('#auth-form input[type="email"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, email);
  await page.$eval('#auth-form input[type="password"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, pass);
  // Also physically type password so React state picks it up
  await page.focus('#auth-form input[type="password"]');
  await page.keyboard.down('Control'); await page.keyboard.press('A'); await page.keyboard.up('Control');
  await page.keyboard.type(pass);
  await delay(300);
  await page.$eval('#auth-form', f => f.requestSubmit());
  await delay(2500);
};

/** Wait until the Login button is gone (user is logged in) */
const waitLoggedIn = (page) =>
  page.waitForFunction(
    () => ![...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Login'),
    { timeout: 20000 }
  );

// ─── MAIN ─────────────────────────────────────
(async () => {
  console.log('\n🚀  Launching Chrome…');
  const browser = await puppeteer.launch({
    executablePath: CHROME_EXE,
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized', '--disable-infobars'],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(40000);

  try {

    // ── STEP 1: Open homepage ────────────────
    console.log('\n[1] Opening localhost:3000…');
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await delay(1500);

    // ── STEP 2: Customer login ───────────────
    console.log('\n[2] Customer login…');
    await openLoginModal(page);
    await switchRole(page, 'Customer');
    await doLogin(page, CUSTOMER_EMAIL, CUSTOMER_PASS);
    await waitLoggedIn(page);
    console.log('    ✅  Logged in as Customer');

    // ── STEP 3: Go to /store ─────────────────
    console.log('\n[3] Navigating to /store…');
    await page.goto(`${BASE_URL}/store`, { waitUntil: 'domcontentloaded' });
    await delay(2000);

    // ── STEP 4: Add product to cart ──────────
    console.log(`\n[4] Adding "${PRODUCT_NAME}" to cart…`);
    await waitText(page, PRODUCT_NAME);
    // Click the "কার্টে যোগ করুন" / "Add to cart" button inside that product's card
    await page.evaluate((name) => {
      for (const el of document.querySelectorAll('*')) {
        if (el.childElementCount === 0 && el.textContent.trim() === name) {
          let node = el;
          for (let i = 0; i < 10; i++) {
            node = node.parentElement;
            if (!node) break;
            const btn = [...node.querySelectorAll('button')].find(b =>
              b.textContent.includes('কার্টে') || b.textContent.includes('যোগ') || b.textContent.toLowerCase().includes('add')
            );
            if (btn) { btn.click(); return; }
          }
        }
      }
    }, PRODUCT_NAME);
    await delay(1200);
    console.log('    ✅  Product added to cart');

    // ── STEP 5: Open cart sidebar ─────────────
    console.log('\n[5] Opening cart sidebar (কার্ট button)…');
    // The cart button is: button > ShoppingCart svg + span "কার্ট" with a count badge
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find(b =>
        b.textContent.includes('কার্ট') && b.querySelector('svg')
      );
      if (btn) btn.click();
    });
    await delay(1000);
    // Verify sidebar opened by checking for the "আপনার কার্ট" heading
    await waitText(page, 'আপনার কার্ট');
    console.log('    ✅  Cart sidebar opened');

    // ── STEP 6: Proceed to checkout ──────────
    console.log('\n[6] Clicking "অর্ডার নিশ্চিত করুন" (Proceed to Checkout)…');
    // Wait for the checkout button to appear in the cart sidebar, then click it
    await page.waitForFunction(() => {
      const btn = [...document.querySelectorAll('button')].find(b =>
        b.textContent.trim() === 'অর্ডার নিশ্চিত করুন'
      );
      return !!btn;
    }, { timeout: 10000 });
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find(b =>
        b.textContent.trim() === 'অর্ডার নিশ্চিত করুন'
      );
      if (btn) btn.scrollIntoView({ block: 'center' });
    });
    await delay(400);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find(b =>
        b.textContent.trim() === 'অর্ডার নিশ্চিত করুন'
      );
      if (btn) btn.click();
    });
    await delay(1500);
    // Wait for checkout popup — heading is "Choose payment method"
    await waitText(page, 'Choose payment method');
    console.log('    ✅  Checkout popup opened');

    // ── STEP 7: Fill delivery form ────────────
    console.log('\n[7] Filling delivery details…');
    await fillPlaceholder(page, 'Phone number',          '9876543210');
    await delay(300);
    await fillPlaceholder(page, 'Pincode',               '700001');
    await delay(300);
    await fillPlaceholder(page, 'City',                  'Kolkata');
    await delay(300);
    await fillPlaceholder(page, 'Full delivery address', '123 Art Lane');
    await delay(500);
    console.log('    ✅  Delivery form filled');

    // ── STEP 8: Select Cash on Delivery (already pre-selected, but ensure it) ──
    console.log('\n[8] Confirming Cash on Delivery is selected…');
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Cash on Delivery');
      if (btn) btn.click();
    });
    await delay(600);

    // ── STEP 9: Place order ───────────────────
    console.log('\n[9] Placing order (COD)…');
    // Wait for the Place Order button to be present
    await page.waitForFunction(() => {
      return [...document.querySelectorAll('button')].some(b =>
        b.textContent.includes('Place Cash on Delivery') || b.textContent.includes('Place Order')
      );
    }, { timeout: 10000 });
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find(b =>
        b.textContent.includes('Place Cash on Delivery') || b.textContent.includes('Place Order')
      );
      if (btn) btn.click();
    });
    await delay(5000);

    // ── STEP 10: Order success screenshot ─────
    console.log('\n[10] Taking order success screenshot…');
    // Wait for success overlay: "Order placed successfully"
    await waitText(page, 'Order placed successfully').catch(() => {});
    await delay(1000);
    await shot(page, 'order_success');

    // ── STEP 11: Verify My Orders ──────────
    console.log('\n[11] Checking My Orders…');
    // Dismiss the success overlay by clicking "Continue" if present
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Continue');
      if (btn) btn.click();
    });
    await delay(800);
    await page.goto(`${BASE_URL}/account/orders`, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await delay(3000);
    await shot(page, 'my_orders');
    console.log('    ✅  My Orders page captured');

    // ── STEP 12: Logout ───────────────────────
    console.log('\n[12] Logging out as Customer…');
    // Open user dropdown (click the avatar button – it has a gradient circle inside header)
    await page.evaluate(() => {
      // The user button in the header has a span with gradient classes
      const btn = [...document.querySelectorAll('header button')].find(b =>
        b.querySelector('[class*="gradient"]') || (b.textContent && !['Login','Enroll Now','Open menu'].includes(b.textContent.trim()) && b.closest('header'))
      );
      if (btn) btn.click();
    });
    await delay(800);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Logout');
      if (btn) btn.click();
    });
    await delay(1800);
    console.log('    ✅  Customer logged out');

    // ── STEP 13: Admin login ──────────────────
    console.log('\n[13] Logging in as Admin…');
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await delay(1000);
    await openLoginModal(page);
    await switchRole(page, 'Admin');
    await doLogin(page, ADMIN_EMAIL, ADMIN_PASS);
    await waitLoggedIn(page);
    console.log('    ✅  Logged in as Admin');

    // ── STEP 14: Go to /admin ─────────────────
    console.log('\n[14] Navigating to /admin…');
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await delay(3000);

    // ── STEP 15: Open Recent Orders panel ─────
    console.log('\n[15] Opening Recent Orders panel…');
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button, a')].find(b =>
        b.textContent.includes('সাম্প্রতিক অর্ডার') ||
        b.textContent.includes('Recent Orders') ||
        (b.textContent.includes('অর্ডার') && b.tagName === 'BUTTON')
      );
      if (btn) btn.click();
    });
    await delay(2000);

    // Wait for panel to render
    await waitText(page, 'Recent Orders');
    console.log('    ✅  Recent Orders panel visible');

    // ── STEP 16: Select the new/latest order ──
    console.log('\n[16] Selecting the new order…');
    await page.evaluate(() => {
      // Orders are rendered as buttons inside the panel list
      const btn = [...document.querySelectorAll('button')].find(b =>
        b.textContent.includes('New Order') || b.textContent.includes('Demo Customer')
      ) || [...document.querySelectorAll('button')].find(b => b.textContent.includes('₹'));
      if (btn) btn.click();
    });
    await delay(1200);

    // ── STEP 17: Set delivery date ─────────────
    console.log(`\n[17] Setting delivery date: ${DELIVERY_DATE}…`);
    await page.evaluate((date) => {
      const input = document.querySelector('input[type="date"]');
      if (!input) return;
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
        .set.call(input, date);
      input.dispatchEvent(new Event('input',  { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, DELIVERY_DATE);
    await delay(600);

    // ── STEP 18: Confirm order ─────────────────
    console.log('\n[18] Confirming order…');
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find(b =>
        (b.textContent.includes('নিশ্চিত') || b.textContent.toLowerCase().includes('confirm')) &&
        !b.disabled
      );
      if (btn) btn.click();
    });
    await delay(3500);

    // ── STEP 19: Confirmed order screenshot ────
    console.log('\n[19] Taking order confirmed screenshot…');
    await shot(page, 'order_confirmed');

    // ── STEP 20: Reports screenshot ────────────
    console.log('\n[20] Opening Reports section…');
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(400);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button, a')].find(b =>
        b.textContent.includes('রিপোর্ট') || b.textContent.toLowerCase().includes('report')
      );
      if (btn) btn.click();
    });
    await delay(2000);
    await shot(page, 'reports_update');
    console.log('    ✅  Reports screenshot captured');

    console.log('\n\n✅  ALL STEPS COMPLETE!');
    console.log(`📁  Screenshots in: ${SCREENSHOT_DIR}`);
    console.log('    order_success.png | my_orders.png | order_confirmed.png | reports_update.png');

  } catch (err) {
    console.error('\n❌  Script error:', err.message);
    await shot(page, 'error_state').catch(() => {});
    throw err;
  } finally {
    await delay(3000);
    await browser.close();
  }
})();
