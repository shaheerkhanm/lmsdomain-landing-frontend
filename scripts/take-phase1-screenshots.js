const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function run() {
  const outDir = path.join(process.cwd(), "docs/phase1");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  // 1. Home 375x812 with JavaScript disabled
  console.log("Capturing 375x812 no-JS home screenshot...");
  const noJsContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    javaScriptEnabled: false,
  });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto("http://localhost:3005/", { waitUntil: "commit" });
  await noJsPage.waitForTimeout(1000);
  await noJsPage.screenshot({ path: path.join(outDir, "home-375-no-js.png"), fullPage: false });
  await noJsContext.close();

  // 2. 1440x900 screenshots with JS enabled
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();

  // Home 1440x900
  console.log("Capturing 1440x900 home...");
  await page.goto("http://localhost:3005/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, "home-1440.png"), fullPage: false });

  // Pricing monthly 1440x900
  console.log("Capturing 1440x900 pricing monthly...");
  await page.goto("http://localhost:3005/pricing?billing=monthly", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, "pricing-monthly-1440.png"), fullPage: false });

  // Pricing yearly 1440x900
  console.log("Capturing 1440x900 pricing yearly...");
  await page.goto("http://localhost:3005/pricing?billing=yearly", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, "pricing-yearly-1440.png"), fullPage: false });

  // Custom LMS 1440x900
  console.log("Capturing 1440x900 custom-lms...");
  await page.goto("http://localhost:3005/custom-lms", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, "custom-lms-1440.png"), fullPage: false });

  await browser.close();
  console.log("All screenshots saved successfully in docs/phase1/");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
