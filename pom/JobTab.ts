import { Locator, Page } from "@playwright/test";
import { UserProfile } from "./UserProfile";

export class JobTab extends UserProfile {

    async openJobTab(){

        await this.jobTab.click()
    }
}