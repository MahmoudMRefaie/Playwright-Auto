import { test, expect, Page, chromium, firefox } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { Login } from '../pom/Login';
import { Home } from '../pom/Home';

/* test.describe.serial: Declares a group of tests that should always be run serially.
   If one of the tests fails, all subsequent tests are skipped. All tests in a group are retried together.
   https://playwright.dev/docs/api/class-test#test-describe-serial  */
test.describe.serial('Login', async() => {

    let page: Page;
    let login: Login;
    let home: Home;

    test('Verify the user can login with valid credentials', async() => {

        login.goto();

        await login.login('Admin', 'admin123');

        expect(page.url()).toBe(playwrightConfig.use?.baseURL + '/web/index.php/dashboard/index');
    });

    test('Verify the user can logout successfully', async() => {
        
        await home.logout();
    });

    test.beforeAll('BeforeAll', async({ browser }) => {
        page = await browser.newPage();     //Reuse single page between tests  ->  https://playwright.dev/docs/test-retries#reuse-single-page-between-tests

        login = new Login(page, playwrightConfig.use?.baseURL);
        home = new Home(page, playwrightConfig.use?.baseURL);
    });

    test.afterAll('AfterAll', async() => {
        page.close()
    })

});