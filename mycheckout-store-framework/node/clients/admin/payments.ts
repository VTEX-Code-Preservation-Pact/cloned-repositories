import { BaseRestService } from '../../base/base.restservice'

export class PaymentsClient extends BaseRestService {
  public getPaymentsMethods() {
    const { account } = this.context

    return this.http.get(`/accounts/payment-methods?an=${account}`)
  }

  public createPaymentMethod(args: {
    type: string
    isActive: boolean
    paymentMethodName: string
  }) {
    return this.http.post(
      `/accounts/payment-methods?an=${this.context.account}`,
      args
    )
  }
}
