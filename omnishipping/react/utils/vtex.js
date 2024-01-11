import { safelyParseJSON } from './LocalStorageUtils'

export function getAccountName() {
  if (window.vtex) {
    return (
      window.vtex.accountName ||
      (window.vtex.vtexid && window.vtex.vtexid.accountName)
    )
  }
}

export function getGeolocationSettings() {
  if (window.vtex) {
    if (
      window.vtex.geolocation === undefined ||
      window.vtex.geolocation === '{{ config.geolocation }}'
    ) {
      return false
    }
    return safelyParseJSON(window.vtex.geolocation)
  }
}

export function getGoogleMapsApiKey() {
  return window.vtex && window.vtex.googleMapsApiKey
}
