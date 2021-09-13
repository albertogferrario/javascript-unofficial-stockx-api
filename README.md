# stockx-scraper

Scrape sneakers data from stockx. This module support country, currency and proxy parameters. 
It also manages size conversions.

Additionnal functions will come soon...

# install

```js
npm i stockx-scraper
```

# use

```js
const stockx = require('stockx-scraper');

const options = {
    currency: 'EUR', // default USD
    country: 'FR', // default US
    proxy: 'proxy url here'
}

stockx.getProduct('jordan 1', options)
    .then(item => console.log(item))
    .catch(e => console.log(e))
```
