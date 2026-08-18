const { expect } = require('@playwright/test');

class OrderConfirmationPage {

    constructor(page) {
        this.successMessage = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    async verifyOrderSuccess() {
        await expect(this.successMessage).toHaveText(' Thankyou for the order. ');
    }

    async getOrderId() {
        return await this.orderId.textContent();
    }
}

module.exports = { OrderConfirmationPage };
