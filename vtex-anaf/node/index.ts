import {ClientsConfig, LRUCache, method, RecorderState, Service, ServiceContext} from '@vtex/api'

import { Clients } from './clients'
import { settings } from './middlewares/settings'
import { validateCUI } from './middlewares/validateCUI'

const TIMEOUT_MS = 5000
const memoryCache = new LRUCache<string, any>({ max: 5000 })

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {}
}

export default new Service({
  clients,
  routes: {
    getSettings: method({
      GET: settings,
    }),
    validateCUI: method({
      POST: validateCUI,
    }),
  },
})
