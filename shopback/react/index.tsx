import { PixelMessage } from './typings/events'
import { canUseDOM } from 'vtex.render-runtime'

function handleMessages(event: PixelMessage) {
  const {
    data,
    data: { eventName },
  } = event
  if (eventName === 'vtex:orderPlaced') {
    const { transactionSubtotal: valor, transactionId: order_id } = data
    window._cv_data = {
      order_id,
      valor,
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = '//app.shoptarget.com.br/js/tracking.js'
    let firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleMessages)
}
