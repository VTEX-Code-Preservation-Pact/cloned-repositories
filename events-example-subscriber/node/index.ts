import {
  Service,
  IOClients,
  ParamsContext,
  ServiceContext,
  RecorderState,
} from '@vtex/api'
import { listener } from './events/listenEvent'

declare global {
  type Context = ServiceContext<IOClients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<IOClients, State, ParamsContext>({
  events: {
    listener,
  },
})
