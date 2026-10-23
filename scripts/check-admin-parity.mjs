// ============================================================================
// check-admin-parity: list every page section rendered from built-in code
// content instead of the admin (API).
//
//   npm run build && BACKEND_URL=... npx next start -p 3001
//   npm run check:parity            (or: node scripts/check-admin-parity.mjs [baseUrl])
//
// Each section is wrapped in <div data-content-source="api|partial|code"
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

for (const page of PAGES) {
  let html;
  try {
    const res = await fetch(BASE + page, { redirect: "manual" });
    if (!res.ok) {
      problems.push(`${page}: HTTP ${res.status}`);
      continue;
    }
    html = await res.text();
  } catch (error) {
    problems.push(`${page}: ${error.message}`);
    continue;
  }

  const markers = [...html.matchAll(/data-content-source="(api|partial|code)" data-content-key="([^"]+)"/g)];
  if (!markers.length) problems.push(`${page}: no section markers found`);
  const seen = new Set();
  for (const [, source, key] of markers) {
    if (seen.has(key)) continue; // the footer appears once per page
    seen.add(key);
    counts[source]++;
    if (source !== "api") problems.push(`${page}  ${key}  ${source}`);
  }
}

console.log(`Checked ${PAGES.length} pages at ${BASE}: ${counts.api} sections from the admin, ${counts.partial} partial, ${counts.code} from code.`);
console.log(`Not checked (approved legal text kept in code): ${LEGAL.join(", ")}`);
if (problems.length) {
  console.log("\nSections not (fully) from the admin:");
  for (const line of problems) console.log("  " + line);
  process.exit(1);
}
