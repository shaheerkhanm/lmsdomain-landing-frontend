const http = require('http');
const fs = require('fs');
const path = require('path');

const EVIDENCE_DIR = path.resolve(__dirname, '../docs/multipage/evidence/features-v2');
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

  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');

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
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const filepath = path.join(EVIDENCE_DIR, filename);
    fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
    console.log(`✓ Saved viewport screenshot: ${filename}`);
  }

  // 1. Navigate to /features
  console.log('\n--- 1. Loading updated /features page ---');
  await send('Page.navigate', { url: 'http://localhost:3001/features' });
  await sleep(3000);

  // 2. Viewport Screenshots
  const viewports = [
    { label: '1440px', width: 1440, height: 900, mobile: false, filename: 'features_v2_1440.png' },
    { label: '1024px', width: 1024, height: 800, mobile: false, filename: 'features_v2_1024.png' },
    { label: '768px', width: 768, height: 1024, mobile: true, filename: 'features_v2_768.png' },
    { label: '390px', width: 390, height: 844, mobile: true, filename: 'features_v2_390.png' },
  ];

  for (const vp of viewports) {
    await setViewport(vp.width, vp.height, vp.mobile);
    await sleep(800);
    await checkHorizontalOverflow(vp.label);
    await takeFullPageScreenshot(vp.filename);
  }

  // 3. Reduced Motion Screenshots
  console.log('\n--- 2. Capturing Reduced Motion States ---');
  await send('Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await setViewport(1440, 900, false);
  await sleep(600);
  await takeFullPageScreenshot('features_v2_reduced_motion_1440.png');

  await setViewport(390, 844, true);
  await sleep(600);
  await takeFullPageScreenshot('features_v2_reduced_motion_390.png');
  await send('Emulation.setEmulatedMedia', { media: 'screen', features: [] });

  // 4. Audience Switcher Tabs
  console.log('\n--- 3. Capturing Audience Tabs ---');
  await setViewport(1440, 900, false);
  await sleep(500);

  // Scroll to Audience Switcher
  await send('Runtime.evaluate', {
    expression: `document.querySelector('[aria-label="Target audiences"]').scrollIntoView({ behavior: 'instant', block: 'center' });`,
  });
  await sleep(600);
  await takeViewportScreenshot('audience_tab_institutes.png');

  // Click Coaches and Creators tab
  await send('Runtime.evaluate', {
    expression: `
      const btn = Array.from(document.querySelectorAll('button[role="tab"]')).find(b => b.textContent.includes('Coaches'));
      if (btn) btn.click();
    `,
  });
  await sleep(600);
  await takeViewportScreenshot('audience_tab_coaches.png');

  // Click Corporate Teams tab
  await send('Runtime.evaluate', {
    expression: `
      const btn = Array.from(document.querySelectorAll('button[role="tab"]')).find(b => b.textContent.includes('Corporate'));
      if (btn) btn.click();
    `,
  });
  await sleep(600);
  await takeViewportScreenshot('audience_tab_corporate.png');

  // 5. Feature Finder with Query
  console.log('\n--- 4. Capturing Feature Finder Search ---');
  await send('Runtime.evaluate', {
    expression: `document.querySelector('[aria-label="Find a feature search input"]').scrollIntoView({ behavior: 'instant', block: 'center' });`,
  });
  await sleep(500);

  // Type "quiz" into the input
  await send('Runtime.evaluate', {
    expression: `
      const input = document.querySelector('[aria-label="Find a feature search input"]');
      if (input) {
        input.value = 'quiz';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    `,
  });
  await sleep(600);
  await takeViewportScreenshot('feature_finder_search_active.png');

  // Reset input
  await send('Runtime.evaluate', {
    expression: `
      const input = document.querySelector('[aria-label="Find a feature search input"]');
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    `,
  });
  await sleep(400);

  // 6. Interactive Illustrations
  console.log('\n--- 5. Capturing Interactive Illustrations ---');

  // Scroll to In-Video Checkpoint Quiz card
  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('[aria-label="Interactive illustration for In-Video Checkpoint Quizzes"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `,
  });
  await sleep(600);
  await takeViewportScreenshot('interactive_checkpoint_quiz_paused.png');

  // Scroll to Watch-Percentage Completion card and simulate dragging slider to 90%
  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('[aria-label="Interactive illustration for Watch-Percentage Completion"]');
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        const slider = document.getElementById('watch-threshold-slider');
        if (slider) {
          slider.value = '90';
          slider.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    `,
  });
  await sleep(600);
  await takeViewportScreenshot('interactive_watch_percentage_slider.png');

  console.log('\nAll visual evidence captures complete!');
  process.exit(0);
}

run().catch(err => {
  console.error('Evidence capture failed:', err);
  process.exit(1);
});
