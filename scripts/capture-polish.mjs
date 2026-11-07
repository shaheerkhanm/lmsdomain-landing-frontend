import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.resolve("docs/phase2/polish");
const WIDTHS = [375, 768, 1440];
const PAGES = [
  { name: "home-hero", url: "/" },
  { name: "platform-security", url: "/platform/security" },
  { name: "platform-sell", url: "/platform/sell" },
  { name: "platform-teach", url: "/platform/teach" },
  { name: "platform-assess", url: "/platform/assess" },
  { name: "solution-testprep", url: "/solutions/language-test-prep-academies" },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  console.log("Starting viewport & overflow checks on", BASE_URL);

  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    for (const p of PAGES) {
      const fullUrl = `${BASE_URL}${p.url}`;
      await page.goto(fullUrl, { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      // Check overflow across entire page
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      });

      console.log(`[${width}px] ${p.name}: scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}, overflow=${overflow.hasOverflow}`);

      const filename = `${p.name}-${width}px.png`;
      const filepath = path.join(OUT_DIR, filename);

      await page.screenshot({ path: filepath, fullPage: false });
      console.log(`Saved screenshot: ${filename}`);
    }

    await context.close();
  }

  await browser.close();
  console.log("Done checking all viewports!");
}

main().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
