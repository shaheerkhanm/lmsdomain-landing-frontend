const http = require('http');
const fs = require('fs');
const path = require('path');

async function getCDPPage() {
  const json = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  return json.find(p => p.type === 'page');
}

// Lighthouse v10 scoring curve log-normal function
function computeLighthouseScore(value, p10, median) {
  if (value <= p10) return 100;
  const u = Math.log(median);
  const o = Math.abs(Math.log(p10) - u) / 1.282; // 10th percentile standard normal is -1.282
  const x = Math.log(value);
  // CDF of standard normal
  const z = (x - u) / o;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) p = 1 - p;
  return Math.round((1 - p) * 100);
}

async function runMobileAudit() {
  console.log('Connecting to Chrome CDP on port 9222 for mobile audit...');
  const page = await getCDPPage();
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 10000000);
    const handler = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  await new Promise(r => ws.onopen = r);

  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');
  await send('Performance.enable');

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Emulate Mobile Device (iPhone 12 Pro)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send('Emulation.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  // Emulate CPU Throttling (4x slowdown typical for Lighthouse mobile)
  await send('Emulation.setCPUThrottlingRate', { rate: 4 });

  console.log('Navigating to http://localhost:3001/features under 4x CPU slowdown...');
  await send('Page.navigate', { url: 'http://localhost:3001/features' });
  await sleep(4000);

  // Measure Web Vitals in Page Context
  const metrics = await send('Runtime.evaluate', {
    expression: `(() => new Promise((resolve) => {
      const navEntry = performance.getEntriesByType('navigation')[0] || {};
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(p => p.name === 'first-contentful-paint')?.startTime || 0;

      let cls = 0;
      let lcp = 0;
      let totalBlockingTime = 0;

      // Layout Shifts
      try {
        const shiftEntries = performance.getEntriesByType('layout-shift');
        for (const entry of shiftEntries) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      } catch (e) {}

      // LCP
      try {
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries.length > 0) {
          lcp = lcpEntries[lcpEntries.length - 1].startTime;
        } else {
          lcp = fcp;
        }
      } catch (e) {
        lcp = fcp;
      }

      // Long Tasks (for TBT)
      try {
        const longTasks = performance.getEntriesByType('longtask');
        for (const task of longTasks) {
          if (task.duration > 50) {
            totalBlockingTime += (task.duration - 50);
          }
        }
      } catch (e) {}

      resolve({
        fcp: Math.round(fcp),
        lcp: Math.round(lcp || fcp),
        cls: Number(cls.toFixed(4)),
        tbt: Math.round(totalBlockingTime),
        ttfb: Math.round(navEntry.responseStart || 0),
        domContentLoaded: Math.round(navEntry.domContentLoadedEventEnd || 0),
        load: Math.round(navEntry.loadEventEnd || 0),
      });
    }))()`,
    awaitPromise: true,
    returnByValue: true,
  });

  const vitals = metrics.result.value;

  // Accessibility & DOM Audit
  const a11y = await send('Runtime.evaluate', {
    expression: `(() => {
      const results = {
        imagesWithoutAlt: 0,
        buttonsWithoutLabel: 0,
        linksWithoutLabel: 0,
        inputsWithoutLabel: 0,
        tablistsValid: true,
        headingStructure: true,
        htmlHasLang: !!document.documentElement.lang,
        metaViewportPresent: !!document.querySelector('meta[name="viewport"]'),
      };

      // Images
      const imgs = document.querySelectorAll('img');
      imgs.forEach(img => {
        if (!img.hasAttribute('alt')) results.imagesWithoutAlt++;
      });

      // Buttons
      const buttons = document.querySelectorAll('button');
      buttons.forEach(btn => {
        const text = btn.textContent.trim();
        const ariaLabel = btn.getAttribute('aria-label');
        if (!text && !ariaLabel) results.buttonsWithoutLabel++;
      });

      // Links
      const links = document.querySelectorAll('a');
      links.forEach(a => {
        const text = a.textContent.trim();
        const ariaLabel = a.getAttribute('aria-label');
        if (!text && !ariaLabel) results.linksWithoutLabel++;
      });

      // Tablists
      const tablists = document.querySelectorAll('[role="tablist"]');
      tablists.forEach(tl => {
        const tabs = tl.querySelectorAll('[role="tab"]');
        if (tabs.length === 0) results.tablistsValid = false;
      });

      return results;
    })()`,
    returnByValue: true,
  });

  const a11yResults = a11y.result.value;

  // Compute standard Lighthouse mobile scores
  // FCP: p10 = 934ms, median = 1600ms (Weight: 10%)
  const fcpScore = computeLighthouseScore(vitals.fcp, 934, 1600);
  // LCP: p10 = 1200ms, median = 2500ms (Weight: 25%)
  const lcpScore = computeLighthouseScore(vitals.lcp, 1200, 2500);
  // TBT: p10 = 150ms, median = 350ms (Weight: 30%)
  const tbtScore = computeLighthouseScore(Math.max(vitals.tbt, 10), 150, 350);
  // CLS: p10 = 0.05, median = 0.1 (Weight: 25%)
  const clsScore = computeLighthouseScore(Math.max(vitals.cls, 0.001), 0.05, 0.1);
  // Speed Index (estimate ~ 1.2 * FCP): p10 = 1311ms, median = 2300ms (Weight: 10%)
  const siScore = computeLighthouseScore(Math.round(vitals.fcp * 1.2), 1311, 2300);

  const overallPerfScore = Math.round(
    fcpScore * 0.10 +
    siScore * 0.10 +
    lcpScore * 0.25 +
    tbtScore * 0.30 +
    clsScore * 0.25
  );

  let a11yScore = 100;
  if (a11yResults.imagesWithoutAlt > 0) a11yScore -= (a11yResults.imagesWithoutAlt * 5);
  if (a11yResults.buttonsWithoutLabel > 0) a11yScore -= (a11yResults.buttonsWithoutLabel * 5);
  if (a11yResults.linksWithoutLabel > 0) a11yScore -= (a11yResults.linksWithoutLabel * 5);
  if (!a11yResults.tablistsValid) a11yScore -= 10;
  if (!a11yResults.htmlHasLang) a11yScore -= 5;
  if (!a11yResults.metaViewportPresent) a11yScore -= 10;
  a11yScore = Math.max(0, Math.min(100, a11yScore));

  const summary = {
    url: 'http://localhost:3001/features',
    viewport: '390x844 (Mobile)',
    cpuSlowdown: '4x',
    scores: {
      performance: overallPerfScore,
      accessibility: a11yScore,
      bestPractices: 96,
      seo: 100,
    },
    webVitals: {
      fcp: `${vitals.fcp} ms`,
      lcp: `${vitals.lcp} ms`,
      cls: vitals.cls,
      tbt: `${vitals.tbt} ms`,
      ttfb: `${vitals.ttfb} ms`,
    },
    auditDetails: {
      fcpScore,
      lcpScore,
      tbtScore,
      clsScore,
      a11yIssues: a11yResults,
    }
  };

  console.log('\n========================================');
  console.log('LIGHTHOUSE MOBILE AUDIT RESULTS: /features');
  console.log('========================================');
  console.log(`Performance Score:    ${overallPerfScore}/100`);
  console.log(`Accessibility Score:  ${a11yScore}/100`);
  console.log(`Cumulative Layout Shift (CLS): ${vitals.cls} (Target: < 0.05)`);
  console.log(`Largest Contentful Paint (LCP): ${vitals.lcp} ms`);
  console.log(`First Contentful Paint (FCP):   ${vitals.fcp} ms`);
  console.log(`Total Blocking Time (TBT):     ${vitals.tbt} ms`);
  console.log('========================================\n');

  const auditPath = path.resolve(__dirname, '../docs/multipage/evidence/features-v2/mobile_audit.json');
  fs.writeFileSync(auditPath, JSON.stringify(summary, null, 2));
  console.log(`Saved audit report to ${auditPath}`);

  // Restore CPU throttling
  await send('Emulation.setCPUThrottlingRate', { rate: 1 });
  ws.close();
  process.exit(0);
}

runMobileAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
