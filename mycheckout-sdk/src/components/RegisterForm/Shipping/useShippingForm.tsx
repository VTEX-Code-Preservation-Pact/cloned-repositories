import { useState, useEffect, useMemo } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useSelector } from 'react-redux'

import { FillShippingDataEvent } from '../../../events'
import { geocoding, reverseGeocoding } from '../../../services/GoogleApis'
import { GET_CITIES } from '../../../graphql/queries'
import { selectSettings } from '../../../contexts/global-context/reducers/uiSettingsSlice'
import { useCreateShipping } from './useCreateShipping'
import { useInputValue } from '../../../hooks/useInputValue'
import { useSelectValue } from '../../../hooks/useSelectValue'
import { useUserData } from '../../../contexts/UserDataProvider'
import { selectFormAction } from '../../../contexts/global-context/reducers/checkoutFormSlice'
import {
  selectProfile,
  selectShipping,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import type { SelectValue, Step } from '../../../interfaces'
import useFormatMessage from '../../../i18n/useFormatMessage'
import useGeolocation from '../../../hooks/useGeoLocation'
// import { selectUserRegistrationSections } from '../../../contexts/global-context/reducers/checkoutFormSlice'

interface Component {
  types: string[]
}

export const useShippingForm = (steps: Step) => {
  const location = useGeolocation()
  const { userLocation } = useUserData()

  const { address: addressMC } = useSelector(selectShipping)
  const profile = useSelector(selectProfile)
  const formAction = useSelector(selectFormAction)

  const isEdit = useMemo(() => formAction === 'edit', [formAction])

  // const userRegistrationSections = useSelector(selectUserRegistrationSections)

  const [disabled, setDisabled] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [streetIsUpdated, setStreetIsUpdated] = useState(false)
  const [postalCode, setPostalCode] = useState(
    isEdit ? addressMC?.postalCode : ''
  )

  const [geoCoordinates, setGeoCoordinates] = useState([])
  const [canAddAddress, setCanAddAddress] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingGeoCoordinates, setLoadingGeoCoordinates] = useState(false)
  const [activeLocation, setActiveLocation] = useState(false)
  const [locationError, setLocationError] = useState({
    error: false,
    idMessage: '',
  })

  const [loadingAction, setLoadingAction] = useState(false)

  const { hasGoogleAnalytics } = useSelector(selectSettings)

  const imgUrl = 'https://kuikpay.vteximg.com.br/arquivos/ids/155414'

  const { createAddressFunction, loading } = useCreateShipping({
    setHasError,
  })

  const [formatedStateCities, setFormatedStateCities] = useState([
    {
      label: useFormatMessage('store/checkoutless.location.EnterCity'),
      value: '1',
      postalCode: '',
    },
  ])

  const country = useSelectValue({
    label: 'Colombia',
    value: 'Colombia',
  })

  const stateCity: SelectValue = useSelectValue(
    (isEdit || formAction === 'none') && addressMC?.city && addressMC?.state
      ? {
          label: `${addressMC.city} - ${addressMC.state}`,
          value: `${addressMC.city} - ${addressMC.state}`,
        }
      : null
  )

  const street = useInputValue(
    (isEdit || formAction === 'none') && addressMC?.street
      ? addressMC?.street
      : ''
  )

  const complement = useInputValue(
    (isEdit || formAction === 'none') && addressMC?.complement
      ? addressMC?.complement
      : ''
  )

  const neighborhood = useInputValue(
    (isEdit || formAction === 'none') && addressMC?.neighborhood
      ? addressMC?.neighborhood
      : ''
  )

  const [getCities, { data: cachedData, loading: loadingLazyCities }] =
    useLazyQuery(GET_CITIES, {
      fetchPolicy: 'cache-and-network',
      onCompleted: ({ getCities: StateCities }) => {
        setFormatedStateCities(
          StateCities?.map((cityValue: any) => ({
            label: `${cityValue.city} - ${cityValue.state}`,
            value: `${cityValue.city}-${cityValue.state}`,
            postalCode: cityValue.postal_code,
          })) || []
        )
        if (StateCities.length > 0) {
          stateCity.setValue({
            label: `${StateCities[0].city} - ${StateCities[0].state}`,
            value: `${StateCities[0].city}-${StateCities[0].state}`,
          })
        }

        setLoadingGeoCoordinates(false)
      },
      onError: () => {
        setLoadingGeoCoordinates(false)
        setFormatedStateCities([])
      },
    })

  // useEffect(() => {
  //   if (
  //     userRegistrationSections === 2 &&
  //     addressAlternative?.addressType === 'search'
  //   ) {
  //     setLoadingAction(true)
  //   }
  // }, [userRegistrationSections])

  useEffect(() => {
    if (steps?.shipping && !steps?.payment) {
      setLoadingAction(false)
    }
  }, [steps])

  useEffect(() => {
    setLoadingCities(loadingLazyCities)
  }, [loadingLazyCities])

  const onInputChangeCities = (newValue: string) => {
    if (newValue) {
      getCities({
        variables: {
          city: encodeURIComponent(newValue.trim()),
        },
      })
    }
  }

  const addressValidation = () => {
    const streetFormatted = encodeURI(street.value).replace(/#/g, '%23')

    if (!streetIsUpdated && !(stateCity?.value?.value && street.value)) return

    geocoding(
      streetFormatted,
      stateCity?.value?.value?.split('-')[0],
      stateCity?.value?.value?.split('-')[1],
      country.value.value
    )
      .then((e: any) => e.json())
      .then((res) => {
        switch (res.status) {
          case 'REQUEST_DENIED':
            street.setIsValid(false)
            setStreetIsUpdated(true)
            break

          case 'OK': {
            if (res.results.length > 0) {
              const route = res.results[0].address_components.find(
                (component: Component) => {
                  return component.types.find(
                    (type: string) =>
                      type === 'route' || type === 'intersection'
                  )
                }
              )

              const neighborhoodMaps =
                res.results[0].address_components.find(
                  (component: Component) => {
                    return component.types.find(
                      (type: string) => type === 'neighborhood'
                    )
                  }
                )?.long_name || ''

              if (!route) {
                street.setIsValid(false)
              } else {
                street.setIsValid(true)

                setGeoCoordinates([
                  res.results[0].geometry.location.lat,
                  res.results[0].geometry.location.lng,
                ])
                !neighborhood.value && neighborhood.setValue(neighborhoodMaps)
                setStreetIsUpdated(false)
              }
            } else {
              street.setIsValid(false)
              setStreetIsUpdated(false)
            }

            break
          }

          default: {
            street.setIsValid(false)
            setStreetIsUpdated(true)
          }
        }
      })
      .catch(() => {
        street.setIsValid(false)
        setStreetIsUpdated(true)
      })
  }

  // TODO: Esto podria ir en un hook dedicado a los temas de geolocalización del usuario
  const getLocation = () => {
    if (!location.loaded) {
      setLoadingGeoCoordinates(false)
      setLocationError({
        error: true,
        idMessage: 'store/checkoutless.location.unAvailable',
      })
    } else {
      switch (location.error) {
        case 200: {
          reverseGeocoding(location.coordinates.lat, location.coordinates.lng)
            .then((e: any) => e.json())
            .then((res) => {
              switch (res.status) {
                case 'ZERO_RESULTS':
                  setLoadingGeoCoordinates(false)
                  setLocationError({
                    error: true,
                    idMessage: 'store/checkoutless.location.zeroResults',
                  })
                  break

                case 'OK': {
                  if (res.results.length > 0) {
                    const route =
                      res.results[0].address_components.find(
                        (component: Component) => {
                          return component.types.find(
                            (type: string) => type === 'route'
                          )
                        }
                      )?.long_name || ''

                    const googleStreet =
                      res.results[0].address_components.find(
                        (component: Component) => {
                          return component.types.find(
                            (type: string) => type === 'street_number'
                          )
                        }
                      )?.long_name || ''

                    const neighborhoodMaps =
                      res.results[0].address_components.find(
                        (component: Component) => {
                          return component.types.find(
                            (type: string) => type === 'neighborhood'
                          )
                        }
                      )?.long_name || ''

                    const city =
                      res.results[0].address_components.find(
                        (component: Component) => {
                          return component.types.find(
                            (type: string) =>
                              type === 'administrative_area_level_2'
                          )
                        }
                      )?.long_name || ''

                    const state =
                      res.results[0].address_components.find(
                        (component: Component) => {
                          return component.types.find(
                            (type: string) =>
                              type === 'administrative_area_level_1'
                          )
                        }
                      )?.long_name || ''

                    if (city !== '') {
                      getCities({
                        variables: { city: encodeURIComponent(city) },
                      })
                    } else {
                      getCities({
                        variables: { city: encodeURIComponent(state) },
                      })
                    }

                    if (cachedData) {
                      setLoadingGeoCoordinates(false)
                    }

                    street.setValue(`${route} # ${googleStreet}`)
                    neighborhood.setValue(neighborhoodMaps)
                    setLocationError({
                      error: false,
                      idMessage: '',
                    })
                  } else {
                    setLoadingGeoCoordinates(false)
                    setLocationError({
                      error: true,
                      idMessage: 'store/checkoutless.location.generalError',
                    })
                  }

                  break
                }

                default: {
                  setLoadingGeoCoordinates(false)
                  setLocationError({
                    error: true,
                    idMessage: 'store/checkoutless.location.generalError',
                  })
                }
              }
            })
            .catch(() => {
              setLoadingGeoCoordinates(false)
              setLocationError({
                error: true,
                idMessage: 'store/checkoutless.location.generalError',
              })
            })
          break
        }

        case 0: {
          setLoadingGeoCoordinates(false)
          setLocationError({
            error: true,
            idMessage: 'store/checkoutless.location.notSuported',
          })
          break
        }

        case 1: {
          setLoadingGeoCoordinates(false)
          setLocationError({
            error: true,
            idMessage: 'store/checkoutless.location.denied',
          })
          break
        }

        default: {
          setLoadingGeoCoordinates(false)
          setLocationError({
            error: true,
            idMessage: 'store/checkoutless.location.generalError',
          })
        }
      }
    }
  }

  const handleClick = () => {
    if (loading) return
    createAddressFunction({
      variables: {
        ...(isEdit ? { id: addressMC.id } : {}),
        profileId: profile.id,
        country: 'COL', // TODO: Este campo debe venir del setup de la tienda
        state: stateCity?.value?.value?.split('-')[1],
        city: stateCity?.value?.value?.split('-')[0],
        street: street.value?.trim(),
        number: '1',
        postalCode,
        receiverName: profile.name,
        geoCoordinates: {
          latitude: geoCoordinates[0],
          longitude: geoCoordinates[1],
        },
        reference: complement?.value?.trim() || '',
        neighborhood: neighborhood?.value?.trim(),
      },
    })
    FillShippingDataEvent({
      option: `${street.value?.trim()} ${
        stateCity?.value?.value?.split('-')[0]
      } - ${stateCity?.value?.value?.split('-')[1]}`,
      hasGoogleAnalytics,
    })
  }

  const handleKeyUpevent = (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (ev.key === 'Enter' && !disabled) {
      handleClick()
    }
  }

  const handleKeyUpeventStreet = (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (ev.key === 'Shift' || ev.key === 'Tab') setStreetIsUpdated(false)
    else setStreetIsUpdated(true)
    handleKeyUpevent(ev)
  }

  useEffect(() => {
    const { latitude = '', longitude = '' } = addressMC?.geoCoordinates || {}

    setGeoCoordinates([latitude, longitude])
  }, [])

  useEffect(() => {
    if (country?.value?.value && stateCity?.value?.value && !street.value) {
      setCanAddAddress(true)
    }
  }, [country, stateCity])

  useEffect(() => {
    if (country?.value?.value && stateCity?.value?.value) {
      setCanAddAddress(true)
    } else {
      setCanAddAddress(false)
    }

    if (country?.value?.value && stateCity?.value?.value) {
      addressValidation()
    }
  }, [country?.value?.value, stateCity?.value?.value])

  useEffect(() => {
    if (
      stateCity.isValid &&
      street.isValid &&
      neighborhood.isValid &&
      geoCoordinates.length > 0
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [stateCity, street, geoCoordinates])

  useEffect(() => {
    if (!stateCity?.value?.value) return
    if (formatedStateCities[0].value !== '1') {
      const { postalCode: postalCodeFound } = formatedStateCities?.find(
        (stateCityFiltered: any) =>
          stateCityFiltered.value === stateCity?.value?.value
      )

      setPostalCode(postalCodeFound)
    } else {
      setPostalCode(addressMC?.postalCode)
    }
  }, [stateCity?.value?.value])

  useEffect(() => {
    if (neighborhood?.value?.length > 0) neighborhood.setIsValid(true)
  }, [neighborhood?.value])

  useEffect(() => {
    if (userLocation) {
      setLoadingGeoCoordinates(true)
      if (location.loaded) {
        getLocation()
      }
    }
  }, [userLocation, location.loaded])

  useEffect(() => {
    if (locationError.error) {
      setTimeout(() => {
        setLocationError({
          error: false,
          idMessage: '',
        })
      }, 5000)
    }
  }, [locationError.error])

  return {
    activeLocation,
    // addressAlternative,
    canAddAddress,
    complement,
    disabled,
    formatedStateCities,
    geoCoordinates,
    hasError,
    imgUrl,
    loading,
    loadingCities,
    loadingGeoCoordinates,
    locationError,
    // logisticsInfo,
    formAction,
    neighborhood,
    postalCode,
    stateCity,
    street,
    userLocation,
    addressValidation,
    getLocation,
    handleClick,
    handleKeyUpevent,
    handleKeyUpeventStreet,
    onInputChangeCities,
    setActiveLocation,
    setLoadingGeoCoordinates,
    loadingAction,
  }
}
