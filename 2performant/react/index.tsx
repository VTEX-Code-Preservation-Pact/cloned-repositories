import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage, ProductOrder } from './typings/events'

interface Params {
  amount: number
  confirm: string
  campaignUnique: string
  description: string
  transactionId: string
}

function createIFrame(params: Params) {
  const iframe = document.createElement('iframe')
  iframe.height = '1'
  iframe.width = '1'
  iframe.scrolling = 'no'
  iframe.marginHeight = '0'
  iframe.marginWidth = '0'
  iframe.src = `https://event.2performant.com/events/salecheck?amount=${params.amount}&campaign_unique=${params.campaignUnique}&confirm=${params.confirm}&description=${encodeURIComponent(params.description)}&transaction_id=${encodeURIComponent(params.transactionId)}`

  document.body.appendChild(iframe)
}

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:orderPlaced': {
      let tax = e.data.transactionTax
      let totalWithoutShip = e.data.transactionTotal - e.data.transactionShipping

      if (!tax && window.__2performant.subtractTVA)
        tax = +(0.19 * totalWithoutShip).toFixed(2)

      createIFrame({
        confirm: window.__2performant.confirm,
        campaignUnique: window.__2performant.campaignUnique,
        amount: +(totalWithoutShip - tax).toFixed(2),
        description: productNames(e.data.transactionProducts),
        transactionId: e.data.transactionId,
      })
      return
    }
    default: {
      return
    }
  }
}

function productNames(products: ProductOrder[]): string {
  const productNames = products.map(product => product.name)
  return productNames.join(', ')
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
