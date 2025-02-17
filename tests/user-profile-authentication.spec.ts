import { test, expect, Page, Browser } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { Login } from '../pom/Login';
import { Home } from '../pom/Home';
import { UserProfile } from '../pom/UserProfile';
import path from 'path';
import { JobTab } from '../pom/JobTab';
import { ContentDetailsTab } from '../pom/ContentDetailsTab';

test.use({ storageState: undefined }); // https://github.com/microsoft/playwright/issues/17396      (or use below line)
//test.use({ storageState: path.resolve(__dirname, '../setup/storageState.json') });
test.describe.configure({ mode: 'serial' });

test.describe('UserProfile', async() => {

    let browser: Browser;
    let page: Page;
    let baseURL;
    let login: Login;
    let home: Home;
    let userProfile: UserProfile;
    let homeUserName

    test('Verify on the user name', async() => {

        await expect(userProfile.user_name).toHaveText(homeUserName);
    });

    test('Select country at Contact details', async() => {

        await userProfile.openContentDetailsTab()

        const contentDetails = new ContentDetailsTab(page, baseURL)
        await contentDetails.selectCountry('Egypt')

        await contentDetails.saveContactDetails();
        await expect(contentDetails.savedSuccessfullyMessage).toBeVisible()
    });
    
    test('Verify job details', async() => {

        const jobTab = new JobTab(page, baseURL);
        await jobTab.openJobTab()

        await expect(page.getByText("HR Manager")).toBeVisible()
        await expect(page.getByText('Officials and Managers')).toBeVisible()
    });

    test.beforeAll('BeforeAll', async({ browser: testBrowser }, testInfo) => {
        browser = testBrowser
        page = await browser.newPage();     //Reuse single page between tests  ->  https://playwright.dev/docs/test-retries#reuse-single-page-between-tests
        
        baseURL = playwrightConfig.use?.baseURL
        // login = new Login(page, baseURL);
        home = new Home(page, testInfo, baseURL);
        userProfile = new UserProfile(page, baseURL);

        // await login.goto();
        // await login.login('Admin', 'admin123');

        home.goto()
        homeUserName = await home.getUserName();
        await home.openMyInfo();
    });

    test.afterAll('AfterAll', async() => {
        await page.close()
        await browser.close()
    })

});