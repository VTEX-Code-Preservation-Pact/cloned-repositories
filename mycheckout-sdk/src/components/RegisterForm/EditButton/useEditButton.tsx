import { useDispatch, useSelector } from 'react-redux'

import {
  useUserDataDispatch,
  useUserData,
} from '../../../contexts/UserDataProvider'
import { setNextSection } from '../../../contexts/global-context/reducers/checkoutFormSlice'
import { useValidateStyles } from '../../../hooks/useValidateStyles'
import {
  selectIsMobile,
  selectSettings,
} from '../../../contexts/global-context/reducers/uiSettingsSlice'

const useEditButton = () => {
  const {
    clientProfileData,
    shippingData,
    shippingData: { addressAlternative },
    theme,
  } = useUserData()

  const dispatchUserData = useUserDataDispatch()
  const dispatchGlobal = useDispatch()
  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const global = useValidateStyles()

  const handleClientData = () => {
    const isMasked = clientProfileData?.firstName?.includes('**')

    if (isMasked) {
      dispatchGlobal(setNextSection('registerFormProfile'))
    }

    dispatchUserData({
      type: 'SET_CLIENT_DATA',
      args: {
        clientProfileData: {
          ...clientProfileData,
          completed: false,
        },
      },
    })
  }

  const handleShippingData = () => {
    const isMasked = shippingData?.selectedAddress?.street?.includes('**')

    if (isMasked) {
      dispatchGlobal(setNextSection('registerFormShipping'))
    }

    dispatchUserData({
      type: 'SET_SHIPPING_DATA',
      args: {
        shippingData: {
          ...shippingData,
          completed: false,
        },
      },
    })
  }

  return {
    global,
    handleClientData,
    addressAlternative,
    handleShippingData,
    theme,
    isLiteVersion,
    isMobile,
  }
}

export default useEditButton
