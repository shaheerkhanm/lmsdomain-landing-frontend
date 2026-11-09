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

    // Wait for pricing cards to resolve (skeleton replaced by real price)
    await page.waitForSelector("text=Starter", { timeout: 10000 });
    
    // Check toggle active state via aria-checked="true"
    const activeToggle = await page.locator('[role="radiogroup"][aria-label="Currency selection"] [role="radio"][aria-checked="true"]').first();
    const activeToggleText = (await activeToggle.textContent()) || "";
    const detectedToggle = activeToggleText.includes("INR") ? "INR" : activeToggleText.includes("USD") ? "USD" : "UNKNOWN";

    // Check rendered text in the price block
    const content = await page.content();
    const hasExpectedSnippet = content.includes(expectedPriceSnippet);
    const pass = detectedToggle === expectedCurrency && hasExpectedSnippet;

    if (pass) {
      console.log(`✅ [PASS] ${name}: detected ${detectedToggle}, found "${expectedPriceSnippet}"`);
    } else {
      console.error(`❌ [FAIL] ${name}: expected ${expectedCurrency} ("${expectedPriceSnippet}"), got ${detectedToggle}`);
      failed++;
    }

    await context.close();
  }

  console.log("=== Running Currency Geo / Timezone / Priority Tests ===\n");

  // 1. Timezone Asia/Kolkata (Mumbai) -> INR
  await checkScenario("1. Timezone Asia/Kolkata (Mumbai)", {
    timezoneId: "Asia/Kolkata",
    expectedCurrency: "INR",
    expectedPriceSnippet: "₹3,999",
  });

  // 2. Timezone Asia/Calcutta -> INR
  await checkScenario("2. Timezone Asia/Calcutta (legacy)", {
    timezoneId: "Asia/Calcutta",
    expectedCurrency: "INR",
    expectedPriceSnippet: "₹3,999",
  });

  // 3. Timezone Europe/London -> USD
  await checkScenario("3. Timezone Europe/London", {
    timezoneId: "Europe/London",
    expectedCurrency: "USD",
    expectedPriceSnippet: "$49",
  });

  // 4. Timezone America/New_York -> USD
  await checkScenario("4. Timezone America/New_York", {
    timezoneId: "America/New_York",
    expectedCurrency: "USD",
    expectedPriceSnippet: "$49",
  });

  // 5. URL param ?currency=USD override in Kolkata
  await checkScenario("5. URL ?currency=USD in Kolkata", {
    timezoneId: "Asia/Kolkata",
    url: "http://localhost:3000/pricing?currency=USD",
    expectedCurrency: "USD",
    expectedPriceSnippet: "$49",
  });

  // 6. URL param ?currency=INR override in London
  await checkScenario("6. URL ?currency=INR in London", {
    timezoneId: "Europe/London",
    url: "http://localhost:3000/pricing?currency=INR",
    expectedCurrency: "INR",
    expectedPriceSnippet: "₹3,999",
  });

  // 7. LocalStorage survival in London
  await checkScenario("7. LocalStorage preferred_currency=INR in London", {
    timezoneId: "Europe/London",
    setupLocalStorage: () => localStorage.setItem("preferred_currency", "INR"),
    expectedCurrency: "INR",
    expectedPriceSnippet: "₹3,999",
  });

  // 8. Proxy header cf-ipcountry: IN with London timezone -> INR
  await checkScenario("8. Proxy header cf-ipcountry: IN (London timezone)", {
    timezoneId: "Europe/London",
    extraHTTPHeaders: { "cf-ipcountry": "IN" },
    expectedCurrency: "INR",
    expectedPriceSnippet: "₹3,999",
  });

  // 9. Proxy header cf-ipcountry: US with Kolkata timezone -> USD (server country header > client tz)
  await checkScenario("9. Proxy header cf-ipcountry: US (Kolkata timezone)", {
    timezoneId: "Asia/Kolkata",
    extraHTTPHeaders: { "cf-ipcountry": "US" },
    expectedCurrency: "USD",
    expectedPriceSnippet: "$49",
  });

  // 10. URL param beats proxy header (URL ?currency=INR with cf-ipcountry: US)
  await checkScenario("10. Priority: URL param beats country header", {
    timezoneId: "America/New_York",
    url: "http://localhost:3000/pricing?currency=INR",
    extraHTTPHeaders: { "cf-ipcountry": "US" },
    expectedCurrency: "INR",
    expectedPriceSnippet: "₹3,999",
  });

  // 11. Saved choice beats proxy header (localStorage: INR with cf-ipcountry: US)
  await checkScenario("11. Priority: localStorage beats country header", {
    timezoneId: "America/New_York",
    extraHTTPHeaders: { "cf-ipcountry": "US" },
    setupLocalStorage: () => localStorage.setItem("preferred_currency", "INR"),
    expectedCurrency: "INR",
    expectedPriceSnippet: "₹3,999",
  });

  // 12. Test reload survival after clicking toggle
  {
    const context = await browser.newContext({
      timezoneId: "Europe/London",
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/pricing", { waitUntil: "networkidle" });
    
    // First it should be USD in London
    await page.waitForSelector("text=Starter");
    // Click INR toggle
    await page.locator('button:has-text("INR")').first().click();
    await page.waitForTimeout(500);

    // Verify it changed to INR
    const contentBeforeReload = await page.content();
    const hasInr = contentBeforeReload.includes("₹3,999");

    // Reload page without params
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForSelector("text=Starter");

    const contentAfterReload = await page.content();
    const survivesReload = contentAfterReload.includes("₹3,999");

    if (hasInr && survivesReload) {
      console.log(`✅ [PASS] 12. Interactive toggle to INR in London persists across reload`);
    } else {
      console.error(`❌ [FAIL] 12. Reload persistence failed: hasInr=${hasInr}, survivesReload=${survivesReload}`);
      failed++;
    }
    await context.close();
  }

  // 13. Mobile 375px layout check
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

  await browser.close();

  console.log(`\nTests completed with ${failed} failure(s).`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
