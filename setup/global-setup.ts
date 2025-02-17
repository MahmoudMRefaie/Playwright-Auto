import { chromium, FullConfig, expect } from '@playwright/test';
import { Login } from '../pom/Login';

async function globalSetup(config: FullConfig) {
  console.log('Global setup running...');

  const {baseURL, storageState} = config.projects[0].use
  const browser = await chromium.launch({headless: true, timeout: 10000})
  const page = await browser.newPage()
  const login = new Login(page, baseURL);

  await login.goto();
  await login.login('Admin', 'admin123');
  await page.context().storageState({ path: storageState as string })
  await browser.close()
}

export default globalSetup;
