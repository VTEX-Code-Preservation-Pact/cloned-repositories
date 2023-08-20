import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class GitHubStatusClient extends ExternalClient {
  public constructor(context: IOContext, options?: InstanceOptions) {
    super('https://kctbh9vrtdwd.statuspage.io', context, {
      ...options,
      retries: 3,
      timeout: 25000,
    })
  }

  public getStatus = () => {
    return this.http.get<string>('api/v2/status.json')
  }
}
