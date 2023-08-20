import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

interface Settings {
  orgId: string
  merchantId: string
}

type SessionId = string

interface Params extends Settings {
  sessionId: SessionId
}

function createPixelP({ orgId, merchantId, sessionId }: Params) {
  const p = document.createElement('p')
  p.setAttribute('style', `background:url(https://h.online-metrix.net/fp/clear.png?org_id=${orgId}&session_id=${merchantId}${sessionId}&m=1)`)
  document.body.appendChild(p)
}

function createPixelImg({ orgId, merchantId, sessionId }: Params) {
  const img = document.createElement('img')
  img.setAttribute('src', `https://h.online-metrix.net/fp/clear.png?org_id=${orgId}&session_id=${merchantId}${sessionId}&m=2`)
  document.body.appendChild(img)
}

function createPixelObject({ orgId, merchantId, sessionId }: Params) {
  const objElement = document.createElement('object')
  objElement.setAttribute('type', 'application/x-shockwave-flash')
  objElement.setAttribute('data', `https://h.online-metrix.net/fp/fp.swf?org_id=${orgId}&session_id=${merchantId}${sessionId}`)
  objElement.setAttribute('width', '1')
  objElement.setAttribute('height', '1')
  objElement.setAttribute('id', 'thm_fp')
  const param = document.createElement('param')
  param.setAttribute('name', 'movie')
  param.setAttribute('value', `https://h.online-metrix.net/fp/fp.swf?org_id=${orgId}&session_id=${merchantId}${sessionId}`)
  objElement.appendChild(param)
  const div = document.createElement('div')
  objElement.appendChild(div)
  document.body.appendChild(objElement)
}

function createPixelScript({ orgId, merchantId, sessionId }: Params) {
  const scriptElement = document.createElement('script')
  scriptElement.setAttribute('type', 'text/javascript')
  scriptElement.setAttribute('src', `https://h.online-metrix.net/fp/check.js?org_id=${orgId}&session_id=${merchantId}${sessionId}`)
  document.body.appendChild(scriptElement)
}

function createPixel(params: Params) {
  createPixelP(params)
  createPixelImg(params)
  createPixelObject(params)
  createPixelScript(params)
}

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:orderPlaced': {
      const { transactionPayment: { id }} = e.data

      createPixel({
        orgId: window.__cybersource__.orgId,
        merchantId: window.__cybersource__.merchantId,
        sessionId: id,
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
