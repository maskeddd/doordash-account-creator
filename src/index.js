const { Builder, Browser, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const {
  QUANTITY,
  FIRST_NAME,
  LAST_NAME,
  EMAIL_NAME,
  EMAIL_DOMAIN,
  PASSWORD,
} = require("../config.json");

console.log("Config loaded!");

// URIs
const SIGNUP_URI =
  "https://identity.doordash.com/auth/user/signup?client_id=1666519390426295040&intl=en-US&layout=consumer_web&prompt=none&redirect_uri=https%3A%2F%2Fwww.doordash.com%2Fpost-login%2F&response_type=code&scope=%2A&state=%2Fhome%2Fen-US";

const screen = {
  width: 640,
  height: 480,
};

function generatePassword() {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  let password = "";

  for (let i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}

async function Doordash() {
  try {
    const start_time = new Date();
    let driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(
        new chrome.Options()
          .headless()
          .windowSize(screen)
          .addArguments(
            "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
          )
      )
      .build();
    try {
      await driver.get(SIGNUP_URI);

      // Wait for page load
      await driver.wait(async function () {
        const readyState = await driver.executeScript(
          "return document.readyState"
        );
        return readyState === "complete";
      });

      // First Name
      await driver.findElement(By.id("FieldWrapper-6")).sendKeys(FIRST_NAME);

      // Last Name
      await driver.findElement(By.id("FieldWrapper-7")).sendKeys(LAST_NAME);

      // Email
      const email = `${EMAIL_NAME}+${("" + Math.random()).substring(
        2,
        8
      )}@${EMAIL_DOMAIN}`;
      await driver.findElement(By.id("FieldWrapper-8")).sendKeys(email);

      // Country Code
      await driver
        .findElement(By.css("#FieldWrapper-9 > option[value=AU]"))
        .click();

      // Phone Number
      await driver
        .findElement(By.id("FieldWrapper-10"))
        .sendKeys(`0452${("" + Math.random()).substring(2, 8)}`);

      // Password
      const password = PASSWORD || generatePassword();
      await driver.findElement(By.id("FieldWrapper-11")).sendKeys(password);

      // Sign Up
      await driver.findElement(By.id("sign-up-submit-button")).click();

      await driver.wait(until.urlContains("post-login"));
      console.log(
        `Registered ${email}:${password}! Took ${
          (new Date() - start_time) / 1000
        } seconds.`
      );
    } finally {
      await driver.quit();
    }
  } catch (err) {
    console.log("Failed to create account.");
  }
}

async function main() {
  console.log(`Creating ${QUANTITY} accounts...`);
  for (let i = 0; i < QUANTITY; i++) {
    await Doordash();
  }
}

main();
