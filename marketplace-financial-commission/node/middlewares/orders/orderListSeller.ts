// eslint-disable-next-line max-params
export async function orderListSeller(
  ctx: Context,
  sellerName: string,
  dateStart: string,
  dateEnd: string,
  page: number,
  perpage: number,
  status?: string
): Promise<VtexListOrder> {
  const {
    clients: { ordersClient },
  } = ctx

  if (status === 'invoiced') {
    const orderList = await ordersClient.listOrders({
      fStatus: status,
      fieldDate: 'invoicedDate',
      fieldDateStart: `${dateStart}T00:00:00.000Z`,
      fieldDateEnd: `${dateEnd}T23:59:59.999Z`,
      sellerName,
      orderBy: 'invoicedDate',
      page,
      perpage,
    })

    return orderList
  }

  const orderList = await ordersClient.listOrders({
    fStatus: status ?? '',
    fieldDate: 'creationDate',
    fieldDateStart: `${dateStart}T00:00:00.000Z`,
    fieldDateEnd: `${dateEnd}T23:59:59.999Z`,
    sellerName,
    orderBy: 'creationDate',
    page,
    perpage,
  })

  return orderList
}
