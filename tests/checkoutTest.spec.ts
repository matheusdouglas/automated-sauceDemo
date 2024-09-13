import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/loginPage";
import { users } from "../src/helpers/users";
import { ProductPage } from "../src/pages/productPage";
import { CheckoutPage } from "../src/pages/CheckoutPage";
import { CartPage } from "../src/pages/cartPage";

test("Should Fill All Required Fields and Continue to Next Step", async ({ page }) => {
  // Cria uma instancia de pagina de login
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page)

  // Realizar o Login
  await loginPage.start();
  await loginPage.signIn(users.standard_user);


  // Adicionar o produto no carrinho e vai para pagina de checkout
  const productName = "Sauce Labs Backpack"
  await productPage.addProductToCart(productName);
  const cartPage = await productPage.goToCart();
  await cartPage.gotoCheckout();


  // Preenche o formulario do checkout 
  await checkoutPage.fillUserInformation('matheus','douglas','72631-108');
  await checkoutPage.continueCheckout();

  // Validar se ao continua foi para pagina de sumario do checkout
  const textContent = page.locator('span[data-test="title"]');
  expect(textContent).toHaveText('Checkout: Overview');
  
});

