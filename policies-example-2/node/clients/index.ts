import { IOClients } from '@vtex/api'

import { Formula1 } from './formula1'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get f1() {
    return this.getOrSet('formula1', Formula1)
  }
}
