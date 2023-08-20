export const ORDER_FORM_ID = 'bb1903790f6343c49fe9a93900170bc0'

export const getOrderForm = async () => {
  return fetch(
    // '/api/checkout/pub/orderForm/b8dababd87cf4fe08ad83481d7dd07a2',
    `http://localhost:4001/api/checkout/pub/orderForm/${ORDER_FORM_ID}`,
    {
      method: 'GET',
      redirect: 'follow',
    }
  )
}

export const addItem = async (orderFormId: string, items: any[]) => {
  const myHeaders = new Headers()

  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    orderItems: items,
  })
  // let raw = JSON.stringify({
  //   "orderItems": [
  //     {
  //       "id": "1328914",
  //       "quantity": 1,
  //       "seller": "1"
  //     }
  //   ]
  // });

  const requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  return fetch(
    // `/api/checkout/pub/orderForm/${orderFormId}/items`,
    `http://localhost:4001/api/checkout/pub/orderForm/${orderFormId}/items`,
    requestOptions
  )
}

export const cartSimulation = async (body: any) => {
  const myHeaders = new Headers()

  myHeaders.append('Accept', 'application/json')
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  return fetch(
    // '/api/checkout/pub/orderforms/simulation',
    'http://localhost:4001/api/checkout/pub/orderforms/simulation?RnbBehavior=0',
    requestOptions
  )
}
