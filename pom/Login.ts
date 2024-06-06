import { Locator, Page } from "@playwright/test";

export class Login {
    readonly page: Page;
    readonly baseURL: string;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page, baseURL?: string) {
        this.page = page;
        this.baseURL = baseURL ?? '/';
        this.usernameInput = page.locator('[name=username]');
        this.passwordInput =  page.locator('[name=password]');
        this.loginBtn = page.locator('[type=submit]');
    }

    async goto() {
        await this.page.goto(this.baseURL + '/web/index.php/auth/login')
    }

    async login(username: string, password: string) {
        console.log(`Login with username [${username}] and password [${password}]`);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password); 
        await this.loginBtn.click();
    }
}