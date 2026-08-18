const {test , expect } = require('@playwright/test');
test('Playwright Special Locators', async ({page}) =>
{


await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();

//insted of click we can use check() method aslo 
//its Ensure that checkbox or radio element is checked.
// its works only when the respective label is clickable
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Male");
await page.getByPlaceholder("Password").fill("abck");
// shoud have button tagname or class name should have btn text
await page.getByRole("button" , {name : 'Submit'}).click();

//here only we will get true or false value but test case will not fail
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

//here if expected is not get then our test case will fail
//default 5sec timeout for expect assertion
//if any locator taking more time than default then we use {timeout :10_000} -its override dafault time
//if we want to set global timeout then we have to chane under config file
expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout :10_000});

await page.getByRole("link" , {name :"Shop"}).click();
await page.locator("app-card").filter({hasText : 'Nokia edge'}).getByRole("button").click();


});
//every test will rung the time we have defined under config file
// of test case taking more than than then test case will fail 
//then we have to increse time under config file and it will applicble for all test cases
// Timeout for each test
 // timeout: 40 * 1000,
test('Playwright Test level timeout', async ({page}) =>
{
    //this timeout is only applicabel for this test case
    //this test case ned to complete under 6000 else it will fail
test.setTimeout(20000);
const slowExpect = expect.configure({timeout:9000});

//overriding global actiontimeout except step level timeout
page.setDefaultTimeout(9000);
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();

//insted of click we can use check() method aslo 
//its Ensure that checkbox or radio element is checked.
// its works only when the respective label is clickable
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Male");
await page.getByPlaceholder("Password").fill("abck");
// shoud have button tagname or class name should have btn text
await page.getByRole("button" , {name : 'Submit'}).click();

//here only we will get true or false value but test case will not fail
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

//if this action taking more time than what we have set then we can 
//set timeout for this action as well on step level
await page.getByRole("link" , {name :'Shop'}).click({timeout:12000});
await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
await page.locator("app-card").filter({hasText : 'Nokia edge'}).getByRole("button").click();


});