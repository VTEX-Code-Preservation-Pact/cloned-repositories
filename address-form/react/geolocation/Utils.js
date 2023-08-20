import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'

export default function getAddressByGeolocation(geolocationProps) {
  const { address, onChangeAddress, rules, googleMaps } = geolocationProps

  if (!googleMaps || !address || !rules || !address.number.valid) {
    return
  }

  const geocoder = new googleMaps.Geocoder()

  geocoder.geocode(
    {
      ...(rules.abbr ? { componentRestrictions: { country: rules.abbr } } : {}),
      address: [
        address.number.value || '',
        address.street.value || '',
        address.city.value || '',
        address.state.value || '',
      ]
        .filter(Boolean)
        .join(' '),
    },
    (results, status) => {
      if (status === googleMaps.GeocoderStatus.OK) {
        if (results[0]) {
          const googleAddress = results[0]
          const autoCompletedAddress = geolocationAutoCompleteAddress(
            address,
            googleAddress,
            rules
          )

          onChangeAddress({
            ...autoCompletedAddress,
            complement: {
              value: null,
            },
            reference: {
              value: null,
            },
          })

          return autoCompletedAddress
        }
      } else {
        console.warn(`Google Maps Error: ${status}`)
      }
    }
  )
}
