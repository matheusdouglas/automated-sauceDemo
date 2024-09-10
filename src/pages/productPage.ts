import { Page, Locator } from "@playwright/test";
import { CartPage } from "./cartPage";

export class ProductPage {
  readonly page: Page;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('a[data-test="shopping-cart-link"]');
  }

  async addProductToCart(product: string) {
    // Localiza o contêiner do produto e clica no botão de adicionar ao carrinho
    const productLocator = this.page.locator(`.inventory_item:has-text("${product}")`);
    await productLocator.locator('button:has-text("Add to cart")').click();
  }

  async goToCart() {
    // Ação para clicar no botão de carrinho  e retornar uma instancia da pagina de carrinho
    await this.cartButton.click();
    return new CartPage(this.page)    
  }
}
