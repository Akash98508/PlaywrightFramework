const { expect } = require('@playwright/test');

class VerificationPage {

    constructor(page) {
        this.emailField = page.locator('.user__name input').first();
    }

    async verifyEmailId(username) {
        await expect(this.emailField).toHaveValue(username);
    }
}

module.exports = { VerificationPage };
