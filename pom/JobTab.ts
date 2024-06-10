import { Locator, Page } from "@playwright/test";
import { UserProfile } from "./UserProfile";

export class JobTab extends UserProfile {

    async openJobTab(){

        console.log("Open Job tab")
        await this.jobTab.click()
    }
}