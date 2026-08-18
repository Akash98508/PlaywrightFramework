class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProduct(productName) {

        const titles = await this.productsText.allTextContents();
        console.log("Products:", titles);

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {

            const productTitle = await this.products
                .nth(i)
                .locator("b")
                .textContent();

            console.log("Checking:", productTitle);

            if (productTitle.trim() === productName) {

                await this.products
                    .nth(i)
                    .getByText("Add To Cart")
                    .click();

                console.log(`"${productName}" added to cart`);
                return;
            }
        }

        throw new Error(`Product "${productName}" was not found`);
    }

    async navigateToCart() {
        await this.cart.click();
    }
}

module.exports = { DashboardPage };