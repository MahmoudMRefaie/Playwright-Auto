import { test, expect, chromium, firefox } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { Login } from '../pom/Login';

test.describe('Login', async() => {

    test('User can login with valid credentials', async({ page, context }) => {
        const login = new Login(page, playwrightConfig.use?.baseURL)
        login.goto();

        await login.login('Admin', 'admin123');

        expect(page.url()).toBe(playwrightConfig.use?.baseURL + '/web/index.php/dashboard/index');
    });

});