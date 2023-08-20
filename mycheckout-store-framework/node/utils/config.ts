import { pathOr, uniqBy } from 'ramda'

import type { IPaymentRules } from '../typings/payments'

export const buildPayments = (
  account: string,
  paymentsCreated: any[],
  paymentRules: IPaymentRules[]
) =>
  uniqBy(
    (e) => pathOr('', ['paymentSystem', 'id'], e),
    [
      ...paymentRules.filter(
        (ruler) =>
          ruler.enabled &&
          ruler?.paymentSystem?.name !== 'Kuikpay' &&
          ruler?.paymentSystem?.name !== 'PSE' &&
          ruler?.paymentSystem?.name !== 'Pago contra entrega'
      ),
    ]
  ).map((ruler) => {
    const payment = paymentsCreated.find(
      (p) => p.paymentMethodName === ruler.paymentSystem.id.toString()
    )

    return {
      id: pathOr('', ['id'], payment) as string,
      paymentMethodName: pathOr('', ['paymentSystem', 'id'], ruler) as string,
      payment: pathOr('', ['paymentSystem', 'name'], ruler) as string,
      isActive: pathOr(true, ['isActive'], payment) as boolean,
      type: pathOr(
        (ruler as any)?.type || 'store',
        ['type'],
        payment
      ) as unknown as string,
      accountName: account,
    }
  })
