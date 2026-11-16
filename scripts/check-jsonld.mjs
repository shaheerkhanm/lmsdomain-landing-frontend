/**
 * scripts/check-jsonld.mjs
 * Validates JSON-LD structured data on all indexable routes.
 * Run against a live local server (default: http://localhost:3000).
 */

const BASE_URL = process.env.AUDIT_URL || "http://localhost:3000";

const ROUTES_TO_CHECK = [
  "/",
  "/pricing",
  "/platform",
  "/platform/teach",
  "/platform/assess",
  "/platform/manage",
  "/platform/sell",
  "/platform/brand",
  "/platform/ai",
  "/platform/security",
  "/solutions/coaching-institutes",
  "/solutions/language-test-prep-academies",
  "/solutions/solo-educators",
  "/solutions/training-companies",
  "/customers",
  "/roadmap",
  "/custom-lms",
  "/about",
  "/contact",
  "/demo",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
];

async function checkRoute(route) {
  const url = `${BASE_URL}${route}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} on ${route}`);
  }
  const html = await res.text();

  // Extract <script type="application/ld+json">...</script>
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const raw = match[1].trim();
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      blocks.push(parsed);
    } catch (e) {
      throw new Error(`Invalid JSON-LD on ${route}: ${e.message}\nRaw: ${raw.slice(0, 100)}`);
    }
  }

  const validations = [];

  for (const block of blocks) {
    const type = block["@type"];
    if (!block["@context"]) {
      throw new Error(`${route} has JSON-LD missing @context`);
    }

    // Ensure no fake ratings
    if (block.aggregateRating || block.review) {
      throw new Error(`${route} has unverified aggregateRating or review in ${type}!`);
    }

    if (type === "Organization") {
      if (!block.name || !block.url) {
        throw new Error(`${route} Organization missing name or url`);
      }
      validations.push(`Organization (name: "${block.name}")`);
    } else if (type === "WebSite") {
      if (!block.name || !block.url) {
        throw new Error(`${route} WebSite missing name or url`);
      }
      validations.push(`WebSite (name: "${block.name}")`);
    } else if (type === "SoftwareApplication") {
      if (!block.name || !block.offers) {
        throw new Error(`${route} SoftwareApplication missing name or offers`);
      }
      const currencies = (Array.isArray(block.offers) ? block.offers : [block.offers]).map(
        (o) => o.priceCurrency
      );
      validations.push(`SoftwareApplication (currencies: ${currencies.join(", ")})`);
    } else if (type === "BreadcrumbList") {
      if (!Array.isArray(block.itemListElement) || block.itemListElement.length === 0) {
        throw new Error(`${route} BreadcrumbList missing itemListElement`);
      }
      const items = block.itemListElement.map((i) => i.name).join(" > ");
      validations.push(`BreadcrumbList (${items})`);
    } else if (type === "FAQPage") {
      if (!Array.isArray(block.mainEntity) || block.mainEntity.length === 0) {
        throw new Error(`${route} FAQPage has empty mainEntity`);
      }
      validations.push(`FAQPage (${block.mainEntity.length} Q&As)`);
    } else if (type === "Service") {
      if (!block.name || !block.provider) {
        throw new Error(`${route} Service missing name or provider`);
      }
      validations.push(`Service (name: "${block.name}")`);
    } else {
      validations.push(type);
    }
  }

  return { route, count: blocks.length, validations };
}

async function main() {
  console.log(`Checking JSON-LD schemas across ${ROUTES_TO_CHECK.length} routes against ${BASE_URL}...\n`);
  let errors = 0;
  for (const route of ROUTES_TO_CHECK) {
    try {
      const result = await checkRoute(route);
      console.log(`✓ ${result.route.padEnd(42)} [${result.count} schemas]: ${result.validations.join("; ")}`);
    } catch (e) {
      console.error(`✗ ${route}: ${e.message}`);
      errors++;
    }
  }

  console.log("\n------------------------------------------------------------");
  if (errors > 0) {
    console.error(`FAILED: ${errors} routes had invalid or missing JSON-LD.`);
    process.exit(1);
  } else {
    console.log(`PASSED: All routes have valid, error-free JSON-LD schemas.`);
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
