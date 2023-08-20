import { JanusClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'

const routes = {
  scheduler: (workspace: string, account: string) =>
    `/api/scheduler/${workspace}/${account}?version=4`,
  getSchedule: (workspace: string, account: string, id: string) =>
    `/api/scheduler/${workspace}/${account}/${id}?version=4`,
}

export default class SchedulerClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.authToken,
      },
    })
  }

  public createOrUpdateSchedule = (schedulerData: SchedulerArgs) => {
    return this.http.put(
      routes.scheduler(this.context.workspace, this.context.account),
      schedulerData,
      { metric: 'mycheckout-scheduler-create' }
    )
  }

  public getSchedule = (id: string) => {
    return this.http.get(
      routes.getSchedule(this.context.workspace, this.context.account, id),
      { metric: 'mycheckout-scheduler-get' }
    )
  }

  public deleteSchedule = (id: string) => {
    return this.http.delete(
      routes.getSchedule(this.context.workspace, this.context.account, id),
      { metric: 'mycheckout-scheduler-delete' }
    )
  }
}
