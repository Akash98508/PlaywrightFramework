const {test , expect } = require('@playwright/test');

//if we want to run testcases paralley from same file
//test.describe.configure({mode:'parallel'});

//if first test fails then next test will not run
test.describe.configure({mode:'serial'});

test('Popup validations', async ({page}) =>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://www.google.com/");
// await page.goBack();
// await page.goForward();
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();

//its executed whenever popup will open 
await page.on('dialog' , dialog=> dialog.accept());
await page.locator("#confirmbtn").click();
//await page.pause();
await page.locator("#mousehover").click();

const iframe = await page.frameLocator("#courses-iframe");

//here two element was matching but second one was not visible so 
//for this situation we can use "visible" so playwright can check 
// only visible elemet
iframe.locator("li a[href*='lifetime-access']:visible").click();
const textcheck =await iframe.locator(".text h2").textContent();

//here we split the text and print the first place value
console.log(textcheck.split(" ")[1]);
});

test('Screenshot and visual comparision', async ({page}) =>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator('#displayed-text').screenshot({path: 'PartialScreenshot.png'});
await page.locator("#hide-textbox").click();
await page.screenshot({path: 'Screenshot.png'});
await expect(page.locator("#displayed-text")).toBeHidden();
});

test('Visual', async ({page}) =>
{
await page.goto("https://www.google.com/");
// Temporarily disabled: Google changes frequently, making full-page visual snapshots unstable.
// expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
