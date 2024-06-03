import { test, expect, Page, chromium, firefox } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { Login } from '../pom/Login';
import { Home } from '../pom/Home';
import { UserProfile } from '../pom/UserProfile';

test.describe.configure({ retries: 2 });
test.describe('UserProfile', async() => {

    let page: Page;
    let login: Login;
    let home: Home;
    let userProfile: UserProfile;

    test('Verify on the user name', async() => {

        var homeUserName = await home.getUserName();
        await home.openMyInfo();

        await expect(userProfile.user_name).toHaveText(homeUserName);
    });

    // test('Verify the user can logout successfully', async() => {
        
    //     await home.logout();
    // });

    test.beforeAll('BeforeAll', async({ browser }, testInfo) => {
        page = await browser.newPage();     //Reuse single page between tests  ->  https://playwright.dev/docs/test-retries#reuse-single-page-between-tests
        
        let baseURL = playwrightConfig.use?.baseURL
        login = new Login(page, baseURL);
        home = new Home(page, testInfo, baseURL);
        userProfile = new UserProfile(page, baseURL);

        login.goto();
        await login.login('Admin', 'admin123');
    });

    test.afterAll('AfterAll', async() => {
        page.close()
    })

});