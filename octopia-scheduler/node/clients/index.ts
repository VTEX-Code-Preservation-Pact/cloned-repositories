import type { ClientsConfig } from '@vtex/api'
import { IOClients } from '@vtex/api'

import { SchedulerClient } from './scheduler'

export class Clients extends IOClients {
  public get scheduler() {
    return this.getOrSet('scheduler', SchedulerClient)
  }
}

export const clientsConfig: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: 10000,
    },
  },
}
