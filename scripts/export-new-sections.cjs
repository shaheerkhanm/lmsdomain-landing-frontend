// Runs export-new-sections.ts with the "@/" alias. See that file for details.
// Usage: node scripts/export-new-sections.cjs --out <backend>/scripts/add-new-sections-2026-11-19.js
const path = require("path");
const root = path.join(__dirname, "..");
const { createJiti } = require(path.join(root, "node_modules/jiti"));
const jiti = createJiti(path.join(root, "index.js"), { alias: { "@": root } });
jiti.import("./scripts/export-new-sections.ts").catch((e) => { console.error(e); process.exit(1); });
