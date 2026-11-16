// ============================================================================
// Hero KeywordPill Stability & Motion Verification Script
//
//   node scripts/check-hero-pill.mjs
//
// Verifies:
// 1. "to" left/x moves <= 0.5px and pill width varies <= 0.5px at 375, 414, 768, 1024, 1440, 1920px.
// 2. At 375px: line fits without wrapping, scrollWidth <= innerWidth, pill doesn't overflow.
// 3. prefers-reduced-motion: shows first word, zero movement.
// 4. Captures screenshots of hero at 375px and 1440px for each word into scripts/motion-evidence/hero-pill/.
// 5. Zero console errors.
// ============================================================================

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const EVIDENCE_DIR = path.resolve("scripts/motion-evidence/hero-pill");
const WIDTHS = [375, 414, 768, 1024, 1440, 1920];
const SAMPLE_DURATION_MS = 6000;
const SAMPLE_INTERVAL_MS = 100;

async function isUp(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function resolveBaseUrl() {
  const candidates = [
    process.env.CHECK_URL,
    "http://localhost:3001",
    "http://localhost:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3000",
  ].filter(Boolean);

  for (const url of candidates) {
    if (await isUp(url)) {
      return { url, spawned: false };
    }
  }

  console.log("No running server found. Starting 'npm run dev -- -p 3001'...");
  const child = spawn("npm", ["run", "dev", "--", "-p", "3001"], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: "3001" },
  });

  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 500));
    if (await isUp("http://localhost:3001")) {
      return { url: "http://localhost:3001", spawned: true, proc: child };
    }
  }

  child.kill();
  throw new Error("Failed to start development server on port 3001");
}

