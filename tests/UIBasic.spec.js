//import plywrite package
const {test , expect } = require('@playwright/test');

//we will erite actuacle code under this
//this annotation comming from playwrite package

//await activated only when we mark function as syncronous
test('browser context First playwrite test', async ({browser}) =>
{

    
//new fresh instence will open
const context = await browser.newContext();
//new page will open under browser
const page = await context.newPage();

const userName = page.locator("#username");
const passsword = page.locator("#password");
const signIn = page.locator("#signInBtn");
const cardTitle = page.locator(".card-body a");
//if we pass page then
//  dont need to write above two line playwrite has inbuilt feature
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

console.log(await page.title());

await userName.fill('rahulshettyacademy');
await passsword.fill('Learning@830$3mK2');
await signIn.click();
// print text on console using textContent() method
//console.log(await page.locator("[style*='block']").textContent());

//add assertion to check validation error message
//await expect(page.locator("[style*='block']")).toContainText('Incorrect');

//if there are multiple items we can slect .nth(position)
//  or first() method
console.log(await cardTitle.first().textContent());

console.log(await cardTitle.nth(1).textContent());

//will get all title 
const allTitles = await cardTitle.allTextContents();
console.log(allTitles);
});
//if we writh only then only this test case will run
test('page playwrite test', async ({browser , page }) =>
{
//if we pass page then
//  dont need to write above two line playwrite has inbuilt feature
await page.goto("https://www.google.com/");

//return the page title
console.log(await page.title());

//apply assertion
await expect(page).toHaveTitle("Google");
});

test(' @web UI Controls', async ({browser , page }) =>
{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName = page.locator("#username");
const passsword = page.locator("#password");
const dropdown = page.locator("select.form-control");
const documentLink = page.locator("[href*='documents-request']");

await  dropdown.selectOption("consult");
   //await page.pause();

await page.locator(".radiotextsty").nth(1).click();
await page.locator("#okayBtn").click();
await expect(page.locator("#myModal")).toBeHidden();
  //  await page.pause();

  //this will return true if this button is checked 
console.log(await page.locator(".radiotextsty").nth(1).isChecked());
await expect(await page.locator(".radiotextsty").nth(1)).toBeChecked();

await page.locator("#terms").click();
await  expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test('@web Child window handel', async ({browser}) =>
{
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator("#username");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("[href*='documents-request']");

//Thia arresy we use when we have to rung more action parallaly
const [newPage] = await Promise.all([ 
context.waitForEvent('page'),
documentLink.click(),
])
const text = await newPage.locator(".red").first().textContent();
const arrayText = text.split("@")
const domain =  arrayText[1].split(" ")[0]
console.log(domain);
await page.locator("#username").type(domain);
// await page.pause();
console.log(await page.locator("#username").inputValue());
});
