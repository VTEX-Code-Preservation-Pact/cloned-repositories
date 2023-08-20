declare global {
  interface Configuration {
    declarer: string
    [declarerAppName: string]: CountryDataConfiguration
  }

  type AddressField =
    | 'city'
    | 'complement'
    | 'country'
    | 'neighborhood'
    | 'number'
    | 'postalCode'
    | 'receiverName'
    | 'reference'
    | 'state'
    | 'street'

  interface CountryDataConfiguration {
    countryISO: string
    addressFields: AddressFieldsConfiguration
    display: DisplayData
    phone: PhoneConfiguration
  }

  interface DisplayData {
    minimal: DisplayDefinition[][]
    compact: DisplayDefinition[][]
    expanded: DisplayDefinition[][]
  }

  interface DisplayDefinition {
    name: AddressField
    delimiter: string
    delimiterAfter: string
  }

  type PostalCodeField = AddressFieldsConfiguration & PostalCodeConfiguration

  interface AddressFieldsConfiguration {
    [field in AddressField]: AddressFieldConfiguration
    postalCode?: AddressFieldConfiguration & PostalCodeConfiguration
  }

  interface PostalCodeConfiguration {
    forgottenURL?: string
  }

  interface AddressFieldConfiguration {
    label: string
    name?: AddressField | 'addressType'
    hidden?: boolean
    maxLength?: number
    size?: string
    required?: boolean
    autoComplete?: string
    optionsCaption?: string
    options?: AddressOption[]
    elementName?: string
    mask?: string
  }

  interface AddressOption {
    label: string
    value: string
  }

  interface PhoneConfiguration {
    countryCode: string
    mask?: string
  }
}

export {}
