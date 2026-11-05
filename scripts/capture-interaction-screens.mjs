import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EVIDENCE_DIR = path.resolve(__dirname, "../docs/multipage/evidence/features-v3");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const BASE_URL = "http://localhost:3000";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("============================================================");
  console.log("CAPTURING FEATURES V3 DETAILED INTERACTION MOMENTS");
  console.log("============================================================\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
  await sleep(1000);

  // 1. AI Chapter 4 steps
  console.log("  - AI Chapter 4 steps...");
  const aiSection = await page.$("#category-ai-powered-tools");
  if (aiSection) {
    await aiSection.scrollIntoViewIfNeeded();
    await sleep(400);
    const stepButtons = await page.$$("#category-ai-powered-tools .grid.grid-cols-1.lg\\:grid-cols-12 button");
    for (let i = 0; i < Math.min(stepButtons.length, 4); i++) {
      await stepButtons[i].click();
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, `ai-chapter-step-${i + 1}.png`) });
    }
  }

  // 2. Branding Playground with color switching
  console.log("  - Branding Playground color 2...");
  const playground = await page.$("#branding-playground");
  if (playground) {
    await playground.scrollIntoViewIfNeeded();
    await sleep(400);
    const swatches = await page.$$('#branding-playground button[role="radio"]');
    if (swatches.length >= 3) {
      await swatches[2].click(); // click Warm Amber or Mint Green
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "playground-color-2.png") });
    }
  }

  // 3. Command Palette ⌘K open with search typed
  console.log("  - Command Palette ⌘K modal...");
  const openCmdBtn = await page.$("#open-command-palette");
  if (openCmdBtn) {
    await openCmdBtn.click();
    await sleep(500);
    const searchInput = await page.$('input[placeholder*="Search by feature name"]');
    if (searchInput) {
      await searchInput.fill("video");
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "command-palette-open.png") });
      await page.keyboard.press("Escape");
      await sleep(200);
    }
  }

  await context.close();
  await browser.close();

  console.log("\n✓ Captured missing interaction screenshots successfully.");
}

run().catch((err) => {
  console.error("Interaction capture failed:", err);
  process.exit(1);
});
