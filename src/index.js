const { Builder, Browser, By, until } = require("selenium-webdriver");
const constants = require("./utils/constants");
const generatePassword = require("./utils/generatePassword");
const chrome = require("selenium-webdriver/chrome");
const config = require("../config.json");

console.log("Config loaded!");

async function Doordash() {
  try {
    const start_time = new Date();
    let driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(
        new chrome.Options()
          .headless()
          .windowSize(constants.SCREEN)
          .addArguments(constants.USER_AGENT)
      )
      .build();
    try {
      await driver.get(constants.DOORDASH_URL);

      // Wait for page load
      await driver.wait(async function () {
        const readyState = await driver.executeScript(
          "return document.readyState"
        );
        return readyState === "complete";
      });

      // First Name
      await driver
        .findElement(By.id("FieldWrapper-6"))
        .sendKeys(config.FIRST_NAME);

      // Last Name
      await driver
        .findElement(By.id("FieldWrapper-7"))
        .sendKeys(config.LAST_NAME);

      // Email
      const email = `${config.EMAIL_NAME}+${("" + Math.random()).substring(
        2,
        8
      )}@${config.EMAIL_DOMAIN}`;
      await driver.findElement(By.id("FieldWrapper-8")).sendKeys(email);

      // Country Code
      await driver
        .findElement(
          By.css(`#FieldWrapper-9 > option[value=${config?.COUNTRY ?? "AU"}]`)
        )
        .click();

      // Phone Number
      await driver
        .findElement(By.id("FieldWrapper-10"))
        .sendKeys(
          config?.PHONE_NUMBER ?? `0452${("" + Math.random()).substring(2, 8)}`
        );

      // Password
      const password = config?.PASSWORD || generatePassword();
      await driver.findElement(By.id("FieldWrapper-11")).sendKeys(password);

      // Sign Up
      await driver.findElement(By.id("sign-up-submit-button")).click();

      // Address
      await driver
        .wait(until.elementLocated(By.xpath(constants.SEARCH_ADDRESS_BUTTON)))
        .click();
      await driver
        .wait(until.elementLocated(By.xpath(constants.ADDRESS_INPUT)))
        .sendKeys(config.ADDRESS);
      await driver
        .wait(until.elementLocated(By.xpath(constants.FIRST_ADDRESS_BUTTON)))
        .click();

      console.log(
        `Registered ${email}:${password}! Took ${
          (new Date() - start_time) / 1000
        } seconds.`
      );
    } finally {
      await driver.quit();
    }
  } catch (err) {
    console.log("Failed to create account: ", err.message);
  }
}

async function main() {
  console.log(`Creating ${config.QUANTITY} accounts...`);
  for (let i = 0; i < config.QUANTITY; i++) {
    await Doordash();
  }
}

main();
