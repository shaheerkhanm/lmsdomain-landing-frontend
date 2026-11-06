import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve(process.cwd(), "docs/phase2/2c");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routes = [
  { path: "/platform", slug: "platform" },
  { path: "/platform/teach", slug: "platform-teach" },
  { path: "/platform/assess", slug: "platform-assess" },
  { path: "/platform/manage", slug: "platform-manage" },
  { path: "/platform/sell", slug: "platform-sell" },
  { path: "/platform/brand", slug: "platform-brand" },
  { path: "/platform/ai", slug: "platform-ai" },
  { path: "/platform/security", slug: "platform-security" },
];

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844 },
];

const FORBIDDEN_PATTERNS = [
  /\bDRM\b/i,
  /\bFairPlay\b/i,
  /\bWidevine\b/i,
  /\bWebRTC\b/i,
  /\bWhatsApp\b/i,
  /\bmemberships?\b/i,
  /\baffiliates?\b/i,
  /\bfunnels?\b/i,
  /\bAI quiz\b/i,
  /\bAI assessment\b/i,
  /\bPayPal\b/i,
  /\bbranded (?:android|ios|mobile) apps?\b/i,
];

async function run() {
  const browser = await chromium.launch();
  let totalErrors = 0;

  console.log("=== Testing Redirects ===");
  const testPage = await browser.newPage();
  
  // Test /features redirect
  const resFeatures = await testPage.goto("http://localhost:3000/features", { waitUntil: "commit" });
  const finalFeaturesUrl = testPage.url();
  console.log(`/features -> ${finalFeaturesUrl} (Status: ${resFeatures?.status()})`);
  if (!finalFeaturesUrl.includes("/platform")) {
    console.error("FAIL: /features did not redirect to /platform");
    totalErrors++;
  }

  // Test /ai redirect
  const resAi = await testPage.goto("http://localhost:3000/ai", { waitUntil: "commit" });
  const finalAiUrl = testPage.url();
  console.log(`/ai -> ${finalAiUrl} (Status: ${resAi?.status()})`);
  if (!finalAiUrl.includes("/platform/ai")) {
    console.error("FAIL: /ai did not redirect to /platform/ai");
    totalErrors++;
  }
  await testPage.close();

  console.log("\n=== Checking Pages & Capturing Screenshots ===");

  for (const route of routes) {
    console.log(`\nRoute: ${route.path}`);

    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });

      const page = await context.newPage();
      const url = `http://localhost:3000${route.path}`;
      await page.goto(url, { waitUntil: "networkidle" });

      // Verify H1
      const h1Count = await page.locator("h1").count();
      const h1Text = h1Count > 0 ? (await page.locator("h1").first().innerText()).trim().replace(/\n+/g, " ") : "";
      console.log(`  [${vp.name}px] H1 count: ${h1Count} | Text: "${h1Text}"`);
      if (h1Count !== 1) {
        console.error(`  FAIL: expected 1 H1 on ${route.path}, got ${h1Count}`);
        totalErrors++;
      }

      // Check rendered HTML for forbidden terms
      const bodyHtml = await page.content();
      for (const pattern of FORBIDDEN_PATTERNS) {
        if (pattern.test(bodyHtml)) {
          console.error(`  FAIL: Forbidden pattern ${pattern} matched in HTML of ${route.path}`);
          totalErrors++;
        }
      }

      // Screenshot
      const filename = `${route.slug}-${vp.name}.png`;
      const outPath = path.join(outDir, filename);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`  Saved: docs/phase2/2c/${filename}`);

      await context.close();
    }
  }

  await browser.close();

  console.log(`\n=== Verification Finished with ${totalErrors} errors ===`);
  if (totalErrors > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
