import { createSelector } from 'reselect'

const accountInfoSelector = {
  geolocation: state => state.accountInfo.geolocation,
}

export const hasGeolocation = createSelector(
  accountInfoSelector.geolocation,
  geolocation => geolocation
)
