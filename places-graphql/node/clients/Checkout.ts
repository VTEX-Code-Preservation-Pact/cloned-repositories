import { JanusClient } from '@vtex/api'

export class Checkout extends JanusClient {
  public getAddressFromPostalCode = (
    postalCode: string,
    countryCode: string
  ) => {
    return this.http.get<Address>(
      `/api/checkout/pub/postal-code/${countryCode}/${postalCode}`,
      {
        metric: 'checkout-autocomplete-address-based-on-postal-code',
        timeout: 3000,
      }
    )
  }
}
