import fs from "node:fs";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const PAGES = [
  { name: "home", url: "http://localhost:3000/" },
  { name: "pricing", url: "http://localhost:3000/pricing" },
  { name: "platform", url: "http://localhost:3000/platform" },
  { name: "solution", url: "http://localhost:3000/solutions/coaching-institutes" },
  { name: "blog", url: "http://localhost:3000/resources/blog/how-to-start-an-online-academy-in-india" },
];

async function runLighthouse() {
  const results = {};

  for (const page of PAGES) {
    console.log(`Auditing ${page.name} (${page.url}) with Lighthouse mobile...`);
    const outputPath = `/tmp/lh-${page.name}.json`;

    try {
      await execAsync(
        `npx lighthouse "${page.url}" --output=json --output-path="${outputPath}" --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --chrome-flags="--headless --no-sandbox"`
      );

      const report = JSON.parse(fs.readFileSync(outputPath, "utf8"));
      const categories = report.categories;
      const audits = report.audits;

      results[page.name] = {
        url: page.url,
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
        lcp: audits["largest-contentful-paint"]?.displayValue || "",
        lcpNumeric: Math.round(audits["largest-contentful-paint"]?.numericValue || 0),
        cls: audits["cumulative-layout-shift"]?.displayValue || "",
        clsNumeric: audits["cumulative-layout-shift"]?.numericValue || 0,
        tbt: audits["total-blocking-time"]?.displayValue || "",
        tbtNumeric: Math.round(audits["total-blocking-time"]?.numericValue || 0),
        fcp: audits["first-contentful-paint"]?.displayValue || "",
        opportunities: Object.values(audits)
          .filter((a) => a.details && a.details.type === "opportunity" && a.numericValue > 100)
          .map((a) => ({ id: a.id, title: a.title, savingsMs: Math.round(a.numericValue) })),
        diagnostics: Object.values(audits)
          .filter((a) => a.score !== null && a.score < 0.9 && a.title && !a.id.startsWith("screenshot"))
          .map((a) => ({ id: a.id, title: a.title, score: a.score })),
      };

      console.log(`-> ${page.name}: Perf ${results[page.name].performance}, A11y ${results[page.name].accessibility}, BP ${results[page.name].bestPractices}, SEO ${results[page.name].seo}, LCP ${results[page.name].lcp}, CLS ${results[page.name].cls}`);
    } catch (e) {
      console.error(`Error auditing ${page.name}:`, e.message);
      results[page.name] = { error: e.message };
    }
  }

  fs.writeFileSync(
    "/Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/docs/phase4/lighthouse-before.json",
    JSON.stringify(results, null, 2)
  );
  console.log("Saved Lighthouse audit results to docs/phase4/lighthouse-before.json");
}

runLighthouse().catch(console.error);
