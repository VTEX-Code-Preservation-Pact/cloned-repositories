import { useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import { CREATE_ADDRESS } from '../../../graphql/mutations'
import { useActions } from '../../../contexts/ActionsProviderV2'
import {
  selectFormAction,
  selectSection,
  setFormAction,
  setNextUserRegistrationSections,
  setSameSection,
} from '../../../contexts/global-context/reducers/checkoutFormSlice'
import { useUserDataDispatch } from '../../../contexts/UserDataProvider'
import type { Address } from '../../../interfaces'
import {
  selectShipping,
  setAddressDelivery,
  setUpdateAddresses,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import type { AddressMC } from '../../../interfaces/orderForm'

interface Props {
  setHasError?: any
}

export const useCreateShipping = (props?: Props) => {
  const { updateSelectedAddress } = useActions()
  const section = useSelector(selectSection)

  const dispatchUserData = useUserDataDispatch()
  const dispatchGlobal = useDispatch()

  const { availableAddresses } = useSelector(selectShipping)
  const formAction = useSelector(selectFormAction)

  const processCompletedAddress = (
    addressData: Address,
    isAlternateAddress = false
  ) => {
    updateSelectedAddress({
      ...addressData,
      reference: addressData.reference,
    })

    if (formAction === 'edit') {
      const editedAddresses = availableAddresses.map<AddressMC>(
        (availableAddress) => {
          if (availableAddress.id === addressData.addressId) {
            return {
              id: addressData.addressId,
              city: addressData.city,
              complement: addressData.reference,
              country: addressData.country,
              number: addressData.number,
              reference: addressData.reference,
              geoCoordinates: {
                latitude: addressData.geoCoordinates.latitude,
                longitude: addressData.geoCoordinates.longitude,
              },
              neighborhood: addressData.neighborhood,
              postalCode: addressData.postalCode,
              receiverName: addressData.receiverName,
              state: addressData.state,
              street: addressData.street,
              addressDeliveryType: 'delivery',
            }
          }

          return availableAddress
        }
      )

      dispatchGlobal(
        setUpdateAddresses({ availableAddresses: editedAddresses })
      )
    } else if (formAction === 'add') {
      const newAddress: AddressMC = {
        id: addressData.addressId,
        city: addressData.city,
        complement: addressData.reference,
        country: addressData.country,
        number: addressData.number,
        reference: addressData.reference,
        geoCoordinates: {
          latitude: addressData.geoCoordinates.latitude,
          longitude: addressData.geoCoordinates.longitude,
        },
        neighborhood: addressData.neighborhood,
        postalCode: addressData.postalCode,
        receiverName: addressData.receiverName,
        state: addressData.state,
        street: addressData.street,
        addressDeliveryType: 'delivery',
      }

      dispatchGlobal(
        setUpdateAddresses({
          availableAddresses: [...availableAddresses, newAddress],
          selectedAddress: newAddress,
        })
      )

      dispatchGlobal(setFormAction('none'))

      return
    } else {
      !isAlternateAddress && dispatchGlobal(setNextUserRegistrationSections())
    }

    if (formAction !== 'none') {
      dispatchUserData({
        type: 'SET_CHANGE_INFO',
        args: {
          isEdit: false,
          isNewInfo: false,
          userLocation: false, // TODO: Migrar userLocation a contexto de redux es el unico que se usa aqui
          isChangeEmail: false,
        },
      })
      dispatchGlobal(setSameSection(section))
    }

    // New Context
    dispatchGlobal(
      setAddressDelivery({
        id: addressData.addressId,
        city: addressData.city,
        complement: addressData.reference,
        country: addressData.country,
        geoCoordinates: {
          latitude: addressData.geoCoordinates.latitude,
          longitude: addressData.geoCoordinates.longitude,
        },
        neighborhood: addressData.neighborhood,
        postalCode: addressData.postalCode,
        receiverName: addressData.receiverName,
        reference: addressData.reference,
        state: addressData.state,
        street: addressData.street,
        number: addressData.number,
        addressDeliveryType: 'delivery',
      })
    )

    dispatchGlobal(setFormAction('none'))
  }

  const [createAddressFunction, { loading }] = useMutation(CREATE_ADDRESS, {
    onCompleted: (data) => {
      const { createAddress } = data
      const addressData: Address = {
        addressId: createAddress.id,
        addressType: 'residential',
        city: createAddress.city,
        complement: createAddress.reference,
        country: createAddress.country,
        geoCoordinates: {
          latitude: createAddress.geoCoordinates.latitude,
          longitude: createAddress.geoCoordinates.longitude,
        },
        neighborhood: createAddress.neighborhood,
        postalCode: createAddress.postalCode,
        receiverName: createAddress.receiverName,
        reference: createAddress.reference,
        state: createAddress.state,
        street: createAddress.street,
      }

      processCompletedAddress(addressData)
    },
    onError: (error) => {
      if (props?.setHasError) props?.setHasError(true)
      console.error(`ERROR CREATE SHIPPING`, error)
    },
  })

  return {
    loading,
    createAddressFunction,
    processCompletedAddress,
  }
}
