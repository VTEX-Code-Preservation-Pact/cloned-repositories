import getAddressByGeolocation from './Utils'
import useOneLevel from '../country/__mocks__/useOneLevel'
import newAddress from '../__mocks__/geolocationAddressWithNumber'
import googleMaps from './__mocks__/googleMapsGeocoder'

describe('Get Address by Geolocation', () => {
  it('should transform a Google address to a Checkout address', () => {
    const mockFn = jest.fn()
    const geolocationProps = {
      address: newAddress,
      onChangeAddress: jest.fn(),
      rules: useOneLevel,
      googleMaps: { Geocoder: googleMaps(mockFn) },
    }

    getAddressByGeolocation(geolocationProps)

    expect(mockFn).toHaveBeenCalledWith(
      {
        address: '321 Praia de Botafogo Rio de Janeiro RJ',
        componentRestrictions: { country: 'EC' },
      },
      expect.any(Function)
    )
  })
})
