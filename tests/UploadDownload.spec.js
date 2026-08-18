const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');

async function writeExcel(searchText, replaceText, filePath) {

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet("Sheet1");

    const output = await readExcel(worksheet, searchText);

    // Check whether value was found
    if (output.row === -1 || output.column === -1) {
        throw new Error(`"${searchText}" was not found in Excel`);
    }

    const cell = worksheet.getCell(output.row, output.column);

    // Replace value
    cell.value = replaceText;

    // Save Excel
    await workbook.xlsx.writeFile(filePath);

    console.log("Excel file updated successfully");
}


async function readExcel(worksheet, searchText) {

    let output = {
        row: -1,
        column: -1
    };

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, cellNumber) => {

            // IMPORTANT: no quotes around searchText
            if (cell.value === searchText) {

                console.log("Row:", rowNumber);
                console.log("Column:", cellNumber);

                output.row = rowNumber;
                output.column = cellNumber;
            }

        });

    });

    return output;
}

test('Upload download excel validations', async ({ page }, testInfo) => {

    await page.goto(
        "https://rahulshettyacademy.com/upload-download-test/index.html"
    );

    const filePath = testInfo.outputPath("download.xlsx");

    // 1. Download Excel
    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('button', { name: "Download" }).click();

    const download = await downloadPromise;

    await download.saveAs(filePath);

    // 2. Change Apple -> Akash
    await writeExcel("Apple", "Akash", filePath);

    // 3. Upload modified Excel
    await page.locator("#fileinput").setInputFiles(filePath);

    // 4. Verify Akash is displayed in the table
    await expect(
        page.getByRole("cell", { name: "Akash" })
    ).toBeVisible();

    // 5. Print confirmation
    console.log("PASS: Apple was successfully changed to Akash");

});
