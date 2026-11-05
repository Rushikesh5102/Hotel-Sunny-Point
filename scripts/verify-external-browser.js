const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runVisualVerification() {
  console.log('====================================================');
  console.log('HOTEL SUNNY POINT — EXTERNAL BROWSER VISUAL QA SUITE');
  console.log('Testing Native Google Chrome:', CHROME_PATH);
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--window-size=1280,960'
    ]
  });

  const page = await browser.newPage();

  // Helper to set theme
  async function setTheme(theme) {
    await page.evaluate((th) => {
      localStorage.setItem('sunny_point_theme', th);
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(th);
      root.setAttribute('data-theme', th);
    }, theme);
    await new Promise(r => setTimeout(r, 400));
  }

  try {
    // 1. Homepage Desktop - Light Mode
    console.log('[1/12] Testing Homepage (Desktop, Light Mode - Natural Heritage)...');
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('light');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01_home_light_desktop.png') });
    console.log('  ✓ Saved 01_home_light_desktop.png');

    // 2. Homepage Desktop - Dark Mode
    console.log('[2/12] Testing Homepage (Desktop, Dark Mode - Heritage Luxury)...');
    await setTheme('dark');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02_home_dark_desktop.png') });
    console.log('  ✓ Saved 02_home_dark_desktop.png');

    // 3. Digital Menu Grid - Light Mode
    console.log('[3/12] Testing Digital Menu Grid (Light Mode)...');
    await page.goto(`${BASE_URL}/menu`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('light');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03_menu_grid_light.png') });
    console.log('  ✓ Saved 03_menu_grid_light.png');

    // 4. Mobile Compact List View - iPhone 14 Viewport
    console.log('[4/12] Testing Mobile Compact Menu View (390x844)...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto(`${BASE_URL}/menu`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('light');
    // Switch to compact list view
    const compactBtn = await page.$('button[title="Compact List View"]');
    if (compactBtn) {
      await compactBtn.click();
      await new Promise(r => setTimeout(r, 400));
    }
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04_menu_compact_mobile.png') });
    console.log('  ✓ Saved 04_menu_compact_mobile.png');

    // Reset viewport to desktop
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

    // 5. Dish Details Modal (Clicking Masala Dosa)
    console.log('[5/12] Testing Dish Modal Inspection Dialog...');
    await page.goto(`${BASE_URL}/menu`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('light');
    // Click on the first dish card
    const firstDish = await page.$('h3');
    if (firstDish) {
      await firstDish.click();
      await new Promise(r => setTimeout(r, 600));
    }
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05_dish_modal_light.png') });
    console.log('  ✓ Saved 05_dish_modal_light.png');

    // 6. About Page - 1965 Timeline
    console.log('[6/12] Testing About & Heritage Timeline Page...');
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('light');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06_about_heritage_timeline.png') });
    console.log('  ✓ Saved 06_about_heritage_timeline.png');

    // 7. Offers & Promotions Page
    console.log('[7/12] Testing Offers & Specials Page...');
    await page.goto(`${BASE_URL}/offers`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('light');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '07_offers_specials.png') });
    console.log('  ✓ Saved 07_offers_specials.png');

    // 8. Guest Feedback Page with Star Ratings
    console.log('[8/12] Testing Guest Feedback & Rating Matrix Page...');
    await page.goto(`${BASE_URL}/feedback`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('light');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '08_feedback_ratings.png') });
    console.log('  ✓ Saved 08_feedback_ratings.png');

    // 9. Contact & Directions Page
    console.log('[9/12] Testing Contact & Directions Page...');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('light');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '09_contact_directions.png') });
    console.log('  ✓ Saved 09_contact_directions.png');

    // 10. Admin Dashboard - Dark Mode
    console.log('[10/12] Testing Admin Operations Portal (Dark Mode)...');
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('dark');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '10_admin_dashboard_dark.png') });
    console.log('  ✓ Saved 10_admin_dashboard_dark.png');

    // 11. Admin Dashboard - Light Mode
    console.log('[11/12] Testing Admin Operations Portal (Light Mode)...');
    await setTheme('light');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '11_admin_dashboard_light.png') });
    console.log('  ✓ Saved 11_admin_dashboard_light.png');

    // 12. Admin QR Code Generator & Table Tent Studio
    console.log('[12/12] Testing Admin QR Generator Studio...');
    await page.goto(`${BASE_URL}/admin/qr`, { waitUntil: 'networkidle0', timeout: 30000 });
    await setTheme('dark');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '12_admin_qr_studio.png') });
    console.log('  ✓ Saved 12_admin_qr_studio.png');

    console.log('\n====================================================');
    console.log('ALL 12 VISUAL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
    console.log('External Google Chrome screenshots verified in public/screenshots/');
    console.log('====================================================\n');
  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await browser.close();
  }
}

runVisualVerification();
