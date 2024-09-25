import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/loginPage";
import { users } from "../src/helpers/users";
import { ProductPage } from "../src/pages/productPage";
import { CheckoutPage } from "../src/pages/CheckoutPage";



test.describe('Checkout Validation', () => {

  // Realiza login e navega até a página de checkout
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.start();
    await loginPage.signIn(users.standard_user);

    const productName = "Sauce Labs Backpack";
    await productPage.addProductToCart(productName);
    const cartPage = await productPage.goToCart();
    await cartPage.gotoCheckout();
  });


  test("Should Fill All Required Fields and Continue to Next Step", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Preenche o formulario do checkout 
    await checkoutPage.fillUserInformation('matheus','douglas','72631-108');
    await checkoutPage.continueCheckout();
  
    // Validar se ao continua foi para pagina de sumario do checkout
    const textContent = page.locator('span[data-test="title"]');
    await expect(textContent).toHaveText('Checkout: Overview');
    
  });

  // Testar se o campo "First Name" está vazio
  test('Should show error when First Name is empty', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Deixar o campo "First Name" vazio
    await checkoutPage.fillUserInformation('', 'Douglas', '72631-108');
    await checkoutPage.continueCheckout();

    // Verificar se o erro é exibido
    const errorMessage = page.locator('h3[data-test="error"]');
    await expect(errorMessage).toHaveText('Error: First Name is required');
  });

  // Testar se o campo "Last Name" está vazio
  test('Should show error when Last Name is empty', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Deixar o campo "Last Name" vazio
    await checkoutPage.fillUserInformation('Matheus', '', '72631-108');
    await checkoutPage.continueCheckout();

    // Verificar se o erro é exibido
    const errorMessage = page.locator('h3[data-test="error"]');
    await expect(errorMessage).toHaveText('Error: Last Name is required');
  });

  // Testar se o campo "Postal Code" está vazio
  test('Should show error when Postal Code is empty', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Deixar o campo "Postal Code" vazio
    await checkoutPage.fillUserInformation('Matheus', 'Douglas', '');
    await checkoutPage.continueCheckout();

    // Verificar se o erro é exibido
    const errorMessage = page.locator('h3[data-test="error"]');
    await expect(errorMessage).toHaveText('Error: Postal Code is required');
  });


  test('Should successfully complete a purchase', async ({page}) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillUserInformation('matheus','douglas','72631-108');
    const checkoutOverviewPage = await checkoutPage.continueCheckout();
    await checkoutOverviewPage.finishCheckout();

    const textContent = page.locator('h2[data-test="complete-header"]');

    await expect(textContent).toHaveText('Thank you for your order!');
  })
});
