import { Locator, Page } from "@playwright/test";

export class UserProfile {
    readonly page: Page;
    readonly baseURL: string;
    readonly user_name: Locator;
    readonly personalDetailsAddAttachment: Locator;
    readonly browseBtn: Locator;
    readonly uploadedFileName: Locator;
    readonly saveAttachment: Locator;
    readonly countrySelection: Locator;
    readonly infoPageItems: Locator;
    readonly contactDetailsTab: Locator;
    readonly savedSuccessfullyMessage: Locator;
    readonly jobTab: Locator;

    constructor(page: Page, baseURL?: string) {
        this.page = page;
        this.baseURL = baseURL ?? '/';
        this.user_name = page.locator("[class='orangehrm-edit-employee-name'] h6");
        this.personalDetailsAddAttachment = page.locator("[class='oxd-button oxd-button--medium oxd-button--text']")
        this.browseBtn = page.locator("[class='oxd-file-button']")
        this.uploadedFileName = page.locator('.oxd-file-input-div')
        this.saveAttachment = page.locator('.orangehrm-attachment [type="submit"]')
        this.countrySelection = page.locator('.oxd-select-wrapper');
        this.infoPageItems = page.locator('.orangehrm-tabs');
        this.savedSuccessfullyMessage = page.getByText('Successfully Updated')
        this.contactDetailsTab = this.infoPageItems.getByText('Contact Details');
        this.jobTab = this.infoPageItems.getByText('Job');
    }

    async goto(userId: string) {
        await this.page.goto(this.baseURL + `/web/index.php/pim/viewMemberships/empNumber/${userId}`)
    }

    async addAttachment(attachmentFile: string){
        console.log(`Attach file: ${attachmentFile}`)
        await this.personalDetailsAddAttachment.click();

        let [fileChooser] = await Promise.all([         // Using fileChooser due to attachment at dynamic element not input.
            // It is important to call waitForEvent before click to set up waiting.
            this.page.waitForEvent('filechooser'),
            // Opens the file chooser.
            this.browseBtn.click()
          ]);
    
          await fileChooser.setFiles(attachmentFile);
    }

    async addAttachmentAndSave(attachmentFile: string){

        await this.addAttachment(attachmentFile);
        
        await this.saveAttachment.click();
    }

    async openContentDetailsTab(){
        console.log("Open Content Details Tab")
        await this.contactDetailsTab.click()
    }


}
