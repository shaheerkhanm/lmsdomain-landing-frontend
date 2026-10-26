// ============================================================================
// QA screenshots + overflow / console audit (Playwright)
//
//   npm run qa:screens
//
// Uses the production server at QA_BASE_URL (default http://localhost:3001).
// If nothing answers there, it runs `next build`, copies public/ and
// .next/static/ into .next/standalone/ and starts `node server.js` on that
// port, the way the Dockerfile does (`next start` does not work with
// `output: "standalone"`), with BACKEND_URL=http://127.0.0.1:5201 (override
// with BACKEND_URL), and stops it when done.
//
// Output:
//   docs/multipage/evidence/qa/<route>/<width>.png          full-page screenshots
//   docs/multipage/evidence/qa/<route>/<width>-reduced.png  reducedMotion: "reduce"
//   docs/multipage/evidence/qa/results.json                 overflow, console and
//                                                            homepage scroll/pin data
// ============================================================================

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { cp, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = (process.env.QA_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
const OUT_DIR = path.resolve("docs/multipage/evidence/qa");

const ROUTES = [
  "/",
  "/features",
  "/ai",
  "/pricing",
  "/about",
  "/contact",
  "/login",
  "/signup",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
  "/dpa",
  "/does-not-exist",
];
const WIDTHS = [375, 414, 768, 1024, 1280, 1440, 1920];
const REDUCED_WIDTHS = [390, 1440];
const HEIGHT = 900;

const routeDir = (route) => (route === "/" ? "home" : route.replace(/^\//, ""));

async function isUp(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "inherit", "inherit"], ...options });
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} exited with ${code}`))));
  });
}

async function ensureServer() {
  if (await isUp(BASE_URL)) return null;

  const { hostname, port: urlPort } = new URL(BASE_URL);
  const port = urlPort || "3001";
  const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5201";

  console.log("[qa] building");
  await run("npx", ["next", "build"], { env: { ...process.env, BACKEND_URL: backendUrl } });

  // Same layout as the Dockerfile runner stage: without these the pages have no CSS or images.
  const standalone = path.resolve(".next/standalone");
  await cp(path.resolve("public"), path.join(standalone, "public"), { recursive: true });
  await cp(path.resolve(".next/static"), path.join(standalone, ".next/static"), { recursive: true });

  console.log(`[qa] starting node .next/standalone/server.js on port ${port}`);
  const server = spawn("node", ["server.js"], {
    cwd: standalone,
    env: { ...process.env, BACKEND_URL: backendUrl, PORT: port, HOSTNAME: hostname },
    stdio: ["ignore", "inherit", "inherit"],
  });

  for (let i = 0; i < 60; i++) {
    if (await isUp(BASE_URL)) return server;
    await new Promise((r) => setTimeout(r, 1000));
  }
  server.kill();
  throw new Error(`Server did not start at ${BASE_URL}`);
}

// Runs in the page: overflow as shipped, with the html/body clip lifted, and
// the elements that actually extend past the viewport.
function measureOverflow() {
  const vw = window.innerWidth;
  const html = document.documentElement;
  const shippedScrollWidth = html.scrollWidth;

  const prev = [html.style.overflowX, document.body.style.overflowX];
  html.style.overflowX = "visible";
  document.body.style.overflowX = "visible";
  const unclippedScrollWidth = html.scrollWidth;

  const describe = (el) => {
    const parts = [];
    let node = el;
    while (node && node !== document.body && parts.length < 4) {
      let part = node.tagName.toLowerCase();
      if (node.id) part += `#${node.id}`;
      const cls = typeof node.className === "string" ? node.className.trim().split(/\s+/).slice(0, 3) : [];
      if (cls.length && cls[0]) part += "." + cls.join(".");
      parts.unshift(part);
      node = node.parentElement;
    }
    return parts.join(" > ");
  };

  // Overflow that an ancestor (other than html/body) already clips is not page overflow.
  const clippedByAncestor = (el) => {
    for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
      const ox = getComputedStyle(node).overflowX;
      if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") return true;
    }
    return false;
  };

  const offenders = [];
  for (const el of document.body.querySelectorAll("*")) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none" || style.position === "fixed") continue;
    if (rect.right <= vw + 1 && rect.left >= -1) continue;
    if (clippedByAncestor(el)) continue;
    offenders.push({
      element: describe(el),
      // Only overflow past the right edge widens the page; left overflow cannot be scrolled to.
      side: rect.right > vw + 1 ? "right" : "left",
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
    });
  }

  html.style.overflowX = prev[0];
  document.body.style.overflowX = prev[1];

  // Keep the outermost offenders only (children of an offender add nothing new).
  const outermost = offenders.filter(
    (o) => !offenders.some((p) => p !== o && o.element.startsWith(p.element + " > "))
  );

  return {
    innerWidth: vw,
    shippedScrollWidth,
    unclippedScrollWidth,
    overflowAsShipped: shippedScrollWidth > vw,
    overflowWithoutClip: unclippedScrollWidth > vw,
    offenders: outermost.slice(0, 15),
  };
}

