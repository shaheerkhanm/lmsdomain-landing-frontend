import { chromium } from "playwright";

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  let failed = 0;

  async function checkScenario(name, {
    timezoneId,
    extraHTTPHeaders = {},
    url = "http://localhost:3000/pricing",
    setupLocalStorage,
    expectedCurrency,
    expectedPriceSnippet,
  }) {
    const context = await browser.newContext({
      timezoneId: timezoneId || "UTC",
      extraHTTPHeaders,
      viewport: { width: 1280, height: 800 },
    });

    const page = await context.newPage();

    if (setupLocalStorage) {
      await page.addInitScript(setupLocalStorage);
    }

    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for pricing cards to resolve
    await page.waitForSelector("text=Starter", { timeout: 10000 });

    // Check rendered text in the price block
    const content = await page.content();
    const hasExpectedSnippet = content.includes(expectedPriceSnippet);

    if (hasExpectedSnippet) {
      console.log(`✅ [PASS] ${name}: found expected price "${expectedPriceSnippet}"`);
    } else {
      console.error(`❌ [FAIL] ${name}: expected to find "${expectedPriceSnippet}" in page content`);
      failed++;
    }

    await context.close();
  }

  console.log("=== Running Currency Automatic Geo / Timezone Tests ===\n");

  // 1. Timezone Asia/Kolkata (Mumbai) -> INR
  await checkScenario("1. Timezone Asia/Kolkata (Mumbai)", {
    timezoneId: "Asia/Kolkata",
    expectedPriceSnippet: "₹3,999",
  });

  // 2. Timezone Asia/Calcutta -> INR
  await checkScenario("2. Timezone Asia/Calcutta (legacy)", {
    timezoneId: "Asia/Calcutta",
    expectedPriceSnippet: "₹3,999",
  });

  // 3. Timezone Europe/London -> USD
  await checkScenario("3. Timezone Europe/London", {
    timezoneId: "Europe/London",
    expectedPriceSnippet: "$49",
  });

  // 4. Timezone America/New_York -> USD
  await checkScenario("4. Timezone America/New_York", {
    timezoneId: "America/New_York",
    expectedPriceSnippet: "$49",
  });

  // 5. URL param ?currency=USD override in Kolkata
  await checkScenario("5. URL ?currency=USD in Kolkata", {
    timezoneId: "Asia/Kolkata",
    url: "http://localhost:3000/pricing?currency=USD",
    expectedPriceSnippet: "$49",
  });

  // 6. URL param ?currency=INR override in London
  await checkScenario("6. URL ?currency=INR in London", {
    timezoneId: "Europe/London",
    url: "http://localhost:3000/pricing?currency=INR",
    expectedPriceSnippet: "₹3,999",
  });

  // 7. Proxy header cf-ipcountry: IN with London timezone -> INR
  await checkScenario("7. Proxy header cf-ipcountry: IN (London timezone)", {
    timezoneId: "Europe/London",
    extraHTTPHeaders: { "cf-ipcountry": "IN" },
    expectedPriceSnippet: "₹3,999",
  });

  // 8. Proxy header cf-ipcountry: US with Kolkata timezone -> USD (server country header > client tz)
  await checkScenario("8. Proxy header cf-ipcountry: US (Kolkata timezone)", {
    timezoneId: "Asia/Kolkata",
    extraHTTPHeaders: { "cf-ipcountry": "US" },
    expectedPriceSnippet: "$49",
  });

  // 9. URL param beats proxy header (URL ?currency=INR with cf-ipcountry: US)
  await checkScenario("9. Priority: URL param beats country header", {
    timezoneId: "America/New_York",
    url: "http://localhost:3000/pricing?currency=INR",
    extraHTTPHeaders: { "cf-ipcountry": "US" },
    expectedPriceSnippet: "₹3,999",
  });

  // 10. LocalStorage preferred_currency is ignored (does not lock visitor to wrong currency)
  await checkScenario("10. LocalStorage preferred_currency=INR ignored for London visitor", {
    timezoneId: "Europe/London",
    setupLocalStorage: () => localStorage.setItem("preferred_currency", "INR"),
    expectedPriceSnippet: "$49",
  });

  // 11. Assert INR/USD toggle is NOT on the page
  {
    const context = await browser.newContext({
      timezoneId: "Asia/Kolkata",
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/pricing", { waitUntil: "networkidle" });
    await page.waitForSelector("text=Starter");

    const currencyToggle = page.locator('[role="radiogroup"][aria-label="Currency selection"]');
    const toggleCount = await currencyToggle.count();

    const inrButton = page.locator('button:has-text("INR")');
    const inrCount = await inrButton.count();

    if (toggleCount === 0 && inrCount === 0) {
      console.log(`✅ [PASS] 11. INR/USD toggle is completely removed from the page`);
    } else {
      console.error(`❌ [FAIL] 11. INR/USD toggle still found on page: toggleCount=${toggleCount}, inrCount=${inrCount}`);
      failed++;
    }
    await context.close();
  }

  // 12. Check Monthly / Yearly switch is present, centered, and has rounded-full
  {
    const context = await browser.newContext({
      timezoneId: "Asia/Kolkata",
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/pricing", { waitUntil: "networkidle" });
    await page.waitForSelector("text=Starter");

    const billingToggle = page.locator('[role="radiogroup"][aria-label="Billing frequency options"]');
    const isVisible = await billingToggle.isVisible();
    const className = (await billingToggle.getAttribute("class")) || "";
    const hasRoundedFull = className.includes("rounded-full");

    if (isVisible && hasRoundedFull) {
      console.log(`✅ [PASS] 12. Monthly / Yearly switch is present and has rounded-full track`);
    } else {
      console.error(`❌ [FAIL] 12. Billing toggle missing rounded-full or not visible: ${className}`);
      failed++;
    }
    await context.close();
  }

  // 13. Mobile 375px layout & no overflow check
  {
    const context = await browser.newContext({
      timezoneId: "Asia/Kolkata",
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/pricing", { waitUntil: "networkidle" });
    await page.waitForSelector("text=Starter");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;

    if (!hasHorizontalOverflow) {
      console.log(`✅ [PASS] 13. Mobile 375px: zero horizontal overflow (scrollWidth=${scrollWidth}, clientWidth=${clientWidth})`);
    } else {
      console.error(`❌ [FAIL] 13. Mobile 375px has horizontal overflow: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`);
      failed++;
    }
    await context.close();
  }

  // 14. Tablet 768px layout check
  {
    const context = await browser.newContext({
      timezoneId: "Asia/Kolkata",
      viewport: { width: 768, height: 1024 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/pricing", { waitUntil: "networkidle" });
    await page.waitForSelector("text=Starter");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;

    if (!hasHorizontalOverflow) {
      console.log(`✅ [PASS] 14. Tablet 768px: zero horizontal overflow (scrollWidth=${scrollWidth}, clientWidth=${clientWidth})`);
    } else {
      console.error(`❌ [FAIL] 14. Tablet 768px has horizontal overflow: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`);
      failed++;
    }
    await context.close();
  }

  // 15. Desktop 1440px layout check
  {
    const context = await browser.newContext({
      timezoneId: "Asia/Kolkata",
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/pricing", { waitUntil: "networkidle" });
    await page.waitForSelector("text=Starter");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;

    if (!hasHorizontalOverflow) {
      console.log(`✅ [PASS] 15. Desktop 1440px: zero horizontal overflow (scrollWidth=${scrollWidth}, clientWidth=${clientWidth})`);
    } else {
      console.error(`❌ [FAIL] 15. Desktop 1440px has horizontal overflow: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`);
      failed++;
    }
    await context.close();
  }

  await browser.close();

  console.log(`\nTests completed with ${failed} failure(s).`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
