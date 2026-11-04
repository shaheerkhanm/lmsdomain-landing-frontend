import { chromium, firefox, webkit } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EVIDENCE_DIR = path.resolve(__dirname, "../docs/multipage/evidence/domie-orb/v2");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const BASE_URL = "http://localhost:3000";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyBrowsers() {
  const browsers = [
    { type: chromium, name: "Chromium" },
    { type: firefox, name: "Firefox" },
    { type: webkit, name: "WebKit (Safari)" },
  ];

  console.log("\n=== CROSS-BROWSER ANIMATED WEBP CHECK ===");
  for (const b of browsers) {
    try {
      console.log(`Testing ${b.name}...`);
      const browser = await b.type.launch({ headless: true });
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();

      // Check /ai hero bot
      await page.goto(`${BASE_URL}/ai`, { waitUntil: "networkidle" });
      await sleep(1000);
      const imgInfo = await page.$eval("img[src*='domie-bot']", (img) => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
      console.log(`  [${b.name}] /ai hero bot:`, imgInfo);

      // Check / homepage bot
      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
      await page.evaluate(() => {
        const el = document.getElementById("ai-studio") || document.getElementById("extension");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await sleep(1000);
      const homeImgInfo = await page.$eval("#extension img[src*='domie-bot']", (img) => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
      console.log(`  [${b.name}] / home bot:`, homeImgInfo);

      await browser.close();
    } catch (e) {
      console.error(`Error testing ${b.name}:`, e.message);
    }
  }
}

async function captureScreenshots() {
  console.log("\n=== CAPTURING EVIDENCE SCREENSHOTS ===");
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440px
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    // Homepage AI Intro
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const el = document.getElementById("ai-studio") || document.getElementById("extension");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "instant" });
      }
    });
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-ai-intro-1440.png") });
    console.log("Saved home-ai-intro-1440.png");

    // Zoom crop: 200% around large bot on dark section
    const largeBotEl = await page.$("#extension img[src*='domie-bot.webp']");
    if (largeBotEl) {
      const box = await largeBotEl.boundingBox();
      if (box) {
        await page.screenshot({
          path: path.join(EVIDENCE_DIR, "zoom-home-large-bot-200.png"),
          clip: {
            x: Math.max(0, box.x - 40),
            y: Math.max(0, box.y - 40),
            width: box.width + 80,
            height: box.height + 80,
          },
        });
        console.log("Saved zoom-home-large-bot-200.png");
      }
    }

    // Scroll down into pinned step 1 (Tutor)
    await page.evaluate(() => {
      const el = document.getElementById("ai-studio") || document.getElementById("extension");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + 1000;
        window.scrollTo({ top, behavior: "instant" });
      }
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-ai-pinned-step-1440.png") });
    console.log("Saved home-ai-pinned-step-1440.png");

    // Zoom crop: Avatar in dark card (homepage tutor response on desktop)
    const darkAvatarLoc = page.locator("#extension .lg\\:grid img[src*='domie-bot-sm']").first();
    const darkAvatarVisible = await darkAvatarLoc.waitFor({ state: "visible", timeout: 4000 }).then(() => true).catch(() => false);
    if (darkAvatarVisible) {
      const box = await darkAvatarLoc.boundingBox();
      if (box) {
        await page.screenshot({
          path: path.join(EVIDENCE_DIR, "zoom-avatar-dark-card-200.png"),
          clip: {
            x: Math.max(0, box.x - 30),
            y: Math.max(0, box.y - 30),
            width: box.width + 60,
            height: box.height + 60,
          },
        });
        console.log("Saved zoom-avatar-dark-card-200.png");
      }
    }

    // /ai Page Hero 1440px
    await page.goto(`${BASE_URL}/ai`, { waitUntil: "networkidle" });
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "ai-hero-1440.png") });
    console.log("Saved ai-hero-1440.png");

    // Zoom crop: 200% around /ai hero bot on white
    const aiHeroBot = await page.$("img[src*='domie-bot.webp']");
    if (aiHeroBot) {
      const box = await aiHeroBot.boundingBox();
      if (box) {
        await page.screenshot({
          path: path.join(EVIDENCE_DIR, "zoom-ai-hero-bot-200.png"),
          clip: {
            x: Math.max(0, box.x - 40),
            y: Math.max(0, box.y - 40),
            width: box.width + 80,
            height: box.height + 80,
          },
        });
        console.log("Saved zoom-ai-hero-bot-200.png");
      }
    }

    // Zoom crop: Avatar in white card (/ai command bar / showcase card)
    const whiteAvatarEl = await page.$("img[src*='domie-bot-sm.webp']");
    if (whiteAvatarEl) {
      const box = await whiteAvatarEl.boundingBox();
      if (box) {
        await page.screenshot({
          path: path.join(EVIDENCE_DIR, "zoom-avatar-white-card-200.png"),
          clip: {
            x: Math.max(0, box.x - 30),
            y: Math.max(0, box.y - 30),
            width: box.width + 60,
            height: box.height + 60,
          },
        });
        console.log("Saved zoom-avatar-white-card-200.png");
      }
    }

    await context.close();
  }

  // 2. Mobile 390px
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();

    // Homepage AI Intro 390px
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const el = document.getElementById("ai-studio") || document.getElementById("extension");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "instant" });
      }
    });
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-ai-intro-390.png") });
    console.log("Saved home-ai-intro-390.png");

    // Homepage AI Step 1 390px
    await page.evaluate(() => {
      const el = document.getElementById("ai-studio") || document.getElementById("extension");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + 500;
        window.scrollTo({ top, behavior: "instant" });
      }
    });
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-ai-pinned-step-390.png") });
    console.log("Saved home-ai-pinned-step-390.png");

    // /ai Hero 390px
    await page.goto(`${BASE_URL}/ai`, { waitUntil: "networkidle" });
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "ai-hero-390.png") });
    console.log("Saved ai-hero-390.png");

    await context.close();
  }

  // 3. Reduced Motion Check
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/ai`, { waitUntil: "networkidle" });
    await sleep(600);
    const stillSrc = await page.$eval("picture img", (img) => img.currentSrc).catch(() => null);
    console.log("Reduced motion currentSrc in /ai hero:", stillSrc);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "ai-hero-reduced-motion.png") });
    await context.close();
  }

  await browser.close();
}

async function runLighthouse() {
  console.log("\n=== RUNNING LIGHTHOUSE AUDITS ===");
  try {
    console.log("Auditing / (Mobile)...");
    execSync(
      `npx lighthouse ${BASE_URL}/ --form-factor=mobile --screenEmulation.mobile --throttling-method=provided --output=json --output-path=${path.join(
        EVIDENCE_DIR,
        "lighthouse-home.json"
      )} --chrome-flags="--headless --no-sandbox" --quiet`,
      { stdio: "inherit" }
    );

    console.log("Auditing /ai (Mobile)...");
    execSync(
      `npx lighthouse ${BASE_URL}/ai --form-factor=mobile --screenEmulation.mobile --throttling-method=provided --output=json --output-path=${path.join(
        EVIDENCE_DIR,
        "lighthouse-ai.json"
      )} --chrome-flags="--headless --no-sandbox" --quiet`,
      { stdio: "inherit" }
    );

    const homeData = JSON.parse(fs.readFileSync(path.join(EVIDENCE_DIR, "lighthouse-home.json"), "utf8"));
    const aiData = JSON.parse(fs.readFileSync(path.join(EVIDENCE_DIR, "lighthouse-ai.json"), "utf8"));

    const homeScore = Math.round(homeData.categories.performance.score * 100);
    const aiScore = Math.round(aiData.categories.performance.score * 100);

    console.log("\n=== LIGHTHOUSE RESULTS ===");
    console.log(`Home (/) Mobile Performance: ${homeScore} (Prompt 36 baseline: 82)`);
    console.log(`/ai Mobile Performance:       ${aiScore} (Prompt 36 baseline: 79)`);

    const summary = {
      timestamp: new Date().toISOString(),
      homeScore,
      aiScore,
      prompt36Baseline: { home: 82, ai: 79 },
    };
    fs.writeFileSync(path.join(EVIDENCE_DIR, "lighthouse-summary.json"), JSON.stringify(summary, null, 2));
  } catch (err) {
    console.warn("Lighthouse execution error:", err.message);
  }
}

async function main() {
  await verifyBrowsers();
  await captureScreenshots();
  await runLighthouse();
  console.log("\n=== ALL CHECKS COMPLETED ===");
}

main().catch((e) => {
  console.error("Verification failed:", e);
  process.exit(1);
});
