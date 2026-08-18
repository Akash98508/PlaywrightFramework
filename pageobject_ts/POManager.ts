//const { Loginpage } = require('./LoginPage');
import {Loginpage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CheckoutPage} from './CheckoutPage';
import {VerificationPage} from './VerificationPage';
import {OrderConfirmationPage} from './OrderConfirmationPage';
import {OrderDetailsPage} from './OrderDetailsPage';
import { Page } from '@playwright/test';

export class POManager {

        loginPage :Loginpage;
        dashboardPage:DashboardPage;
        checkoutPage :CheckoutPage;
        verificationPage:VerificationPage;
        orderConfirmationPage:OrderConfirmationPage;
        orderDetailsPage:OrderDetailsPage;
        page :Page;
    constructor(page :Page ) {
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
