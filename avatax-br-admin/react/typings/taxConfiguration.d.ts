interface TaxConfiguration {
  allowExecutionAfterErrors: boolean
  authorizationHeader: string
  integratedAuthentication: boolean
  url: string
}

interface GetTaxConfiguration {
  getTaxConfiguration: TaxConfiguration
}

interface SetTaxConfiguration {
  paymentConfiguration?: PaymentConfiguration
  taxConfiguration?: TaxConfiguration
  minimumQuantityAccumulatedForItems?: number
  decimalDigitsPrecision?: number
  minimumValueAccumulated?: number
  apps?: [App]
  allowMultipleDeliveries?: boolean
  allowManualPrice?: boolean
  maxIntOfWhiteLabelSellers?: number
  maskFirstPurchaseData?: boolean
  recaptchaValidation?: boolean
}

interface SettingsInput {
  operation: string
}
