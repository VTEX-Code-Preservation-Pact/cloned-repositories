import { IOClients } from '@vtex/api'

import Anaf from './anaf'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get anaf() {
    return this.getOrSet('anaf', Anaf)
  }
}
