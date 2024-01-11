import * as accountInfoSelectors from './account-info-selectors'

describe('account-info-selectors', () => {
  it('should check if hasGeolocation', () => {
    const state = {
      accountInfo: {
        geolocation: true,
      },
    }
    expect(accountInfoSelectors.hasGeolocation(state)).toBe(true)
  })

  it("should check if hasGeolocation when doesn't have it", () => {
    const state = {
      accountInfo: {
        geolocation: false,
      },
    }
    expect(accountInfoSelectors.hasGeolocation(state)).toBe(false)
  })
})
