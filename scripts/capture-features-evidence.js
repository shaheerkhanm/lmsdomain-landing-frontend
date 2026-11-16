const http = require('http');
const fs = require('fs');
const path = require('path');

const EVIDENCE_DIR = path.resolve(__dirname, '../docs/multipage/evidence/features');
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function getCDPPage() {
  const json = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  let page = json.find(p => p.type === 'page');
  if (!page) {
    // Create new target if none
    const newTarget = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9222/json/new?http://localhost:3001/features', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
    page = newTarget;
  }
  return page;
}

async function run() {
  console.log('Connecting to Chrome CDP on port 9222...');
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
  console.log('Connected to WebSocket!');

  // Enable domains
  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');
  await send('Console.enable');

  const consoleLogs = [];
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.method === 'Console.messageAdded') {
      consoleLogs.push(msg.params.message);
    }
  });

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function setViewport(width, height, isMobile = false) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile,
    });
  }

  async function checkHorizontalOverflow(widthLabel) {
    const res = await send('Runtime.evaluate', {
      expression: `({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })`,
      returnByValue: true,
    });
    const val = res.result.value;
    console.log(`[Overflow Check] ${widthLabel}: scrollWidth=${val.scrollWidth}, innerWidth=${val.innerWidth}, delta=${val.scrollWidth - val.innerWidth}`);
    return val;
  }

  async function takeFullPageScreenshot(filename) {
    // Get full document height
    const layout = await send('Page.getLayoutMetrics');
    const height = Math.ceil(layout.contentSize.height);
    const width = Math.ceil(layout.contentSize.width);

    // Capture screenshot
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

  // --------------------------------------------------------------------------
  // 1. Load /features page
  // --------------------------------------------------------------------------
  console.log('\n--- 1. Testing /features page ---');
  await send('Page.navigate', { url: 'http://localhost:3001/features' });
  await sleep(2500);

  // --------------------------------------------------------------------------
  // 2. Capture Viewports & Overflow
  // --------------------------------------------------------------------------
  const viewports = [
    { label: '1440px', width: 1440, height: 900, mobile: false, filename: 'features_1440.png' },
    { label: '1024px', width: 1024, height: 800, mobile: false, filename: 'features_1024.png' },
    { label: '768px', width: 768, height: 1024, mobile: true, filename: 'features_768.png' },
    { label: '390px', width: 390, height: 844, mobile: true, filename: 'features_390.png' },
  ];

  for (const vp of viewports) {
    await setViewport(vp.width, vp.height, vp.mobile);
    await sleep(800);
    await checkHorizontalOverflow(vp.label);
    await takeFullPageScreenshot(vp.filename);
  }

  // --------------------------------------------------------------------------
  // 3. Reduced Motion Screenshots (1440 & 390)
  // --------------------------------------------------------------------------
  console.log('\n--- 2. Testing Prefers-Reduced-Motion ---');
  await send('Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });

  // 1440 reduced motion
  await setViewport(1440, 900, false);
  await sleep(600);
  await takeFullPageScreenshot('features_reduced_motion_1440.png');

  // 390 reduced motion
  await setViewport(390, 844, true);
  await sleep(600);
  await takeFullPageScreenshot('features_reduced_motion_390.png');

  // Reset reduced motion
  await send('Emulation.setEmulatedMedia', { media: 'screen', features: [] });

  // --------------------------------------------------------------------------
  // 4. Sticky Pill Bar Scrolling & Active Tab Transitions (1440px)
  // --------------------------------------------------------------------------
  console.log('\n--- 3. Testing Desktop Sticky Tab Transitions ---');
  await setViewport(1440, 900, false);
  await sleep(600);

  // Scroll to AI Spotlight (#ai-powered-tools)
  await send('Runtime.evaluate', {
    expression: `document.getElementById('ai-powered-tools').scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -100);`,
  });
  await sleep(800);
  await takeViewportScreenshot('features_sticky_tab_01_domie_ai.png');

  // Scroll to Course Learning (#course-learning)
  await send('Runtime.evaluate', {
    expression: `document.getElementById('course-learning').scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -100);`,
  });
  await sleep(800);
  await takeViewportScreenshot('features_sticky_tab_02_course_learning.png');

  // Scroll to Assessment (#assessment-and-evaluation)
  await send('Runtime.evaluate', {
    expression: `document.getElementById('assessment-and-evaluation').scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -100);`,
  });
  await sleep(800);
  await takeViewportScreenshot('features_sticky_tab_03_assessment.png');

  // Scroll to Sales & Payments (#course-sales-and-payments)
  await send('Runtime.evaluate', {
    expression: `document.getElementById('course-sales-and-payments').scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -100);`,
  });
  await sleep(800);
  await takeViewportScreenshot('features_sticky_tab_04_sales_payments.png');

  // --------------------------------------------------------------------------
  // 5. Test Request Demo Modals
  // --------------------------------------------------------------------------
  console.log('\n--- 4. Testing Request Demo Modals ---');
  // Scroll back to top
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
  await sleep(500);

  // Click Hero "Request a Demo" button
  await send('Runtime.evaluate', {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Request a Demo'));
      if (btn) btn.click();
    `,
  });
  await sleep(800);
  await takeViewportScreenshot('features_demo_modal_hero.png');

  // Verify modal is open in DOM
  const modalOpenRes = await send('Runtime.evaluate', {
    expression: `!!document.querySelector('[role="dialog"]')`,
    returnByValue: true,
  });
  console.log(`Hero Modal opened in DOM: ${modalOpenRes.result.value}`);

  // Close modal via ESC key
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await sleep(500);

  // --------------------------------------------------------------------------
  // 6. Homepage Verification (1440px unchanged)
  // --------------------------------------------------------------------------
  console.log('\n--- 5. Verifying Homepage Unchanged at 1440px ---');
  await send('Page.navigate', { url: 'http://localhost:3001/' });
  await sleep(3000);
  await setViewport(1440, 900, false);
  await sleep(1000);
  await takeFullPageScreenshot('homepage_1440_unchanged.png');

  console.log('\nAll verification screenshots and tests complete!');
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});

