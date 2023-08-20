import { authCookie } from './auth'

export const getPayments = (
  _: unknown,
  { email }: User,
  { clients: { payments: PaymentsClient }, cookies }: Context
) => PaymentsClient.getPayments(email, cookies.get(authCookie) as string)

export const deletePayment = (
  _: unknown,
  { id }: Payments,
  { clients: { payments: PaymentsClient }, cookies }: Context
) => PaymentsClient.deletePayment(id, cookies.get(authCookie) as string)
