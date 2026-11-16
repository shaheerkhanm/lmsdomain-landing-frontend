import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OVERRIDE_DIR = path.resolve(__dirname, "../docs/multipage/evidence/brand/override");
fs.mkdirSync(OVERRIDE_DIR, { recursive: true });

const BASE_URL = "http://localhost:3000";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setMongoLogoLight(val) {
  console.log(`Setting MongoDB site-identity.data.logoLight = "${val}"...`);
  const escaped = val.replace(/"/g, '\\"');
  execSync(`docker exec bf6a6087248b mongosh lmsdomain --quiet --eval 'db.cms.updateOne({ slug: "site-identity" }, { $set: { "data.logoLight": "${escaped}" } });'`);
}

function revalidateTag(tag) {
  console.log(`Revalidating tag "${tag}"...`);
  try {
    execSync(`curl -s -X POST ${BASE_URL}/api/revalidate -H "Content-Type: application/json" -d '{"secret":"test-secret", "tag":"${tag}"}'`);
  } catch (e) {
    console.warn("Revalidate curl failed:", e.message);
  }
}

async function captureState(browser, label) {
  console.log(`Capturing ${label} state...`);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Home Header & Footer
  // Navigate with cache-busting to bypass browser-level cache
  await page.goto(`${BASE_URL}/?_t=${Date.now()}`, { waitUntil: "networkidle" });
  await sleep(600);

  // Header pill clip
  await page.screenshot({
    path: path.join(OVERRIDE_DIR, `header-${label}.png`),
    clip: { x: 0, y: 0, width: 1440, height: 100 },
  });

  // Footer
  const footer = await page.$("footer");
  if (footer) {
    await footer.scrollIntoViewIfNeeded();
    await sleep(300);
    await footer.screenshot({ path: path.join(OVERRIDE_DIR, `footer-${label}.png`) });
  }

  // 2. /og/home
  await page.goto(`${BASE_URL}/og/home?_t=${Date.now()}`, { waitUntil: "networkidle" });
  await sleep(400);
  await page.screenshot({ path: path.join(OVERRIDE_DIR, `og-home-${label}.png`) });

  await context.close();
}

async function run() {
  console.log("============================================================");
  console.log("TESTING ADMIN OVERRIDE & 'USE DEFAULT' FLOW");
  console.log("============================================================\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // 1. SET TEST LOGO IN MONGO
  setMongoLogoLight("/uploads/test-brand.png");
  revalidateTag("site-identity");
  revalidateTag("cms");
  revalidateTag("settings");
  await sleep(1000);

  // Capture Override State
  await captureState(browser, "override");

  // 2. PRESS 'USE DEFAULT' (RESET TO EMPTY STRING)
  console.log("\nSimulating 'Use default' button in Admin...");
  setMongoLogoLight("");
  revalidateTag("site-identity");
  revalidateTag("cms");
  revalidateTag("settings");
  await sleep(1000);

  // Capture Default Restored State
  await captureState(browser, "default");

  await browser.close();
  console.log("\n============================================================");
  console.log("OVERRIDE & DEFAULT TEST COMPLETED SUCCESSFULLY");
  console.log("============================================================\n");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

