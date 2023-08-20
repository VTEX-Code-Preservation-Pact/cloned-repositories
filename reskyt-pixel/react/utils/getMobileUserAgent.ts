export const getMobileUserAgent = (userAgent: string): string => {

  let message = ''

  if (/Android/i.test(userAgent)) {
    message = 'Google Play'
  }

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    message = 'App Store'
  }

  if (/Windows Phone/i.test(userAgent)) {
    message = 'Windows Phone Store'
  }

  return message
}
