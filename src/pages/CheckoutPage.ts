import { Page, Locator } from "@playwright/test";
import { CheckoutOverviewPage } from "./checkoutOverviewPage";

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('input[data-test="firstName"]');
        this.lastName = page.locator('input[data-test="lastName"]');
        this.postalCode = page.locator('input[data-test="postalCode"]');
        this.cancelButton = page.locator('button[data-test="cancel"]');
        this.continueButton = page.locator('input[data-test="continue"]');
    }

    // Método para preencher as informações do usuário
    async fillUserInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    // Método para cancelar o checkout
    async cancelCheckout() {
        await this.cancelButton.click();
    }

    // Método para continuar o checkout
    async continueCheckout() {
        await this.continueButton.click();
        return new CheckoutOverviewPage(this.page);
    }
}
