interface AccountInput {
  accountName: string
  hostname: string
  storePreferences: StorePreferencesInput
}

interface StorePreferencesInput {
  currencyCode: string
  countryCode: string
  salesChannel: string
}
