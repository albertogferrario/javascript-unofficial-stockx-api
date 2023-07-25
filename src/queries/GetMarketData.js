module.exports = `
query GetMarketData($id: String!, $currencyCode: CurrencyCode, $countryCode: String!, $marketName: String) {
    product(id: $id) {
        id
        urlKey
        title
        uuid
        contentGroup
        market(currencyCode: $currencyCode) {
            bidAskData(country: $countryCode, market: $marketName) {
                highestBid
                highestBidSize
                lowestAsk
                lowestAskSize
            }
            salesInformation {
                lastSale
                salesLast72Hours
            }
        }
        variants {
            id
            market(currencyCode: $currencyCode) {
                bidAskData(country: $countryCode, market: $marketName) {
                    highestBid
                    highestBidSize
                    lowestAsk
                    lowestAskSize
                }
                salesInformation {
                    lastSale
                    salesLast72Hours
                }
            }
        }
        ...BidButtonFragment
        ...BidButtonContentFragment
        ...BuySellFragment
        ...BuySellContentFragment
        ...XpressAskPDPFragment
        ...LastSaleFragment
    }
}

fragment BidButtonFragment on Product {
    id
    title
    urlKey
    sizeDescriptor
    productCategory
    market(currencyCode: $currencyCode) {
        bidAskData(country: $countryCode, market: $marketName) {
            highestBid
            highestBidSize
            lowestAsk
            lowestAskSize
        }
    }
    media {
        imageUrl
    }
    variants {
        id
        market(currencyCode: $currencyCode) {
            bidAskData(country: $countryCode, market: $marketName) {
                highestBid
                highestBidSize
                lowestAsk
                lowestAskSize
            }
        }
    }
}

fragment BidButtonContentFragment on Product {
    id
    urlKey
    sizeDescriptor
    productCategory
    lockBuying
    lockSelling
    minimumBid(currencyCode: $currencyCode)
    market(currencyCode: $currencyCode) {
        bidAskData(country: $countryCode, market: $marketName) {
            highestBid
            highestBidSize
            lowestAsk
            lowestAskSize
            numberOfAsks
        }
    }
    variants {
        id
        market(currencyCode: $currencyCode) {
            bidAskData(country: $countryCode, market: $marketName) {
                highestBid
                highestBidSize
                lowestAsk
                lowestAskSize
                numberOfAsks
            }
        }
    }
}

fragment BuySellFragment on Product {
    id
    title
    urlKey
    sizeDescriptor
    productCategory
    lockBuying
    lockSelling
    market(currencyCode: $currencyCode) {
        bidAskData(country: $countryCode, market: $marketName) {
            highestBid
            highestBidSize
            lowestAsk
            lowestAskSize
        }
    }
    media {
        imageUrl
    }
    variants {
        id
        market(currencyCode: $currencyCode) {
            bidAskData(country: $countryCode, market: $marketName) {
                highestBid
                highestBidSize
                lowestAsk
                lowestAskSize
            }
        }
    }
}

fragment BuySellContentFragment on Product {
    id
    urlKey
    sizeDescriptor
    productCategory
    lockBuying
    lockSelling
    market(currencyCode: $currencyCode) {
        bidAskData(country: $countryCode, market: $marketName) {
            highestBid
            highestBidSize
            lowestAsk
            lowestAskSize
        }
    }
    variants {
        id
        market(currencyCode: $currencyCode) {
            bidAskData(country: $countryCode, market: $marketName) {
                highestBid
                highestBidSize
                lowestAsk
                lowestAskSize
            }
        }
    }
}

fragment XpressAskPDPFragment on Product {
    market(currencyCode: $currencyCode) {
        state(country: $countryCode) {
            numberOfCustodialAsks
        }
    }
    variants {
        market(currencyCode: $currencyCode) {
            state(country: $countryCode) {
                numberOfCustodialAsks
            }
        }
    }
}

fragment LastSaleFragment on Product {
    id
    market(currencyCode: $currencyCode) {
        statistics(market: $marketName) {
            ...LastSaleMarketStatistics
        }
    }
    variants {
        id
        market(currencyCode: $currencyCode) {
            statistics(market: $marketName) {
                ...LastSaleMarketStatistics
            }
        }
    }
}

fragment LastSaleMarketStatistics on MarketStatistics {
    lastSale {
        amount
        changePercentage
        changeValue
        sameFees
    }
}
`
