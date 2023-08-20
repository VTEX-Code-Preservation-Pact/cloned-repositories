import type {
  IOContext,
  ParamsContext,
  RecorderState,
  SegmentData,
  ServiceContext,
  MessagesLoaderV2,
} from '@vtex/api'
import { MetricsAccumulator } from '@vtex/api'

import type { Clients } from './clients'

if (!global.metrics) {
  console.error('No global.metrics at require time')
  global.metrics = new MetricsAccumulator()
}

declare global {
  type Context = ServiceContext<Clients, State, CustomContext>

  interface State extends RecorderState {
    messagesTenantLanguage?: MessagesLoaderV2
    messagesBindingLanguage?: MessagesLoaderV2
  }

  interface CustomContext extends ParamsContext {
    cookie: string
    originalPath: string
    vtex: CustomIOContext
  }

  interface CustomIOContext extends IOContext {
    segment?: SegmentData
  }
}
