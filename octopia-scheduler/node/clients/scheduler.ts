import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import type {
  SchedulerConfiguration,
  SchedulerInformation,
} from 'vtex.octopia-scheduler'

import { SCHEDULER_VERSION, VTEX_APP_NAME } from '../constants'

export class SchedulerClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      params: {
        version: SCHEDULER_VERSION,
      },
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.authToken,
      },
    })
  }

  private baseRoute = `/api/scheduler/${this.context.workspace}/${VTEX_APP_NAME}`

  public getAll(): Promise<SchedulerInformation[]> {
    return this.http.get(this.baseRoute, {
      metric: 'scheduler-list-all',
    })
  }

  public getById(schedulerId: string): Promise<SchedulerInformation> {
    return this.http.get(`${this.baseRoute}/${schedulerId}`, {
      metric: 'scheduler-get-by-id',
    })
  }

  public createOrUpdate(
    config: SchedulerConfiguration
  ): Promise<SchedulerInformation> {
    return this.http.put(this.baseRoute, config, {
      metric: 'scheduler-create-or-update',
    })
  }

  public delete(schedulerId: string) {
    return this.http.delete(`${this.baseRoute}/${schedulerId}`, {
      metric: 'scheduler-delete',
    })
  }
}
