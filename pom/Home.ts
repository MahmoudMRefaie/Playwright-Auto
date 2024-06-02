import { Locator, Page } from "@playwright/test";

export class Home {
    readonly page: Page;
    readonly baseURL: string;
    readonly userHeader: Locator;
    readonly user_name: Locator;
    readonly userDropdown: Locator;

    constructor(page: Page, baseURL?: string) {
        this.page = page;
        this.baseURL = baseURL ?? '/';
        this.userHeader = page.locator("[class='oxd-userdropdown']")
        this.user_name = page.locator("[class='oxd-userdropdown-name']");
        this.userDropdown = page.locator("[class='oxd-dropdown-menu']");
    }

    async goto() {
        await this.page.goto(this.baseURL + '/web/index.php/dashboard/index')
    }

    async logout() {
        console.log('Logout');
        await this.userHeader.click();
        await this.userDropdown.getByText('Logout').click();
    }
}