import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BASE_URL } from "../testData/UserData";

export class HomePage extends BasePage {
  //readonly page: Page;
  readonly homeButton: Locator;
  readonly profileIcon: Locator;
  readonly logoutButton: Locator;

  //check wether datatestid require some specific naming from playwright docs side
  constructor(page: Page) {
    super(page);
    this.homeButton = page.getByTestId("side-bar-home-menu-btn");
    this.profileIcon = page.getByTestId("settings-menu-user-name");
    this.logoutButton = page.getByTestId("settings-menu-logout-menu-item");
    this.url = BASE_URL + "/home";
  }

  async logoutFromApp() {
    await this.profileIcon.click();
    await this.logoutButton.click();
  }
}
