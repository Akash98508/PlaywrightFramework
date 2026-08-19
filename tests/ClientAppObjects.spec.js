const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobject/POManager');
const dataset = require('./utils/placeorderTestData.json');

for(const data of dataset ) 
{
test(` @web browser context First playwright test for ${data.productName}`, async ({ page }) => {
const poManager = new POManager(page);

    // const productName = 'ZARA COAT 3';
    // const username = 'akashmujmule333@gmail.com';
    // const password = 'Akash@123';
    //test

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const checkoutPage = poManager.getCheckoutPage();
    const verificationPage =poManager.getVerificationPage();
    const orderConfirmationPage =poManager.getOrderConfirmationPage();
    const orderDetailsPage = poManager.getOrderDetailsPage();
   
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();
    await expect(page.getByText(data.productName)).toBeVisible();
    await checkoutPage.navigateToCheckout();
    await checkoutPage.selectCountry();
    await verificationPage.verifyEmailId(data.username);
    await checkoutPage.plceOrder();
    await orderConfirmationPage.verifyOrderSuccess();
    const orderID = await orderConfirmationPage.getOrderId();
    await orderDetailsPage.openOrderDetails(orderID);
    await orderDetailsPage.verifyOrderDetails(orderID);


});
}
