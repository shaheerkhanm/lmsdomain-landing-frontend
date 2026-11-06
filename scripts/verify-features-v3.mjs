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
  console.log("STARTING FEATURES V3 PLAYWRIGHT EVIDENCE & VALIDATION");
  console.log("============================================================\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // Track console errors
  const consoleErrors = [];

  // ========================================================
  // 1. OVERFLOW & CONSOLE ERROR CHECKS ACROSS VIEWPORTS
  // ========================================================
  console.log("1. Checking viewport widths for horizontal overflow & errors...");
  const widths = [375, 414, 768, 1024, 1280, 1440, 1920];
  const overflowResults = [];

  for (const w of widths) {
    const context = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await context.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(`[${w}px] ${msg.text()}`);
      }
    });

    await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
    await sleep(600);

    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));

    const hasOverflow = scrollWidth > innerWidth;
    overflowResults.push({
      width: w,
      scrollWidth,
      innerWidth,
      overflow: hasOverflow ? "FAIL" : "PASS",
    });

    await context.close();
  }

  console.table(overflowResults);
  if (consoleErrors.length > 0) {
    console.warn("Console Errors Encountered:", consoleErrors);
  } else {
    console.log("✓ No console errors or hydration warnings observed across viewports.");
  }

  // ========================================================
  // 2. FULL PAGE SCREENSHOTS (NORMAL & REDUCED MOTION)
  // ========================================================
  console.log("\n2. Capturing full page screenshots...");
  const fullPageViewports = [
    { width: 1440, height: 900, name: "1440" },
    { width: 1024, height: 800, name: "1024" },
    { width: 768, height: 1024, name: "768" },
    { width: 390, height: 844, name: "390" },
  ];

  for (const vp of fullPageViewports) {
    console.log(`- Full page at ${vp.name}px...`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
    await sleep(800);
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, `fullpage-${vp.name}.png`),
      fullPage: true,
    });
    await context.close();
  }

  // Reduced motion
  console.log("- Full page reduced motion (1440 & 390)...");
  for (const vp of [
    { width: 1440, height: 900, name: "1440" },
    { width: 390, height: 844, name: "390" },
  ]) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
    await sleep(800);
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, `fullpage-${vp.name}-reduced.png`),
      fullPage: true,
    });
    await context.close();
  }

  // ========================================================
  // 3. DETAILED INTERACTION & MOTION SCREENSHOTS (1440px)
  // ========================================================
  console.log("\n3. Capturing interactive states and section moments at 1440px...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
    await sleep(1000);

    // 3a. Hero Assembly at 0%, 50%, 100%
    console.log("  - Hero at 0% scroll...");
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "hero-assembly-0.png") });

    console.log("  - Hero at 50% scroll...");
    await page.evaluate(() => window.scrollTo(0, 250));
    await sleep(400);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "hero-assembly-50.png") });

    console.log("  - Hero at 100% scroll...");
    await page.evaluate(() => window.scrollTo(0, 500));
    await sleep(400);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "hero-assembly-100.png") });

    // 3b. Bento with one tile hovered
    console.log("  - Bento grid with tile hovered...");
    const bentoSection = await page.$("#bento-overview");
    if (bentoSection) {
      await bentoSection.scrollIntoViewIfNeeded();
      await sleep(400);
      const firstTile = await page.$("#bento-overview button");
      if (firstTile) {
        await firstTile.hover();
        await sleep(300);
      }
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "bento-tile-hovered.png") });
    }

    // 3c. AI Chapter dark expand & 4 steps
    console.log("  - AI Chapter states...");
    const aiSection = await page.$("#ai-tools");
    if (aiSection) {
      // Dark expand transition
      await page.evaluate(() => {
        const el = document.getElementById("ai-tools");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "ai-chapter-dark-expand.png") });

      // Click each step pill to capture 4 steps
      const stepPills = await page.$$("#ai-tools button.group\\/step");
      for (let i = 0; i < Math.min(stepPills.length, 4); i++) {
        await stepPills[i].click();
        await sleep(500);
        await page.screenshot({ path: path.join(EVIDENCE_DIR, `ai-chapter-step-${i + 1}.png`) });
      }
    }

    // 3d. Horizontal Journey panels 1, 3, 6
    console.log("  - Journey panels...");
    const journeySection = await page.$("#journey");
    if (journeySection) {
      await journeySection.scrollIntoViewIfNeeded();
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "journey-panel-1.png") });

      // Scroll slightly through journey pinned pin-spacer
      await page.evaluate(() => window.scrollBy(0, 1000));
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "journey-panel-3.png") });

      await page.evaluate(() => window.scrollBy(0, 1400));
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "journey-panel-6.png") });
    }

    // 3e. Sticky chapter feature 1 & 3 active
    console.log("  - Sticky chapter feature transitions...");
    const courseLearning = await page.$("#course-learning");
    if (courseLearning) {
      await courseLearning.scrollIntoViewIfNeeded();
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "sticky-chapter-feature-1.png") });

      // Scroll down into the sticky chapter
      await page.evaluate(() => window.scrollBy(0, 600));
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "sticky-chapter-feature-3.png") });
    }

    // 3f. Branding Playground with color switching
    console.log("  - Branding Playground...");
    const playground = await page.$("#branding-playground");
    if (playground) {
      await playground.scrollIntoViewIfNeeded();
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "playground-color-1.png") });

      // Click the 3rd swatch (Coral or Sapphire)
      const swatches = await page.$$("#branding-playground button[title]");
      if (swatches.length >= 3) {
        await swatches[2].click();
        await sleep(400);
        await page.screenshot({ path: path.join(EVIDENCE_DIR, "playground-color-2.png") });
      }
    }

    // 3g. Command Palette ⌘K open with search typed
    console.log("  - Command Palette ⌘K modal...");
    await page.keyboard.press("Meta+k");
    await sleep(400);
    const searchInput = await page.$('input[placeholder*="Search all 38 features"]');
    if (searchInput) {
      await searchInput.fill("video");
      await sleep(400);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "command-palette-open.png") });
      await page.keyboard.press("Escape");
      await sleep(200);
    }

    await context.close();
  }

  // ========================================================
  // 4. SCREEN RECORDINGS (1440px & 390px SMOOTH WALKTHROUGHS)
  // ========================================================
  console.log("\n4. Recording full page walkthroughs...");
  const tempVideoDir = path.join(EVIDENCE_DIR, "temp_recordings");
  fs.mkdirSync(tempVideoDir, { recursive: true });

  // 4a. Desktop 1440 Walkthrough
  console.log("  - Recording Desktop (1440x900) Walkthrough...");
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: {
        dir: tempVideoDir,
        size: { width: 1440, height: 900 },
      },
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
    await sleep(1000);

    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = 900;
    const scrollStep = 320;
    const stepDelay = 60;

    // Scroll down slowly
    for (let y = 0; y <= totalHeight; y += scrollStep) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await sleep(stepDelay);
    }
    await sleep(600);

    // Scroll back up
    for (let y = totalHeight; y >= 0; y -= scrollStep * 1.5) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await sleep(stepDelay);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(800);

    await page.close();
    const video = await page.video();
    if (video) {
      const videoPath = await video.path();
      await context.close();
      const targetPath = path.join(EVIDENCE_DIR, "features-walkthrough-1440.webm");
      fs.copyFileSync(videoPath, targetPath);
      console.log(`  ✓ Saved: ${targetPath}`);
    } else {
      await context.close();
    }
  }

  // 4b. Mobile 390 Walkthrough
  console.log("  - Recording Mobile (390x844) Walkthrough...");
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      recordVideo: {
        dir: tempVideoDir,
        size: { width: 390, height: 844 },
      },
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
    await sleep(1000);

    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const scrollStep = 240;
    const stepDelay = 60;

    // Scroll down slowly
    for (let y = 0; y <= totalHeight; y += scrollStep) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await sleep(stepDelay);
    }
    await sleep(600);

    // Scroll back up
    for (let y = totalHeight; y >= 0; y -= scrollStep * 1.5) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await sleep(stepDelay);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(800);

    await page.close();
    const video = await page.video();
    if (video) {
      const videoPath = await video.path();
      await context.close();
      const targetPath = path.join(EVIDENCE_DIR, "features-walkthrough-390.webm");
      fs.copyFileSync(videoPath, targetPath);
      console.log(`  ✓ Saved: ${targetPath}`);
    } else {
      await context.close();
    }
  }

  // Clean temp recordings dir
  try {
    fs.rmSync(tempVideoDir, { recursive: true, force: true });
  } catch (e) {}

  await browser.close();
  console.log("\n============================================================");
  console.log("PLAYWRIGHT EVIDENCE & RECORDINGS CAPTURED SUCCESSFULLY");
  console.log("============================================================\n");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});

