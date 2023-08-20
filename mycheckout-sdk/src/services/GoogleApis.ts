export const geocoding = async (
  address: string,
  city: string,
  state: string,
  country: string
) => {
  try {
    const requestOptions = {
      method: 'GET',
    }

    return await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},${state},${country}&key=`,
      requestOptions
    )
  } catch (e) {
    return e
  }
}

export const reverseGeocoding = async (lat: string, lng: string) => {
  try {
    const requestOptions = {
      method: 'GET',
    }

    return await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&location_type=ROOFTOP&result_type=street_address&key=`,
      requestOptions
    )
  } catch (e) {
    return e
  }
}
