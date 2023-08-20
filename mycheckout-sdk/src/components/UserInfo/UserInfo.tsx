import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { DetailViewContainer } from './DetailView/DetailViewContainer'
import { InformationViewContainer } from './InformationView/InformationViewContainer'
import { selectIsMobile } from '../../contexts/global-context/reducers/uiSettingsSlice'
import { useUserData } from '../../contexts/UserDataProvider'
import globalStyles from '../../myCheckout-styles.module.css'
import styles from './userInfo-module.css'
import {
  selectHasAddress,
  selectMainPayment,
  selectOrderForm,
} from '../../contexts/global-context/reducers/orderFormDataSlice'

export const UserInfo = () => {
  const { isProfileDetail } = useUserData()

  const { profile } = useSelector(selectOrderForm)

  const isMobile = useSelector(selectIsMobile)
  const selectedPaymentMethod = useSelector(selectMainPayment)
  const hasAddress = useSelector(selectHasAddress)

  const isIncompleteUserRegistration =
    profile.id && !hasAddress && !selectedPaymentMethod

  return (
    <Fragment>
      {isMobile && (
        <div className={`${styles.userInfoContainer} ${globalStyles.inMobile}`}>
          {!isIncompleteUserRegistration &&
            !isProfileDetail && ( // TODO: Este caso nunca se da
              <DetailViewContainer />
            )}
          {(isIncompleteUserRegistration || isProfileDetail) && (
            <InformationViewContainer />
          )}
        </div>
      )}
      {!isMobile && (
        <div
          className={`${styles.userInfoContainer} ${globalStyles.inDesktop}`}
        >
          <InformationViewContainer />
        </div>
      )}
    </Fragment>
  )
}
