# doordash-account-creator
make many doordash accounts and farm coupons mmmmm

## Installation
1. Download the appropriate Chrome driver version [here](http://chromedriver.storage.googleapis.com/index.html)
2. Add the downloaded driver to your OS [PATH](http://en.wikipedia.org/wiki/PATH_%28variable%29)

## Running
To run the tool, run the following commands:
```
git clone https://github.com/maskeddd/doordash-account-creator.git
cd doordash-account-creator
npm i
node src/index.js
```

## Configure
The tool can be configured in the included `config.json` file. An explanation of each item can be seen below.
```json
{
  "QUANTITY": 20, // The number of accounts to create
  "FIRST_NAME": "John", // The desired first name
  "LAST_NAME": "Doe", // The desired first name
  "EMAIL_NAME": "example", // Your email name
  "EMAIL_DOMAIN": "gmail.com", // Your email domain
  "COUNTRY": "AU", // Your country
  "PASSWORD": "balls12345" // Your desired password (will generate if none provided)
}

```
