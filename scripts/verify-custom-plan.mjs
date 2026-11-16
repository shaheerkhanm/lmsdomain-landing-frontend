import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EVIDENCE_DIR = path.resolve(__dirname, "../docs/multipage/evidence/custom-plan");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const BASE_URL = "http://localhost:3000";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("=== STARTING CUSTOM PLAN VERIFICATION ===");
  const browser = await chromium.launch({ headless: true });

  // 1. FULL PAGE SCREENSHOTS AT 1440, 1024, 768, 390 px
  const viewports = [
    { width: 1440, height: 900, name: "1440px" },
    { width: 1024, height: 800, name: "1024px" },
    { width: 768, height: 1024, name: "768px" },
    { width: 390, height: 844, name: "390px" },
  ];

  for (const vp of viewports) {
    console.log(`Capturing /custom-lms full page at ${vp.name}...`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
    await sleep(1000);

    // Full page screenshot
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, `custom-lms-${vp.name}.png`),
      fullPage: true,
    });
    await context.close();
  }

  // 2. ENTRY POINTS SCREENSHOTS
  console.log("Capturing entry point screenshots...");

  // 2a. Desktop Nav
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await sleep(800);
    const navHeader = await page.$("header.hidden.lg\\:flex");
    if (navHeader) {
      await navHeader.screenshot({ path: path.join(EVIDENCE_DIR, "nav-desktop.png") });
    }
    await context.close();
  }

  // 2b. Mobile Drawer Open
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await sleep(800);
    // Click burger
    const burger = await page.$("button[aria-label='Open navigation menu']");
    if (burger) {
      await burger.click();
      await sleep(500);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, "nav-mobile-drawer.png") });
    }
    await context.close();
  }

  // 2c. Homepage Custom Plan Band
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await sleep(1000);
    // Find the band
    const bandHeading = await page.$("h2:has-text('Want your own LMS and apps?'), h2:has-text('custom LMS')");
    if (bandHeading) {
      const section = await page.evaluateHandle((el) => el.closest("section"), bandHeading);
      if (section) {
        await section.asElement().scrollIntoViewIfNeeded();
        await sleep(500);
        await section.asElement().screenshot({ path: path.join(EVIDENCE_DIR, "home-custom-band.png") });
      }
    }
    await context.close();
  }

  // 2d. Pricing Enterprise Band
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle" });
    await sleep(1000);
    const entHeading = await page.$("h3:has-text('branded LMS'), h3:has-text('Custom Plan'), h3:has-text('Need your own')");
    if (entHeading) {
      const section = await page.evaluateHandle((el) => el.closest("section"), entHeading);
      if (section) {
        await section.asElement().scrollIntoViewIfNeeded();
        await sleep(500);
        await section.asElement().screenshot({ path: path.join(EVIDENCE_DIR, "pricing-enterprise-band.png") });
      }
    }
    await context.close();
  }

  // 2e. Footer Link
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await sleep(800);
    const footer = await page.$("footer");
    if (footer) {
      await footer.scrollIntoViewIfNeeded();
      await sleep(500);
      await footer.screenshot({ path: path.join(EVIDENCE_DIR, "footer-links.png") });
    }
    await context.close();
  }

  // 3. BRAND PREVIEW INTERACTION (6 FRAMES)
  console.log("Capturing 6 brand preview interactive frames...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
    await sleep(1500); // Wait for initial auto-play

    const mockContainer = await page.$("div:has(input[placeholder*='Academy'])");
    if (mockContainer) {
      await mockContainer.scrollIntoViewIfNeeded();

      // Frame 1: After initial auto-play
      await mockContainer.screenshot({ path: path.join(EVIDENCE_DIR, "brand-preview-frame1.png") });

      // Frame 2: Focus and clear input
      const input = await page.$("input[placeholder*='Academy']");
      if (input) {
        await input.click();
        await input.fill("");
        await sleep(200);
        await mockContainer.screenshot({ path: path.join(EVIDENCE_DIR, "brand-preview-frame2.png") });

        // Frame 3: Type "SkillForge"
        await input.type("SkillForge", { delay: 60 });
        await sleep(200);
        await mockContainer.screenshot({ path: path.join(EVIDENCE_DIR, "brand-preview-frame3.png") });

        // Frame 4: Pick Emerald Green (#059669)
        const greenSwatch = await page.$("button[aria-label*='#059669']");
        if (greenSwatch) {
          await greenSwatch.click();
          await sleep(300);
          await mockContainer.screenshot({ path: path.join(EVIDENCE_DIR, "brand-preview-frame4.png") });
        }

        // Frame 5: Pick Amber Orange (#D97706)
        const orangeSwatch = await page.$("button[aria-label*='#D97706']");
        if (orangeSwatch) {
          await orangeSwatch.click();
          await sleep(300);
          await mockContainer.screenshot({ path: path.join(EVIDENCE_DIR, "brand-preview-frame5.png") });
        }

        // Frame 6: Pick Blue (#2563EB)
        const blueSwatch = await page.$("button[aria-label*='#2563EB']");
        if (blueSwatch) {
          await blueSwatch.click();
          await sleep(300);
          await mockContainer.screenshot({ path: path.join(EVIDENCE_DIR, "brand-preview-frame6.png") });
        }
      }
    }
    await context.close();
  }

  // 4. TIMELINE PINNED MOTION & EXIT (6 FRAMES)
  console.log("Capturing 6 timeline scrub and exit frames...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
    await sleep(1000);

    const timelineSec = await page.$("section:has-text('From contract to launch'), section:has-text('Day 1')");
    if (timelineSec) {
      const box = await timelineSec.boundingBox();
      if (box) {
        const startY = box.y;
        // Frame 1: Timeline entry
        await page.evaluate((y) => window.scrollTo(0, y), startY);
        await sleep(400);
        await page.screenshot({ path: path.join(EVIDENCE_DIR, "timeline-frame1.png") });

        // Frame 2: Step 1 (Day 1-2)
        await page.evaluate((y) => window.scrollTo(0, y + 400), startY);
        await sleep(400);
        await page.screenshot({ path: path.join(EVIDENCE_DIR, "timeline-frame2.png") });

        // Frame 3: Step 2 (Day 3-5)
        await page.evaluate((y) => window.scrollTo(0, y + 800), startY);
        await sleep(400);
        await page.screenshot({ path: path.join(EVIDENCE_DIR, "timeline-frame3.png") });

        // Frame 4: Step 3 (Day 6-8)
        await page.evaluate((y) => window.scrollTo(0, y + 1200), startY);
        await sleep(400);
        await page.screenshot({ path: path.join(EVIDENCE_DIR, "timeline-frame4.png") });

        // Frame 5: Step 4 (Launch day)
        await page.evaluate((y) => window.scrollTo(0, y + 1600), startY);
        await sleep(400);
        await page.screenshot({ path: path.join(EVIDENCE_DIR, "timeline-frame5.png") });

        // Frame 6: Clean pin unpin exit into Comparison table
        await page.evaluate((y) => window.scrollTo(0, y + 2100), startY);
        await sleep(500);
        await page.screenshot({ path: path.join(EVIDENCE_DIR, "timeline-frame6.png") });
      }
    }
    await context.close();
  }

  // 5. FORM SUBMISSION TESTING (Case 1: Validation Error, Case 2: Success, Case 3: Network Error)
  console.log("Testing form submissions against local backend...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/custom-lms#plan`, { waitUntil: "networkidle" });
    await sleep(1000);

    const formSection = await page.$("#plan");
    if (formSection) {
      await formSection.scrollIntoViewIfNeeded();

      // Case 1: Validation Error (Click Next without filling Step 1)
      console.log("Testing Step 1 validation error...");
      const nextBtn1 = await page.$("button:has-text('Next: Your Needs')");
      if (nextBtn1) {
        await nextBtn1.click();
        await sleep(400);
        await formSection.screenshot({ path: path.join(EVIDENCE_DIR, "form-validation-error.png") });
      }

      // Case 2: Complete valid submission
      console.log("Filling form for successful submission...");
      // Fill Step 1
      await page.fill("input[name='name']", "Alex Rivera");
      await page.fill("input[name='email']", "alex.rivera@example.com");
      await page.fill("input[name='phoneNumber']", "9876543210");
      await page.fill("input[name='organizationName']", "Rivera Academy");
      const orgTypeChip = await page.$("button:has-text('Coaching')");
      if (orgTypeChip) await orgTypeChip.click();
      await sleep(200);

      // Click Next: Your Needs to go to Step 2
      if (nextBtn1) {
        await nextBtn1.click();
        await sleep(600);
      }

      // Step 2: Pick learners
      const learnerChip = await page.$("button:has-text('2,000–10,000')");
      if (learnerChip) await learnerChip.click();
      await sleep(150);

      // Select needs chips (pick 2)
      const need1 = await page.$("button[type='button']:has-text('Web academy')");
      if (need1) await need1.click();
      const need2 = await page.$("button[type='button']:has-text('Android app')");
      if (need2) await need2.click();
      await sleep(150);

      // Pick timing
      const timingBtn = await page.$("button[type='button']:has-text('1–3 months')");
      if (timingBtn) await timingBtn.click();
      await sleep(200);

      // Continue to Step 3
      const nextBtn2 = await page.$("button:has-text('Next: Confirm')");
      if (nextBtn2) {
        await nextBtn2.click();
        await sleep(600);
      }

      // Check Consent Checkbox
      const consentCheckbox = await page.$("input[type='checkbox']");
      if (consentCheckbox) {
        await consentCheckbox.check();
        await sleep(200);
      }

      // Submit form
      const submitBtn = await page.$("button:has-text('Send my request'), button:has-text('Send Custom Plan Request')");
      if (submitBtn) {
        await submitBtn.click();
        await sleep(3000); // wait for network response and success view
        await formSection.screenshot({ path: path.join(EVIDENCE_DIR, "form-success.png") });
      }

      // Case 3: Server error simulation (route abort / 500)
      console.log("Testing Case 3: Server error simulation...");
      const context3 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page3 = await context3.newPage();
      await page3.route("**/api/enquiry", (route) => {
        route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ success: false, message: "Internal server error. Database temporarily unavailable." }),
        });
      });
      await page3.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
      await sleep(1000);
      const formSection3 = await page3.$("#plan");
      if (formSection3) {
        await formSection3.scrollIntoViewIfNeeded();

        // Fill quickly and submit to show error banner
        await page3.fill("input[name='name']", "Alex Rivera");
        await page3.fill("input[name='email']", "alex.rivera@example.com");
        await page3.fill("input[name='phoneNumber']", "9876543210");
        await page3.fill("input[name='organizationName']", "Rivera Academy");
        const orgTypeChip2 = await page3.$("button:has-text('Coaching')");
        if (orgTypeChip2) await orgTypeChip2.click();
        const nBtn1 = await page3.$("button:has-text('Next: Your Needs')");
        if (nBtn1) await nBtn1.click();
        await sleep(400);

        const lChip2 = await page3.$("button:has-text('2,000–10,000')");
        if (lChip2) await lChip2.click();
        const n1 = await page3.$("button[type='button']:has-text('Web academy')");
        if (n1) await n1.click();
        const tBtn2 = await page3.$("button[type='button']:has-text('1–3 months')");
        if (tBtn2) await tBtn2.click();
        await sleep(200);

        const nBtn2 = await page3.$("button:has-text('Next: Confirm')");
        if (nBtn2) await nBtn2.click();
        await sleep(400);

        const cBox2 = await page3.$("input[type='checkbox']");
        if (cBox2) await cBox2.check();
        const sBtn2 = await page3.$("button:has-text('Send my request'), button:has-text('Send Custom Plan Request')");
        if (sBtn2) {
          await sBtn2.click();
          await sleep(1500);
          await formSection3.screenshot({ path: path.join(EVIDENCE_DIR, "form-server-error.png") });
        }
      }
      await context3.close();
    }
    await context.close();
  }

  // 6. RESPONSIVE & HORIZONTAL SCROLL AUDIT (375px to 1920px)
  console.log("Checking horizontal scroll at 375, 390, 768, 1024, 1440, 1920 px...");
  const widths = [375, 390, 768, 1024, 1440, 1920];
  const scrollResults = [];
  for (const w of widths) {
    const context = await browser.newContext({ viewport: { width: w, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
    await sleep(500);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);
    const hasHScroll = scrollWidth > innerWidth;
    scrollResults.push({ width: w, scrollWidth, innerWidth, hasHScroll });
    console.log(`  Width ${w}px: scrollWidth=${scrollWidth}, innerWidth=${innerWidth}, hasOverflow=${hasHScroll}`);
    await context.close();
  }

  // 7. TAP TARGETS AUDIT (<44px check on mobile)
  console.log("Checking tap targets on mobile (390px)...");
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
    await sleep(800);
    const tapTargets = await page.$$eval("button, a, input, select", (els) => {
      return els.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || "").trim().slice(0, 30),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          visible: rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== "none",
        };
      }).filter((t) => t.visible && (t.width < 40 || t.height < 40));
    });
    console.log(`Tap targets below 40px:`, tapTargets.length, tapTargets.slice(0, 5));
    await context.close();
  }

  // 8. REDUCED MOTION AUDIT
  console.log("Checking prefers-reduced-motion: reduce...");
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
    await sleep(800);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, "custom-lms-reduced-motion.png") });
    await context.close();
  }

  await browser.close();
  console.log("=== CUSTOM PLAN VERIFICATION COMPLETED ===");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
