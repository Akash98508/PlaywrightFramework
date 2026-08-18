
const {test , expect } = require('@playwright/test');
test('browser context First playwrite test', async ({page}) =>
{
    const productName ='ZARA COAT 3';
    const email ="akashmujmule333@gmail.com";
    const product = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Akash@123");
    await page.locator("[value='Login']").click();

    // allTextContents() - this method doesnot supprot automatic wait 
    // so we have to use this wait
    await page.waitForLoadState('networkidle');

 //  insted of first method we can use this as well both are same
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await product.count();

    for(let i = 0 ;i<=count ; i++)
        {
       if (await   product.nth(i).locator("b").textContent() === productName)
       {
        await  product.nth(i).locator("text=Add To Cart").click();
        break;
       }
        }
       await page.locator("[routerlink*='cart']").click();

       //isVisible methos is not auto wait so we use waitfor method
       await page.locator("div li").first().waitFor();
       const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
       expect(bool).toBeTruthy();
       await page.locator("li [type='button']").click();
       await page.locator("[placeholder*='Country']").pressSequentially("ind");

       //go to all sugeestion options
       const dropDown = page.locator(".ta-results");
       //wait until all options will load
       await dropDown.waitFor();

       //here we count the dropdown values 
       const dropDwonCount = await dropDown.locator("button").count();

       for(let i = 0 ; i<=dropDwonCount ; i++ )
        {
            const text = await dropDown.locator("button").nth(i).textContent();
             if(text === " India") {
                await dropDown.locator("button").nth(i).click();
                break;
             }
         }
         expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
         await page.locator(".actions .btnn").click();
         await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
         const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
         console.log(orderID);
         await page.locator("button[routerlink*='myorders']").click();
         await page.locator("tbody").waitFor();
         const row = page.locator("tbody tr");

         for(let i =0 ; i<= await row.count() ; i++)
            {
              const rowOrderid = await row.nth(i).locator("th").textContent();
              if(orderID.includes(rowOrderid))
                {
                    await row.nth(i).locator("button").first().click();
                    break;
                }
         }
        const orderidDetails = await page.locator(".col-text").textContent();
        expect(orderID.includes(orderidDetails)).toBeTruthy();

});
