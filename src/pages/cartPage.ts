import { Page, Locator } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

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
