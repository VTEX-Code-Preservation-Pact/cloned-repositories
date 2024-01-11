export function setItem(keyName, keyValue) {
  try {
    window.localStorage.setItem(keyName, keyValue)
  } catch (error) {
    if (isQuotaExceeded(error)) {
      console.warn('Local Storage quota exceeded')
    } else {
      console.warn(error)
    }
  }
}

export function removeItem(keyName) {
  window.localStorage.removeItem(keyName)
}

export function getItem(keyName) {
  const itemFromStorage = window.localStorage.getItem(keyName)
  const parsedData = safelyParseJSON(itemFromStorage)

  return parsedData || itemFromStorage
}

// Function to deal with storage quota exceeded in multiple browsers
// http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
function isQuotaExceeded(e) {
  let quotaExceeded = false
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true
          break
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true
          }
          break
        default:
          return false
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true
    }
  }
  return quotaExceeded
}

export function safelyParseJSON(json) {
  let parsed

  try {
    parsed = JSON.parse(json)
  } catch (error) {
    return undefined
  }

  return parsed
}
