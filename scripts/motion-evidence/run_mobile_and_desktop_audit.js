const http = require('http');
const fs = require('fs');
const path = require('path');

async function runAudit() {
  console.log('Connecting to Chrome CDP on port 9222...');
  let json = null;
  for (let i = 0; i < 20; i++) {
    try {
      json = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9222/json', (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
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

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
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

  const mobileScreenshotsDir = path.resolve(__dirname, '../../docs/motion-evidence/screenshots/mobile');
  fs.mkdirSync(mobileScreenshotsDir, { recursive: true });

  const viewports = [
    { width: 375, height: 812, name: 'mobile_375' },
    { width: 414, height: 896, name: 'mobile_414' },
    { width: 768, height: 1024, name: 'tablet_768' },
    { width: 1024, height: 768, name: 'tablet_1024' },
    { width: 1280, height: 800, name: 'desktop_1280' },
    { width: 1440, height: 900, name: 'desktop_1440' },
  ];

  const auditResults = [];

  console.log('\n======================================================');
  console.log('RUNNING VIEWPORT AUDIT & SCROLLWIDTH CHECKS');
  console.log('======================================================');

  for (const vp of viewports) {
    console.log(`\nTesting viewport ${vp.width}x${vp.height} (${vp.name})...`);

    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 1024,
    });

    await send('Page.reload', { ignoreCache: true });
    await new Promise(r => setTimeout(r, 1200));

    // Evaluate scrollWidth and check sections
    const pageMetrics = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `(() => {
        const docEl = document.documentElement;
        const innerW = window.innerWidth;
        const scrollW = docEl.scrollWidth;
        const hasSidewaysScroll = scrollW > innerW;

        // Check overflowing elements if any
        const overflowingElements = [];
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const r = el.getBoundingClientRect();
          if (r.right > innerW + 1) {
            overflowingElements.push({
              tag: el.tagName,
              id: el.id,
              className: el.className ? String(el.className).slice(0, 50) : '',
              right: Math.round(r.right),
              width: Math.round(r.width)
            });
            if (overflowingElements.length >= 5) break;
          }
        }

        // Header check
        const menuBtn = document.querySelector('button[aria-label="Open navigation menu"]');
        const menuBtnRect = menuBtn ? menuBtn.getBoundingClientRect() : null;
        const demoBtn = document.querySelector('header button');
        const demoBtnRect = demoBtn ? demoBtn.getBoundingClientRect() : null;

        // Hero cards check
        const heroStackedCards = document.querySelectorAll('section .w-full.flex.flex-col.gap-4.lg\\\\:hidden > div');

        // Features check
        const featureCards = document.querySelectorAll('#features .w-full.flex.flex-col.gap-6.lg\\\\:hidden > div');
        const featureImages = document.querySelectorAll('#features .w-full.flex.flex-col.gap-6.lg\\\\:hidden img');

        // Pins check: verify if any section is pinned below 1024
        // Check ScrollTrigger pins
        let activePins = [];
        if (typeof ScrollTrigger !== 'undefined') {
          activePins = ScrollTrigger.getAll().filter(s => s.pin).map(s => s.trigger ? (s.trigger.id || s.trigger.className) : 'unknown');
        } else {
          const pinSpacers = document.querySelectorAll('.pin-spacer');
          activePins = Array.from(pinSpacers).map(p => p.firstElementChild ? (p.firstElementChild.id || p.firstElementChild.className) : 'spacer');
        }

        // AI section tabs
        const aiTabsRow = document.querySelector('#ai-studio .overflow-x-auto');
        const aiTabsButtons = document.querySelectorAll('#ai-studio .overflow-x-auto button');

        // Benefits check
        const benefitCards = document.querySelectorAll('#benefits .w-full.flex.flex-col.gap-6.lg\\\\:hidden > div');

        // Wall of love check
        const wallMobileHeader = document.querySelector('#testimonials .lg\\\\:hidden h2');
        const wallMobileCards = document.querySelectorAll('#testimonials .lg\\\\:hidden .rounded-\\\\[20px\\\\]');

        // FAQ check
        const faqGrid = document.querySelector('#faq .grid');

        return {
          viewportWidth: innerW,
          scrollWidth: scrollW,
          scrollWidthEqualsInnerWidth: scrollW === innerW,
          hasSidewaysScroll,
          overflowCount: overflowingElements.length,
          overflowExamples: overflowingElements,
          header: {
            menuBtnVisible: !!menuBtn && menuBtn.offsetParent !== null,
            menuBtnWidth: menuBtnRect ? Math.round(menuBtnRect.width) : null,
            menuBtnHeight: menuBtnRect ? Math.round(menuBtnRect.height) : null,
            menuBtnTapTargetGe44: menuBtnRect ? (menuBtnRect.width >= 44 && menuBtnRect.height >= 44) : false,
            demoBtnTapTargetGe44: demoBtnRect ? (demoBtnRect.height >= 40) : false
          },
          hero: {
            stackedCardsCount: heroStackedCards.length,
            isOnePerRow: heroStackedCards.length === 4
          },
          features: {
            stackedCardsCount: featureCards.length,
            hasImagesBelowText: featureImages.length >= 3
          },
          manifesto: {
            isPinned: activePins.some(p => String(p).includes('manifesto'))
          },
          aiSection: {
            hasHorizontalTabsRow: !!aiTabsRow,
            tabsCount: aiTabsButtons.length
          },
          benefits: {
            stackedCardsCount: benefitCards.length
          },
          wallOfLove: {
            hasMobileHeader: !!wallMobileHeader,
            headerText: wallMobileHeader ? wallMobileHeader.innerText.trim() : null,
            mobileCardsCount: wallMobileCards.length
          },
          activePins
        };
      })()`
    });

    const info = pageMetrics.result.value;
    auditResults.push({ name: vp.name, ...info });

    console.log(`  -> window.innerWidth: ${info.viewportWidth}px`);
    console.log(`  -> document.documentElement.scrollWidth: ${info.scrollWidth}px`);
    console.log(`  -> scrollWidth equals innerWidth: ${info.scrollWidthEqualsInnerWidth ? 'YES (No sideways scroll)' : 'NO (Has overflow!)'}`);

    if (vp.width < 1024) {
      console.log(`  -> Header menu button >=44px: ${info.header.menuBtnTapTargetGe44} (${info.header.menuBtnWidth}x${info.header.menuBtnHeight}px)`);
      console.log(`  -> Hero 4 cards stacked 1 per row: ${info.hero.isOnePerRow} (${info.hero.stackedCardsCount} cards)`);
      console.log(`  -> Features 3 cards with images below text: ${info.features.hasImagesBelowText} (${info.features.stackedCardsCount} cards, ${info.features.hasImagesBelowText ? 'images present' : 'no images'})`);
      console.log(`  -> Manifesto text reveal pinned: ${info.manifesto.isPinned ? 'YES (Error - should not pin)' : 'NO (Correct)'}`);
      console.log(`  -> AI section horizontal tabs row: ${info.aiSection.hasHorizontalTabsRow} (${info.aiSection.tabsCount} tabs)`);
      console.log(`  -> Benefits cards stacked: ${info.benefits.stackedCardsCount} cards`);
      console.log(`  -> Wall of Love mobile header & cards: ${info.wallOfLove.hasMobileHeader ? 'YES' : 'NO'} (${info.wallOfLove.mobileCardsCount} cards)`);
      console.log(`  -> Active pinned elements below 1024px: ${info.activePins.length === 0 ? 'None (Correct)' : info.activePins.join(', ')}`);
    }

    // Capture full-page screenshot for 375, 414, 768, 1024
    if ([375, 414, 768, 1024].includes(vp.width)) {
      console.log(`  -> Capturing full-page screenshot at ${vp.width}px...`);

      // Get layout metrics for full height
      const layoutMetrics = await send('Page.getLayoutMetrics');
      const contentHeight = Math.ceil(layoutMetrics.contentSize ? layoutMetrics.contentSize.height : 8000);

      // Set device metrics to full content height for full page screenshot
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: contentHeight,
        deviceScaleFactor: 1,
        mobile: vp.width < 1024,
      });

      await new Promise(r => setTimeout(r, 600));

      const screenshot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
      });

      const shotPath = path.join(mobileScreenshotsDir, `screenshot_${vp.width}.png`);
      fs.writeFileSync(shotPath, Buffer.from(screenshot.data, 'base64'));
      console.log(`  -> Saved screenshot to ${shotPath} (${(screenshot.data.length / 1024).toFixed(1)} KB)`);

      // Restore viewport height
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 1024,
      });
    }
  }

  // Measure Wall of Love gap for 1280 and 1440
  console.log('\n======================================================');
  console.log('STEP 1 FINAL CHECK: GAP AFTER WALL OF LOVE (1280 & 1440)');
  console.log('======================================================');

  const gapResults = [];
  for (const w of [1280, 1440]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0);' });
    await new Promise(r => setTimeout(r, 400));

    const result = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `new Promise((resolve) => {
        const testSec = document.querySelector('#testimonials');
        const faqSec = document.querySelector('#faq');
        const faqH2 = document.querySelector('#faq h2');
        const cards = document.querySelectorAll('#testimonials .hidden.lg\\\\:flex .absolute.rounded-\\\\[20px\\\\]');
        const card3 = cards[2] || cards[cards.length - 1];

        const spacer = testSec.closest('.pin-spacer') || testSec.querySelector('.pin-spacer') || testSec;
        const rect = spacer.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        
        // Scroll so pin reaches end
        window.scrollTo(0, top + spacer.offsetHeight - 440);

        setTimeout(() => {
          const c3Rect = card3 ? card3.getBoundingClientRect() : null;
          const h2Rect = faqH2 ? faqH2.getBoundingClientRect() : null;
          const faqCard = faqSec ? faqSec.querySelector('.rounded-\\\\[32px\\\\], .rounded-\\\\[40px\\\\]') : null;
          const fcRect = faqCard ? faqCard.getBoundingClientRect() : null;

          resolve({
            width: ${w},
            card3Bottom: c3Rect ? Math.round(c3Rect.bottom) : null,
            faqH2Top: h2Rect ? Math.round(h2Rect.top) : null,
            gapToH2: (c3Rect && h2Rect) ? Math.round(h2Rect.top - c3Rect.bottom) : null,
            faqCardTop: fcRect ? Math.round(fcRect.top) : null,
            gapToCard: (c3Rect && fcRect) ? Math.round(fcRect.top - c3Rect.bottom) : null
          });
        }, 400);
      })`
    });

    gapResults.push(result.result.value);
    console.log(`Width ${w}px -> Gap from settled Card 3 to FAQ Title: ${result.result.value.gapToH2}px (Target: ~120px)`);
  }

  // Update MEASUREMENT_LOGS.json
  const logsPath = path.resolve(__dirname, '../../docs/motion-evidence/MEASUREMENT_LOGS.json');
  let currentLogs = {};
  if (fs.existsSync(logsPath)) {
    try {
      currentLogs = JSON.parse(fs.readFileSync(logsPath, 'utf8'));
    } catch (e) {}
  }

  currentLogs.mobileAudit = auditResults;
  currentLogs.gapAfterWall = gapResults;

  fs.writeFileSync(logsPath, JSON.stringify(currentLogs, null, 2));
  console.log('\nUpdated docs/motion-evidence/MEASUREMENT_LOGS.json successfully.');

  ws.close();
  console.log('\nAudit complete.');
  process.exit(0);
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
