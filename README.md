# doordash-account-creator

make many doordash accounts and farm coupon. uses nodejs. if you get banned its not my fault.

## Installation

1. Download the appropriate Chrome driver version [here](http://chromedriver.storage.googleapis.com/index.html)
2. Add the downloaded driver to your OS [PATH](http://en.wikipedia.org/wiki/PATH_%28variable%29)
3. Download and install [Node.js](https://nodejs.org/en/download/)

## Running

1. Clone or download the repository
2. Run the following inside the project directory:

```
npm i
node src/index.js
```

## Configure

The tool can be configured in the included `config.json` file. Most items are required.

```json
{
  "QUANTITY": 1,
  "FIRST_NAME": "John",
  "LAST_NAME": "Doe",
  "EMAIL_NAME": "example",
  "EMAIL_DOMAIN": "gmail.com",
  "COUNTRY": "AU",
  "PHONE_NUMBER": "0475465679",
  "ADDRESS": "303 2nd St, Suite 800 San Francisco"
}
```
