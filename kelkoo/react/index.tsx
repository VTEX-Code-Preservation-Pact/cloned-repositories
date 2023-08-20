import { canUseDOM } from 'vtex.render-runtime'

import { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:orderPlaced': {
      const { transactionId: orderId, transactionTotal: orderValue } = e.data

      window._kkstrack = {
        ...window._kkstrack,
        orderValue: orderValue.toString(),
        orderId,
      }

      const s = document.createElement('script')

      s.type = 'text/javascript'
      s.async = true
      s.src = 'https://s.kk-resources.com/ks.js'

      // eslint-disable-next-line prefer-destructuring
      const x = document.getElementsByTagName('script')[0]

      x.parentNode?.insertBefore(s, x)

      break
    }

    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
