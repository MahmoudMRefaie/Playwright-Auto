import { Locator, Page } from "@playwright/test";

export class Home {
    readonly page: Page;
    readonly baseURL: string;
    readonly user: Locator;
    readonly userDropdown: Locator;

    constructor(page: Page, baseURL?: string) {
        this.page = page;
        this.baseURL = baseURL ?? '/';
        this.user = page.locator("[class='oxd-userdropdown-name']");
        this.userDropdown = page.locator("[class='oxd-dropdown-menu']");
    }

    async goto() {
        await this.page.goto(this.baseURL + '/web/index.php/dashboard/index')
    }

    async logout() {
        console.log('Logout');
        await this.user.click();
        await this.userDropdown.getByText('Logout').click();
    }
}