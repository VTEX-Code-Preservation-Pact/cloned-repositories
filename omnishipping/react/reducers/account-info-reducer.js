import {
  getAccountName,
  getGeolocationSettings,
  getGoogleMapsApiKey,
} from '../utils/vtex'

const defaultState = {
  loadingAccountInfo: false,
  acceptSearchKeys: ['postalCode'],
  googleMapsKey: getGoogleMapsApiKey(),
  geolocation: getGeolocationSettings(),
  accountName: getAccountName(),
}

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
