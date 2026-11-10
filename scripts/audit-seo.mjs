import fs from "node:fs";

const BASE = "http://localhost:3000";

// All known app routes from app router
const KNOWN_ROUTES = [
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
  "/features", // redirect to /platform
  "/compare/graphy-alternative",
  "/compare/classplus-alternative",
  "/compare/teachmint-alternative",
  "/compare/learnyst-alternative",
  "/compare/edmingle-alternative",
  "/compare/teachable-alternative",
  "/compare/kajabi-alternative",
  "/resources/blog",
  "/resources/blog/how-to-start-an-online-academy-in-india",
  "/resources/blog/what-is-an-lms-guide-for-coaching-institutes",
  "/resources/blog/how-to-sell-courses-online-in-india-with-gst-invoices",
  "/login",
  "/signup",
  "/forgot-password",
];

async function run() {
  console.log("=== Phase 4 SEO Audit ===");

  // 1. Fetch sitemap.xml
  const sitemapRes = await fetch(`${BASE}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  const sitemapUrls = new Set();
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapText)) !== null) {
    sitemapUrls.add(match[1]);
  }
  console.log(`Found ${sitemapUrls.size} URLs in sitemap.xml`);

  // 2. Audit each route
  const routeAudits = [];
  for (const route of KNOWN_ROUTES) {
    try {
      const res = await fetch(`${BASE}${route}`, { redirect: "manual" });
      const status = res.status;
      const location = res.headers.get("location");

      if (status >= 300 && status < 400) {
        routeAudits.push({
          route,
          status,
          redirectLocation: location,
          isRedirect: true,
          inSitemap: sitemapUrls.has(`https://lmsdomain.com${route}`),
        });
        continue;
      }

      const html = await res.text();

      // Title
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : "";
      const titleLen = title.length;

      // Meta description
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
      const desc = descMatch ? descMatch[1].trim() : "";
      const descLen = desc.length;

      // Canonical
      const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                         html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
      const canonical = canonMatch ? canonMatch[1].trim() : "";

      // H1 count & text
      const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
      const h1Count = h1Matches.length;
      const h1Texts = h1Matches.map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

      // OG image
      const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i) ||
                      html.match(/<meta\s+content=["']([^"']*)["']\s+property=["']og:image["']/i);
      const ogImage = ogMatch ? ogMatch[1].trim() : "";

      // JSON-LD types
      const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
      const jsonLdTypes = [];
      for (const m of jsonLdMatches) {
        try {
          const parsed = JSON.parse(m[1]);
          if (parsed["@type"]) {
            jsonLdTypes.push(parsed["@type"]);
          } else if (parsed["@graph"]) {
            parsed["@graph"].forEach((g) => g["@type"] && jsonLdTypes.push(g["@type"]));
          }
        } catch (e) {
          jsonLdTypes.push("INVALID_JSON");
        }
      }

      // Robots meta
      const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
      const robots = robotsMatch ? robotsMatch[1].trim() : "";

      const expectedUrl = `https://lmsdomain.com${route === "/" ? "" : route}`;
      const inSitemap = sitemapUrls.has(expectedUrl) || sitemapUrls.has(`${expectedUrl}/`);

      routeAudits.push({
        route,
        status,
        title,
        titleLen,
        desc,
        descLen,
        canonical,
        h1Count,
        h1Texts,
        ogImage: Boolean(ogImage),
        ogImageSrc: ogImage,
        jsonLdTypes,
        robots,
        inSitemap,
      });
    } catch (e) {
      routeAudits.push({ route, error: e.message });
    }
  }

  // 3. Crawl site starting from /
  const crawled = new Set();
  const queue = ["/"];
  const internalLinks = new Map(); // page -> Set(links)
  const allDiscovered = new Set();
  const brokenLinks = [];
  const redirectChains = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (crawled.has(current)) continue;
    crawled.add(current);

    try {
      const res = await fetch(`${BASE}${current}`, { redirect: "manual" });
      const status = res.status;
      if (status >= 300 && status < 400) {
        const target = res.headers.get("location");
        // Check if target redirects again
        if (target) {
          const res2 = await fetch(target.startsWith("http") ? target : `${BASE}${target}`, { redirect: "manual" });
          if (res2.status >= 300 && res2.status < 400) {
            redirectChains.push({ from: current, mid: target, to: res2.headers.get("location") });
          }
        }
        continue;
      }
      if (status === 404 || status >= 500) {
        brokenLinks.push({ path: current, status });
        continue;
      }

      const html = await res.text();
      const hrefMatches = [...html.matchAll(/href=["'](\/[^"'#?]*)[^"']*["']/gi)];
      const pageLinks = new Set();

      for (const hm of hrefMatches) {
        const link = hm[1];
        // Ignore static assets or api
        if (
          link.startsWith("/_next") ||
          link.startsWith("/assets") ||
          link.startsWith("/favicon") ||
          link.startsWith("/api")
        ) {
          continue;
        }
        pageLinks.add(link);
        allDiscovered.add(link);
        if (!crawled.has(link) && !queue.includes(link)) {
          queue.push(link);
        }
      }
      internalLinks.set(current, pageLinks);
    } catch (e) {
      brokenLinks.push({ path: current, error: e.message });
    }
  }

  // Orphan check: any known route not discovered?
  const orphanRoutes = KNOWN_ROUTES.filter((r) => r !== "/" && !allDiscovered.has(r));

  const result = {
    sitemapCount: sitemapUrls.size,
    sitemapUrls: [...sitemapUrls],
    routeAudits,
    crawlCount: crawled.size,
    brokenLinks,
    redirectChains,
    orphanRoutes,
  };

  fs.writeFileSync(
    "/Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/docs/phase4/audit-data.json",
    JSON.stringify(result, null, 2)
  );
  console.log("Saved audit data to docs/phase4/audit-data.json");
}

run().catch(console.error);
