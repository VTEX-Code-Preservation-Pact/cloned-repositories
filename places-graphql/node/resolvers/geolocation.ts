import { pipe } from 'ramda'

import countryRules from '../countries/rules'
import { ISOAlpha2 } from '../countries/types'
import { toAlpha3 } from '../countries/ISO'

const processGoogleGeocoderResult = (
  googleAddress: google.maps.GeocoderResult
): Address => {
  const baseAddress: Address = {
    addressId: '1',
    addressType: 'residential',
    city: null,
    complement: null,
    country: null,
    geoCoordinates: [],
    neighborhood: null,
    number: null,
    postalCode: null,
    receiverName: null,
    reference: null,
    state: null,
    street: null,
  }

  const rules = countryRules[getCountry(googleAddress)!]

  if (!rules) {
    console.warn(
      `We don't have geolocation rules for the country: ${getCountry(
        googleAddress
      )}`
    )
    return baseAddress
  }

  const geolocationRules = rules.geolocation

  // The functions below use googleAddress and geolocationRules
  // from the closure created.

  function setAddressFields() {
    const indexedRules = revertRuleIndex(geolocationRules)

    return googleAddress.address_components.reduce<Address>(
      (updatedAddress: Address, component) => {
        const checkoutFieldName = getCheckoutFieldName(
          component.types,
          indexedRules
        )

        if (checkoutFieldName) {
          return setAddressFieldValue(
            updatedAddress,
            checkoutFieldName,
            geolocationRules,
            component
          )
        }

        return updatedAddress
      },
      {} as Address
    )
  }

  function setGeoCoordinates(updatedAddress: Address) {
    const {
      location: { lng, lat },
    } = googleAddress.geometry

    updatedAddress.geoCoordinates = [
      typeof lng === 'function' ? lng() : lng,
      typeof lat === 'function' ? lat() : lat,
    ]

    return updatedAddress
  }

  // Run custom function handlers to fill some fields
  function runGeolocationFieldHandlers(updatedAddress: Address) {
    Object.values(geolocationRules).forEach(rule => {
      if (rule!.handler) {
        updatedAddress = rule!.handler(updatedAddress, googleAddress)
      }
    })

    Object.values(geolocationRules).forEach(rule => {
      if (rule!.handler) {
        updatedAddress = rule!.handler(updatedAddress, googleAddress)
      }
    })

    return updatedAddress
  }

  function setCountry(updatedAddress: Address) {
    const country = getCountry(googleAddress)
    updatedAddress.country = country
    return updatedAddress
  }

  return pipe(
    setAddressFields,
    runGeolocationFieldHandlers,
    setGeoCoordinates,
    setCountry,
    (newAddress: Address) => ({
      ...newAddress,
      addressId: baseAddress.addressId,
      addressType: baseAddress.addressType,
      receiverName: baseAddress.receiverName,
    })
  )()
}

/** This function creates a map like this:
 * {
 *   "postal_code": "postalCode",
 *   "street_number": "number",
 *   "route": "street",
 *   "neighborhood": "neighborhood",
 *   "sublocality_level_1": "neighborhood",
 *   "sublocality_level_2": "neighborhood",
 *   "sublocality_level_3": "neighborhood",
 *   "sublocality_level_4": "neighborhood",
 *   "sublocality_level_5": "neighborhood",
 *   "administrative_area_level_1": "state",
 *   "administrative_area_level_2": "city",
 *   "locality": "city"
 * }
 * So it's easy to find which Google address type matches ours
 * */
function revertRuleIndex(geolocationRules: GeolocationRules) {
  return Object.entries(geolocationRules).reduce<{
    [key: string]: GeolocationComponents
  }>((acc, [propName, rule]) => {
    for (let i = 0; i < rule!.types.length; i++) {
      const type = rule!.types[i]
      acc[type] = propName as GeolocationComponents
    }
    return acc
  }, {})
}

// Return the matched checkout field name
function getCheckoutFieldName(
  types: string[],
  indexedRules: { [key: string]: GeolocationComponents }
) {
  const mappedType = types.find(type => indexedRules[type])
  return mappedType ? indexedRules[mappedType] : null
}

function setAddressFieldValue(
  address: Address,
  fieldName: GeolocationComponents,
  geolocationRules: GeolocationRules,
  addressComponent: google.maps.GeocoderAddressComponent
) {
  const geolocationField = geolocationRules[fieldName]
  address[fieldName] = addressComponent[geolocationField!.valueIn]
  return address
}

function getCountry(googleAddress: google.maps.GeocoderResult) {
  const countryComponent = googleAddress.address_components.find(
    component => component.types.indexOf('country') !== -1
  )

  return countryComponent
    ? toAlpha3(countryComponent.short_name as ISOAlpha2)
    : null
}

interface ReverseGeocodeArgs {
  lat: string
  lng: string
}

export const queries = {
  reverseGeocode: async (
    _: unknown,
    args: ReverseGeocodeArgs,
    ctx: Context
  ): Promise<Address> => {
    const { clients } = ctx
    const { lat, lng } = args
    const { apiKey } = await clients.apps.getAppSettings(
      process.env.VTEX_APP_ID
    )

    const googleAddress = await clients.googleGeolocation.reverseGeocode(
      lat,
      lng,
      apiKey
    )

    return processGoogleGeocoderResult(googleAddress.results[0])
  },
}
