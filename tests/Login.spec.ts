import { test, expect } from "@playwright/test";
import { USER_CREDENTIALS, MAILBOX,SET_NEWPASSWORD,GMAILUSER_CREDENTIALS } from "../testData/UserData";
import { HomePage } from "../page-objects/HomePage";
import { LoginPage } from "../page-objects/LoginPage";
import { OutlookMailPage } from "../page-objects/OutlookMailPage";
import { SetPasswordPage } from "../page-objects/SetPasswordPage";

test.describe("User Login/Logout flow @e2e", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let outlookMailPage: OutlookMailPage;
  let setNewPasswordPage: SetPasswordPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    outlookMailPage = new OutlookMailPage(page);
    setNewPasswordPage = new SetPasswordPage(page);
    await loginPage.visit();
  });

  test.only("DNAAPP-341_ABC Fitness Login Scenario + Logout", async () => {
    await test.step("Login Flow with Valid Credentials", async () => {
      await loginPage.loginToApp(USER_CREDENTIALS);
      await loginPage.assertPageUrl();
    });

    await test.step("Logout Flow", async () => {
      await homePage.logoutFromApp();
      await loginPage.assertPageUrl();
    });
  });

  test.only("DNAAPP-357_ABC Fitness Negative Login Scenario", async () => {
    await loginPage.loginToApp({ ...USER_CREDENTIALS, password: "qwerqwer" });
    await loginPage.assertErrorMessage();
  });

  test.skip("DNAAPP-4788_ABC Fitness Forgot Password Scenario", async () => {
    await loginPage.visit();
    await loginPage.waitForPageLoad();
    await loginPage.fillInLoginForm({ ...SET_NEWPASSWORD, password: "" });
    await loginPage.forgotPasswordBtn.click()
    await outlookMailPage.mailBoxAccess(MAILBOX)
    await outlookMailPage.selectEmailLink.click()
    await outlookMailPage.setNewPasswordBtn.click()
    await setNewPasswordPage.switchToNewTab()  
  });

  test.skip("DNAAPP-4858_ABC Fitness Login With Windows account", async () => {
    await loginPage.visit();
    await loginPage.waitForPageLoad();
    await setNewPasswordPage.loginWithWindowsAccount()
    await outlookMailPage.mailBoxAccess(MAILBOX)
  });

  test.skip("DNAAPP-4858_ABC Fitness Login With Gmail account", async () => {
    await loginPage.visit();
    await loginPage.waitForPageLoad();
    await setNewPasswordPage.loginWithGmailAccount({ ...GMAILUSER_CREDENTIALS, password: "" }) 
  });

});


