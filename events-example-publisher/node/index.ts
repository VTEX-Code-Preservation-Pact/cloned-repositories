import {
  Service,
  IOClients,
  ParamsContext,
  ServiceContext,
  RecorderState,
  method,
} from '@vtex/api'
import { createSendEvent } from './routes/notify'

const TREE_SECONDS_MS = 3 * 1000
const CONCURRENCY = 10

declare global {
  type Context = ServiceContext<IOClients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<IOClients, State, ParamsContext>({
  clients: {
    options: {
      events: {
        //Informações opcionais
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: TREE_SECONDS_MS,
        concurrency: CONCURRENCY,
      },
    },
  },
  routes: {
    notify: method({
      POST: [createSendEvent]
    }),
  },
})
