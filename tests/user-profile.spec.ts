import { test, expect, Page, chromium, firefox } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { Login } from '../pom/Login';
import { Home } from '../pom/Home';
import { UserProfile } from '../pom/UserProfile';
import path = require('path');

test.describe('UserProfile', async() => {

    let page: Page;
    let login: Login;
    let home: Home;
    let userProfile: UserProfile;
    var homeUserName

    test('Verify on the user name', async() => {

        await expect(userProfile.user_name).toHaveText(homeUserName);
    });

    test('Add attachment to personal details', async() => {

        // Error: fileChooser.setFiles: ENOENT: no such file or directory, access 'D:\MR\Learn\Projects\Playwright-Auto\resources\images\test_image.png'
        // [SOLVED]: Right click on file and copy relative path
        // await userProfile.addAttachmentAndSave('.\\resources\\Images\\test_images.png');
        await userProfile.addAttachmentAndSave(path.resolve(__dirname ,'../resources/Images/test_images.png'));
        await expect(userProfile.uploadedFileName).toHaveText('test_images.png');
    });

    test.beforeAll('BeforeAll', async({ browser }, testInfo) => {
        page = await browser.newPage();     //Reuse single page between tests  ->  https://playwright.dev/docs/test-retries#reuse-single-page-between-tests
        
        let baseURL = playwrightConfig.use?.baseURL
        login = new Login(page, baseURL);
        home = new Home(page, testInfo, baseURL);
        userProfile = new UserProfile(page, baseURL);

        login.goto();
        await login.login('Admin', 'admin123');

        homeUserName = await home.getUserName();
        await home.openMyInfo();
    });

    test.afterAll('AfterAll', async() => {
        page.close()
    })

});