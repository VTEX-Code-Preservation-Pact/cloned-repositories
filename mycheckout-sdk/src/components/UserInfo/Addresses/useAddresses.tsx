import { useState, useEffect, useRef, useMemo } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectFormAction,
  setFormAction,
  setPrevStep,
} from '../../../contexts/global-context/reducers/checkoutFormSlice'
import { useUpdateSelectedAddress } from '../../../hooks/useUpdateSelectedAddress'
import { useValidateStyles } from '../../../hooks/useValidateStyles'
import vtexStyles from '../vtex-styles.module.css'
import kuikpayStyles from '../userInfo-module.css'
import genericStyles from '../generic-styles.module.css'
import {
  selectIsMobile,
  selectSettings,
  selectTheme,
} from '../../../contexts/global-context/reducers/uiSettingsSlice'
import { ChangeShippingEvent } from '../../../events'
import {
  selectShipping,
  setUpdateAddresses,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import { useUserDataDispatch } from '../../../contexts/UserDataProvider'

const DELETE_ADDRESS = gql`
  mutation deleteAddress($id: ID!) {
    deleteAddress(id: $id)
      @context(provider: "kuikpay.my-checkout", scope: "private") {
      message
      data {
        id
        country
        state
        city
        street
        number
        postalCode
        receiverName
        geoCoordinates {
          latitude
          longitude
        }
        reference
      }
    }
  }
`

const useAddresses = () => {
  const dispatchGlobal = useDispatch()
  const dispatchUserData = useUserDataDispatch()
  const initialRender = useRef(true)

  const theme = useSelector(selectTheme)
  const { address, availableAddresses } = useSelector(selectShipping)
  const { isLiteVersion, hasGoogleAnalytics } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const formAction = useSelector(selectFormAction)

  const [warning, setWarning] = useState({ show: false, id: '', address: '' })
  const [selectedAddress, setSelectedAddress] = useState(address?.id)
  const [toastMessage, setToastMessage] = useState(null)
  const showForm = useMemo(() => formAction !== 'none', [formAction])

  const global = useValidateStyles()

  let styles = kuikpayStyles

  if (theme === 'vtex') {
    styles = vtexStyles
  } else if (theme === 'generic') {
    styles = genericStyles
  }

  const { updateSelectedAddress } = useUpdateSelectedAddress(selectedAddress)
  const [messages, setMessages] = useState({
    deleted: false,
    edited: false,
    error: false,
  })

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      // TODO: Cada vez que el usuario cambia se hace llamado al back para actualizar la direccion,
      // Algunos de estos llamados serian innecesarios si el usuario cambia muchas veces
      updateSelectedAddress({
        variables: {
          userArgs: { selectedAddress },
        },
      })
      setWarning({ show: false, id: '', address: '' })
      const addressNewSelect = availableAddresses?.find(
        (addressItem) => addressItem.id === selectedAddress
      )

      if (addressNewSelect) {
        ChangeShippingEvent({ address: addressNewSelect, hasGoogleAnalytics })
      }
    }
  }, [selectedAddress])

  useEffect(() => {
    if (address) ChangeShippingEvent({ address, hasGoogleAnalytics })
  }, [])

  const [deleteAddress] = useMutation(DELETE_ADDRESS, {
    onCompleted: ({ deleteAddress: addressDelete }) => {
      const filteredAddress = availableAddresses.filter(
        (addressItem) => addressItem.id !== addressDelete.data?.id
      )

      setMessages({ deleted: true, edited: false, error: false })
      setWarning({ show: false, id: '', address: '' })
      dispatchGlobal(
        setUpdateAddresses({
          availableAddresses: filteredAddress,
        })
      )
    },
    onError: () => {
      setMessages({ deleted: false, edited: false, error: true })
      setWarning({ show: false, id: '', address: '' })
    },
  })

  const handleDelete = (addressId: string) => {
    const selectedAddressDelete = availableAddresses?.find(
      (addressItem) => addressItem.id === addressId
    )

    setMessages({ deleted: false, edited: false, error: false })
    setWarning({
      show: true,
      id: selectedAddressDelete?.id || '',
      address: selectedAddressDelete?.street || '',
    })
  }

  const handleEdit = (addressId: string) => {
    initialRender.current = true
    const editAddress = availableAddresses?.find(
      (addressItem) => addressItem.id === addressId
    )

    dispatchGlobal(
      setUpdateAddresses({
        selectedAddress: editAddress,
      })
    )
    dispatchGlobal(setFormAction('edit'))
    dispatchUserData({
      type: 'SET_CHANGE_INFO',
      args: {
        isEdit: false,
        isNewInfo: true,
        userLocation: false,
        isChangeEmail: false,
      },
    })
    setToastMessage({
      type: 'success',
      header: 'store/checkoutless.user.addressEditedMessageHeader',
      text: 'store/checkoutless.user.addressEditedMessageText',
    })
    setMessages({ deleted: false, edited: true, error: false })
    setWarning({ show: false, id: '', address: '' })
  }

  const handleCreate = (userLocation: boolean) => {
    dispatchUserData({
      type: 'SET_CHANGE_INFO',
      args: {
        isEdit: false,
        isNewInfo: true,
        userLocation,
        isChangeEmail: false,
      },
    })
    dispatchGlobal(setFormAction('add'))
    setMessages({ deleted: false, edited: false, error: false })
    setWarning({ show: false, id: '', address: '' })
  }

  const handleContinue = () => {
    dispatchGlobal(setPrevStep())
  }

  useEffect(() => {
    setSelectedAddress(address?.id)
  }, [address])

  const handleClick = () => {
    deleteAddress({
      variables: {
        id: warning.id,
      },
    })
    setMessages({ deleted: false, edited: false, error: false })
    setWarning({ show: false, id: '', address: '' })
  }

  const handleCloseToast = () => {
    setMessages({ deleted: false, edited: false, error: false })
    setToastMessage(null)
  }

  return {
    availableAddresses,
    global,
    isLiteVersion,
    isMobile,
    messages,
    selectedAddress,
    showForm,
    styles,
    toastMessage,
    warning,
    handleClick,
    handleCloseToast,
    handleContinue,
    handleCreate,
    handleDelete,
    handleEdit,
    setSelectedAddress,
  }
}

export default useAddresses
