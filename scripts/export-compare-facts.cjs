// Runs export-compare-facts.ts with the "@/" alias. See that file for details.
// Usage: node scripts/export-compare-facts.cjs --out <backend>/scripts/update-compare-facts-2026-11-22.js
const path = require("path");
const root = path.join(__dirname, "..");
const { createJiti } = require(path.join(root, "node_modules/jiti"));
const jiti = createJiti(path.join(root, "index.js"), { alias: { "@": root } });
jiti.import("./scripts/export-compare-facts.ts").catch((e) => { console.error(e); process.exit(1); });
