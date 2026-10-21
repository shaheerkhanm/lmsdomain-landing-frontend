const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const EVIDENCE_DIR = path.resolve(__dirname, '../docs/multipage/evidence/foundation');
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const AI_EVIDENCE_DIR = path.resolve(__dirname, '../docs/multipage/evidence/ai');

const CHROME_PORT = 9445;
const CHROME_USER_DATA = '/tmp/isolated-chrome-hp-review';
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
  let page = json.find((p) => p.type === 'page');
  return page;
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

    // 1. Homepage Desktop 1440px
    console.log('\n--- Capturing Homepage Desktop (1440px) ---');
    await setViewport(1440, 900, false);
    await send('Page.navigate', { url: 'http://127.0.0.1:3001/' });
    await sleep(2500);
    await takeFullPageScreenshot(path.join(EVIDENCE_DIR, 'home_1440_review.png'));

    // 2. Homepage Mobile 390px (Menu Closed)
    console.log('\n--- Capturing Homepage Mobile 390px (Menu Closed) ---');
    await setViewport(390, 844, true);
    await send('Page.navigate', { url: 'http://127.0.0.1:3001/' });
    await sleep(2500);
    await takeFullPageScreenshot(path.join(EVIDENCE_DIR, 'home_390_review.png'));

    // 3. Homepage Mobile 390px (Menu Open)
    console.log('\n--- Capturing Homepage Mobile 390px (Mobile Menu Open) ---');
    // Click the mobile hamburger button
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label="Open navigation menu"], header button:last-child');
          if (btn) btn.click();
        })()
      `,
    });
    await sleep(800);
    await takeViewportScreenshot(path.join(EVIDENCE_DIR, 'home_390_mobile_menu_open.png'));

    // 4. Update /ai screenshots with hidden HowItWorks, hidden FAQ, and hidden testimonials
    console.log('\n--- Capturing Updated /ai Page Screenshots ---');
    await setViewport(1440, 900, false);
    await send('Page.navigate', { url: 'http://127.0.0.1:3001/ai' });
    await sleep(2000);
    await takeFullPageScreenshot(path.join(AI_EVIDENCE_DIR, 'ai_1440.png'));

    await setViewport(390, 844, true);
    await send('Page.navigate', { url: 'http://127.0.0.1:3001/ai' });
    await sleep(2000);
    await takeFullPageScreenshot(path.join(AI_EVIDENCE_DIR, 'ai_390.png'));

    console.log('\n✓ Homepage & AI verification screenshots complete!');
  } finally {
    chromeProc.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});

