import React from 'react'
import { useSelector } from 'react-redux'

import Addresses from '../UserInfo/Addresses/AddressesContainer'
import PaymentMethods from '../UserInfo/PaymentMethods'
import { getCookie } from '../../utils/index'
import ProfileForm from '../RegisterForm/Profile/ProfileFormContainer'
import Packages from '../LogisticsInfo/Packages/PackagesContainer'
import { selectSection } from '../../contexts/global-context/reducers/checkoutFormSlice'
import Cart from '../UserInfo/Cart'
import AccessKeyFormContainer from '../AccessKeyForm/AccessKeyFormContainer'
import RegisterFormContainer from '../RegisterForm/RegisterFormContainer'

const ViewValidate = () => {
  const section = useSelector(selectSection)
  const sessionCookie = getCookie('x-checkoutless-auth')
  const persistedData = JSON.parse(localStorage.getItem('checkoutless_data'))
  const authorizedUser = persistedData
    ? persistedData.email === persistedData.authorizedEmail
    : false

  // TODO: Revisar esta logica, no se deberia confiar en una autenticación sobre localStorage
  if (
    section !== 'logisticsInfo' &&
    section !== 'summary' &&
    (!sessionCookie || !authorizedUser)
  ) {
    return <AccessKeyFormContainer />
  }

  switch (section) {
    case 'clientProfileData':
      return <ProfileForm />

    case 'shippingData':
      return <Addresses />

    case 'paymentData':
      return <PaymentMethods />

    case 'logisticsInfo':
      return <Packages />

    case 'registerFormProfile':
      return <RegisterFormContainer />

    case 'registerFormShipping':
      return <RegisterFormContainer />

    case 'summary':
      return <Cart />

    default: {
      return null
    }
  }
}

export default ViewValidate
