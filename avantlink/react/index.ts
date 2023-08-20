import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage, OrderPlacedData } from './typings/events'

let added = false
function handleMessages(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:pageView': {
      const { pageUrl } = e.data
      const isOrderPlaced = pageUrl.indexOf('checkout/orderPlaced') !== -1
      if (!isOrderPlaced && added === false) {
        addTrackingLib()
      }
      break
    }
    case 'vtex:orderPlaced': {
      const order = e.data
      addMetrics(order)
      addTrackingLib()
      break
    }
    default:
      break
  }
}

function addTrackingLib() {
  added = true
  const avm = document.createElement('script')
  avm.type = 'text/javascript'
  avm.async = true
  avm.src =
    ('https:' == document.location.protocol ? 'https://' : 'http://') +
    'cdn.avmws.com/' +
    window.__avantlink_siteId +
    '/'
  const s = document.getElementsByTagName('script')[0]
  s.parentNode!.insertBefore(avm, s)
}

function addMetrics(order: OrderPlacedData) {
  window._AvantMetrics = window._AvantMetrics || []
  window._AvantMetrics.push([
    'order',
    {
      order_id: order.transactionId,
      amount: order.transactionSubtotal + order.transactionDiscounts, // (Sum because discounts are negative)
      state: order.visitorAddressState,
      country: order.visitorAddressCountry,
      tax: order.transactionTax,
      shipping: order.transactionShipping,
      currency: order.currency,
    },
  ])

  order.transactionProducts.forEach(product => {
    window._AvantMetrics.push([
      'item',
      {
        order_id: order.transactionId,
        parent_sku: product.id,
        variant_sku: product.sku,
        price: product.price,
        qty: product.quantity,
      },
    ])
  })
}

if (canUseDOM) {
  window.addEventListener('message', handleMessages)
}
