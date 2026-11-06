import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "docs/phase2/2a");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  console.log("=== Capturing Navigation Screenshots for Prompt 2A ===");
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. 1440px Desktop
    console.log("--> 1440px Desktop...");
    const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page1440.goto(BASE_URL, { waitUntil: "networkidle" });
    await page1440.waitForTimeout(1000);

    // 1440 closed
    await page1440.screenshot({
      path: path.join(OUT_DIR, "nav-1440-closed.png"),
      clip: { x: 0, y: 0, width: 1440, height: 350 },
    });

    // 1440 open Platform dropdown
    await page1440.locator("button").filter({ hasText: /^platform$/i }).hover();
    await page1440.waitForTimeout(400);
    await page1440.screenshot({
      path: path.join(OUT_DIR, "nav-1440-open.png"),
      clip: { x: 0, y: 0, width: 1440, height: 480 },
    });
    await page1440.close();

    // 2. 1024px
    console.log("--> 1024px...");
    const page1024 = await browser.newPage({ viewport: { width: 1024, height: 800 } });
    await page1024.goto(BASE_URL, { waitUntil: "networkidle" });
    await page1024.waitForTimeout(1000);

    // 1024 closed
    await page1024.screenshot({
      path: path.join(OUT_DIR, "nav-1024-closed.png"),
      clip: { x: 0, y: 0, width: 1024, height: 350 },
    });

    // 1024 open Platform dropdown
    await page1024.locator("button").filter({ hasText: /^platform$/i }).hover();
    await page1024.waitForTimeout(400);
    await page1024.screenshot({
      path: path.join(OUT_DIR, "nav-1024-open.png"),
      clip: { x: 0, y: 0, width: 1024, height: 480 },
    });
    await page1024.close();

    // 3. 900px (Boundary for full nav)
    console.log("--> 900px boundary...");
    const page900 = await browser.newPage({ viewport: { width: 900, height: 800 } });
    await page900.goto(BASE_URL, { waitUntil: "networkidle" });
    await page900.waitForTimeout(1000);

    // 900 closed
    await page900.screenshot({
      path: path.join(OUT_DIR, "nav-900-closed.png"),
      clip: { x: 0, y: 0, width: 900, height: 350 },
    });

    // 900 open Solutions dropdown
    await page900.locator("button").filter({ hasText: /^solutions$/i }).hover();
    await page900.waitForTimeout(400);
    await page900.screenshot({
      path: path.join(OUT_DIR, "nav-900-open.png"),
      clip: { x: 0, y: 0, width: 900, height: 480 },
    });
    await page900.close();

    // 4. 390px Mobile
    console.log("--> 390px Mobile...");
    const page390 = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page390.goto(BASE_URL, { waitUntil: "networkidle" });
    await page390.waitForTimeout(1000);

    // 390 closed top bar
    await page390.screenshot({
      path: path.join(OUT_DIR, "nav-390-closed.png"),
      clip: { x: 0, y: 0, width: 390, height: 250 },
    });

    // 390 open mobile menu drawer
    await page390.locator("button[aria-label='Open navigation menu']").click();
    await page390.waitForTimeout(500);

    // Expand Platform accordion in mobile drawer
    const platformMobileBtn = page390.locator("button").filter({ hasText: /^platform$/i }).first();
    if (await platformMobileBtn.isVisible()) {
      await platformMobileBtn.click();
      await page390.waitForTimeout(400);
    }

    await page390.screenshot({
      path: path.join(OUT_DIR, "nav-390-mobile-menu.png"),
      fullPage: false,
    });
    await page390.close();

    console.log("All screenshots saved to docs/phase2/2a/");
  } finally {
    await browser.close();
  }
}

capture().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
