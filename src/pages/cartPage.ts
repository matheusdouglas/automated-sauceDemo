import { Page } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) {}

    async getProductNames() {
        return await this.page.$$eval('.inventory_item_name', elements => elements.map(el => el.textContent));
    }
}