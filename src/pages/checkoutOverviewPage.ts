import { Page, Locator } from "@playwright/test";

export class CheckoutOverviewPage { 
    readonly page : Page
    readonly finishButton : Locator
    readonly cancelButton : Locator
    readonly itemTotal : Locator
    readonly tax : Locator
    readonly total : Locator

    constructor(page : Page) {
        this.page = page;
        this.finishButton = page.locator('button[data-test="finish"]');
        this.cancelButton = page.locator('button[data-test="cancel"]');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }
}
