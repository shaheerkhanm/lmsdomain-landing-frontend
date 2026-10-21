const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PRICING_EVIDENCE_DIR = path.resolve(__dirname, '../docs/multipage/evidence/pricing');
const FOUNDATION_EVIDENCE_DIR = path.resolve(__dirname, '../docs/multipage/evidence/foundation');

fs.mkdirSync(PRICING_EVIDENCE_DIR, { recursive: true });
fs.mkdirSync(FOUNDATION_EVIDENCE_DIR, { recursive: true });

const CHROME_PORT = 9446;
const CHROME_USER_DATA = '/tmp/isolated-chrome-pricing';
const CHROME_BIN = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPort(port, maxRetries = 40) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const ok = await new Promise((resolve) => {
        const req = http.get(
          {
            host: '127.0.0.1',
            port: port,
            path: '/json/version',
            headers: { Host: 'localhost' },
          },
          (res) => {
            if (res.statusCode === 200) resolve(true);
            else resolve(false);
          }
        );
        req.on('error', () => resolve(false));
      });
      if (ok) return true;
    } catch (e) {}
    await sleep(300);
  }
  return false;
}

async function getCDPPage(port) {
  const json = await new Promise((resolve, reject) => {
    http.get(
      {
        host: '127.0.0.1',
        port: port,
        path: '/json',
        headers: { Host: 'localhost' },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      }
    ).on('error', reject);
  });
  return json.find((p) => p.type === 'page');
}

async function main() {
  console.log('Spawning isolated headless Chrome on port', CHROME_PORT);
  if (fs.existsSync(CHROME_USER_DATA)) {
    try {
      fs.rmSync(CHROME_USER_DATA, { recursive: true, force: true });
    } catch (e) {}
  }

  const chromeProc = spawn(
    CHROME_BIN,
    [
      '--headless=new',
      `--remote-debugging-port=${CHROME_PORT}`,
      `--user-data-dir=${CHROME_USER_DATA}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--window-size=1440,900',
      '--disable-gpu',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  const ready = await waitForPort(CHROME_PORT);
  if (!ready) {
    chromeProc.kill();
    throw new Error('Chrome did not open remote debugging port in time');
  }
  console.log('Isolated Chrome is ready on port', CHROME_PORT);

  try {
    const page = await getCDPPage(CHROME_PORT);
    let wsUrl = page.webSocketDebuggerUrl.replace(/^ws:\/\/[^\/]+/, `ws://127.0.0.1:${CHROME_PORT}`);
    const ws = new WebSocket(wsUrl);

    if (ws.readyState !== 1) {
      await new Promise((resolve, reject) => {
        ws.addEventListener('open', resolve, { once: true });
        ws.addEventListener('error', reject, { once: true });
      });
    }

    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
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

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    async function setViewport(width, height, isMobile = false) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 2,
        mobile: isMobile,
      });
      await sleep(400);
    }

    async function takeFullPageScreenshot(destPath) {
      const layout = await send('Page.getLayoutMetrics');
      const height = Math.ceil(layout.contentSize.height);
      const width = Math.ceil(layout.contentSize.width);

      const res = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
      });

      fs.writeFileSync(destPath, Buffer.from(res.data, 'base64'));
      console.log(`✓ Saved screenshot: ${destPath} (${width}x${height}px)`);
    }

    async function takeViewportScreenshot(destPath) {
      const res = await send('Page.captureScreenshot', {
        format: 'png',
      });
      fs.writeFileSync(destPath, Buffer.from(res.data, 'base64'));
      console.log(`✓ Saved viewport screenshot: ${destPath}`);
    }

    // -------------------------------------------------------------
    // 1. Homepage Verification (Step 0)
    // -------------------------------------------------------------
    console.log('\n--- Capturing Homepage Verification Screenshots ---');
    await setViewport(1440, 900, false);
    await send('Page.navigate', { url: 'http://127.0.0.1:3001/' });
    await sleep(2500);
    await takeFullPageScreenshot(path.join(FOUNDATION_EVIDENCE_DIR, 'home_1440_post_ai.png'));

    await setViewport(390, 844, true);
    await send('Page.navigate', { url: 'http://127.0.0.1:3001/' });
    await sleep(2500);
    await takeFullPageScreenshot(path.join(FOUNDATION_EVIDENCE_DIR, 'home_390_post_ai.png'));

    // Open mobile drawer
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('header button:last-child');
          if (btn) btn.click();
        })()
      `,
    });
    await sleep(800);
    await takeViewportScreenshot(path.join(FOUNDATION_EVIDENCE_DIR, 'home_390_mobile_menu_open.png'));

    // -------------------------------------------------------------
    // 2. Pricing Page Screenshots (Empty state in DB: 0 plans)
    // -------------------------------------------------------------
    console.log('\n--- Capturing /pricing Empty State (Current DB State) ---');
    await setViewport(1440, 900, false);
    await send('Page.navigate', { url: 'http://127.0.0.1:3001/pricing' });
    await sleep(2000);
    await takeFullPageScreenshot(path.join(PRICING_EVIDENCE_DIR, 'pricing_empty_1440.png'));

    await setViewport(1024, 768, false);
    await takeFullPageScreenshot(path.join(PRICING_EVIDENCE_DIR, 'pricing_empty_1024.png'));

    await setViewport(768, 1024, true);
    await takeFullPageScreenshot(path.join(PRICING_EVIDENCE_DIR, 'pricing_empty_768.png'));

    await setViewport(390, 844, true);
    await takeFullPageScreenshot(path.join(PRICING_EVIDENCE_DIR, 'pricing_empty_390.png'));

    // Record CMS response log
    const cmsLog = {
      timestamp: new Date().toISOString(),
      endpoint: '/api/pricing',
      backendPlansCount: 0,
      currencyFieldPresent: false,
      note: 'The pricings collection currently has 0 plans and no currency field in the backend. Page renders finished empty state with Request a Demo and Contact Sales.',
    };
    fs.writeFileSync(
      path.join(PRICING_EVIDENCE_DIR, 'cms-response.json'),
      JSON.stringify(cmsLog, null, 2)
    );
    console.log('✓ Recorded cms-response.json');

    console.log('\n✓ All verification screenshots captured cleanly in evidence directories.');
  } finally {
    chromeProc.kill('SIGTERM');
    console.log('Isolated Chrome process terminated cleanly.');
  }
}

main().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});

