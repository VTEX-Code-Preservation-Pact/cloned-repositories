import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import { useCreateShipping } from '../components/RegisterForm/Shipping/useCreateShipping'
import type { Address } from '../interfaces'
import { CREATE_ADDRESS_EXTERNAL } from '../graphql/mutations'
import { setUserRegistrationSections } from '../contexts/global-context/reducers/checkoutFormSlice'
import type { AddressMC } from '../interfaces/orderForm'
import { selectIsNew } from '../contexts/global-context/reducers/orderFormDataSlice'

export const useCreateAddressExternal = () => {
  const [successAddressAlter, setSuccessAddressAlter] = useState(false)
  const dispatchGlobal = useDispatch()
  const { processCompletedAddress } = useCreateShipping()
  const isNew = useSelector(selectIsNew)

  const [createAddressExternal, { loading }] = useMutation(
    CREATE_ADDRESS_EXTERNAL,
    {
      onCompleted: (data) => {
        const { externalAddress } = data

        if (!isNew) return

        const addressData: Address = {
          addressId: externalAddress.id,
          addressType: 'residential',
          city: externalAddress.city,
          complement: externalAddress.reference,
          country: externalAddress.country,
          geoCoordinates: {
            latitude: externalAddress.geoCoordinates.latitude,
            longitude: externalAddress.geoCoordinates.longitude,
          },
          neighborhood: externalAddress.neighborhood,
          postalCode: externalAddress.postalCode,
          receiverName: externalAddress.receiverName,
          reference: externalAddress.reference,
          state: externalAddress.state,
          street: externalAddress.street,
        }

        if (externalAddress?.isEqual && externalAddress?.isEqual === 'false') {
          setSuccessAddressAlter(true)
          setTimeout(() => {
            setSuccessAddressAlter(false)
          }, 3000)
        }

        dispatchGlobal(setUserRegistrationSections(3))
        processCompletedAddress(addressData, true)
      },
      onError: (error) => {
        console.error('ERROR CREATE ADDRESS EXTERNAL', error)
        setSuccessAddressAlter(false)
      },
    }
  )

  const verifyAndCreateAlternativeAddress = async (
    userData: any,
    addressAlternative: AddressMC
  ) => {
    let addressAlternativeWhitPostalCode = userData.addresses?.find(
      (address: any) => address?.id === addressAlternative?.id
    )

    if (
      addressAlternative &&
      (addressAlternative?.postalCode?.includes('*') ||
        !addressAlternativeWhitPostalCode)
    ) {
      const dataForCreate = {
        addressId: addressAlternative?.id,
        profileId: userData?.id,
        country: addressAlternative?.country,
        state: addressAlternative?.state,
        city: addressAlternative?.city,
        street: addressAlternative?.street,
        number: addressAlternative?.number,
        postalCode: addressAlternative?.postalCode,
        receiverName: addressAlternative?.receiverName || '',
        geoCoordinates: addressAlternative?.geoCoordinates,
        neighborhood: addressAlternative?.neighborhood || '',
        reference: addressAlternative?.reference,
      }

      addressAlternativeWhitPostalCode = await createAddressExternal({
        variables: { args: dataForCreate },
      })
    }

    return addressAlternativeWhitPostalCode?.data?.externalAddress
      ? {
          ...addressAlternativeWhitPostalCode?.data?.externalAddress,
          addressDeliveryType: addressAlternative?.addressDeliveryType,
        }
      : addressAlternative
  }

  return {
    loading,
    successAddressAlter,
    createAddressExternal,
    setSuccessAddressAlter,
    verifyAndCreateAlternativeAddress,
  }
}
