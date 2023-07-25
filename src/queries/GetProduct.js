module.exports = `query GetProduct($id: String!, $currencyCode: CurrencyCode, $countryCode: String!, $marketName: String, $skipFavorite: Boolean!) {
  product(id: $id) {
    id
    listingType
    deleted
    ...ProductMerchandisingFragment
    ...AffirmCalloutFragment
    ...BreadcrumbsFragment
    ...BreadcrumbSchemaFragment
    ...HazmatWarningFragment
    ...HeaderFragment
    ...NFTHeaderFragment
    ...LastSaleFragment
    ...UrgencyBadgeFragment
    ...MarketActivityFragment
    ...MediaFragment
    ...MyPositionFragment
    ...ProductDetailsFragment
    ...ProductMetaTagsFragment
    ...ProductSchemaFragment
    ...ScreenTrackerFragment
    ...SizeSelectorWrapperFragment
    ...StatsForNerdsFragment
    ...ThreeSixtyImageFragment
    ...TrackingFragment
    ...UtilityGroupFragment
    ...FavoriteProductFragment @skip(if: $skipFavorite)
  }
}

fragment ProductMerchandisingFragment on Product {
  id
  merchandising {
    title
    subtitle
    image {
      alt
      url
    }
    body
    trackingEvent
    link {
      title
      url
      urlType
    }
  }
}

fragment AffirmCalloutFragment on Product {
  productCategory
  urlKey
  market(currencyCode: $currencyCode) {
    bidAskData(country: $countryCode, market: $marketName) {
      lowestAsk
    }
  }
  variants {
    id
    market(currencyCode: $currencyCode) {
      bidAskData(country: $countryCode, market: $marketName) {
        lowestAsk
      }
    }
  }
}

fragment BreadcrumbsFragment on Product {
  breadcrumbs {
    name
    url
    level
  }
}

fragment BreadcrumbSchemaFragment on Product {
  breadcrumbs {
    name
    url
  }
}

fragment HazmatWarningFragment on Product {
  id
  hazardousMaterial {
    lithiumIonBucket
  }
}

fragment HeaderFragment on Product {
  primaryTitle
  secondaryTitle
  condition
  productCategory
  reciprocal {
    id
    urlKey
    variants {
      id
      traits {
        size
      }
    }
  }
}

fragment NFTHeaderFragment on Product {
  primaryTitle
  secondaryTitle
  productCategory
  editionType
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

fragment UrgencyBadgeFragment on Product {
  id
  productCategory
  primaryCategory
  sizeDescriptor
  listingType
  market(currencyCode: $currencyCode) {
    ...LowInventoryBannerMarket
  }
  variants {
    id
    market(currencyCode: $currencyCode) {
      ...LowInventoryBannerMarket
    }
  }
  traits {
    name
    value
    visible
  }
}

fragment LowInventoryBannerMarket on Market {
  bidAskData(country: $countryCode, market: $marketName) {
    numberOfAsks
    lowestAsk
  }
  salesInformation {
    lastSale
    salesLast72Hours
  }
}

fragment MarketActivityFragment on Product {
  id
  title
  productCategory
  primaryTitle
  secondaryTitle
  media {
    smallImageUrl
  }
}

fragment MediaFragment on Product {
  id
  productCategory
  title
  brand
  urlKey
  variants {
    id
    hidden
    traits {
      size
    }
  }
  media {
    gallery
    all360Images
    imageUrl
  }
}

fragment MyPositionFragment on Product {
  id
  urlKey
}

fragment ProductDetailsFragment on Product {
  id
  title
  productCategory
  browseVerticals
  description
  gender
  traits {
    name
    value
    visible
    format
  }
}

fragment ProductMetaTagsFragment on Product {
  id
  urlKey
  productCategory
  brand
  model
  title
  description
  condition
  styleId
  breadcrumbs {
    name
    url
  }
  traits {
    name
    value
  }
  media {
    thumbUrl
    imageUrl
  }
  market(currencyCode: $currencyCode) {
    bidAskData(country: $countryCode, market: $marketName) {
      lowestAsk
      numberOfAsks
    }
  }
  variants {
    id
    hidden
    traits {
      size
    }
    market(currencyCode: $currencyCode) {
      bidAskData(country: $countryCode, market: $marketName) {
        lowestAsk
      }
    }
  }
}

fragment ProductSchemaFragment on Product {
  id
  urlKey
  productCategory
  brand
  model
  title
  description
  condition
  styleId
  traits {
    name
    value
  }
  media {
    thumbUrl
    imageUrl
  }
  market(currencyCode: $currencyCode) {
    bidAskData(country: $countryCode, market: $marketName) {
      lowestAsk
      numberOfAsks
    }
  }
  variants {
    id
    hidden
    traits {
      size
    }
    market(currencyCode: $currencyCode) {
      bidAskData(country: $countryCode, market: $marketName) {
        lowestAsk
      }
    }
    gtins {
      type
      identifier
    }
  }
}

fragment ScreenTrackerFragment on Product {
  id
  brand
  productCategory
  primaryCategory
  title
  market(currencyCode: $currencyCode) {
    bidAskData(country: $countryCode, market: $marketName) {
      highestBid
      lowestAsk
      numberOfAsks
      numberOfBids
    }
    salesInformation {
      lastSale
    }
  }
  media {
    imageUrl
  }
  traits {
    name
    value
  }
  variants {
    id
    traits {
      size
    }
    market(currencyCode: $currencyCode) {
      bidAskData(country: $countryCode, market: $marketName) {
        highestBid
        lowestAsk
        numberOfAsks
        numberOfBids
      }
      salesInformation {
        lastSale
      }
    }
  }
  tags
  reciprocal {
    id
    variants {
      id
    }
  }
}

fragment SizeSelectorWrapperFragment on Product {
  id
  ...SizeSelectorFragment
  ...SizeSelectorHeaderFragment
  ...SizesFragment
  ...SizesOptionsFragment
  ...SizeChartFragment
  ...SizeChartContentFragment
  ...SizeConversionFragment
  ...SizesAllButtonFragment
}

fragment SizeSelectorFragment on Product {
  id
  title
  productCategory
  browseVerticals
  sizeDescriptor
  availableSizeConversions {
    name
    type
  }
  defaultSizeConversion {
    name
    type
  }
  variants {
    id
    hidden
    traits {
      size
    }
    sizeChart {
      baseSize
      baseType
      displayOptions {
        size
        type
      }
    }
  }
}

fragment SizeSelectorHeaderFragment on Product {
  sizeDescriptor
  productCategory
  availableSizeConversions {
    name
    type
  }
}

fragment SizesFragment on Product {
  id
  productCategory
  listingType
  title
}

fragment SizesOptionsFragment on Product {
  id
  listingType
  variants {
    id
    hidden
    group {
      shortCode
    }
    traits {
      size
    }
    sizeChart {
      baseSize
      baseType
      displayOptions {
        size
        type
      }
    }
    market(currencyCode: $currencyCode) {
      bidAskData(country: $countryCode, market: $marketName) {
        lowestAsk
      }
    }
  }
}

fragment SizeChartFragment on Product {
  availableSizeConversions {
    name
    type
  }
  defaultSizeConversion {
    name
    type
  }
}

fragment SizeChartContentFragment on Product {
  availableSizeConversions {
    name
    type
  }
  defaultSizeConversion {
    name
    type
  }
  variants {
    id
    sizeChart {
      baseSize
      baseType
      displayOptions {
        size
        type
      }
    }
  }
}

fragment SizeConversionFragment on Product {
  productCategory
  browseVerticals
  sizeDescriptor
  availableSizeConversions {
    name
    type
  }
  defaultSizeConversion {
    name
    type
  }
}

fragment SizesAllButtonFragment on Product {
  id
  sizeAllDescriptor
  market(currencyCode: $currencyCode) {
    bidAskData(country: $countryCode, market: $marketName) {
      lowestAsk
    }
  }
}

fragment StatsForNerdsFragment on Product {
  id
  title
  productCategory
  sizeDescriptor
  urlKey
}

fragment ThreeSixtyImageFragment on Product {
  id
  title
  variants {
    id
  }
  productCategory
  media {
    all360Images
  }
}

fragment TrackingFragment on Product {
  id
  productCategory
  primaryCategory
  brand
  title
  market(currencyCode: $currencyCode) {
    bidAskData(country: $countryCode, market: $marketName) {
      highestBid
      lowestAsk
    }
  }
  variants {
    id
    market(currencyCode: $currencyCode) {
      bidAskData(country: $countryCode, market: $marketName) {
        highestBid
        lowestAsk
      }
    }
  }
}

fragment UtilityGroupFragment on Product {
  id
  ...FollowFragment
  ...FollowContentFragment
  ...FollowShareContentFragment
  ...FollowSuccessFragment
  ...PortfolioFragment
  ...PortfolioContentFragment
  ...ShareFragment
}

fragment FollowFragment on Product {
  id
  productCategory
  title
  variants {
    id
    traits {
      size
    }
  }
}

fragment FollowContentFragment on Product {
  title
}

fragment FollowShareContentFragment on Product {
  id
  title
  sizeDescriptor
  urlKey
  variants {
    id
    traits {
      size
    }
  }
}

fragment FollowSuccessFragment on Product {
  id
  title
  productCategory
  sizeDescriptor
  media {
    smallImageUrl
  }
  variants {
    id
    traits {
      size
    }
  }
}

fragment PortfolioFragment on Product {
  id
  title
  productCategory
  variants {
    id
  }
  traits {
    name
    value
  }
}

fragment PortfolioContentFragment on Product {
  id
  productCategory
  sizeDescriptor
  variants {
    id
    traits {
      size
    }
  }
}

fragment ShareFragment on Product {
  id
  productCategory
  title
  media {
    imageUrl
  }
}

fragment FavoriteProductFragment on Product {
  favorite
}
`