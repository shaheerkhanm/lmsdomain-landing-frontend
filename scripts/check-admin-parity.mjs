// ============================================================================
// check-admin-parity: list every page section rendered from built-in code
// content instead of the admin (API).
//
//   npm run build && BACKEND_URL=... npx next start -p 3001
//   npm run check:parity            (or: node scripts/check-admin-parity.mjs [baseUrl])
//
// Loads each page in Chromium (Playwright). Each section is wrapped in <div data-content-source="api|partial|code"
// data-content-key="..."> (components/content/ContentSource.tsx):
//   code     no admin entry: the section shows the built-in text
//   partial  admin entry exists but its structured content (lists, labels) is
//            missing, or it still holds placeholder text (Lorem ipsum)
// Output is empty (exit code 0) when every section comes from the admin.
// The four legal pages keep their approved text in code by decision.
// ============================================================================

const BASE = (process.argv[2] || process.env.PARITY_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
const PAGES = ["/", "/features", "/ai", "/pricing", "/about", "/contact", "/login", "/signup"];
const LEGAL = ["/privacy-policy", "/terms", "/refund-policy", "/dpa"];

const problems = [];
const counts = { api: 0, partial: 0, code: 0 };

// Rendered in a real browser: some pages (pricing, contact) draw their sections
// on the client, so the server HTML alone is not enough.
const { chromium } = await import("playwright");
const browser = await chromium.launch();
for (const pagePath of PAGES) {
  const page = await browser.newPage();
  try {
    const res = await page.goto(BASE + pagePath, { waitUntil: "load", timeout: 60000 });
    if (!res || !res.ok()) {
      problems.push(`${pagePath}: HTTP ${res ? res.status() : "no response"}`);
      continue;
    }
    await page.waitForTimeout(1500);
    const markers = await page.evaluate(() =>
      [...document.querySelectorAll("[data-content-source]")]
        // ignore wrappers whose section renders nothing (e.g. the footer on login pages)
        .filter((el) => el.textContent.trim().length > 0 || el.querySelector("img,video"))
        .map((el) => [el.getAttribute("data-content-source"), el.getAttribute("data-content-key")])
    );
    if (!markers.length) problems.push(`${pagePath}: no section markers found`);
    const seen = new Set();
    for (const [source, key] of markers) {
      if (seen.has(key)) continue;
      seen.add(key);
      counts[source]++;
      if (source !== "api") problems.push(`${pagePath}  ${key}  ${source}`);
    }
  } catch (error) {
    problems.push(`${pagePath}: ${error.message}`);
  } finally {
    await page.close();
  }
}
await browser.close();

console.log(`Checked ${PAGES.length} pages at ${BASE}: ${counts.api} sections from the admin, ${counts.partial} partial, ${counts.code} from code.`);
console.log(`Not checked (approved legal text kept in code): ${LEGAL.join(", ")}`);
if (problems.length) {
  console.log("\nSections not (fully) from the admin:");
  for (const line of problems) console.log("  " + line);
  process.exit(1);
}
