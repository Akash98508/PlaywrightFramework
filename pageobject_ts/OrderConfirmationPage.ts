import {test,expect,Locator,Page} from '@playwright/test';

export class OrderConfirmationPage {
       successMessage : Locator;
        orderId : Locator;
    constructor(page:Page) {
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
