import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "http://localhost:3001";
const SHOTS_DIR = path.resolve("docs/prelaunch/shots");
const REPORT_DATA_PATH = path.resolve("docs/prelaunch/audit-results.json");

const ROUTES = [
  { slug: "home", path: "/" },
  { slug: "features", path: "/features" },
  { slug: "ai", path: "/ai" },
  { slug: "pricing", path: "/pricing" },
  { slug: "about", path: "/about" },
  { slug: "contact", path: "/contact" },
  { slug: "login", path: "/login" },
  { slug: "signup", path: "/signup" },
  { slug: "privacy-policy", path: "/privacy-policy" },
  { slug: "terms", path: "/terms" },
  { slug: "refund-policy", path: "/refund-policy" },
  { slug: "dpa", path: "/dpa" },
  { slug: "404", path: "/this-url-does-not-exist" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

async function run() {
  await mkdir(SHOTS_DIR, { recursive: true });

  const browser = await chromium.launch();
  const allResults = [];
  const linkReport = {
    totalChecked: 0,
    validLinks: 0,
    hashLinks: [],
    deadLinks: [],
  };

  console.log(`Starting Pre-Launch Visual & Technical Audit across ${ROUTES.length} routes...`);

  for (const route of ROUTES) {
    const routeResults = {
      slug: route.slug,
      path: route.path,
      viewports: {},
      seo: {},
      accessibility: {},
      links: [],
      placeholders: [],
    };

    for (const vp of VIEWPORTS) {
      const pageErrors = [];
      const consoleErrors = [];

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });

      const page = await context.newPage();

      page.on("pageerror", (err) => pageErrors.push(err.message));
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });

      const fullUrl = `${BASE_URL}${route.path}`;
      const response = await page.goto(fullUrl, { waitUntil: "networkidle", timeout: 30000 });
      const status = response ? response.status() : null;

      // Small wait for animations & fonts
      await page.waitForTimeout(800);

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        const docEl = document.documentElement;
        const scrollW = docEl.scrollWidth;
        const innerW = window.innerWidth;
        const hasOverflow = scrollW > innerW + 1; // 1px threshold for fractional rounding
        return {
          scrollWidth: scrollW,
          innerWidth: innerW,
          hasOverflow,
        };
      });

      // Save screenshot
      const shotFileName = `${route.slug}-${vp.width}px.png`;
      const shotFilePath = path.join(SHOTS_DIR, shotFileName);
      await page.screenshot({ path: shotFilePath, fullPage: true });

      // Run DOM audits on desktop
      if (vp.width === 1440) {
        const domAudit = await page.evaluate(() => {
          // SEO
          const title = document.title || "";
          const metaDescEl = document.querySelector('meta[name="description"]');
          const description = metaDescEl ? metaDescEl.getAttribute("content") : "";
          const canonicalEl = document.querySelector('link[rel="canonical"]');
          const canonical = canonicalEl ? canonicalEl.getAttribute("href") : "";

          const ogTitleEl = document.querySelector('meta[property="og:title"]');
          const ogTitle = ogTitleEl ? ogTitleEl.getAttribute("content") : "";
          const ogImageEl = document.querySelector('meta[property="og:image"]');
          const ogImage = ogImageEl ? ogImageEl.getAttribute("content") : "";

          const twCardEl = document.querySelector('meta[name="twitter:card"]');
          const twCard = twCardEl ? twCardEl.getAttribute("content") : "";

          // Headings
          const h1Els = Array.from(document.querySelectorAll("h1")).map((h) => h.innerText.trim());
          const h2Count = document.querySelectorAll("h2").length;
          const h3Count = document.querySelectorAll("h3").length;

          // Images
          const images = Array.from(document.querySelectorAll("img")).map((img) => ({
            src: img.getAttribute("src") || "",
            alt: img.getAttribute("alt"),
            hasAlt: img.hasAttribute("alt"),
            width: img.naturalWidth,
            height: img.naturalHeight,
          }));

          // Links & Buttons
          const links = Array.from(document.querySelectorAll("a")).map((a) => ({
            text: a.innerText.trim(),
            href: a.getAttribute("href") || "",
            target: a.getAttribute("target"),
            ariaLabel: a.getAttribute("aria-label"),
          }));

          // Placeholder / Lorem text search
          const bodyText = document.body.innerText || "";
          const loremMatches = bodyText.match(/lorem\s+ipsum/gi) || [];

          return {
            seo: { title, description, canonical, ogTitle, ogImage, twCard },
            headings: { h1Count: h1Els.length, h1Text: h1Els, h2Count, h3Count },
            images,
            links,
            loremCount: loremMatches.length,
          };
        });

        routeResults.seo = domAudit.seo;
        routeResults.accessibility = {
          headings: domAudit.headings,
          totalImages: domAudit.images.length,
          imagesMissingAlt: domAudit.images.filter((i) => !i.hasAlt).length,
          imagesWithAlt: domAudit.images.filter((i) => i.hasAlt).length,
        };
        routeResults.links = domAudit.links;
        routeResults.placeholders = domAudit.loremCount > 0 ? [`Found ${domAudit.loremCount} 'Lorem ipsum' mentions`] : [];

        // Check links
        for (const link of domAudit.links) {
          linkReport.totalChecked++;
          if (link.href === "#" || link.href.startsWith("#")) {
            linkReport.hashLinks.push({
              page: route.path,
              text: link.text,
              href: link.href,
              ariaLabel: link.ariaLabel,
            });
          } else {
            linkReport.validLinks++;
          }
        }
      }

      routeResults.viewports[vp.name] = {
        width: vp.width,
        height: vp.height,
        status,
        overflow,
        pageErrors,
        consoleErrors,
        screenshot: shotFileName,
      };

      await context.close();
      console.log(`  ✓ ${route.slug} @ ${vp.width}px (${overflow.hasOverflow ? "OVERFLOW FAIL" : "OK"})`);
    }

    allResults.push(routeResults);
  }

  await browser.close();

  const finalSummary = {
    timestamp: new Date().toISOString(),
    routesChecked: ROUTES.length,
    viewportsChecked: VIEWPORTS.length,
    shotsDir: SHOTS_DIR,
    linkReport,
    routes: allResults,
  };

  await writeFile(REPORT_DATA_PATH, JSON.stringify(finalSummary, null, 2));
  console.log(`\nAudit completed successfully! Results written to ${REPORT_DATA_PATH}`);
}

run().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
