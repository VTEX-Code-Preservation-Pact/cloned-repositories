import { IOClients } from '@vtex/api'

import YourViewsClient from './yourviews'

export class Clients extends IOClients {
  get yourviews() {
    return this.getOrSet('yourviews', YourViewsClient)
  }
}
