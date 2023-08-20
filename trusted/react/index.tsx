import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'
import { createIFrame } from './utils'

export async function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:orderPlaced': {

      const eventData = e?.data
      const email = eventData?.visitorContactInfo?.[0]
      const firstName = eventData?.visitorContactInfo?.[1]
      const orderId = eventData?.transactionId

      const DEFAULT_VISITOR_ADDRESS_STATE = window?.__trusted?.defaultAddressState
      const shippingCounty = eventData?.visitorAddressState || DEFAULT_VISITOR_ADDRESS_STATE

      createIFrame({
        appKey: window?.__trusted?.appKey,
        days: window?.__trusted?.days,
        email,
        firstName,
        orderId,
        shippingCounty,
      })
      return
    }
    default: {
      return
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
