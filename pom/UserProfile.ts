import { Locator, Page } from "@playwright/test";

export class UserProfile {
    readonly page: Page;
    readonly baseURL: string;
    readonly user_name: Locator;

    constructor(page: Page, baseURL?: string) {
        this.page = page;
        this.baseURL = baseURL ?? '/';
        this.user_name = page.locator("[class='orangehrm-edit-employee-name'] h6");

    }

    async goto(userId: string) {
        await this.page.goto(this.baseURL + `/web/index.php/pim/viewMemberships/empNumber/${userId}`)
    }


}