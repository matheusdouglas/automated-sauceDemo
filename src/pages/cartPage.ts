import { Page, Locator } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";

export class CartPage {
  readonly page : Page
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;


  constructor(page: Page) {
    this.page = page
    this.checkoutButton = page.locator('button[data-test="checkout"]');
    this.continueShopping = page.locator(
      'button[data-teste="continue-shopping"]'
    );
  }

  async gotoCheckout()  {
    this.checkoutButton.click();
    return new CheckoutPage(this.page)
  }

  async getProductNames(): Promise<string[]> {
    // Usa 'this.page' para acessar a página atual
    const locator = this.page.locator(".inventory_item_name");

    // Usa evaluateAll para extrair o texto de todos os elementos encontrados
    const itemNames = await locator.evaluateAll((elements) =>
      elements.map((el) => el.textContent ?? "")
    );

    // Retorna os nomes dos itens
    return itemNames;
  }
}
