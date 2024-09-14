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
  const productName = "Sauce Labs Backpack";
  await productPage.addProductToCart(productName);

  // Vai para o carrinho e interage com a página de carrinho
  const cartPage = await productPage.goToCart();

  // como verificar se o produto foi adicionado
  const productNames = await cartPage.getProductNames();
  expect(productNames).toContain(productName);
});

test("Add product to cart and check badge", async ({ page }) => {
  const productPage = new ProductPage(page);
  const loginPage = new LoginPage(page);

  await loginPage.start();
  await loginPage.signIn(users.standard_user);

  // Adiciona produtos específicos ao carrinho
  const productName = "Sauce Labs Backpack";
  await productPage.addProductToCart(productName);

  const product1Name = "Sauce Labs Bolt T-Shirt";
  await productPage.addProductToCart(product1Name);

  // Vai para o carrinho e interage com a página de carrinho
  const cartPage = await productPage.goToCart();

  // Verifica se os produtos foram adicionados ao carrinho
  const products = await cartPage.getProductNames();
  expect(products).toContain(productName);
  expect(products).toContain(product1Name);

  // Contador do carrinho (verifica quantos itens foram adicionados)
  const itensToCart = page.locator('span[data-test="shopping-cart-badge"]');

  // Espera que o valor do contador seja '2' (pois foram adicionados 2 itens)
  await expect(itensToCart).toHaveText("2");
});
