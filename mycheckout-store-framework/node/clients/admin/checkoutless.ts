import { BaseRestService } from '../../base/base.restservice'

export class CheckoutlessClient extends BaseRestService {
  public create(accountData: {
    account: string
    paymentMethodId: string
    cvcRequired: boolean
    buttonMessage: string
    visualization: Array<{ type: string; key: string }>
  }) {
    return this.http.post('/accounts', accountData)
  }

  public findByAccount() {
    const { account } = this.context

    return this.http.get(`/accounts?an=${account}`)
  }

  public createLink(accountLinkData: {
    accountRequester: string
    accountApprover: string
  }) {
    return this.http.post('/accounts/links', accountLinkData)
  }

  public updateLink(id: string, status: string) {
    return this.http.put('/accounts/links', {
      id,
      status,
    })
  }

  public deleteLink(id: string) {
    return this.http.delete(`/accounts/links/${id}`)
  }

  public getLinksByAccount(account: string) {
    return this.http.get(`/accounts/links/${account}`)
  }

  public createVisualization(
    visualization: Array<{
      type: string
      key: string
    }>,
    account: string
  ) {
    return this.http.post(`/accounts?an=${account}`, {
      visualization,
      account,
    })
  }

  public updateStyles(
    {
      styles,
      buttonText,
      restore,
    }: { styles: string; buttonText: string; restore: boolean },
    account: string
  ) {
    return this.http.post(`/accounts/styles?an=${account}`, {
      styles,
      buttonText,
      restore,
    })
  }

  public getStyles(account: string) {
    return this.http.get(`/accounts/styles?an=${account}`)
  }
}
