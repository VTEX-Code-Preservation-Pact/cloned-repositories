import { buildPayments } from '../../utils/config'
import { createPaymentMethod } from './createPaymentsMethods'
import type { IPayment, IPaymentRules } from '../../typings/payments'

const configPaymentsMethods = async (ctx: Context) => {
  const {
    clients: { paymentsClient, paymentGateway },
    vtex: { account },
  } = ctx

  const paymentsCreated: IPaymentRules[] =
    await paymentsClient.getPaymentsMethods()

  if (paymentsCreated?.length > 0) return

  const paymentRules: any[] = await paymentGateway.getPaymentRules()

  const paymentsRules = buildPayments(account, paymentsCreated, paymentRules)

  await Promise.all(
    paymentsRules.map(async (payment) => {
      await createPaymentMethod('', payment as IPayment, ctx)
    })
  )
}

export async function saveToken(
  _: unknown,
  {
    paymentMethodId,
    cvcRequired,
    buttonMessage,
    visualization,
  }: {
    paymentMethodId: string
    cvcRequired: boolean
    buttonMessage: string
    visualization: Array<{ type: string; key: string }>
  },
  ctx: Context
) {
  const {
    clients: { checkoutless },
    vtex: { account },
  } = ctx

  await checkoutless.create({
    account,
    paymentMethodId,
    cvcRequired,
    buttonMessage,
    visualization,
  })

  try {
    await configPaymentsMethods(ctx)
  } catch (error) {
    console.error('configPaymentsMethods', error)
  }

  return 'ok'
}
