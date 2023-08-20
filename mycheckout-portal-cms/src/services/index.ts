import type { CartSimulation } from 'kuikpay-sdk/dist/interfaces'

export const search = async (query: string, from = 0, to = 12) => {
  const myHeaders = new Headers()

  myHeaders.append('Accept', 'application/json')
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' as const,
  }

  const response = await fetch(
    `/api/catalog_system/pub/products/search/?${query}_from=${from}&_to=${to}`,
    requestOptions
  )

  return response.json()
}

export const cartSimulation = async (body: CartSimulation) => {
  const myHeaders = new Headers()

  myHeaders.append('Accept', 'application/json')
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow' as const,
  }

  const response = await fetch(
    '/api/checkout/pub/orderforms/simulation',
    requestOptions
  )

  return response
}
