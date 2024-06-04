import { Locator, Page } from "@playwright/test";

export class UserProfile {
    readonly page: Page;
    readonly baseURL: string;
    readonly user_name: Locator;
    readonly personalDetailsAddAttachement: Locator;
    readonly browseBtn: Locator;
    readonly uploadedFileName: Locator;
    readonly saveAttachement: Locator;

    constructor(page: Page, baseURL?: string) {
        this.page = page;
        this.baseURL = baseURL ?? '/';
        this.user_name = page.locator("[class='orangehrm-edit-employee-name'] h6");
        this.personalDetailsAddAttachement = page.locator("[class='oxd-button oxd-button--medium oxd-button--text']")
        this.browseBtn = page.locator("[class='oxd-file-button']")
        this.uploadedFileName = page.locator('.oxd-file-input-div')
        this.saveAttachement = page.locator('.orangehrm-attachment [type="submit"]')

    }

    async goto(userId: string) {
        await this.page.goto(this.baseURL + `/web/index.php/pim/viewMemberships/empNumber/${userId}`)
    }

    async addAttachment(attachmentFile: string){
        console.log(`Attach file: ${attachmentFile}`)
        await this.personalDetailsAddAttachement.click();

        let [fileChooser] = await Promise.all([         // Using fileChooser due to attachement at dymanic element not input.
            // It is important to call waitForEvent before click to set up waiting.
            this.page.waitForEvent('filechooser'),
            // Opens the file chooser.
            this.browseBtn.click()
          ]);
    
          await fileChooser.setFiles(attachmentFile);
    }

    async addAttachmentAndSave(attachmentFile: string){

        await this.addAttachment(attachmentFile);
        
        await this.saveAttachement.click();
    }


}