async function capture(browser, route, width, { reduced = false } = {}) {
  const context = await browser.newContext({
    viewport: { width, height: HEIGHT },
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const badResponses = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    const url = res.url();
    const isMainDocument = res.request().isNavigationRequest() && res.request().frame() === page.mainFrame();
    if (res.status() >= 400 && url.startsWith(BASE_URL) && !(isMainDocument && route === "/does-not-exist")) {
      badResponses.push(`${res.status()} ${url.replace(BASE_URL, "")}`);
    }
  });

  const response = await page.goto(BASE_URL + route, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1200);

  // Scroll through once so lazy images and scroll-triggered sections run, then return to top.
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  const overflow = await page.evaluate(measureOverflow);

  const dir = path.join(OUT_DIR, routeDir(route));
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `${width}${reduced ? "-reduced" : ""}.png`);
  await page.screenshot({ path: file, fullPage: true });

  await context.close();
  return {
    route,
    width,
    reducedMotion: reduced,
    status: response?.status() ?? null,
    screenshot: path.relative(process.cwd(), file),
    ...overflow,
    consoleErrors,
    badResponses,
  };
}

// Homepage scroll behaviour: Lenis active, wheel scrolls, and every pinned
// ScrollTrigger holds its element in place through its range. Run with the
// global html/body overflow-x clip as shipped and with it lifted, to show
// whether the clip changes anything.
async function checkHomepageScroll(browser, width, liftClip) {
  const context = await browser.newContext({ viewport: { width, height: HEIGHT } });
  const page = await context.newPage();
  await page.goto(BASE_URL + "/", { waitUntil: "load", timeout: 60000 });
  if (liftClip) {
    await page.addStyleTag({ content: "html, body { overflow-x: visible !important; }" });
  }
  await page.waitForTimeout(1500);

  const lenisActive = await page.evaluate(
    () => Boolean(window.__lenis) && document.documentElement.classList.contains("lenis")
  );
  await page.mouse.move(width / 2, HEIGHT / 2);
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(1500);
  const scrollYAfterWheel = await page.evaluate(() => Math.round(window.scrollY));

  const pinRanges = await page.evaluate(() =>
    (window.__st?.getAll() || [])
      .filter((t) => t.pin)
      .map((t) => ({
        trigger: t.trigger?.id || t.pin.id || t.pin.className.toString().split(" ").slice(0, 3).join("."),
        start: Math.round(t.start),
        end: Math.round(t.end),
      }))
  );

  // A pin is held when its element stays at the same viewport position from
  // 10% to 90% of its range (pins start at "top top", "center center", etc.).
  const pinTopAt = async (index, y) => {
    await page.evaluate((target) => window.__lenis.scrollTo(target, { immediate: true, force: true }), y);
    await page.waitForTimeout(600);
    return page.evaluate((i) => {
      const t = window.__st.getAll().filter((x) => x.pin)[i];
      return { top: Math.round(t.pin.getBoundingClientRect().top), isActive: t.isActive };
    }, index);
  };

  const pins = [];
  for (const [i, range] of pinRanges.entries()) {
    const span = range.end - range.start;
    const early = await pinTopAt(i, Math.round(range.start + span * 0.1));
    const late = await pinTopAt(i, Math.round(range.start + span * 0.9));
    pins.push({
      ...range,
      pinTopEarly: early.top,
      pinTopLate: late.top,
      held: early.isActive && late.isActive && Math.abs(early.top - late.top) <= 2,
    });
  }

  await context.close();
  return { width, globalClip: !liftClip, lenisActive, scrollYAfterWheel, pins };
}

const server = await ensureServer();
const browser = await chromium.launch();
const results = [];
const scrollChecks = [];

try {
  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      results.push(await capture(browser, route, width));
    }
    for (const width of REDUCED_WIDTHS) {
      results.push(await capture(browser, route, width, { reduced: true }));
    }
    console.log(`[qa] ${route} done`);
  }
  for (const width of [1440, 390]) {
    for (const liftClip of [false, true]) {
      scrollChecks.push(await checkHomepageScroll(browser, width, liftClip));
    }
  }
  console.log("[qa] homepage scroll checks done");
} finally {
  await browser.close();
  server?.kill();
}

const summary = {
  baseUrl: BASE_URL,
  runAt: new Date().toISOString(),
  pages: results.length,
  overflowAsShipped: results.filter((r) => r.overflowAsShipped).length,
  overflowWithoutClip: results.filter((r) => r.overflowWithoutClip).length,
  rightEdgeOffenders: results.filter((r) => r.offenders.some((o) => o.side === "right")).length,
  withConsoleErrors: results.filter((r) => r.consoleErrors.length).length,
  withBadResponses: results.filter((r) => r.badResponses.length).length,
  pinsNotHeld: scrollChecks.flatMap((c) => c.pins.filter((p) => !p.held)).length,
};

await mkdir(OUT_DIR, { recursive: true });
await writeFile(path.join(OUT_DIR, "results.json"), JSON.stringify({ summary, scrollChecks, results }, null, 2) + "\n");
console.log("[qa] summary", summary);
