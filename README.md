# doordash-account-creator
make many doordash accounts and farm coupon. uses nodejs. if you get banned its not my fault.

## Installation
1. Download the appropriate Chrome driver version [here](http://chromedriver.storage.googleapis.com/index.html)
2. Add the downloaded driver to your OS [PATH](http://en.wikipedia.org/wiki/PATH_%28variable%29)

## Running
1. Clone or download the repository
2. Run the following inside the project directory:
```
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
  "PASSWORD": "password123" // Your desired password (will generate if none provided)
}

```
