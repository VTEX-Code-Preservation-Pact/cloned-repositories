export const CONSTANTS = {
  platform: 'vtex-io',
}

export const getOrderForm = async (oderFormId: string) => {
  const response = await fetch(`/api/checkout/pub/orderForm/${oderFormId}`, {
    method: 'GET',
    redirect: 'follow',
  })

  return response.json()
}
