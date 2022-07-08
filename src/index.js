const puppeteer = require("puppeteer");
const constants = require("./utils/constants");
const config = require("../config.json");
const generatePassword = require("./utils/generatePassword");

const accounts = [];

async function createAccount(initial = false) {
  const start_time = new Date();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
  );

  await page.goto(constants.DOORDASH_URL);

  // Wait for elements
  await page.waitForSelector("#FieldWrapper-6");

  // Generate unique email
  const email = `${config.EMAIL_NAME}+${("" + Math.random()).substring(2, 8)}@${
    config.EMAIL_DOMAIN
  }`;

  // Use config password or generate
  const password = config?.PASSWORD || generatePassword();
  await page.type("#FieldWrapper-6", config.FIRST_NAME);
  await page.type("#FieldWrapper-7", config.LAST_NAME);
  await page.type("#FieldWrapper-8", email);
  await page.select("#FieldWrapper-9", config.COUNTRY);
  await page.type(
    "#FieldWrapper-10",
    config?.PHONE_NUMBER ?? `0452${("" + Math.random()).substring(2, 8)}`
  );
  await page.type("#FieldWrapper-11", password);
  await page.click("#sign-up-submit-button");

  if (!config?.CHAIN_REFERRALS) return;

  await page.waitForXPath(
    "/html/body/div[1]/div[1]/div[1]/header/div[2]/div/button/div/div/div/span/div"
  );

  await (
    await page.$x(
      "/html/body/div[1]/div[1]/div[1]/header/div[2]/div/button/div/div/div/span/div"
    )
  )[0].click();

  await page.waitForSelector("#FieldWrapper-3");
  await page.type("#FieldWrapper-3", config.ADDRESS);

  await page.waitForXPath(
    "/html/body/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div/div[2]/div/div[1]/div[1]/div/div[2]/span[1]"
  );

  await (
    await page.$x(
      "/html/body/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div/div[2]/div/div[1]/div[1]/div/div[2]/span[1]"
    )
  )[0].click();

  await page.waitForSelector(
    "#root > div:nth-child(1) > div:nth-child(4) > div > div:nth-child(2) > div > div.styles__ModalContainer-sc-1r4qbfh-0.kXsrbo > div > div.styles__ModalContent-sc-1r4qbfh-4.bGQKlK > div > div.styles__OverlayContent-sc-1fvk6pw-0.jzYzsT > div > div > div.InlineChildren__StyledInlineChildren-sc-1awtuwe-0.jNaRAZ > button.styles__StyledButtonRoot-sc-10jsqmy-0.bujQRW"
  );

  await page.click(
    "#root > div:nth-child(1) > div:nth-child(4) > div > div:nth-child(2) > div > div.styles__ModalContainer-sc-1r4qbfh-0.kXsrbo > div > div.styles__ModalContent-sc-1r4qbfh-4.bGQKlK > div > div.styles__OverlayContent-sc-1fvk6pw-0.jzYzsT > div > div > div.InlineChildren__StyledInlineChildren-sc-1awtuwe-0.jNaRAZ > button.styles__StyledButtonRoot-sc-10jsqmy-0.bujQRW"
  );

  console.log(
    `Successfully created account ${email}:${password}! Took ${
      (new Date() - start_time) / 1000
    } seconds.`
  );

  return await browser.close();

  await page.reload();

  await page.waitForSelector("#FieldWrapper-1");

  const referral_url = await page.$eval("#FieldWrapper-1", (input) => {
    return input.getAttribute("value");
  });

  console.log(referral_url);
}

(async () => {
  for (let i = 0; i < config.QUANTITY; i++) {
    try {
      await createAccount();
    } catch (err) {
      console.log(`Failed to create account: ${err.message}`);
    }
  }
})();
