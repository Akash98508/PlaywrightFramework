import {test,expect,Locator,Page} from '@playwright/test';

export class OrderDetailsPage {
       myOrdersButton : Locator;
        orderTable : Locator;
        orderRows : Locator;
        orderIdDetails:Locator;
    constructor(page:Page) {
        this.myOrdersButton = page.locator("button[routerlink*='myorders']");
        this.orderTable = page.locator('tbody');
        this.orderRows = page.locator('tbody tr');
        this.orderIdDetails = page.locator('.col-text');
    }

    async openOrderDetails(orderId:String) {
        await this.myOrdersButton.click();
        await this.orderTable.waitFor();

        const rowCount = await this.orderRows.count();

        for (let i = 0; i < rowCount; i++) {
            let rowOrderId:any;
            rowOrderId = await this.orderRows.nth(i).locator('th').textContent();

            if (orderId.includes(rowOrderId)) {
                await this.orderRows.nth(i).getByRole('button', { name: 'View' }).click();
                return;
            }
        }

        throw new Error(`Order "${orderId}" was not found in My Orders.`);
    }

    async verifyOrderDetails(orderId:any) {
        const orderIdDetails = await this.orderIdDetails.textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
}

