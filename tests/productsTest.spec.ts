import { test, expect } from "@playwright/test";
import { ProductPage } from "../src/pages/productPage";
import { LoginPage } from "../src/pages/loginPage";
import { users } from "../src/helpers/users";

test("Add product to cart and check", async ({ page }) => {
  const productPage = new ProductPage(page);
  const loginPage = new LoginPage(page);

  await loginPage.start();
  await loginPage.signIn(users.standard_user);

  // Adiciona um produto específico ao carrinho
  const productName = "Sauce Labs Backpack"
  await productPage.addProductToCart(productName);

  // Vai para o carrinho e interage com a página de carrinho
  const cartPage = await productPage.goToCart();
 
  // como verificar se o produto foi adicionado
  const productNames = await cartPage.getProductNames();
  expect(productNames).toContain(productName);

  
});
