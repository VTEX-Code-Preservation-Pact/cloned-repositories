function fetchSpeedSizeSW() {
  // eslint-disable-next-line no-console
  console.log('[SpeedSize SW] Fetch of SpeedSizeSW')
  const today = new Date()
  // eslint-disable-next-line no-undef
  importScripts("https://di6367dava8ow.cloudfront.net"+"/"+"8310be04-0308-4646-a73c-13c37508ae99"+"/"+today.getDate()+"-"+ (today.getMonth() + 1) +"-"+today.getFullYear()+"/sw.js");
}

export default fetchSpeedSizeSW
