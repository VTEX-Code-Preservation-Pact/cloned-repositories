import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class LogisticsClient extends ExternalClient { 
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`https://api.vtex.com/api`, context, {
          ...options,
          headers: {
            ...options?.headers,
            VtexIdclientAutCookie:
              context.adminUserAuthToken  ?? context.storeUserAuthToken ?? context.authToken,
            'X-Vtex-Use-Https': 'true',
          },
        })
    }

    public async shippingPolicies(policyId: string, account: string) {
        return this.http.get(
          // `/logistics/pvt/shipping-policies/${policyId}`,
          `/logistics/pvt/shipping-policies/${policyId}?an=${account}`,
          {
            metric: 'get-shipping-policy-by-id',
          }
        )
  }
  
  public async updateShippingPolicy(policyId: string, account: string, data: any) {
    return this.http.put(
      `/logistics/pvt/shipping-policies/${policyId}?an=${account}`,
      data
    )
  }
}