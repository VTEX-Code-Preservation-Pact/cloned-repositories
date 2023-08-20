export const getCookies = (cookieName: string): string => {
  const name = `${cookieName}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieJar = decodedCookie.split(';')

  for (let i = 0; i < cookieJar.length; i++) {
    let cookie = cookieJar[i]

    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }

    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }

  return ''
}
