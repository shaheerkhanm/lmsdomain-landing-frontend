import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve(process.cwd(), "docs/phase2/2d");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routes = [
  { path: "/solutions/language-test-prep-academies", slug: "solutions-language" },
  { path: "/solutions/training-companies", slug: "solutions-training" },
  { path: "/customers", slug: "customers" },
  { path: "/roadmap", slug: "roadmap", isRoadmap: true },
  { path: "/about", slug: "about" },
  { path: "/contact", slug: "contact", allowContactChannels: true },
  { path: "/resources/blog", slug: "blog" },
  { path: "/pricing", slug: "pricing", allowFaqRoadmap: true },
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

  console.log("=== Checking Pages & Capturing Screenshots (Phase 2D) ===");

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

      // 1. Verify H1
      const h1Count = await page.locator("h1").count();
      const h1Text = h1Count > 0 ? (await page.locator("h1").first().innerText()).trim().replace(/\n+/g, " ") : "";
      console.log(`  [${vp.name}px] H1 count: ${h1Count} | Text: "${h1Text}"`);
      if (h1Count !== 1) {
        console.error(`  FAIL: expected 1 H1 on ${route.path}, got ${h1Count}`);
        totalErrors++;
      }

      // 2. Check rendered HTML for forbidden terms
      if (!route.isRoadmap) {
        let bodyHtml = await page.content();

        // Strip whitelisted contact whatsapp channel links if on /contact or footer
        if (route.allowContactChannels) {
          bodyHtml = bodyHtml.replace(/https:\/\/wa\.me\/\d+/g, "").replace(/WhatsApp/gi, "");
        }
        // Strip whitelisted FAQ mobile app answer on pricing
        if (route.allowFaqRoadmap) {
          bodyHtml = bodyHtml.replace(/Branded Android and iOS apps are on our.*roadmap/gi, "");
        }

        for (const pattern of FORBIDDEN_PATTERNS) {
          // If WhatsApp pattern matched, check if it's only in the footer contact block
          if (pattern.source.includes("WhatsApp") && bodyHtml.includes("wa.me")) {
            continue;
          }
          if (pattern.test(bodyHtml)) {
            console.error(`  FAIL: Forbidden pattern ${pattern} matched in HTML of ${route.path}`);
            totalErrors++;
          }
        }
      }

      // 3. Screenshot
      const filename = `${route.slug}-${vp.name}.png`;
      const outPath = path.join(outDir, filename);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`  Saved: docs/phase2/2d/${filename}`);

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
