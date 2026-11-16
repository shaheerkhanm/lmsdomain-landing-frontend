// Runs export-v5-cms.ts with the "@/" alias. See that file for details.
// Usage: node scripts/export-v5-cms.cjs --seo scripts/seo-v5.json --out <backend>/scripts/load-v5-content.js
const path = require("path");
const root = path.join(__dirname, "..");
const { createJiti } = require(path.join(root, "node_modules/jiti"));
const jiti = createJiti(path.join(root, "index.js"), { alias: { "@": root } });
jiti.import("./scripts/export-v5-cms.ts").catch((e) => { console.error(e); process.exit(1); });
