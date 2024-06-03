import { Locator, Page, TestInfo } from "@playwright/test";

export class Home {
    readonly page: Page;
    readonly baseURL: string;
    private testInfo: TestInfo;
    readonly userHeader: Locator;
    readonly user_name: Locator;
    readonly userDropdown: Locator;
    readonly mainMenu: Locator;
    readonly myInfo: Locator;
    readonly burgerLogo: Locator;

    constructor(page: Page, testInfo: TestInfo, baseURL?: string) {
        this.page = page;
        this.testInfo = testInfo;
        this.baseURL = baseURL ?? '/';
        this.userHeader = page.locator("[class='oxd-userdropdown']")
        this.user_name = page.locator("[class='oxd-userdropdown-name']");
        this.userDropdown = page.locator("[class='oxd-dropdown-menu']");
        this.mainMenu = page.locator("[class='oxd-main-menu']")             // menu at left side
        this.myInfo = this.mainMenu.locator("li:nth-child(6)");             // My Info tab in menu (it's with index 6)
        this.burgerLogo = page.locator("[class='oxd-topbar-header-title'] i");      //Displayed in mobile execution
    }

    async goto() {
        await this.page.goto(this.baseURL + '/web/index.php/dashboard/index')
    }

    async logout() {
        console.log('Logout');
        await this.userHeader.click();
        await this.userDropdown.getByText('Logout').click();
    }

    async openMyInfo() {
        console.log('open My Info');
        if (this.testInfo.project.name === 'Mobile Chrome'){       // handle execution on different projects: chrome/mobile/firefox...
            await this.burgerLogo.click();
            await this.myInfo.click();
        } else {
            await this.myInfo.click();
        }
    }

    async getUserName(): Promise<string> {
        return await this.user_name.textContent() || "";
    }
}