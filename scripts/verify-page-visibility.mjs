import { chromium } from "playwright";
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs/promises";

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = path.resolve("docs/multipage/evidence/page-visibility");

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isServerUp(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function startServer(envVars = {}) {
  const env = { ...process.env, PORT: String(PORT), ...envVars };
  const child = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    env,
    stdio: "pipe",
  });

  child.stderr.on("data", (d) => process.stderr.write(d));

  const start = Date.now();
  while (Date.now() - start < 30000) {
    if (await isServerUp(BASE_URL)) {
      return child;
    }
    await wait(500);
  }
  child.kill("SIGTERM");
  throw new Error("Server failed to start within 30s");
}

async function stopServer(child) {
  if (!child) return;
  child.kill("SIGTERM");
  await wait(1000);
  try {
    process.kill(child.pid, "SIGKILL");
  } catch {}
  await wait(1000);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const results = [];

  console.log("=== RUNNING PAGE VISIBILITY VERIFICATION ===");

  // --------------------------------------------------------------------------
  // Scenario 1: Baseline - all visible
  // --------------------------------------------------------------------------
  console.log("\n[Test 1] All visible (baseline)");
  let server = await startServer({ PAGES_HIDDEN: "" });
  let context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  let page = await context.newPage();

  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(OUT_DIR, "01-all-visible-header.png"),
    clip: { x: 0, y: 0, width: 1440, height: 160 },
  });

  const headerLinksBaseline = await page.$$eval("header nav a", (links) =>
    links.map((a) => a.getAttribute("href"))
  );
  console.log("  Header nav links (all visible):", headerLinksBaseline);
  const baselinePass =
    headerLinksBaseline.includes("/features") &&
    headerLinksBaseline.includes("/pricing") &&
    headerLinksBaseline.includes("/about") &&
    headerLinksBaseline.includes("/contact") &&
    headerLinksBaseline.includes("/login");
  results.push({ test: "Baseline all visible", pass: baselinePass });

  await context.close();
  await stopServer(server);

  // --------------------------------------------------------------------------
  // Scenario 2: PAGES_HIDDEN=pricing (whenHidden: "home")
  // --------------------------------------------------------------------------
  console.log("\n[Test 2] PAGES_HIDDEN=pricing (whenHidden: home)");
  server = await startServer({ PAGES_HIDDEN: "pricing" });
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  // Test redirect of /pricing
  const response = await page.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle" });
  const finalUrl = page.url();
  console.log("  Navigated to /pricing -> Ended at:", finalUrl);
  const pricingRedirectPass = finalUrl === `${BASE_URL}/`;

  // Screenshot header without pricing
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(OUT_DIR, "02-pricing-hidden-header.png"),
    clip: { x: 0, y: 0, width: 1440, height: 160 },
  });

  const headerLinksPricingHidden = await page.$$eval("header nav a", (links) =>
    links.map((a) => a.getAttribute("href"))
  );
  console.log("  Header nav links (pricing hidden):", headerLinksPricingHidden);
  const headerPricingHiddenPass = !headerLinksPricingHidden.includes("/pricing");

  // Check footer without pricing
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(500);
  const footerElement = await page.$("footer");
  if (footerElement) {
    await footerElement.screenshot({
      path: path.join(OUT_DIR, "04-pricing-hidden-footer.png"),
    });
  }

  const footerLinksPricingHidden = await page.$$eval("footer a", (links) =>
    links.map((a) => a.getAttribute("href"))
  );
  console.log("  Footer links count:", footerLinksPricingHidden.length);
  const footerPricingHiddenPass =
    !footerLinksPricingHidden.includes("/pricing") &&
    !footerLinksPricingHidden.includes("/pricing#faqSection");

  // Visit /features -> Hero "See pricing" disappears
  await page.goto(`${BASE_URL}/features`, { waitUntil: "networkidle" });
  const featuresHeroLinks = await page.$$eval("#features-hero a", (links) =>
    links.map((a) => a.getAttribute("href"))
  );
  console.log("  Features hero links:", featuresHeroLinks);
  const featuresHeroPass = !featuresHeroLinks.includes("/pricing");
  await page.screenshot({
    path: path.join(OUT_DIR, "07-pricing-hidden-features-hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 500 },
  });

  // Visit /ai -> Hero "View Pricing" disappears
  await page.goto(`${BASE_URL}/ai`, { waitUntil: "networkidle" });
  const aiHeroLinks = await page.$$eval("#ai-hero a", (links) =>
    links.map((a) => a.getAttribute("href"))
  );
  console.log("  AI hero links:", aiHeroLinks);
  const aiHeroPass = !aiHeroLinks.includes("/pricing");
  await page.screenshot({
    path: path.join(OUT_DIR, "06-pricing-hidden-ai-hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 500 },
  });

  // Check sitemap.xml
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  const sitemapPricingPass = !sitemapText.includes("<loc>http://localhost:3008/pricing</loc>") &&
    !sitemapText.includes("/pricing</loc>");
  console.log("  Sitemap contains /pricing:", !sitemapPricingPass);

  results.push({ test: "PAGES_HIDDEN=pricing redirect", pass: pricingRedirectPass });
  results.push({ test: "PAGES_HIDDEN=pricing header clean", pass: headerPricingHiddenPass });
  results.push({ test: "PAGES_HIDDEN=pricing footer clean", pass: footerPricingHiddenPass });
  results.push({ test: "PAGES_HIDDEN=pricing features hero CTA hidden", pass: featuresHeroPass });
  results.push({ test: "PAGES_HIDDEN=pricing ai hero CTA hidden", pass: aiHeroPass });
  results.push({ test: "PAGES_HIDDEN=pricing sitemap clean", pass: sitemapPricingPass });

  await context.close();
  await stopServer(server);

  // --------------------------------------------------------------------------
  // Scenario 3: PAGES_HIDDEN=pricing with PAGES_WHEN_HIDDEN_PRICING=404
  // --------------------------------------------------------------------------
  console.log("\n[Test 3] PAGES_HIDDEN=pricing with PAGES_WHEN_HIDDEN_PRICING=404");
  server = await startServer({
    PAGES_HIDDEN: "pricing",
    PAGES_WHEN_HIDDEN_PRICING: "404",
  });
  context = await browser.newContext();
  page = await context.newPage();

  const pricing404Res = await page.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle" });
  const status404 = pricing404Res.status();
  const bodyText404 = await page.innerText("body");
  console.log("  Status on /pricing:", status404, "Has 404 text:", bodyText404.includes("404"));
  const pricing404Pass = status404 === 404 || bodyText404.includes("404");
  results.push({ test: "PAGES_WHEN_HIDDEN_PRICING=404 returns 404", pass: pricing404Pass });

  await context.close();
  await stopServer(server);

  // --------------------------------------------------------------------------
  // Scenario 4: PAGES_HIDDEN=about,pricing,features (3 hidden pages)
  // --------------------------------------------------------------------------
  console.log("\n[Test 4] PAGES_HIDDEN=about,pricing,features");
  server = await startServer({ PAGES_HIDDEN: "about,pricing,features" });
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(OUT_DIR, "03-three-hidden-header.png"),
    clip: { x: 0, y: 0, width: 1440, height: 160 },
  });

  const threeHeaderLinks = await page.$$eval("header nav a", (links) =>
    links.map((a) => a.getAttribute("href"))
  );
  console.log("  Header nav links (3 hidden):", threeHeaderLinks);
  const threeHeaderPass =
    !threeHeaderLinks.includes("/features") &&
    !threeHeaderLinks.includes("/pricing") &&
    !threeHeaderLinks.includes("/about") &&
    threeHeaderLinks.includes("/ai") &&
    threeHeaderLinks.includes("/contact");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(500);
  const footerElement3 = await page.$("footer");
  if (footerElement3) {
    await footerElement3.screenshot({
      path: path.join(OUT_DIR, "05-three-hidden-footer.png"),
    });
  }

  const footerLinksThree = await page.$$eval("footer a", (links) =>
    links.map((a) => a.getAttribute("href"))
  );
  console.log("  Footer links count (3 hidden):", footerLinksThree.length);
  const footerThreePass =
    !footerLinksThree.includes("/features") &&
    !footerLinksThree.includes("/pricing") &&
    !footerLinksThree.includes("/about") &&
    footerLinksThree.includes("/") &&
    footerLinksThree.includes("/privacy-policy");

  results.push({ test: "Three hidden header", pass: threeHeaderPass });
  results.push({ test: "Three hidden footer columns collapse cleanly", pass: footerThreePass });

  await context.close();
  await stopServer(server);

  // --------------------------------------------------------------------------
  // Scenario 5: PAGES_HIDDEN=contact (button opens demo modal)
  // --------------------------------------------------------------------------
  console.log("\n[Test 5] PAGES_HIDDEN=contact");
  server = await startServer({ PAGES_HIDDEN: "contact" });
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  // Test /about careers button opens modal
  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle" });
  const careersButton = await page.$("section:has-text('Careers') button");
  let modalOpened = false;
  if (careersButton) {
    await careersButton.click();
    await wait(600);
    const modal = await page.$('[role="dialog"]');
    modalOpened = Boolean(modal);
    console.log("  Careers button opened demo modal:", modalOpened);
  }

  // Also test /pricing empty state or 404 page action
  await page.goto(`${BASE_URL}/some-missing-page`, { waitUntil: "networkidle" });
  const notFoundContactBtn = await page.$("button:has-text('Contact us')");
  let notFoundModalOpened = false;
  if (notFoundContactBtn) {
    await notFoundContactBtn.click();
    await wait(600);
    const modal = await page.$('[role="dialog"]');
    notFoundModalOpened = Boolean(modal);
    console.log("  404 Contact us button opened demo modal:", notFoundModalOpened);
  }

  // Take screenshot 08-contact-hidden-empty-state.png with the modal open
  await page.screenshot({
    path: path.join(OUT_DIR, "08-contact-hidden-empty-state.png"),
  });

  results.push({
    test: "Contact hidden triggers modal fallback",
    pass: modalOpened || notFoundModalOpened,
  });

  await context.close();
  await stopServer(server);

  // --------------------------------------------------------------------------
  // Scenario 6: Locked pages remain visible even if in PAGES_HIDDEN
  // --------------------------------------------------------------------------
  console.log("\n[Test 6] Locked pages remain visible");
  server = await startServer({ PAGES_HIDDEN: "terms,privacy-policy,home" });
  context = await browser.newContext();
  page = await context.newPage();

  const homeRes = await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  const termsRes = await page.goto(`${BASE_URL}/terms`, { waitUntil: "networkidle" });
  const privacyRes = await page.goto(`${BASE_URL}/privacy-policy`, { waitUntil: "networkidle" });

  const lockedPass =
    homeRes.status() === 200 &&
    termsRes.status() === 200 &&
    privacyRes.status() === 200 &&
    page.url() === `${BASE_URL}/privacy-policy`;

  console.log("  Locked pages accessible (200 OK):", lockedPass);
  results.push({ test: "Locked pages remain visible", pass: lockedPass });

  await context.close();
  await stopServer(server);

  await browser.close();

  console.log("\n=== VERIFICATION SUMMARY ===");
  console.table(results);

  const allPassed = results.every((r) => r.pass);
  if (!allPassed) {
    console.error("Some verification tests failed!");
    process.exit(1);
  } else {
    console.log("ALL TESTS PASSED!");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
