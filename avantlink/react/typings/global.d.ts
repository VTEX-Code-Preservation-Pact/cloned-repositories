interface Window extends Window {
  _AvantMetrics: AvantMetric[]
  __avantlink_siteId: string
}

type AvantMetric = ['order', OrderMetric] | ['item', ItemMetric]

interface OrderMetric {
  // should be replaced with the actual id/number that uniquely identifies this order.
  order_id: string
  // should be replaced with the dollar amount total for this order, not including tax or shipping and handling fees. Should be formatted as a decimal number without dollar sign or commas. It should be noted that the order amount must be above 0 for that sale to record as an affiliate sale.
  amount: number
  // should be replaced with the U.S. state associated with the order’s billing address; preferably the standard (e.g. U.S. Postal Service) 2-letter abbreviation for the state.
  state: string
  // should be replaced with the country associated with the order’s billing address; preferably the 2- or 3-letter ISO 3166 country code.
  country: string
  // Exclusive coupon code(s) can be supplied if one or more coupon codes were used for the order. This element isn't required, but it is encouraged. This data provides the capability of merchants to associate a coupon code to particular affiliates.
  ecc?: string
  // Custom affiliate commission can be supplied for solutions that require highly customized logic for computing the commission due for a particular order.
  ac?: string
  // Custom network commission can be supplied for solutions that require highly customized logic for computing the commission due for a particular order.
  nc?: string
  // Can be used to specify the dollar amount (in decimal format, no dollar sign, no commas) of tax charged for this order.
  tax?: number
  // Can be used to specify the dollar amount (in decimal format, no dollar sign, no commas) of shipping and handling fees charged for this order.
  shipping?: number
  // Can be used to specify the currency type to be used for this transaction, if different than the default; must be specified as a 3-letter ISO 4217 currency code
  currency?: string
  // Can be used to specify whether the customer is new or returning; must be “Y” or “N”. While this isn't a required element we recommend that this value be provided as it allows for merchants to give a bump to affiliates on sales from new customers, thus encouraging affiliates to market to new customers.
  new_customer?: 'Y' | 'N'
}

interface ItemMetric {
  // should be replaced with the actual id/number that uniquely identifies this order.
  order_id: string
  // should be replaced with the parent-level unique identifier (commonly called a SKU) for each item. This SKU should agree with any product SKUs provided in the product datafeed for your program.
  parent_sku: string
  // should be replaced with the variant-level (a.k.a. child-level) unique identifier for each item. This identifier is more specific (generally down to the size/color/style level) than the parent-level SKU mentioned above. If variant-level details are included in the product datafeed, then this value can/should agree with the individual variant-level identifiers.
  variant_sku: string
  // should be replaced with the per-item price (in decimal format, no dollar sign, no commas) for each item.
  price: number
  // should be replaced with the number representing how many of this particular item were ordered. If this product doesn't have an associated variant sku please leave this field blank, as if our system finds a blank variant_sku value the parent SKU will be used.
  qty: number
}
