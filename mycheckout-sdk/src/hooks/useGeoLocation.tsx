import { useState, useEffect } from 'react'

interface Error {
  code: number
  message: string
}

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    error: 0,
  })

  const onSuccess = (location1: any) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location1.coords.latitude,
        lng: location1.coords.longitude,
      },
      error: 200,
    })
  }

  const onError = (error: Error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: '', lng: '' },
      error: error.code,
    })
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      })
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return location
}

export default useGeolocation
