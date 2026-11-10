import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.SITE_URL || "https://lmsdomain.com";
const OUT_DIR = path.join(process.cwd(), "docs/phase1/staging");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function main() {
  console.log("=== Starting Staging Phase 1 Verification ===");
  console.log(`Target: ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const results = {
    step1_homepage: {},
    step2_pricing: {},
    step3_custom_lms: {},
    step4_demo_form: {},
    step5_headers_robots: {},
    step6_forbidden_terms: {},
  };

  try {
    // ----------------------------------------------------
    // STEP 1: HOMEPAGE (1440px and 375px)
    // ----------------------------------------------------
    console.log("--> Testing 1. Homepage...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const desktopPage = await desktopContext.newPage();

    await desktopPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1000);

    // Check H1
    const h1Text = await desktopPage.locator("h1").first().textContent();
    console.log(`Homepage H1: "${h1Text?.trim()}"`);
    const expectedH1 = "Run your academy's batches, live classes and tests in one place.";
    const h1Matches = h1Text?.trim() === expectedH1;

    // Save desktop screenshot
    await desktopPage.screenshot({
      path: path.join(OUT_DIR, "home-1440.png"),
      fullPage: false,
    });

    // Check for prohibited homepage elements
    const pageHtml = await desktopPage.content();
    const hasMobileAppsSection = pageHtml.includes('id="mobile-apps"') || pageHtml.includes("Branded Mobile Apps");
    const hasCustomPlanBand = pageHtml.includes('id="custom-plan"') || pageHtml.includes("Need a custom plan?");
    const hasAnitaDev = pageHtml.includes("Anita Dev") || pageHtml.includes("Amal Devi");
    const hasClient4 = pageHtml.includes("Client4") || pageHtml.includes("client-4") || pageHtml.includes("client4");

    results.step1_homepage = {
      h1Text: h1Text?.trim(),
      h1Matches,
      hasMobileAppsSection,
      hasCustomPlanBand,
      hasAnitaDev,
      hasClient4,
    };
    console.log("Homepage checks:", results.step1_homepage);

    // Mobile homepage screenshot
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(BASE_URL, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({
      path: path.join(OUT_DIR, "home-375.png"),
      fullPage: false,
    });

    // ----------------------------------------------------
    // STEP 2: PRICING (1440px and 375px)
    // ----------------------------------------------------
    console.log("\n--> Testing 2. Pricing (/pricing)...");
    await desktopPage.goto(`${BASE_URL}/pricing?billing=monthly`, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1000);

    // Pricing monthly screenshot (desktop)
    await desktopPage.screenshot({
      path: path.join(OUT_DIR, "pricing-monthly-1440.png"),
      fullPage: false,
    });

    // Mobile monthly screenshot
    await mobilePage.goto(`${BASE_URL}/pricing?billing=monthly`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({
      path: path.join(OUT_DIR, "pricing-monthly-375.png"),
      fullPage: false,
    });

    // Plan cards and + GST check
    const gstCount = await desktopPage.locator('text="+ GST"').count();
    console.log(`Found ${gstCount} occurrences of "+ GST"`);

    const monthlyCardTexts = await desktopPage.evaluate(() => {
      return Array.from(document.querySelectorAll("h3")).map(h => {
        const card = h.closest("div[class*='rounded-']");
        return card ? card.innerText : null;
      }).filter(Boolean);
    });

    // Toggle to Yearly
    console.log("Toggling billing to Yearly...");
    await desktopPage.locator("button").filter({ hasText: /^yearly$/i }).click();
    await desktopPage.waitForTimeout(800);

    // Pricing yearly screenshot (desktop)
    await desktopPage.screenshot({
      path: path.join(OUT_DIR, "pricing-yearly-1440.png"),
      fullPage: false,
    });

    // Mobile yearly screenshot
    await mobilePage.locator("button").filter({ hasText: /^yearly$/i }).click();
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({
      path: path.join(OUT_DIR, "pricing-yearly-375.png"),
      fullPage: false,
    });

    const yearlyCardTexts = await desktopPage.evaluate(() => {
      return Array.from(document.querySelectorAll("h3")).map(h => {
        const card = h.closest("div[class*='rounded-']");
        return card ? card.innerText : null;
      }).filter(Boolean);
    });

    const pricesDiffer = JSON.stringify(monthlyCardTexts) !== JSON.stringify(yearlyCardTexts);
    const yearlySavingsVisible = await desktopPage.locator("text=Save").count() > 0;

    // Hero Subtitle Lorem check
    const pricingHeroSubtitle = await desktopPage.locator("section p").first().textContent();
    console.log(`Pricing Hero Subtitle: "${pricingHeroSubtitle?.trim()}"`);
    const pricingHeroHasLorem = pricingHeroSubtitle?.toLowerCase().includes("lorem") ?? false;

    // Test Choose Plan buttons
    console.log("Testing 'Choose Plan' CTA buttons...");
    const choosePlanButtons = desktopPage.locator("button").filter({ hasText: /^choose plan$/i });
    const ctaCount = await choosePlanButtons.count();
    console.log(`Found ${ctaCount} 'Choose Plan' buttons`);

    let modalOpenedWithPlan = false;
    let finalUrlWithPlan = "";
    if (ctaCount > 0) {
      await choosePlanButtons.first().click();
      await desktopPage.waitForTimeout(800);
      finalUrlWithPlan = desktopPage.url();
      const modalVisible = await desktopPage.locator("[role='dialog']").isVisible();
      modalOpenedWithPlan = modalVisible && finalUrlWithPlan.includes("plan=");
      console.log(`Modal opened: ${modalVisible}, URL: ${finalUrlWithPlan}`);

      await desktopPage.screenshot({
        path: path.join(OUT_DIR, "pricing-modal-1440.png"),
        fullPage: false,
      });

      // Close modal
      const closeBtn = desktopPage.locator("[role='dialog'] button").filter({ hasText: /close|cancel/i }).first();
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await desktopPage.waitForTimeout(500);
      }
    }

    // Test #faqSection anchor
    console.log("Testing #faqSection anchor...");
    await desktopPage.goto(`${BASE_URL}/pricing#faqSection`, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(800);
    const faqVisible = await desktopPage.locator("#faqSection").isVisible();
    await desktopPage.screenshot({
      path: path.join(OUT_DIR, "pricing-faq-1440.png"),
      fullPage: false,
    });

    results.step2_pricing = {
      monthlyCardCount: monthlyCardTexts.length,
      gstCount,
      pricesDiffer,
      yearlySavingsVisible,
      modalOpenedWithPlan,
      finalUrlWithPlan,
      faqVisible,
      pricingHeroSubtitle: pricingHeroSubtitle?.trim(),
      pricingHeroHasLorem,
    };
    console.log("Pricing checks:", results.step2_pricing);

    // ----------------------------------------------------
    // STEP 3: CUSTOM LMS (/custom-lms)
    // ----------------------------------------------------
    console.log("\n--> Testing 3. Custom LMS (/custom-lms)...");
    await desktopPage.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1000);

    await desktopPage.screenshot({
      path: path.join(OUT_DIR, "custom-lms-1440.png"),
      fullPage: false,
    });

    await mobilePage.goto(`${BASE_URL}/custom-lms`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({
      path: path.join(OUT_DIR, "custom-lms-375.png"),
      fullPage: false,
    });

    const customLmsContent = await desktopPage.evaluate(() => document.body.innerText);
    const customLmsForbiddenMatches = [];
    const customTerms = [
      "android", "ios", "iphone", "app store", "play store",
      "drm", "fairplay", "widevine", "whatsapp", "paypal", "ai quiz"
    ];
    for (const term of customTerms) {
      const regex = new RegExp(`\\b${term}\\b`, "i");
      if (regex.test(customLmsContent)) {
        customLmsForbiddenMatches.push(term);
      }
    }
    results.step3_custom_lms = {
      forbiddenFound: customLmsForbiddenMatches,
      clean: customLmsForbiddenMatches.length === 0,
    };
    console.log("Custom LMS checks:", results.step3_custom_lms);

    // ----------------------------------------------------
    // STEP 4: DEMO FORM (/#demo)
    // ----------------------------------------------------
    console.log("\n--> Testing 4. Demo Form (/#demo)...");
    await desktopPage.goto(`${BASE_URL}/#demo`, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1200);

    const formVisible = await desktopPage.locator("#field-organizationName").isVisible();
    console.log(`Demo form input #field-organizationName visible: ${formVisible}`);

    await desktopPage.screenshot({
      path: path.join(OUT_DIR, "demo-form-1440.png"),
      fullPage: false,
    });

    if (formVisible) {
      await desktopPage.fill("#field-name", "Tester");
      await desktopPage.fill("#field-email", "shaheer+stagingphase1@lmsdomain.com");
      await desktopPage.fill("#field-phoneNumber", "9876543210");
      await desktopPage.fill("#field-organizationName", "TEST - please ignore");
      await desktopPage.selectOption("#field-learners", "100–500");
      await desktopPage.fill("#field-message", "Phase 1 staging verification automated test run");

      console.log("Submitting demo enquiry form...");
      await desktopPage.click("button[type='submit']");

      const successLocator = desktopPage.locator("[role='status']");
      await successLocator.waitFor({ timeout: 15000 });
      console.log("Confirmation panel visible!");

      await desktopPage.screenshot({
        path: path.join(OUT_DIR, "demo-confirmation-1440.png"),
        fullPage: false,
      });

      // Mobile demo modal and confirmation
      await mobilePage.goto(`${BASE_URL}/#demo`, { waitUntil: "networkidle" });
      await mobilePage.waitForTimeout(1000);
      if (await mobilePage.locator("#field-organizationName").isVisible()) {
        await mobilePage.screenshot({
          path: path.join(OUT_DIR, "demo-form-375.png"),
          fullPage: false,
        });
        await mobilePage.fill("#field-name", "Tester Mobile");
        await mobilePage.fill("#field-email", "shaheer+stagingmobile@lmsdomain.com");
        await mobilePage.fill("#field-phoneNumber", "9876543210");
        await mobilePage.fill("#field-organizationName", "TEST - please ignore");
        await mobilePage.selectOption("#field-learners", "100–500");
        await mobilePage.click("button[type='submit']");
        await mobilePage.locator("[role='status']").waitFor({ timeout: 15000 });
        await mobilePage.screenshot({
          path: path.join(OUT_DIR, "demo-confirmation-375.png"),
          fullPage: false,
        });
      }

      results.step4_demo_form = {
        submitted: true,
        confirmationVisible: true,
      };
    } else {
      results.step4_demo_form = {
        submitted: false,
        error: "Demo form was not found on /#demo",
      };
    }
    console.log("Demo form checks:", results.step4_demo_form);

    // ----------------------------------------------------
    // STEP 5: ROBOTS & HEADERS
    // ----------------------------------------------------
    console.log("\n--> Testing 5. Headers & Robots.txt...");
    const robotsRes = await desktopPage.goto(`${BASE_URL}/robots.txt`);
    const robotsText = await robotsRes?.text();
    console.log("Robots.txt content:\n", robotsText?.trim());
    const robotsDisallowsAll = robotsText?.includes("Disallow: /");

    results.step5_headers_robots = {
      robotsDisallowsAll,
      robotsText: robotsText?.trim(),
    };

    // ----------------------------------------------------
    // STEP 6: FORBIDDEN TERMS SCAN
    // ----------------------------------------------------
    console.log("\n--> Testing 6. Prohibited terms scan across rendered pages...");
    const pagesToScan = [
      { name: "Homepage", url: `${BASE_URL}/` },
      { name: "Pricing", url: `${BASE_URL}/pricing` },
      { name: "Custom LMS", url: `${BASE_URL}/custom-lms` },
    ];

    const forbiddenRegex = /\b(android|ios|iphone|app store|play store|drm|fairplay|widevine|whatsapp|webrtc|membership|affiliate|funnel|paypal|lorem)\b/gi;

    const termAudit = {};
    for (const p of pagesToScan) {
      await desktopPage.goto(p.url, { waitUntil: "networkidle" });
      await desktopPage.waitForTimeout(800);
      const html = await desktopPage.content();
      const matches = [];
      let match;
      while ((match = forbiddenRegex.exec(html)) !== null) {
        const start = Math.max(0, match.index - 40);
        const end = Math.min(html.length, match.index + match[0].length + 40);
        const context = html.slice(start, end).replace(/\s+/g, " ");
        matches.push({ term: match[0], context });
      }
      termAudit[p.name] = matches;
      console.log(`Page: ${p.name} -> Found ${matches.length} prohibited term hits in rendered HTML`);
    }
    results.step6_forbidden_terms = termAudit;

  } finally {
    await browser.close();
  }

  fs.writeFileSync(path.join(OUT_DIR, "verification-summary.json"), JSON.stringify(results, null, 2));
  console.log("\n=== Staging Verification Complete ===");
}

main().catch(err => {
  console.error("FATAL ERROR in verification:", err);
  process.exit(1);
});
