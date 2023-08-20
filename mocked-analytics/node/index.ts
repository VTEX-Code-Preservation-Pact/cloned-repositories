import {
  Service,
  IOClients,
  ParamsContext,
  ServiceContext,
  RecorderState,
} from '@vtex/api'
import { getLiveUsers } from './handlers/getLiveUsers'

declare global {
  type Context = ServiceContext<IOClients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<IOClients, State, ParamsContext>({
  routes: {
    getLiveUsers,
  },
})
