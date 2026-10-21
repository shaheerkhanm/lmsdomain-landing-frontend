const fs = require('fs');

// 1. Read catalog features
const catalogCode = fs.readFileSync('content/features/catalog.ts', 'utf8');
const featureMatches = [...catalogCode.matchAll(/slug:\s*\"([^\"]+)\",\s*title:\s*\"([^\"]+)\"/g)];
const categorySlugs = [
  'course-learning', 'assessment-and-evaluation', 'learner-engagement',
  'ai-powered-tools', 'live-and-cohort-learning', 'course-sales-and-payments',
  'content-publishing-and-digital-products', 'administration-and-communication',
  'branding-website-and-reach'
];

const catalogFeatures = featureMatches
  .filter(m => !categorySlugs.includes(m[1]))
  .map(m => ({ slug: m[1], title: m[2] }));

console.log(`\n============================================================`);
console.log(`LMS DOMAIN /features CONTENT CHECK REPORT`);
console.log(`Expected Feature Count: 38`);
console.log(`Catalog Features Loaded: ${catalogFeatures.length}`);
console.log(`============================================================\n`);

// 2. Read rendered HTML (strip RSC hydration script tags to inspect only the rendered DOM tree)
const rawHtml = fs.readFileSync('/tmp/features.html', 'utf8');

// Strip out Next.js hydration scripts (<script>...</script>) to test strictly rendered DOM nodes
const domOnlyHtml = rawHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

let passed = true;
const results = [];

catalogFeatures.forEach((f, idx) => {
  const escaped = f.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match inside tags: >Title< or >Title</h3> etc.
  const regex = new RegExp(`>\\s*${escaped}\\s*<`, 'g');
  const matches = domOnlyHtml.match(regex);
  const count = matches ? matches.length : 0;

  const status = count === 1 ? 'PASS (1x)' : (count > 1 ? `WARN (${count}x)` : 'FAIL (0x)');
  if (count !== 1) {
    passed = false;
  }

  results.push({
    index: idx + 1,
    title: f.title,
    slug: f.slug,
    count,
    status
  });
});

console.table(results.map(r => ({
  '#': r.index,
  'Feature Title': r.title,
  'Slug': r.slug,
  'DOM Rendered Count': r.count,
  'Status': r.status
})));

console.log(`\n------------------------------------------------------------`);
const passCount = results.filter(r => r.count === 1).length;
console.log(`Total Features Checked: ${catalogFeatures.length}`);
console.log(`Passing Features (exact 1x in DOM): ${passCount} / 38`);
console.log(`Missing Features (0x): ${results.filter(r => r.count === 0).length}`);
console.log(`Duplicate Features (>1x): ${results.filter(r => r.count > 1).length}`);
console.log(`Overall Result: ${passed ? '✓ ALL 38 FEATURES VERIFIED EXACTLY ONCE' : '✗ FAILED'}`);
console.log(`------------------------------------------------------------\n`);

process.exit(passed ? 0 : 1);

