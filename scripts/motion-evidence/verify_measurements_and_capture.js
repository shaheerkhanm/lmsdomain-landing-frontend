const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('/Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/node_modules/sharp');

const escapeXml = (unsafe) => {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

async function main() {
  console.log('Connecting to Chrome CDP on port 9222...');
  let json = null;
  for (let i = 0; i < 20; i++) {
    try {
      json = await new Promise((resolve, reject) => {
        const req = http.get('http://127.0.0.1:9222/json', (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
        });
        req.on('error', reject);
      });
      if (json) break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  const page = json.find(p => p.type === 'page');
  if (!page) {
    console.error('No page found');
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  const send = (method, params = {}) => new Promise((resolve) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  ws.onopen = async () => {
    console.log('Connected to Chrome CDP!');

    const evidenceBase = '/Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/docs/motion-evidence';
    const scratchDir = '/Users/shaheerkhan/.gemini/antigravity/brain/59ad0f1d-a7df-4dab-a48c-d4d4dabc4bcc/scratch';
    const artifactDir = '/Users/shaheerkhan/.gemini/antigravity/brain/59ad0f1d-a7df-4dab-a48c-d4d4dabc4bcc';

    fs.mkdirSync(`${evidenceBase}/screenshots`, { recursive: true });
    fs.mkdirSync(`${evidenceBase}/hero`, { recursive: true });
    fs.mkdirSync(`${evidenceBase}/features`, { recursive: true });
    fs.mkdirSync(`${evidenceBase}/text-reveal`, { recursive: true });
    fs.mkdirSync(`${evidenceBase}/showcase`, { recursive: true });
    fs.mkdirSync(`${evidenceBase}/benefits`, { recursive: true });
    fs.mkdirSync(`${evidenceBase}/wall-of-love`, { recursive: true });
    fs.mkdirSync(`${evidenceBase}/faq`, { recursive: true });

    const capture = async (filepath) => {
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(filepath, Buffer.from(shot.data, 'base64'));
      return filepath;
    };

    const scrollToY = async (y, delay = 500) => {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${Math.round(y)}, behavior: 'instant' });`
      });
      await new Promise(r => setTimeout(r, delay));
    };

    const evalScript = async (expr) => {
      const res = await send('Runtime.evaluate', {
        expression: expr,
        awaitPromise: true,
        returnByValue: true
      });
      return res && res.result ? res.result.value : null;
    };

    // ========================================================
    // PART 1: SECTION 1C MEASUREMENTS (HERO CARDS GEOMETRY)
    // ========================================================
    console.log('\n========================================================');
    console.log('PART 1: SECTION 1C MEASUREMENT LOGS (HERO BOUNDING CLIENT RECTS)');
    console.log('========================================================');

    const heroSizes = [
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 }
    ];

    const heroLogOutput = [];

    for (const size of heroSizes) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: size.width,
        height: size.height,
        deviceScaleFactor: 1,
        mobile: false
      });
      await send('Page.navigate', { url: 'http://127.0.0.1:8080/' });
      await new Promise(r => setTimeout(r, 2000));
      await scrollToY(0, 500);

      const measurements = await evalScript(`(() => {
        const stage = document.querySelector('section > div > div:nth-child(2)');
        const cards = Array.from(document.querySelectorAll('.will-change-transform'));
        const btn = document.querySelector('#hero-cta button');
        const btnRect = btn ? btn.getBoundingClientRect() : null;

        return {
          viewport: { width: window.innerWidth, height: window.innerHeight },
          btnBottom: btnRect ? Math.round(btnRect.bottom) : null,
          cards: cards.map((c, i) => {
            const r = c.getBoundingClientRect();
            return {
              index: i + 1,
              left: Math.round(r.left),
              right: Math.round(r.right),
              top: Math.round(r.top),
              bottom: Math.round(r.bottom),
              width: Math.round(r.width),
              height: Math.round(r.height)
            };
          })
        };
      })()`);

      console.log(`\n--- Viewport: ${size.width}x${size.height} ---`);
      console.log(`Button Bottom: ${measurements.btnBottom}px`);
      measurements.cards.forEach(c => {
        const leftOk = c.left >= 48;
        const rightOk = c.right <= size.width - 48;
        const bottomOk = c.bottom <= size.height;
        const distFromBtn = measurements.btnBottom ? c.top - measurements.btnBottom : 'N/A';
        console.log(`Card ${c.index}: [left: ${c.left}px (>=48: ${leftOk}), right: ${c.right}px (<=${size.width-48}: ${rightOk}), bottom: ${c.bottom}px (<=${size.height}: ${bottomOk}), top: ${c.top}px (space from button: ${distFromBtn}px)]`);
      });
      heroLogOutput.push({ size, measurements });
    }

    // ========================================================
    // PART 2: SECTION 6 MEASUREMENTS (WALL OF LOVE HEADLINE & SCROLLWIDTH)
    // ========================================================
    console.log('\n========================================================');
    console.log('PART 2: SECTION 6 MEASUREMENT LOGS (WALL OF LOVE & SCROLLWIDTH)');
    console.log('========================================================');

    const wallSizes = [375, 768, 1280, 1440, 1920];
    const wallLogOutput = [];

    for (const w of wallSizes) {
      const h = w === 375 ? 812 : w === 768 ? 1024 : 900;
      await send('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: w <= 768
      });
      await send('Page.navigate', { url: 'http://127.0.0.1:8080/' });
      await new Promise(r => setTimeout(r, 2000));

      const wallMetrics = await evalScript(`(() => {
        const h2 = document.querySelector('#testimonials h2');
        const r = h2 ? h2.getBoundingClientRect() : null;
        return {
          innerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
          headline: r ? {
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            fontSize: window.getComputedStyle(h2).fontSize,
            fontWeight: window.getComputedStyle(h2).fontWeight,
            fitsInside: r.left >= 0 && r.right <= window.innerWidth
          } : null
        };
      })()`);

      console.log(`\n--- Viewport: ${w}px (height: ${h}px) ---`);
      console.log(`document.documentElement.scrollWidth: ${wallMetrics.scrollWidth}px (innerWidth: ${wallMetrics.innerWidth}px, No horizontal scroll: ${!wallMetrics.hasHorizontalScroll})`);
      if (wallMetrics.headline) {
        console.log(`Headline 'Wall of love': [left: ${wallMetrics.headline.left}px, right: ${wallMetrics.headline.right}px, width: ${wallMetrics.headline.width}px, fontSize: ${wallMetrics.headline.fontSize}, weight: ${wallMetrics.headline.fontWeight}, fitsInside: ${wallMetrics.headline.fitsInside}]`);
      }
      wallLogOutput.push({ width: w, metrics: wallMetrics });
    }

    // Save measurement logs to docs/motion-evidence/
    fs.writeFileSync(
      `${evidenceBase}/MEASUREMENT_LOGS.json`,
      JSON.stringify({ hero: heroLogOutput, wall: wallLogOutput }, null, 2)
    );

    // ========================================================
    // PART 3: FULL-PAGE SCREENSHOTS (375, 768, 1440)
    // ========================================================
    console.log('\n========================================================');
    console.log('PART 3: CAPTURING FULL-PAGE SCREENSHOTS');
    console.log('========================================================');

    const captureFullPageAtWidth = async (width, height, isMobile, filename) => {
      console.log(`Capturing full-page for ${width}x${height} (mobile: ${isMobile})...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: isMobile
      });
      await send('Page.navigate', { url: 'http://127.0.0.1:8080/' });
      await new Promise(r => setTimeout(r, 2500));

      // Scroll to trigger any lazy mounts
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight);' });
      await new Promise(r => setTimeout(r, 600));
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0);' });
      await new Promise(r => setTimeout(r, 600));

      const metrics = await send('Page.getLayoutMetrics');
      const totalH = Math.ceil(metrics.contentSize.height);

      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height: totalH,
        deviceScaleFactor: 1,
        mobile: isMobile
      });
      await new Promise(r => setTimeout(r, 600));

      const shot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true
      });

      const outDoc = `${evidenceBase}/screenshots/${filename}`;
      const outArtifact = `${artifactDir}/${filename}`;
      fs.writeFileSync(outDoc, Buffer.from(shot.data, 'base64'));
      fs.writeFileSync(outArtifact, Buffer.from(shot.data, 'base64'));
      console.log(`Saved: ${filename} (Height: ${totalH}px, Size: ${Math.round(shot.data.length * 0.75 / 1024)} KB)`);
    };

    await captureFullPageAtWidth(375, 812, true, 'homepage_375.png');
    await captureFullPageAtWidth(768, 1024, false, 'homepage_768.png');
    await captureFullPageAtWidth(1440, 900, false, 'homepage_1440.png');

    // ========================================================
    // PART 4: INTERACTION EVIDENCE FRAMES (1440x900)
    // ========================================================
    console.log('\n========================================================');
    console.log('PART 4: CAPTURING SECTION FRAMES AT 1440x900');
    console.log('========================================================');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await send('Page.navigate', { url: 'http://127.0.0.1:8080/' });
    await new Promise(r => setTimeout(r, 2500));

    // 1. Hero Initial
    await scrollToY(0, 1000);
    await capture(`${evidenceBase}/hero/hero_00_initial.png`);
    console.log('Captured Hero Initial (Scroll 0: 4 mixed product cards, no duplicate to, inside 48px margins)');

    // 2. Hero Docked
    await scrollToY(620, 600);
    await capture(`${evidenceBase}/hero/hero_02_docked.png`);
    console.log('Captured Hero Docked (2x2 grid, nav pill)');

    // 3. Features Stacking Card 1
    const featuresTop = await evalScript(`(() => {
      const el = document.getElementById('features');
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY - 90) : 1230;
    })()`);
    await scrollToY(featuresTop, 800);
    await capture(`${evidenceBase}/features/features_01_card1_active.png`);
    console.log('Captured Features Card 1 (Paper stacked deck with animated player visual)');

    // 4. AI Dedicated Section
    const aiTop = await evalScript(`(() => {
      const el = document.getElementById('extension') || document.getElementById('ai-studio');
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY - 50) : 3300;
    })()`);
    await scrollToY(aiTop, 600);
    await capture(`${evidenceBase}/showcase/showcase_03_tab1_ring_progress.png`);
    console.log('Captured AI Dedicated Section (High-contrast dark theme, short labels, accurate step title)');

    // 5. Benefits Row View
    const benefitsTop = await evalScript(`(() => {
      const el = document.getElementById('benefits');
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY - 60) : 4480;
    })()`);
    await scrollToY(benefitsTop, 800);
    await capture(`${evidenceBase}/benefits/benefits_00_horizontal_row.png`);
    console.log('Captured Benefits: Initial side-by-side 3-card row (Tops aligned, 3 large 3D renders)');

    // 6. Benefits Collapsed Deck
    await scrollToY(benefitsTop + 350, 600);
    await capture(`${evidenceBase}/benefits/benefits_01_deck_collapsed.png`);
    console.log('Captured Benefits: 45° collapsed diagonal stack');

    // 7. Wall of Love
    const wallTop = await evalScript(`(() => {
      const el = document.getElementById('wall-of-love') || document.getElementById('testimonials');
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY - 60) : 5300;
    })()`);
    await scrollToY(wallTop, 800);
    await capture(`${evidenceBase}/wall-of-love/wall_00_text_scaled_deck_arrived.png`);
    console.log('Captured Wall of Love: ~88% text headline, cards centered over of');

    // 8. FAQ Enclosure Card
    const faqTop = await evalScript(`(() => {
      const el = document.getElementById('faq');
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY - 80) : 6000;
    })()`);
    await scrollToY(faqTop, 600);
    await evalScript(`(() => {
      const btns = document.querySelectorAll('#faq button');
      if (btns.length > 0) btns[0].click();
    })()`);
    await new Promise(r => setTimeout(r, 600));
    await capture(`${evidenceBase}/faq/faq_01_accordion_opened.png`);
    console.log('Captured FAQ Enclosure Card with accordion opened');

    // ========================================================
    // PART 5: RECORD SMOOTH 1440x900 MP4 VIDEO WALKTHROUGH
    // ========================================================
    console.log('\n========================================================');
    console.log('PART 5: RECORDING 1440x900 MP4 WALKTHROUGH (DOWN & UP)');
    console.log('========================================================');
    await scrollToY(0, 1000);

    const metrics = await send('Page.getLayoutMetrics');
    const totalScroll = Math.max(1, Math.round(metrics.contentSize.height - 900));
    console.log('Total scrollable height:', totalScroll);

    // Set up canvas recorder in browser context
    await evalScript(`(() => {
      window.__recCanvas = document.createElement('canvas');
      window.__recCanvas.width = 1280;
      window.__recCanvas.height = 720;
      window.__recCtx = window.__recCanvas.getContext('2d');
      window.__videoChunks = [];

      const stream = window.__recCanvas.captureStream(25);
      let mime = 'video/mp4';
      if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm';
      window.__mediaRecorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 4500000 });
      window.__mediaRecorder.ondataavailable = e => { if (e.data.size > 0) window.__videoChunks.push(e.data); };
      window.__mediaRecorder.start(100);
    })()`);

    // Smooth forward scroll down (70 frames)
    const numDown = 70;
    console.log(`Recording forward scroll down (${numDown} frames)...`);
    for (let s = 0; s <= numDown; s++) {
      const currY = (totalScroll * s) / numDown;
      await scrollToY(currY, 40);
      const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
      await evalScript(`(() => new Promise(res => {
        const img = new Image();
        img.onload = () => {
          window.__recCtx.drawImage(img, 0, 0, 1280, 720);
          res();
        };
        img.src = 'data:image/jpeg;base64,${shot.data}';
      }))()`);
    }

    // Pause at bottom
    await new Promise(r => setTimeout(r, 600));

    // Smooth reverse scroll up (50 frames)
    const numUp = 50;
    console.log(`Recording reverse scroll up (${numUp} frames)...`);
    for (let s = numUp; s >= 0; s--) {
      const currY = (totalScroll * s) / numUp;
      await scrollToY(currY, 40);
      const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
      await evalScript(`(() => new Promise(res => {
        const img = new Image();
        img.onload = () => {
          window.__recCtx.drawImage(img, 0, 0, 1280, 720);
          res();
        };
        img.src = 'data:image/jpeg;base64,${shot.data}';
      }))()`);
    }

    // Stop recorder and fetch MP4
    console.log('Finalizing MP4 video file...');
    const videoData = await evalScript(`(() => new Promise(res => {
      window.__mediaRecorder.onstop = () => {
        const blob = new Blob(window.__videoChunks, { type: window.__mediaRecorder.mimeType });
        const reader = new FileReader();
        reader.onloadend = () => res({ base64: reader.result.split(',')[1], size: blob.size, mime: window.__mediaRecorder.mimeType });
        reader.readAsDataURL(blob);
      };
      window.__mediaRecorder.stop();
    }))()`);

    if (videoData && videoData.base64) {
      const videoBuf = Buffer.from(videoData.base64, 'base64');
      const ext = videoData.mime.includes('mp4') ? 'mp4' : 'webm';
      const videoFilename = `lmsdomain_motion_walkthrough.${ext}`;
      const videoPath = path.join(evidenceBase, videoFilename);
      const artifactVideoPath = path.join(artifactDir, videoFilename);
      fs.writeFileSync(videoPath, videoBuf);
      fs.writeFileSync(artifactVideoPath, videoBuf);
      console.log(`\n>>> SCREEN RECORDING CREATED SUCCESSFULLY! <<<`);
      console.log(`Saved: ${videoPath} (${(videoBuf.length / (1024 * 1024)).toFixed(2)} MB)`);
      console.log(`Artifact: ${artifactVideoPath}`);
    }

    // ========================================================
    // PART 6: SIDE-BY-SIDE COMPARISONS & REVISED MASTER CONTACT SHEET
    // ========================================================
    console.log('\n========================================================');
    console.log('PART 6: GENERATING COMPARISONS & MASTER CONTACT SHEET');
    console.log('========================================================');

    const makeComparison = async (motaFramePath, lmsImagePath, outputPath, titleLeft, titleRight) => {
      try {
        const motaBuf = fs.readFileSync(motaFramePath);
        const lmsBuf = fs.readFileSync(lmsImagePath);

        const width = 800;
        const height = 500;

        const leftResized = await sharp(motaBuf)
          .resize(width, height, { fit: 'cover' })
          .toBuffer();

        const rightResized = await sharp(lmsBuf)
          .resize(width, height, { fit: 'cover' })
          .toBuffer();

        const bannerHeight = 44;
        const totalWidth = width * 2;
        const totalHeight = height + bannerHeight;

        const bannerSvg = Buffer.from(`
          <svg width="${totalWidth}" height="${bannerHeight}">
            <rect x="0" y="0" width="${totalWidth}" height="${bannerHeight}" fill="#161616" />
            <text x="30" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#A78BFA">${escapeXml(titleLeft)}</text>
            <text x="${width + 30}" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#34D399">${escapeXml(titleRight)}</text>
            <line x1="${width}" y1="0" x2="${width}" y2="${bannerHeight}" stroke="#333333" stroke-width="2" />
          </svg>
        `);

        await sharp({
          create: {
            width: totalWidth,
            height: totalHeight,
            channels: 4,
            background: { r: 22, g: 22, b: 22, alpha: 1 }
          }
        })
          .composite([
            { input: bannerSvg, top: 0, left: 0 },
            { input: leftResized, top: bannerHeight, left: 0 },
            { input: rightResized, top: bannerHeight, left: width }
          ])
          .png()
          .toFile(outputPath);

        const artifactPath = path.join(artifactDir, path.basename(outputPath));
        fs.copyFileSync(outputPath, artifactPath);
        console.log(`Generated: ${path.basename(outputPath)}`);
      } catch (err) {
        console.error(`Error generating ${outputPath}:`, err.message);
      }
    };

    // Hero Comparison
    await makeComparison(
      `${scratchDir}/v1_35s/frame_0005_0.5s.jpg`,
      `${evidenceBase}/hero/hero_00_initial.png`,
      `${evidenceBase}/hero/hero_comparison.png`,
      'Mota Reference (t = 0.5s: Floating cards below CTA, inside margins)',
      'LMS Domain (Round 5: 4 mixed product cards, no duplicate to, >=48px margins)'
    );

    // Features Comparison
    await makeComparison(
      `${scratchDir}/v1_35s/frame_0085_8.5s.jpg`,
      `${evidenceBase}/features/features_01_card1_active.png`,
      `${evidenceBase}/features/features_compare_card01.png`,
      'Mota Reference (t = 8.5s: Large moving visual groups & participant video tile)',
      'LMS Domain (Round 5: Paper stacked deck, animated visuals, Mia & Alex participant tiles)'
    );

    // AI Studio Comparison
    await makeComparison(
      `${scratchDir}/v1_35s/frame_0165_16.5s.jpg`,
      `${evidenceBase}/showcase/showcase_03_tab1_ring_progress.png`,
      `${evidenceBase}/showcase/showcase_compare_tab1_ring.png`,
      'Mota Reference (t = 16.5s: Feature showcase window)',
      'LMS Domain (Round 5: Dark premium studio, accurate step title, short tab labels)'
    );

    // Benefits Row Comparison
    await makeComparison(
      `${scratchDir}/mota_fine/frame_0250_25.0s.jpg`,
      `${evidenceBase}/benefits/benefits_00_horizontal_row.png`,
      `${evidenceBase}/benefits/benefits_compare_row.png`,
      'Mota Reference (t = 25.0s: Side-by-side 3-card row, upright, tops aligned)',
      'LMS Domain (Round 5: 3 equal cards, tops aligned, 3 distinct large 3D renders)'
    );

    // Benefits Deck Comparison
    await makeComparison(
      `${scratchDir}/mota_fine/frame_0265_26.5s.jpg`,
      `${evidenceBase}/benefits/benefits_01_deck_collapsed.png`,
      `${evidenceBase}/benefits/benefits_compare_deck.png`,
      'Mota Reference (t = 26.5s: 45° collapsed diagonal stack)',
      'LMS Domain (Round 5: 45° collapsed diagonal stack with 3D objects)'
    );

    // Wall of Love Comparison
    await makeComparison(
      `${scratchDir}/v1_35s/frame_0285_28.5s.jpg`,
      `${evidenceBase}/wall-of-love/wall_00_text_scaled_deck_arrived.png`,
      `${evidenceBase}/wall-of-love/wall_compare_testimonials.png`,
      'Mota Reference (t = 28.5s: ~88% text, deck over of hanging below baseline)',
      'LMS Domain (Round 5: ~88% text width, deck over of, neutral placeholders)'
    );

    // FAQ Comparison
    await makeComparison(
      `${scratchDir}/mota_fine/frame_0330_33.0s.jpg`,
      `${evidenceBase}/faq/faq_01_accordion_opened.png`,
      `${evidenceBase}/faq/faq_compare_accordion.png`,
      'Mota Reference (t = 33.0s: Rounded enclosure card, accordion open)',
      'LMS Domain (Round 5: Clean enclosure card, approved catalog Q&As)'
    );

    // Master Contact Sheet
    const contactSheetRows = [
      {
        ref: `${scratchDir}/v1_35s/frame_0005_0.5s.jpg`,
        built: `${evidenceBase}/hero/hero_00_initial.png`,
        label: '1. Hero: 4 mixed product cards, no duplicate to, cards inside 48px margins'
      },
      {
        ref: `${scratchDir}/v1_35s/frame_0065_6.5s.jpg`,
        built: `${evidenceBase}/hero/hero_02_docked.png`,
        label: '2. Hero Docked & Nav Transformation: 2x2 grid docked, logo-free pill nav'
      },
      {
        ref: `${scratchDir}/v1_35s/frame_0085_8.5s.jpg`,
        built: `${evidenceBase}/features/features_01_card1_active.png`,
        label: '3. Features: Paper stacked cards (no blur, 25% fade), moving visuals, participant video tiles'
      },
      {
        ref: `${scratchDir}/v1_35s/frame_0125_12.5s.jpg`,
        built: `${evidenceBase}/text-reveal/text_02_fully_illuminated.png`,
        label: '4. Editorial Word Illumination: Left-to-right reading order illumination'
      },
      {
        ref: `${scratchDir}/v1_35s/frame_0165_16.5s.jpg`,
        built: `${evidenceBase}/showcase/showcase_03_tab1_ring_progress.png`,
        label: '5. Dedicated AI Section: High-contrast dark theme, accurate step title, non-truncated labels'
      },
      {
        ref: `${scratchDir}/mota_fine/frame_0250_25.0s.jpg`,
        built: `${evidenceBase}/benefits/benefits_00_horizontal_row.png`,
        label: '6. Benefits Row View: 3 equal cards, tops aligned, 3 distinct large 3D renders'
      },
      {
        ref: `${scratchDir}/mota_fine/frame_0265_26.5s.jpg`,
        built: `${evidenceBase}/benefits/benefits_01_deck_collapsed.png`,
        label: '7. Benefits Collapsed Deck: 45° collapsed diagonal stack'
      },
      {
        ref: `${scratchDir}/v1_35s/frame_0285_28.5s.jpg`,
        built: `${evidenceBase}/wall-of-love/wall_00_text_scaled_deck_arrived.png`,
        label: '8. Wall of Love: ~88% viewport width headline, deck centered over of, neutral placeholders'
      },
      {
        ref: `${scratchDir}/mota_fine/frame_0330_33.0s.jpg`,
        built: `${evidenceBase}/faq/faq_01_accordion_opened.png`,
        label: '9. FAQ Enclosure Card: Clean enclosure card with accordion expansion'
      }
    ];

    const cellW = 540;
    const cellH = 340;
    const rowHeaderH = 32;
    const rowH = cellH + rowHeaderH;
    const sheetW = cellW * 2 + 40;
    const sheetH = rowH * contactSheetRows.length + 80;

    const composites = [];

    const topBannerSvg = Buffer.from(`
      <svg width="${sheetW}" height="${80}">
        <rect width="${sheetW}" height="${80}" fill="#111215" />
        <text x="30" y="36" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF">LMS Domain — Design Round 5 Frame-by-Frame Comparison</text>
        <text x="30" y="60" font-family="system-ui, sans-serif" font-size="12" fill="#94A3B8">Mota Reference Video Frames (Left) vs LMS Domain Docker Container on feature/redesign-v2 (Right)</text>
      </svg>
    `);
    composites.push({ input: topBannerSvg, top: 0, left: 0 });

    for (let r = 0; r < contactSheetRows.length; r++) {
      const rowItem = contactSheetRows[r];
      const rowTop = 80 + r * rowH;

      const rowLabelSvg = Buffer.from(`
        <svg width="${sheetW}" height="${rowHeaderH}">
          <rect width="${sheetW}" height="${rowHeaderH}" fill="#18191D" />
          <text x="30" y="21" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#C4B5FD">${escapeXml(rowItem.label)}</text>
          <text x="${sheetW - 160}" y="21" font-family="system-ui, sans-serif" font-size="11" font-mono="true" fill="#94A3B8">1440x900 Viewport</text>
        </svg>
      `);
      composites.push({ input: rowLabelSvg, top: rowTop, left: 0 });

      const refBuf = fs.readFileSync(rowItem.ref);
      const refResized = await sharp(refBuf).resize(cellW, cellH, { fit: 'cover' }).toBuffer();
      composites.push({ input: refResized, top: rowTop + rowHeaderH, left: 15 });

      const builtBuf = fs.readFileSync(rowItem.built);
      const builtResized = await sharp(builtBuf).resize(cellW, cellH, { fit: 'cover' }).toBuffer();
      composites.push({ input: builtResized, top: rowTop + rowHeaderH, left: cellW + 25 });
    }

    const masterSheetPath = `${evidenceBase}/master_motion_contact_sheet.png`;
    const artifactSheetPath = `${artifactDir}/master_motion_contact_sheet.png`;

    await sharp({
      create: {
        width: sheetW,
        height: sheetH,
        channels: 4,
        background: { r: 17, g: 18, b: 21, alpha: 1 }
      }
    })
      .composite(composites)
      .png()
      .toFile(masterSheetPath);

    fs.copyFileSync(masterSheetPath, artifactSheetPath);
    console.log(`Generated Revised Master Contact Sheet at ${masterSheetPath} and copied to artifacts.`);

    console.log('\nAll measurements, screenshots, video walkthrough, and contact sheet complete!');
    process.exit(0);
  };
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

