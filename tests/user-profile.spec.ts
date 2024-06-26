import { test, expect, Page, Browser } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { Login } from '../pom/Login';
import { Home } from '../pom/Home';
import { UserProfile } from '../pom/UserProfile';
import path = require('path');
import { JobTab } from '../pom/JobTab';
import { ContentDetailsTab } from '../pom/ContentDetailsTab';

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

    test('Add attachment to personal details', async() => {

        // Error: fileChooser.setFiles: ENOENT: no such file or directory, access 'D:\MR\Learn\Projects\Playwright-Auto\resources\images\test_image.png'
        // [SOLVED]: Using path.resolve
        await userProfile.addAttachmentAndSave(path.resolve(__dirname ,'../resources/Images/test_images.png'));
        //await expect(userProfile.uploadedFileName).toHaveText('test_images.png');
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
        login = new Login(page, baseURL);
        home = new Home(page, testInfo, baseURL);
        userProfile = new UserProfile(page, baseURL);

        await login.goto();
        await login.login('Admin', 'admin123');

        homeUserName = await home.getUserName();
        await home.openMyInfo();
    });

    test.afterAll('AfterAll', async() => {
        await page.close()
        await browser.close()
    })

});