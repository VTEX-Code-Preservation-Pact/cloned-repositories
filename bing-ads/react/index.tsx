import { PixelMessage } from './typings/events'
import { canUseDOM } from 'vtex.render-runtime'

function handleMessages(e: PixelMessage) {
  if (e.data.eventName === "vtex:orderPlaced") {
    const { currency, transactionTotal } = e.data
    window.uetq = window.uetq || [];
    window.uetq.push({
      'gv': transactionTotal,
      'gc': currency
    });
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleMessages)
}
