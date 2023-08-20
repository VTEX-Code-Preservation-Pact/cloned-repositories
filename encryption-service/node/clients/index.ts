import { IOClients } from '@vtex/api'
import Encryption from './encryption'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get encryption() {
    return this.getOrSet('encryption', Encryption)
  }
}
