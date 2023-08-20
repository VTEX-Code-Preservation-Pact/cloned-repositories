export function addScript(callbackName: string) {
  const scriptOnPage = document.getElementById('google-customer-reviews')
  if (scriptOnPage) return

  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.id = 'google-customer-reviews'
  script.src = 'https://apis.google.com/js/platform.js?onload=' + callbackName
  document.body.appendChild(script)
}
