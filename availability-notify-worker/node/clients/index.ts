import { IOClients } from '@vtex/api'

import Availability from './availability'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get availability() {
    return this.getOrSet('availability', Availability)
  }
}
