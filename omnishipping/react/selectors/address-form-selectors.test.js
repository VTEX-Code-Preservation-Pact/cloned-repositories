import * as addressFormSelectors from './address-form-selectors'
import { RESIDENTIAL } from '../constants'

describe('account-info-selectors', () => {
  describe('isValidPostalGeolocation', () => {
    it('should return true if postalCode.valid is true', () => {
      const state = {
        componentActivity: {
          isAddressListActive: false,
        },
        orderForm: {
          canEditData: true,
        },
        addressForm: {
          residentialId: '10',
          addresses: {
            '10': {
              addressType: {
                value: RESIDENTIAL,
              },
              postalCode: {
                valid: true,
              },
            },
          },
        },
      }
      expect(addressFormSelectors.isValidPostalGeolocation(state)).toEqual(true)
    })

    it('should return true if value exists', () => {
      const state = {
        componentActivity: {
          isAddressListActive: false,
        },
        orderForm: {
          canEditData: true,
        },
        addressForm: {
          residentialId: '10',
          addresses: {
            '10': {
              addressType: {
                value: RESIDENTIAL,
              },
              postalCode: {
                value: '123467',
                geolocationAutoCompleted: true,
              },
            },
          },
        },
      }
      expect(addressFormSelectors.isValidPostalGeolocation(state)).toEqual(true)
    })

    it('should return true id value exists', () => {
      const state = {
        componentActivity: {
          isAddressListActive: false,
        },
        orderForm: {
          canEditData: true,
        },
        addressForm: {
          residentialId: '10',
          addresses: {
            '10': {
              addressType: {
                value: RESIDENTIAL,
              },
              geoCoordinates: {
                value: [12341234, 12341234],
              },
            },
          },
        },
      }
      expect(addressFormSelectors.isValidPostalGeolocation(state)).toEqual(true)
    })

    it('should return true when geoCoordinates.valid is true', () => {
      const state = {
        componentActivity: {
          isAddressListActive: false,
        },
        orderForm: {
          canEditData: true,
        },
        addressForm: {
          residentialId: '10',
          addresses: {
            '10': {
              addressType: {
                value: RESIDENTIAL,
              },
              geoCoordinates: {
                value: [12341234, 123412341],
                valid: true,
              },
            },
          },
        },
      }
      expect(addressFormSelectors.isValidPostalGeolocation(state)).toEqual(true)
    })

    it('should return true when canEditData is false', () => {
      const state = {
        componentActivity: {
          isAddressListActive: false,
        },
        orderForm: {
          canEditData: false,
        },
        addressForm: {
          residentialId: '10',
          addresses: {
            '10': {
              addressType: {
                value: RESIDENTIAL,
              },
              geoCoordinates: {
                value: [12341234, 123412341],
                valid: true,
              },
            },
          },
        },
      }
      expect(addressFormSelectors.isValidPostalGeolocation(state)).toEqual(true)
    })
  })

  describe('isValidAddress', () => {
    it('should return true when if is not second purchase and canEditData are true', () => {
      const state = {
        addressForm: {
          residentialId: '10',
          addresses: {
            '10': {
              addressType: {
                value: RESIDENTIAL,
              },
              geoCoordinates: {
                value: [12341234, 123412341],
                valid: true,
              },
            },
          },
          valid: true,
        },
        orderForm: {
          canEditData: true,
        },
      }
      expect(addressFormSelectors.isValidAddress(state)).toEqual(true)
    })

    it("should return true if it's second purchase and canEditData is true", () => {
      const state = {
        addressForm: {
          residentialId: '10',
          addresses: {
            '10': {
              addressType: {
                value: RESIDENTIAL,
              },
              geoCoordinates: {
                value: [12341234, 123412341],
                valid: false,
              },
            },
          },
          valid: false,
        },
        orderForm: {
          canEditData: false,
        },
      }
      expect(addressFormSelectors.isValidAddress(state)).toEqual(true)
    })
  })
})
