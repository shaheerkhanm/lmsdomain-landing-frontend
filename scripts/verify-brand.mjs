import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EVIDENCE_DIR = path.resolve(__dirname, "../docs/multipage/evidence/brand");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const BASE_URL = "http://localhost:3000";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("============================================================");
  console.log("STARTING BRAND VERIFICATION & PLAYWRIGHT SCREENSHOTS");
  console.log("============================================================\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // 1. HORIZONTAL OVERFLOW CHECK (375 to 1920)
  console.log("1. Checking horizontal overflow across viewports...");
  const widths = [375, 414, 768, 1024, 1180, 1280, 1440, 1920];
  const overflowResults = [];

  for (const w of widths) {
    const context = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await sleep(400);

    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));

    overflowResults.push({
      width: w,
      scrollWidth,
      innerWidth,
      status: scrollWidth <= innerWidth ? "PASS" : "FAIL",
    });
    await context.close();
  }
  console.table(overflowResults);

  // 2. VIEWPORT SCREENSHOTS (1440, 1024, 390)
  const viewports = [
    { width: 1440, height: 900, name: "1440" },
    { width: 1024, height: 800, name: "1024" },
    { width: 390, height: 844, name: "390" },
  ];

  for (const vp of viewports) {
    console.log(`\n2. Capturing screenshots at ${vp.name}px...`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    // Home Header & Footer
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await sleep(600);

    // Header screenshot using clip to avoid scroll-into-view on fixed headers
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, `home-header-${vp.name}.png`),
      clip: { x: 0, y: 0, width: vp.width, height: vp.width >= 1024 ? 90 : 80 },
    });

    // Footer screenshot
    const footer = await page.$("footer");
    if (footer) {
      await footer.scrollIntoViewIfNeeded();
      await sleep(300);
      await footer.screenshot({ path: path.join(EVIDENCE_DIR, `home-footer-${vp.name}.png`) });
    }

    // Pricing Page
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle" });
    await sleep(400);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `pricing-${vp.name}.png`) });

    // Login Page
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await sleep(400);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `login-${vp.name}.png`) });

    await context.close();
  }

  // 3. MOBILE DRAWER OPEN SCREENSHOT (390px)
  console.log("\n3. Capturing mobile navigation drawer open...");
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await sleep(500);
    const menuBtn = await page.$('button[aria-label="Open navigation menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "mobile-drawer-390.png") });
    }
    await context.close();
  }

  // 4. DARK SURFACE LOGO
  console.log("\n4. Capturing dark surface with dark logo...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle" });
    await sleep(600);
    const enterpriseCard = await page.$("section.bg-\\[\\#161616\\]");
    if (enterpriseCard) {
      await enterpriseCard.scrollIntoViewIfNeeded();
      await sleep(400);
      await enterpriseCard.screenshot({ path: path.join(EVIDENCE_DIR, "dark-section-logo.png") });
    } else {
      // Fallback: screenshot features page AI chapter
      await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
      const aiChapter = await page.$("#category-ai-powered-tools");
      if (aiChapter) {
        await aiChapter.scrollIntoViewIfNeeded();
        await sleep(400);
        await aiChapter.screenshot({ path: path.join(EVIDENCE_DIR, "dark-section-logo.png") });
      }
    }
    await context.close();
  }

  // 5. /og/home CAPTURE
  console.log("\n5. Capturing /og/home share image...");
  {
    const context = await browser.newContext({ viewport: { width: 1200, height: 630 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/og/home`, { waitUntil: "networkidle" });
    await sleep(500);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "og-home.png") });
    await context.close();
  }

  // 6. CLS AUDIT ON HOME
  console.log("\n6. Measuring CLS on homepage...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1200);
      });
    });

    console.log(`Measured Homepage CLS: ${cls} (Target < 0.05: ${cls < 0.05 ? "PASS" : "FAIL"})`);
    await context.close();
  }

  await browser.close();
  console.log("\n============================================================");
  console.log("BRAND VERIFICATION COMPLETE");
  console.log("============================================================\n");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});

