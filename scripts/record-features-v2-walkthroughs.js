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

  return json.find(p => p.type === 'page');
}

async function recordWalkthrough() {
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

  const evalScript = async (expr) => {
    const res = await send('Runtime.evaluate', {
      expression: expr,
      awaitPromise: true,
      returnByValue: true,
    });
    return res && res.result ? res.result.value : null;
  };

  const scrollToY = async (y, delay = 40) => {
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${Math.round(y)}, behavior: 'instant' });`,
    });
    await sleep(delay);
  };

  // ========================================================
  // 1. RECORD DESKTOP (1440x900) WALKTHROUGH
  // ========================================================
  console.log('\n--- 1. Recording Desktop (1440x900) Walkthrough ---');
  const dWidth = 1440;
  const dHeight = 900;
  await send('Emulation.setDeviceMetricsOverride', {
    width: dWidth,
    height: dHeight,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await send('Page.navigate', { url: 'http://localhost:3001/features' });
  await sleep(3000);

  // Setup desktop recorder canvas
  await evalScript(`(() => {
    window.__recCanvas = document.createElement('canvas');
    window.__recCanvas.width = 1280;
    window.__recCanvas.height = 800;
    window.__recCtx = window.__recCanvas.getContext('2d');
    window.__videoChunks = [];

    const stream = window.__recCanvas.captureStream(24);
    let mime = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm';
    window.__mediaRecorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 3000000 });
    window.__mediaRecorder.ondataavailable = e => { if (e.data.size > 0) window.__videoChunks.push(e.data); };
    window.__mediaRecorder.start(100);
  })()`);

  const dTotalHeight = await evalScript('Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)');
  console.log(`Desktop page total height: ${dTotalHeight}px`);

  const dSteps = 90;
  for (let i = 0; i <= dSteps; i++) {
    const y = (i / dSteps) * (dTotalHeight - dHeight);
    await scrollToY(y, 45);

    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 75 });
    await evalScript(`(() => new Promise(res => {
      const img = new Image();
      img.onload = () => {
        window.__recCtx.drawImage(img, 0, 0, 1280, 800);
        res();
      };
      img.src = 'data:image/jpeg;base64,' + "${shot.data}";
    }))()`);
  }

  // Hold at footer briefly
  for (let h = 0; h < 8; h++) {
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 75 });
    await evalScript(`(() => new Promise(res => {
      const img = new Image();
      img.onload = () => {
        window.__recCtx.drawImage(img, 0, 0, 1280, 800);
        res();
      };
      img.src = 'data:image/jpeg;base64,' + "${shot.data}";
    }))()`);
    await sleep(40);
  }

  console.log('Finalizing Desktop WebM video...');
  const dVideoBase64 = await evalScript(`(() => new Promise(res => {
    window.__mediaRecorder.onstop = () => {
      const blob = new Blob(window.__videoChunks, { type: window.__mediaRecorder.mimeType });
      const reader = new FileReader();
      reader.onloadend = () => res(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    };
    window.__mediaRecorder.stop();
  }))()`);

  if (dVideoBase64) {
    const buf = Buffer.from(dVideoBase64, 'base64');
    const dPath = path.join(EVIDENCE_DIR, 'features_v2_walkthrough_1440.webm');
    fs.writeFileSync(dPath, buf);
    console.log(`✓ Saved ${dPath} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  // ========================================================
  // 2. RECORD MOBILE (390x844) WALKTHROUGH
  // ========================================================
  console.log('\n--- 2. Recording Mobile (390x844) Walkthrough ---');
  const mWidth = 390;
  const mHeight = 844;
  await send('Emulation.setDeviceMetricsOverride', {
    width: mWidth,
    height: mHeight,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await send('Page.navigate', { url: 'http://localhost:3001/features' });
  await sleep(3000);

  // Setup mobile recorder canvas
  await evalScript(`(() => {
    window.__recCanvas = document.createElement('canvas');
    window.__recCanvas.width = 390;
    window.__recCanvas.height = 844;
    window.__recCtx = window.__recCanvas.getContext('2d');
    window.__videoChunks = [];

    const stream = window.__recCanvas.captureStream(24);
    let mime = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm';
    window.__mediaRecorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 2500000 });
    window.__mediaRecorder.ondataavailable = e => { if (e.data.size > 0) window.__videoChunks.push(e.data); };
    window.__mediaRecorder.start(100);
  })()`);

  const mTotalHeight = await evalScript('Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)');
  console.log(`Mobile page total height: ${mTotalHeight}px`);

  const mSteps = 95;
  for (let i = 0; i <= mSteps; i++) {
    const y = (i / mSteps) * (mTotalHeight - mHeight);
    await scrollToY(y, 45);

    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 75 });
    await evalScript(`(() => new Promise(res => {
      const img = new Image();
      img.onload = () => {
        window.__recCtx.drawImage(img, 0, 0, 390, 844);
        res();
      };
      img.src = 'data:image/jpeg;base64,' + "${shot.data}";
    }))()`);
  }

  // Hold at footer briefly
  for (let h = 0; h < 8; h++) {
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 75 });
    await evalScript(`(() => new Promise(res => {
      const img = new Image();
      img.onload = () => {
        window.__recCtx.drawImage(img, 0, 0, 390, 844);
        res();
      };
      img.src = 'data:image/jpeg;base64,' + "${shot.data}";
    }))()`);
    await sleep(40);
  }

  console.log('Finalizing Mobile WebM video...');
  const mVideoBase64 = await evalScript(`(() => new Promise(res => {
    window.__mediaRecorder.onstop = () => {
      const blob = new Blob(window.__videoChunks, { type: window.__mediaRecorder.mimeType });
      const reader = new FileReader();
      reader.onloadend = () => res(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    };
    window.__mediaRecorder.stop();
  }))()`);

  if (mVideoBase64) {
    const buf = Buffer.from(mVideoBase64, 'base64');
    const mPath = path.join(EVIDENCE_DIR, 'features_v2_walkthrough_390.webm');
    fs.writeFileSync(mPath, buf);
    console.log(`✓ Saved ${mPath} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  ws.close();
  console.log('\nAll walkthrough recordings completed successfully!');
  process.exit(0);
}

recordWalkthrough().catch(err => {
  console.error('Walkthrough recording failed:', err);
  process.exit(1);
});

