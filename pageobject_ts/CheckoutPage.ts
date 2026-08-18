import {test,expect,Locator,Page} from '@playwright/test';

export class CheckoutPage {

        checkout : Locator;
        country : Locator;
        dropdownValues : Locator;
        placebutton : Locator;
        page
    constructor(page:Page) {
        this.page = page;
        this.checkout = page.getByRole('button', {name: 'Checkout'});
        this.country = page.getByPlaceholder('Select Country');
        this.dropdownValues =page.locator('.ta-results');
        this.placebutton =page.locator(".actions .btnn");
    }

   async selectCountry()
    {

    await this.country.pressSequentially('ind');

    const dropDown = this.dropdownValues;

    await dropDown.waitFor();

    const dropDownCount = await dropDown.locator('button').count();

    for (let i = 0; i < dropDownCount; i++) {
        let text :any;
        text= await dropDown.locator('button').nth(i).textContent();

        if (text.trim() === 'India') {

            await dropDown.locator('button').nth(i).click();
            break;
        }
    }
    }

   async plceorder ()
    {

     await this.placebutton.click();

    }
     async navigateToCheckout() {
        await this.checkout.click();
    }
}

