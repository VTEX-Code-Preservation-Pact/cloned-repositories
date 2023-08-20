import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export class GoogleGeolocation extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://maps.googleapis.com/maps/api', context, options)
  }

  public reverseGeocode = (lat: string, lng: string, apiKey: string) => {
    return this.http.get(`/geocode/json?latlng=${lat},${lng}&key=${apiKey}`, {
      metric: 'google-reverse-geocode-country',
      timeout: 3000,
    })
  }
}
