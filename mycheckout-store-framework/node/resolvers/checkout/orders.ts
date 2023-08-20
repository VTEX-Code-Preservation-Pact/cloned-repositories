export const createOrder = (
  _: unknown,
  { orderArgs }: { orderArgs: OrderInput },
  { clients: { orders: OrdersClient }, request }: Context
) => {
  if (
    orderArgs.payment?.additionalData &&
    orderArgs.payment.additionalData instanceof Array
  ) {
    orderArgs.payment.additionalData = orderArgs.payment.additionalData.reduce<
      Record<string, string>
    >((prev: Record<string, string>, item: { key: string; value: string }) => {
      return {
        ...prev,
        [item.key]: item.value,
      }
    }, {})
  }

  const origin = request.get('origin').split('://')

  return OrdersClient.createOrder(orderArgs, origin[1])
}

export const getPaymentProcessStatus = (
  _: unknown,
  { orderId }: { orderId: string },
  { clients: { orders: OrdersClient } }: Context
) => OrdersClient.getPaymentProcessStatus(orderId)
