import PropTypes from 'prop-types'

const { number, string, shape, bool } = PropTypes

export const optionShape = shape({
  averageEstimatePerItem: number,
  id: string,
  packagesLength: number,
  price: number,
  shippingEstimate: string,
})

export const storePreferencesDataShape = shape({
  countryCode: string,
  currencyCode: string,
  currencyFormatInfo: shape({
    currencyDecimalDigits: number,
    currencyDecimalSeparator: string,
    currencyGroupSeparator: string,
    currencyGroupSize: number,
    startsWithCurrencySymbol: bool,
  }),
  currencyLocale: number,
  currencySymbol: string,
  saveUserData: bool,
  timeZone: string,
})
