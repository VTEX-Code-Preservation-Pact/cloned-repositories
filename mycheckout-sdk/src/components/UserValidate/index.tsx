/* eslint-disable no-else-return */
import React, { useEffect } from 'react'
import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'

import { UserInfo } from '../UserInfo/UserInfo'
import { useUserDataDispatch } from '../../contexts/UserDataProvider'
import { useActions } from '../../contexts/ActionsProviderV2'
import ShippingFormContainer from '../RegisterForm/Shipping/ShippingFormContainer'
import RegisterFormContainer from '../RegisterForm/RegisterFormContainer'
import { MeasurePurchaseProcess } from '../../services/GoogleTagManager'
import { ENTER_EMAIL } from '../../utils/constants'
import { selectSettings } from '../../contexts/global-context/reducers/uiSettingsSlice'
import {
  selectHasAddress,
  selectIsNew,
  selectIsProfileComplete,
  selectItems,
} from '../../contexts/global-context/reducers/orderFormDataSlice'

const UserValidate = () => {
  const items = useSelector(selectItems)
  const dispatchUserData = useUserDataDispatch()
  const { config } = useActions()

  const { hasGoogleAnalytics } = useSelector(selectSettings)
  const profileComplete = useSelector(selectIsProfileComplete)
  const hasAddresses = useSelector(selectHasAddress)
  const isNew = useSelector(selectIsNew)

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (config) {
      const customSubTotalItems = pathOr([], ['customSubTotalItems'], config)

      dispatchUserData({
        type: 'SET_CUSTOM_SUBTOTAL_ITEMS',
        args: {
          customSubTotalItems,
        },
      })
    }
  }, [config])

  useEffect(() => {
    try {
      const persistedData = JSON.parse(
        localStorage.getItem('checkoutless_data')
      )

      MeasurePurchaseProcess({
        stepName: ENTER_EMAIL,
        items,
        option: persistedData?.email,
        hasGoogleAnalytics,
      })
    } catch (error) {
      console.error('Error ', error)
    }
  }, [])

  if (!isNew) {
    if (profileComplete) {
      return <UserInfo />
    } else if (!hasAddresses) {
      return <ShippingFormContainer />
    }
  }

  return <RegisterFormContainer />
}

export default UserValidate
