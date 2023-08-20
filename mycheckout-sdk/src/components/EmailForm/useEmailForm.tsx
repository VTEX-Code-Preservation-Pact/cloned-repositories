import type React from 'react'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { pathOr } from 'ramda'

import {
  useActions,
  useActionsDispatch,
} from '../../contexts/ActionsProviderV2'
import { useInputValue } from '../../hooks/useInputValue'
import { expireCookie } from '../../utils'
import { setShowLogo } from '../../contexts/global-context/reducers/uiSettingsSlice'
import { setNextStep } from '../../contexts/global-context/reducers/checkoutFormSlice'
import { Events } from '../../interfaces'
import { useEcommerce } from '../../hooks/useEcommerce'
import { GET_USER } from '../../graphql/queries'
import { EnterEmailEvent } from '../../events'
import {
  selectAddressStore,
  selectOrderFormStatus,
  selectProfile,
  setEmail,
  setOrderformStatus,
  setUserInfo,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import { userInfoMapper } from '../../utils/dataMapper'
import { useCreateAddressExternal } from '../../hooks/useCreateAddressExternal'

const useEmailForm = () => {
  const [disabled, setDisabled] = useState(true)
  const dispatchGlobal = useDispatch()
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const {
    updateOrderFormProfile,
    handleGetDocumentsClient,
    isOpenModalViewUser,
    isMinimizeViewUser,
  } = useActions()

  const {
    secondAfterEmail: { intervalSetSecond: interval },
  } = useActions()

  const profile = useSelector(selectProfile)
  const orderFormStatus = useSelector(selectOrderFormStatus)

  const addressAlternative = useSelector(selectAddressStore)

  const { verifyAndCreateAlternativeAddress } = useCreateAddressExternal()

  const dispatchActions = useActionsDispatch()
  const { handleEcommerce } = useEcommerce()

  const email = useInputValue(profile.email || '')

  const [getUser, { loading }] = useLazyQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async ({ getUser: userData }) => {
      // TODO: Check for what is this logic
      if (
        handleGetDocumentsClient &&
        handleGetDocumentsClient instanceof Function
      ) {
        handleGetDocumentsClient(email?.value || userData?.email || '')
      }

      updateOrderFormProfile({
        email: email.value.toLowerCase(),
      })

      if (profile.email !== email.value) {
        handleEcommerce(Events.authentication)
      }

      let persistedData = JSON.parse(localStorage.getItem('checkoutless_data'))

      persistedData
        ? (persistedData.email = email.value)
        : (persistedData = { email: email.value })

      localStorage.setItem('checkoutless_data', JSON.stringify(persistedData))

      const addressAlternativeWhitPostalCode =
        await verifyAndCreateAlternativeAddress(userData, addressAlternative)

      dispatchGlobal(
        setUserInfo(userInfoMapper(userData, addressAlternativeWhitPostalCode))
      )

      dispatchGlobal(setNextStep())
    },
    onError: (error) => {
      const statusCode = pathOr(
        'E_HTTP_500',
        ['graphQLErrors', 0, 'extensions', 'exception', 'code'],
        error
      )

      if (statusCode.includes('404')) {
        updateOrderFormProfile({
          email: email.value.toLowerCase(),
        })

        // New Context
        dispatchGlobal(setOrderformStatus('incomplete'))
        dispatchGlobal(setEmail(email.value.toLocaleLowerCase()))

        localStorage.setItem(
          'checkoutless_data',
          JSON.stringify({ email: email.value })
        )

        dispatchGlobal(setNextStep())
      } else {
        setShowErrorMessage(true)
      }
    },
  })

  useEffect(() => {
    dispatchGlobal(setShowLogo(!loading))
  }, [loading])

  const handleClick = (newEmail?: string) => {
    const emailLogin = newEmail || email.value.toLowerCase()
    const lastNotify = JSON.parse(
      localStorage.getItem('checkoutless_last_notify')
    )

    // reset tries for auth
    if (lastNotify?.email !== emailLogin) {
      clearInterval(interval)
      dispatchActions({
        type: 'SET_SECOND_DIRECT',
        args: 60,
      })
      localStorage.setItem('checkoutless_attempts', '0')
    }

    getUser({
      variables: {
        email: emailLogin,
      },
    })

    // Google Analytics
    EnterEmailEvent({ option: emailLogin })
  }

  useEffect(() => {
    email?.setValue(profile?.email)
    if (profile.email && profile.email !== '') {
      email?.setIsValid(true)
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [profile.email])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (
      (isOpenModalViewUser || isMinimizeViewUser) &&
      profile.email &&
      profile.email !== ''
    ) {
      handleClick(profile.email)

      if (isOpenModalViewUser) {
        dispatchActions({
          type: 'SET_IS_OPEN_MODAL_VIEW_USER',
          args: false,
        })
      }

      if (isMinimizeViewUser) {
        dispatchActions({
          type: 'SET_IS_MINIMIZE_VIEW_USER',
          args: false,
        })
      }
    }
  }, [isOpenModalViewUser, profile.email, isMinimizeViewUser])

  useEffect(() => {
    if (email.value && orderFormStatus === 'idle') {
      handleClick()
    } else {
      expireCookie('x-ecommerce-session')
      expireCookie('x-checkoutless-auth')
    }
  }, [])

  useEffect(() => {
    if (email.isValid) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [email])

  const handleKeyUpevent = (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (ev.key === 'Enter' && !disabled) {
      handleClick()
    }
  }

  return {
    showErrorMessage,
    setShowErrorMessage,
    handleKeyUpevent,
    loading,
    email,
    handleClick,
    disabled,
  }
}

export default useEmailForm
