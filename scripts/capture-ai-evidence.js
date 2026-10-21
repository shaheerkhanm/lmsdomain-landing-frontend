const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const EVIDENCE_DIR = path.resolve(__dirname, '../docs/multipage/evidence/ai');
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const CHROME_PORT = 9444;
const CHROME_USER_DATA = '/tmp/isolated-chrome-domie-ai';
const CHROME_BIN = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPort(port, maxRetries = 40) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const ok = await new Promise((resolve) => {
        const req = http.get({
          host: '127.0.0.1',
          port: port,
          path: '/json/version',
          headers: { Host: 'localhost' },
        }, (res) => {
          if (res.statusCode === 200) resolve(true);
          else resolve(false);
        });
        req.on('error', () => resolve(false));
      });
      if (ok) return true;
    } catch (e) {}
    await sleep(300);
  }
  return false;
}

async function getCDPPage(port) {
  // Check if a page target already exists
  const json = await new Promise((resolve, reject) => {
    http.get({
      host: '127.0.0.1',
      port: port,
      path: '/json',
      headers: { Host: 'localhost' },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
  
  let page = json.find((p) => p.type === 'page');
  if (page) return page;

  // If no page target exists, create a new one
  const newPage = await new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: port,
      path: '/json/new',
      method: 'PUT',
      headers: { Host: 'localhost' },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
  return newPage;
}

async function main() {
  console.log('Spawning isolated headless Chrome on port', CHROME_PORT);
  if (fs.existsSync(CHROME_USER_DATA)) {
    try {
      fs.rmSync(CHROME_USER_DATA, { recursive: true, force: true });
    } catch (e) {}
  }

  const chromeProc = spawn(CHROME_BIN, [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    `--user-data-dir=${CHROME_USER_DATA}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    '--disable-gpu',
    'about:blank',
  ], {
    stdio: 'ignore', // prevent pipe buffers from blocking the process
  });

  chromeProc.on('error', (err) => {
    console.error('Failed to spawn Chrome:', err);
  });

  const ready = await waitForPort(CHROME_PORT);
  if (!ready) {
    chromeProc.kill();
    throw new Error('Chrome did not open remote debugging port in time');
  }
  console.log('Isolated Chrome is ready on port', CHROME_PORT);

  try {
    const page = await getCDPPage(CHROME_PORT);
    let wsUrl = page.webSocketDebuggerUrl;
    if (wsUrl) {
      wsUrl = wsUrl.replace(/^ws:\/\/[^\/]+/, `ws://127.0.0.1:${CHROME_PORT}`);
    }
    console.log('Connecting to page WebSocket:', wsUrl);
    const ws = new WebSocket(wsUrl);

    if (ws.readyState !== 1) {
      await new Promise((resolve, reject) => {
        ws.addEventListener('open', resolve, { once: true });
        ws.addEventListener('error', reject, { once: true });
      });
    }
    console.log('Connected to isolated Chrome via WebSocket');

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
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });

    console.log('Navigating to http://127.0.0.1:3001/ai ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3001/ai' });
    await sleep(2500);

    async function setViewport(width, height, isMobile = false) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 2,
        mobile: isMobile,
      });
      await sleep(400);
    }

    async function takeFullPageScreenshot(filename) {
      const layout = await send('Page.getLayoutMetrics');
      const height = Math.ceil(layout.contentSize.height);
      const width = Math.ceil(layout.contentSize.width);

      const res = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
      });

      const filepath = path.join(EVIDENCE_DIR, filename);
      fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
      console.log(`✓ Saved screenshot: ${filename} (${width}x${height}px)`);
    }

    async function takeViewportScreenshot(filename) {
      const res = await send('Page.captureScreenshot', {
        format: 'png',
      });
      const filepath = path.join(EVIDENCE_DIR, filename);
      fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
      console.log(`✓ Saved viewport screenshot: ${filename}`);
    }

    async function scrollToY(y) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${y}, behavior: 'instant' });`,
      });
      await sleep(350);
    }

    // 1. Full page screenshots at 1440, 1024, 390px
    console.log('\n--- Capturing Full-Page Screenshots ---');
    await setViewport(1440, 900, false);
    await scrollToY(0);
    await takeFullPageScreenshot('ai_1440.png');

    await setViewport(1024, 768, false);
    await scrollToY(0);
    await takeFullPageScreenshot('ai_1024.png');

    await setViewport(390, 844, true);
    await scrollToY(0);
    await takeFullPageScreenshot('ai_390.png');

    // 2. Showcase steps at 1440px desktop
    console.log('\n--- Capturing Pinned Showcase Steps (Desktop 1440px) ---');
    await setViewport(1440, 900, false);
    await scrollToY(0);

    // Find the showcase section Y position
    const showcaseRect = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('domie-ai-tools');
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { top: rect.top + window.scrollY, height: el.offsetHeight };
        })()
      `,
      returnByValue: true,
    });

    const startY = showcaseRect.result.value.top;
    console.log('Showcase starts at Y =', startY);

    // Scroll to Step 1 (Tutor)
    await scrollToY(startY + 200);
    await sleep(400);
    await takeViewportScreenshot('ai_showcase_step1_tutor_1440.png');

    // Scroll down to Step 2 (Analytics)
    await scrollToY(startY + 1000);
    await sleep(400);
    await takeViewportScreenshot('ai_showcase_step2_analytics_1440.png');

    // Scroll down to Step 3 (Generator)
    await scrollToY(startY + 1800);
    await sleep(400);
    await takeViewportScreenshot('ai_showcase_step3_generator_1440.png');

    // Scroll down to Step 4 (Command Bar)
    await scrollToY(startY + 2600);
    await sleep(400);
    await takeViewportScreenshot('ai_showcase_step4_commandbar_1440.png');

    // Scroll BACK UP to Step 3
    console.log('\n--- Capturing Showcase Reverse Steps (Scrolling Up) ---');
    await scrollToY(startY + 1800);
    await sleep(400);
    await takeViewportScreenshot('ai_showcase_reverse_step3_1440.png');

    // Scroll BACK UP to Step 2
    await scrollToY(startY + 1000);
    await sleep(400);
    await takeViewportScreenshot('ai_showcase_reverse_step2_1440.png');

    // 3. Reduced Motion
    console.log('\n--- Capturing Reduced Motion Screenshots ---');
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
    await sleep(300);

    await setViewport(1440, 900, false);
    await scrollToY(0);
    await takeFullPageScreenshot('ai_reduced_motion_1440.png');

    await setViewport(390, 844, true);
    await scrollToY(0);
    await takeFullPageScreenshot('ai_reduced_motion_390.png');

    console.log('\n✓ All screenshots captured successfully in', EVIDENCE_DIR);
  } finally {
    chromeProc.kill('SIGTERM');
    console.log('Isolated Chrome process terminated cleanly.');
  }
}

main().catch((err) => {
  console.error('Fatal error during screenshot capture:', err);
  process.exit(1);
});
