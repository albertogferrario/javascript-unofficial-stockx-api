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

# expected output

```js
item = {
  name: 'Stockx full name'
  description: 'Sneaker description if exist'
  image: 'Image url',
  url: 'Product url',
  uuid: 'Product uuid',
  lastSale: 'Price (number)',
  '72hvolume': 'Amount (number)',
  retail: 'Price (number)',
  sku: 'Product SKU',
  colorway: 'Product color e.g WHITE/BLACK',
  releaseDate: 'YYYY-MM-DD',
  seller: 'e.g Nike',
  sizes: [
    {
      sizeUS: 'US size (string)',
      sizeEU: 'Converted EU size (string)',
      sizeType: 'Size optional keyword (e.g W, Y)',
      lowestAsk: 'Price (number)',
      highestBid: 'Price (number)',
      lastSale: 'Price (number)'
    }
  ]
}
```