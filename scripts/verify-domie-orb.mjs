import { chromium, firefox, webkit } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EVIDENCE_DIR = path.resolve(__dirname, '../docs/multipage/evidence/domie-orb');
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const BASE_URL = 'http://localhost:3000';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyBrowser(browserType, name) {
  console.log(`\n--- Testing ${name} ---`);
  const browser = await browserType.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Test / page
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  // Scroll to AI section
  await page.evaluate(() => {
    const aiSec = document.getElementById('ai-studio') || document.getElementById('extension');
    if (aiSec) aiSec.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1500);

  const homeVideos = await page.$$eval('#extension video', (videos) =>
    videos.map((v) => ({
      src: v.currentSrc,
      paused: v.paused,
      currentTime: v.currentTime,
      readyState: v.readyState,
    }))
  );
  console.log(`${name} on /:`, homeVideos.length, 'video element(s) found.');
  homeVideos.forEach((v, idx) => {
    console.log(`  [${idx}] src: ${v.src}, paused: ${v.paused}, currentTime: ${v.currentTime}, readyState: ${v.readyState}`);
  });

  // Test /ai page
  await page.goto(`${BASE_URL}/ai`, { waitUntil: 'networkidle' });
  await sleep(1500);
  const aiVideos = await page.$$eval('video', (videos) =>
    videos.map((v) => ({
      src: v.currentSrc,
      paused: v.paused,
      currentTime: v.currentTime,
      readyState: v.readyState,
    }))
  );
  console.log(`${name} on /ai:`, aiVideos.length, 'video element(s) found.');
  aiVideos.forEach((v, idx) => {
    console.log(`  [${idx}] src: ${v.src}, paused: ${v.paused}, currentTime: ${v.currentTime}, readyState: ${v.readyState}`);
  });

  await browser.close();
}

async function captureScreenshotsAndEvidence() {
  console.log('\n--- Capturing Screenshots and Evidence ---');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900 Homepage AI Intro and 4 Pinned Steps
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: {
        dir: EVIDENCE_DIR,
        size: { width: 1440, height: 900 },
      },
    });
    const page = await context.newPage();

    // Track network bytes for orb files
    let orbBytes = 0;
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/images/ai/domie/')) {
        try {
          const buffer = await response.body();
          orbBytes += buffer.length;
          console.log(`  Orb transfer: ${path.basename(url)} (${buffer.length} bytes)`);
        } catch (e) {}
      }
    });

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Scroll to AI section intro
    await page.evaluate(() => {
      const el = document.getElementById('ai-studio') || document.getElementById('extension');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '01-home-ai-intro-1440.png') });
    console.log('Saved 01-home-ai-intro-1440.png');

    // Edge / square inspection around the large orb on dark section
    // Zoom in on large orb
    const orbEl = await page.$('#extension video');
    if (orbEl) {
      const boundingBox = await orbEl.boundingBox();
      if (boundingBox) {
        // Capture zoomed bounding area with margin
        await page.screenshot({
          path: path.join(EVIDENCE_DIR, '00-dark-section-orb-zoom-200.png'),
          clip: {
            x: Math.max(0, boundingBox.x - 30),
            y: Math.max(0, boundingBox.y - 30),
            width: boundingBox.width + 60,
            height: boundingBox.height + 60,
          },
        });
        console.log('Saved 00-dark-section-orb-zoom-200.png');
      }
    }

    // Scroll down to pin section and trigger steps 1 to 4
    // Pinned row height is 300vh scrub
    const aiTop = await page.evaluate(() => {
      const el = document.getElementById('ai-studio') || document.getElementById('extension');
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });

    // Step 1: initial pin entry
    await page.evaluate((top) => window.scrollTo({ top: top + 700, behavior: 'instant' }), aiTop);
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '02-home-ai-step1-tutor-1440.png') });
    console.log('Saved 02-home-ai-step1-tutor-1440.png');

    // Step 2: Content generator
    await page.evaluate((top) => window.scrollTo({ top: top + 1500, behavior: 'instant' }), aiTop);
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '03-home-ai-step2-generator-1440.png') });
    console.log('Saved 03-home-ai-step2-generator-1440.png');

    // Step 3: Prescriptive analytics
    await page.evaluate((top) => window.scrollTo({ top: top + 2300, behavior: 'instant' }), aiTop);
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '04-home-ai-step3-analytics-1440.png') });
    console.log('Saved 04-home-ai-step3-analytics-1440.png');

    // Step 4: Command bar
    await page.evaluate((top) => window.scrollTo({ top: top + 3100, behavior: 'instant' }), aiTop);
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '05-home-ai-step4-command-bar-1440.png') });
    console.log('Saved 05-home-ai-step4-command-bar-1440.png');

    // Finish video recording by closing page
    await page.close();
    const video = page.video();
    if (video) {
      const videoPath = await video.path();
      const targetPath = path.join(EVIDENCE_DIR, 'home-ai-scroll-steps.webm');
      fs.copyFileSync(videoPath, targetPath);
      console.log('Saved screen recording:', targetPath);
    }
    await context.close();
    console.log(`Total homepage orb bytes: ${(orbBytes / 1024).toFixed(1)} KB`);
  }

  // 2. Mobile 390x844 Homepage AI Intro and 4 Steps
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const aiTop = await page.evaluate(() => {
      const el = document.getElementById('ai-studio') || document.getElementById('extension');
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });

    // Mobile Intro
    await page.evaluate((top) => window.scrollTo({ top: top, behavior: 'instant' }), aiTop);
    await sleep(600);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '06-home-ai-intro-390.png') });
    console.log('Saved 06-home-ai-intro-390.png');

    // Step 1
    await page.evaluate((top) => window.scrollTo({ top: top + 200, behavior: 'instant' }), aiTop);
    await sleep(600);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '07-home-ai-step1-390.png') });
    console.log('Saved 07-home-ai-step1-390.png');

    // Step 2
    await page.evaluate((top) => window.scrollTo({ top: top + 750, behavior: 'instant' }), aiTop);
    await sleep(600);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '08-home-ai-step2-390.png') });
    console.log('Saved 08-home-ai-step2-390.png');

    // Step 3
    await page.evaluate((top) => window.scrollTo({ top: top + 1300, behavior: 'instant' }), aiTop);
    await sleep(600);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '09-home-ai-step3-390.png') });
    console.log('Saved 09-home-ai-step3-390.png');

    // Step 4
    await page.evaluate((top) => window.scrollTo({ top: top + 1850, behavior: 'instant' }), aiTop);
    await sleep(600);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '10-home-ai-step4-390.png') });
    console.log('Saved 10-home-ai-step4-390.png');

    await context.close();
  }

  // 3. /ai page at 1440x900 and 390x844
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    let aiOrbBytes = 0;
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/images/ai/domie/')) {
        try {
          const buffer = await response.body();
          aiOrbBytes += buffer.length;
          console.log(`  /ai Orb transfer: ${path.basename(url)} (${buffer.length} bytes)`);
        } catch (e) {}
      }
    });

    await page.goto(`${BASE_URL}/ai`, { waitUntil: 'networkidle' });
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '11-ai-hero-1440.png') });
    console.log('Saved 11-ai-hero-1440.png');

    // Scroll to showcase step
    await page.evaluate(() => {
      const el = document.getElementById('domie-ai-tools');
      if (el) el.scrollIntoView();
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '12-ai-showcase-step1-1440.png') });
    console.log('Saved 12-ai-showcase-step1-1440.png');

    await context.close();
    console.log(`Total /ai page orb bytes: ${(aiOrbBytes / 1024).toFixed(1)} KB`);
  }

  // /ai page mobile 390x844
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/ai`, { waitUntil: 'networkidle' });
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, '13-ai-hero-390.png') });
    console.log('Saved 13-ai-hero-390.png');

    await context.close();
  }

  // 4. Reduced Motion Test on Homepage
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    await page.evaluate(() => {
      const el = document.getElementById('ai-studio') || document.getElementById('extension');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await sleep(800);

    // Verify only poster img is rendered and no video
    const videoCount = await page.$$eval('#extension video', (v) => v.length);
    const imgPosterCount = await page.$$eval('#extension img[src*="domie-orb"]', (imgs) => imgs.length);
    console.log(`Reduced motion test: ${videoCount} video(s), ${imgPosterCount} poster image(s)`);

    await page.screenshot({ path: path.join(EVIDENCE_DIR, '14-home-ai-reduced-motion-1440.png') });
    console.log('Saved 14-home-ai-reduced-motion-1440.png');

    await context.close();
  }

  await browser.close();
}

async function main() {
  try {
    await verifyBrowser(chromium, 'Chromium');
    await verifyBrowser(firefox, 'Firefox');
    await verifyBrowser(webkit, 'WebKit');
    await captureScreenshotsAndEvidence();
    console.log('\nAll verifications and evidence capture completed successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
    process.exit(1);
  }
}

main();

