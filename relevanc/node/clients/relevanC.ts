import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient, PRODUCTION } from '@vtex/api'

export default class RelevancClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://ads.peps.relevanc.io', context, options)
  }

  private baseUrl(serverName: string) {
    return PRODUCTION
      ? `http://${serverName}.ads.peps.relevanc.io`
      : `http://${serverName}.staging-ads.peps.relevanc.io`
  }

  public async getSponsoredOffers(
    serverName: string,
    params: Relevanc.SponsoredProductsPayload
  ): Promise<Relevanc.SponsoredProductsResponse> {
    const URL = this.baseUrl(serverName)

    return this.http.get(`${URL}/sponsored-offers`, {
      headers: {
        'x-vtex-use-https': 'true',
      },
      params,
      metric: 'relevanc-get-offers',
    })
  }
}
