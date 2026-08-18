const { Loginpage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CheckoutPage } = require('./CheckoutPage');
const { VerificationPage } = require('./VerificationPage');
const { OrderConfirmationPage } = require('./OrderConfirmationPage');
const { OrderDetailsPage } = require('./OrderDetailsPage');

class POManager {

    constructor(page) {
        this.page = page;

        this.loginPage = new Loginpage(page);
        this.dashboardPage = new DashboardPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.verificationPage = new VerificationPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.orderDetailsPage = new OrderDetailsPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getVerificationPage() {
        return this.verificationPage;
    }

    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }

    getOrderDetailsPage() {
        return this.orderDetailsPage;
    }
}

module.exports = { POManager };
