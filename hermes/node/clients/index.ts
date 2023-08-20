import { IOClients } from '@vtex/api'

import GitHubStatusClient from './status'

export class Clients extends IOClients {
  get status() {
    return this.getOrSet('status', GitHubStatusClient)
  }
}
