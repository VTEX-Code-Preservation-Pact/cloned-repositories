export const createIFrame = (params: Params) => {
  const iframe = document.createElement('iframe')
  iframe.height = '1'
  iframe.width = '1'
  iframe.scrolling = 'no'
  iframe.marginHeight = '0'
  iframe.marginWidth = '0'
  const iframeSrc =
    `https://feedback.trusted.ro/api/${params.appKey}/?email=${params.email}&name=${params.firstName}&order=${params.orderId}&county=${params.shippingCounty}&email_after=${params.days}`

  iframe.src = iframeSrc

  document.body.appendChild(iframe)
}
