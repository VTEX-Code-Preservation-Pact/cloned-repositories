import { AuthType, InstanceOptions, IOClient, IOContext } from '@vtex/api'

import { FlatFilters, InvoiceData, EmailData } from '../../typings/custom'

const useHttps = !process.env.VTEX_IO

interface MarketplaceReference {
  account: string
  workspace: string
}

/**
 * Used to perform calls on the marketplace app installed in the marketplace account.
 */
export default class MarketplaceAppClient extends IOClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    const protocol = useHttps ? 'https' : 'http'
    const appName = 'marketplace-financial-commission'

    super(context, {
      ...options,
      authType: AuthType.bearer,
      baseURL: `${protocol}://app.io.vtex.com/vtex.${appName}/v0`,
      name: appName,
      headers: {
        ...options?.headers,
        ...(context.authToken
          ? { VtexIdclientAutCookie: context.authToken }
          : null),
        'Content-Type': 'application/json',
      },
    })
  }

  public async getInvoice(
    sellerId: string,
    id: string,
    marketplaceReference: MarketplaceReference
  ) {
    return this.http.get(
      this.routes.invoiceById(sellerId, id, marketplaceReference)
    )
  }

  public async createInvoice(
    sellerId: string,
    marketplaceReference: MarketplaceReference,
    invoiceData: InvoiceData
  ) {
    return this.http.post(
      this.routes.newInvoice(sellerId, marketplaceReference),
      invoiceData
    )
  }

  public async invoicesBySeller(
    sellerId: string,
    marketplaceReference: MarketplaceReference,
    filters: FlatFilters
  ) {
    return this.http.post(
      this.routes.invoices(sellerId, marketplaceReference),
      filters
    )
  }

  public async sellerOrders(
    marketplaceReference: MarketplaceReference,
    queryString: string
  ) {
    return this.http.get(this.routes.orders(marketplaceReference, queryString))
  }

  public async getTemplate(marketplaceReference: MarketplaceReference) {
    return this.http.get(this.routes.template(marketplaceReference))
  }

  public async sendEmail(
    marketplaceReference: MarketplaceReference,
    emailData: EmailData
  ) {
    return this.http.post(this.routes.email(marketplaceReference), emailData)
  }

  private get routes() {
    const baseRoute = `_v/policy/financial-commission`

    return {
      invoiceById: (
        sellerId: string,
        id: string,
        { account, workspace }: MarketplaceReference
      ) => `/${account}/${workspace}/${baseRoute}/${sellerId}/invoice/${id}`,
      newInvoice: (
        sellerId: string,
        { account, workspace }: MarketplaceReference
      ) => `/${account}/${workspace}/${baseRoute}/${sellerId}/invoice`,
      invoices: (
        sellerId: string,
        { account, workspace }: MarketplaceReference
      ) => `/${account}/${workspace}/${baseRoute}/${sellerId}/invoices`,
      orders: ({ account, workspace }: MarketplaceReference, query: string) =>
        `/${account}/${workspace}/_v/policy/private/orders?${query}`,
      template: ({ account, workspace }: MarketplaceReference) =>
        `/${account}/${workspace}/${baseRoute}/template`,
      email: ({ account, workspace }: MarketplaceReference) =>
        `/${account}/${workspace}/${baseRoute}/mail`,
    }
  }
}
