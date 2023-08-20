import { IOClients } from '@vtex/api'

import { GoogleGeolocation } from './GoogleGeolocation'
import { Checkout } from './Checkout'

export class Clients extends IOClients {
  public get googleGeolocation() {
    return this.getOrSet('googleGeolocation', GoogleGeolocation)
  }

  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }
}
