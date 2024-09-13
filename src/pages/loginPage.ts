import { Page, Locator } from "@playwright/test";
import { IUser } from "../model/user";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('input[data-test="username"]');
    this.password = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('input[name="login-button"]');
  }

  async start() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async signIn(user : IUser) {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.loginButton.click();
  }

}


