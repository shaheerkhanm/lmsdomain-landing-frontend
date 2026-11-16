import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve(process.cwd(), "docs/phase2/2b");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch();

  const configs = [
    { name: "homepage-1440-js-on.png", width: 1440, height: 900, js: true },
    { name: "homepage-1440-js-off.png", width: 1440, height: 900, js: false },
    { name: "homepage-390-js-on.png", width: 390, height: 844, js: true },
    { name: "homepage-390-js-off.png", width: 390, height: 844, js: false },
  ];

  for (const cfg of configs) {
    const context = await browser.newContext({
      viewport: { width: cfg.width, height: cfg.height },
      javaScriptEnabled: cfg.js,
      deviceScaleFactor: 2,
    });

    const page = await context.newPage();
    console.log(`Navigating to http://localhost:3000 (width: ${cfg.width}, JS: ${cfg.js})...`);
    await page.goto("http://localhost:3000", { waitUntil: cfg.js ? "networkidle" : "load" });

    // Verify H1 visibility
    const h1 = page.locator("h1");
    const count = await h1.count();
    const isVisible = count > 0 ? await h1.first().isVisible() : false;
    const text = count > 0 ? await h1.first().innerText() : "";
    console.log(`  [${cfg.name}] H1 count: ${count}, Visible: ${isVisible}, Text: "${text}"`);

    const outPath = path.join(outDir, cfg.name);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`  Saved: ${outPath}`);

    await context.close();
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
