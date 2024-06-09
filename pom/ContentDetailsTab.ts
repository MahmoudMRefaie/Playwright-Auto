import { Page, Locator } from "@playwright/test";
import { UserProfile } from "./UserProfile"

export class ContentDetailsTab extends UserProfile {

    readonly saveContactDetailsBtn: Locator;
    
    
    constructor(page: Page, baseURL?: string) {
        super(page, baseURL)
        this.saveContactDetailsBtn = page.locator('.orangehrm-horizontal-padding [type="submit"]');
    }

    async selectCountry(countryName: string){

        await this.countrySelection.click()
        await this.page.getByRole('option', { name: countryName }).click();
    }

    async saveContactDetails(){

        await this.saveContactDetailsBtn.click()
    }

}