import {test,expect,Locator,Page} from '@playwright/test';

export class VerificationPage {
       emailField : Locator;
    constructor(page:Page) {
        this.emailField = page.locator('.user__name input').first();
    }

    async verifyEmailId(username:any) {
        await expect(this.emailField).toHaveValue(username);
    }
}

module.exports = { VerificationPage };