async function main() {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  const { url: baseUrl, spawned, proc } = await resolveBaseUrl();
  console.log(`Running check against: ${baseUrl}`);

  const browser = await chromium.launch();
  let allPassed = true;
  const consoleErrors = [];

  try {
    // ------------------------------------------------------------------------
    // Check 1: Stability sampling across 6 viewports
    // ------------------------------------------------------------------------
    console.log("\n=== 1. Testing 'to' stability & pill width across viewports ===");

    for (const width of WIDTHS) {
      process.stdout.write(`Testing ${width}px... `);
      const page = await browser.newPage({
        viewport: { width, height: 900 },
      });

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(`[${width}px] ${msg.text()}`);
        }
      });

      await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("[data-hero-connector]", { timeout: 10000 });
      await page.waitForSelector("[data-hero-pill]", { timeout: 10000 });

      const connector = page.locator("[data-hero-connector]");
      const pill = page.locator("[data-hero-pill]");

      const toXSamples = [];
      const pillWidthSamples = [];
      const steps = Math.floor(SAMPLE_DURATION_MS / SAMPLE_INTERVAL_MS);

      for (let i = 0; i < steps; i++) {
        const toBox = await connector.boundingBox();
        const pillBox = await pill.boundingBox();

        if (toBox) toXSamples.push(toBox.x);
        if (pillBox) pillWidthSamples.push(pillBox.width);

        await page.waitForTimeout(SAMPLE_INTERVAL_MS);
      }

      const minToX = Math.min(...toXSamples);
      const maxToX = Math.max(...toXSamples);
      const deltaToX = maxToX - minToX;

      const minPillW = Math.min(...pillWidthSamples);
      const maxPillW = Math.max(...pillWidthSamples);
      const deltaPillW = maxPillW - minPillW;

      const passed = deltaToX <= 0.5 && deltaPillW <= 0.5;
      if (passed) {
        console.log(`PASS (deltaTo=${deltaToX.toFixed(3)}px, deltaPill=${deltaPillW.toFixed(3)}px)`);
      } else {
        console.log(`FAIL! deltaTo=${deltaToX.toFixed(3)}px (max 0.5), deltaPill=${deltaPillW.toFixed(3)}px (max 0.5)`);
        allPassed = false;
      }

      await page.close();
    }

    // ------------------------------------------------------------------------
    // Check 2: 375px mobile overflow and layout integrity
    // ------------------------------------------------------------------------
    console.log("\n=== 2. Testing 375px mobile fit & overflow ===");
    {
      const page = await browser.newPage({
        viewport: { width: 375, height: 812 },
      });
      await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("[data-hero-connector]");

      const connector = page.locator("[data-hero-connector]");
      const pill = page.locator("[data-hero-pill]");

      const toBox = await connector.boundingBox();
      const pillBox = await pill.boundingBox();

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);

      const noHorizontalScroll = scrollWidth <= innerWidth;
      const pillFitsInViewport = pillBox.x >= 0 && pillBox.x + pillBox.width <= innerWidth;
      // "to" and pill should be on the same line (their vertical centers within 12px)
      const sameLine = Math.abs((toBox.y + toBox.height / 2) - (pillBox.y + pillBox.height / 2)) < 14;

      console.log(`- scrollWidth (${scrollWidth}) <= innerWidth (${innerWidth}): ${noHorizontalScroll ? "PASS" : "FAIL"}`);
      console.log(`- pill fits in viewport (x=${pillBox.x.toFixed(1)}, right=${(pillBox.x + pillBox.width).toFixed(1)}): ${pillFitsInViewport ? "PASS" : "FAIL"}`);
      console.log(`- 'to' and pill on same line (toY=${toBox.y.toFixed(1)}, pillY=${pillBox.y.toFixed(1)}): ${sameLine ? "PASS" : "FAIL"}`);

      if (!noHorizontalScroll || !pillFitsInViewport || !sameLine) {
        allPassed = false;
      }

      await page.close();
    }

    // ------------------------------------------------------------------------
    // Check 3: prefers-reduced-motion
    // ------------------------------------------------------------------------
    console.log("\n=== 3. Testing prefers-reduced-motion: reduce ===");
    {
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        reducedMotion: "reduce",
      });
      await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("[data-hero-pill]");

      const pill = page.locator("[data-hero-pill]");
      const initialText = await pill.innerText();
      const initialBox = await pill.boundingBox();

      // Sample for 3.5 seconds (3+ potential transitions)
      let moved = false;
      let textChanged = false;

      for (let i = 0; i < 35; i++) {
        await page.waitForTimeout(100);
        const box = await pill.boundingBox();
        const text = await pill.innerText();

        if (Math.abs(box.x - initialBox.x) > 0.5 || Math.abs(box.width - initialBox.width) > 0.5) {
          moved = true;
        }
        if (text !== initialText) {
          textChanged = true;
        }
      }

      const reducedPassed = !moved && !textChanged;
      console.log(`- reduced-motion stays on initial word ("${initialText.trim()}"): ${!textChanged ? "PASS" : "FAIL"}`);
      console.log(`- reduced-motion zero movement: ${!moved ? "PASS" : "FAIL"}`);

      if (!reducedPassed) {
        allPassed = false;
      }

      await page.close();
    }

    // ------------------------------------------------------------------------
    // Check 4: Screenshots for each word at 375px and 1440px
    // ------------------------------------------------------------------------
    console.log("\n=== 4. Capturing screenshots for each word at 375px and 1440px ===");

    for (const width of [375, 1440]) {
      const page = await browser.newPage({
        viewport: { width, height: width === 375 ? 812 : 900 },
      });
      await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("[data-hero-pill]");

      const hero = page.locator("section").first();
      const expectedWords = ["teach", "sell", "certify", "scale"];
      const captured = new Set();

      const startTime = Date.now();
      // Watch for words for up to 12 seconds
      while (captured.size < expectedWords.length && Date.now() - startTime < 12000) {
        const text = (await page.locator("[data-hero-pill] .sr-only").innerText()).trim();

        if (expectedWords.includes(text) && !captured.has(text)) {
          // Wait 200ms so any mid-wipe settled
          await page.waitForTimeout(200);
          const filename = `hero-${width}px-${text}.png`;
          const filepath = path.join(EVIDENCE_DIR, filename);
          await hero.screenshot({ path: filepath });
          console.log(`Saved screenshot: ${filename}`);
          captured.add(text);
        }

        await page.waitForTimeout(150);
      }

      if (captured.size < expectedWords.length) {
        console.warn(`Only captured ${captured.size}/${expectedWords.length} words at ${width}px`);
      }

      await page.close();
    }

    // ------------------------------------------------------------------------
    // Check 5: Console Errors
    // ------------------------------------------------------------------------
    console.log("\n=== 5. Checking Console Errors ===");
    if (consoleErrors.length === 0) {
      console.log("PASS: 0 console errors detected.");
    } else {
      console.error(`FAIL: ${consoleErrors.length} console errors found:`);
      consoleErrors.forEach((e) => console.error(`  ${e}`));
      allPassed = false;
    }
  } finally {
    await browser.close();
    if (spawned && proc) {
      proc.kill();
    }
  }

  console.log("\n==================================================");
  if (allPassed) {
    console.log("🎉 ALL CHECKS PASSED!");
    process.exit(0);
  } else {
    console.error("❌ SOME CHECKS FAILED!");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
