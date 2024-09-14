import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/loginPage";
import { users } from "../src/helpers/users";



test("Should successfully log in with a standard user", async ({ page }) => {
  // Cria uma instancia de pagina de login
  const loginPage = new LoginPage(page);
  await loginPage.start();
  await loginPage.signIn(users.standard_user);
  const textContent = page.locator('div[class="app_logo"]');
  await expect(textContent).toHaveText('Swag Labs');
});

test("Should failed log in with a locked user", async ({page}) => {
    // Cria uma instancia de pagina de login
  const loginPage = new LoginPage(page);

   // Vai para a pagina de login
   await loginPage.start();

  // Realizar o login
  await loginPage.signIn(users.locked_out_user);

  // Serve para localizar o toast de erro
  const textContent = page.locator('h3[data-test="error"]');
  

  // Validar se a pensagem dentro do toast e a passada no toHaveText.
  await expect(textContent).toHaveText('Epic sadface: Sorry, this user has been locked out.');
})

test("Should show error when Username is empty", async ({ page }) => {
  // Cria uma instancia de pagina de login
  const loginPage = new LoginPage(page);
  await loginPage.start();
  await loginPage.signIn({username: '321321321' , password: ''})
 
  const errorMessage = page.locator('h3[data-test="error"]');
  await expect(errorMessage).toContainText('Epic sadface: Username is required')
});
