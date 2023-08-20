import { useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectSection,
  setPrevStep,
  setSameSection,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import {
  selectIsMobile,
  selectSettings,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import { LOGIN, VERIFY_CODE } from '../../graphql/queries'
import {
  useActionsDispatch,
  useActions,
} from '../../contexts/ActionsProviderV2'
import {
  selectAddressStore,
  selectProfile,
  setIsLoggedIn,
  setUserInfo,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import { userInfoMapper } from '../../utils/dataMapper'
import { useCreateAddressExternal } from '../../hooks/useCreateAddressExternal'

const TIME_RESEND_EMAIL = 0
let TIME_BLOCKED_EMAIL = 60

const useAccessKeyForm = () => {
  const {
    secondAfterEmail: { second, intervalSetSecond: interval },
  } = useActions()

  const intl = useIntl()
  const section = useSelector(selectSection)
  const addressAlternative = useSelector(selectAddressStore)

  const [value, setValue] = useState(['', '', '', '', '', ''])
  const [ref] = useState([null, null, null, null, null, null])
  const [error, setError] = useState(false)
  const inputAuto = useRef<any>(null)
  const [canSendCode, setcanSendCode] = useState(second === TIME_BLOCKED_EMAIL)
  const [showInputsCode, setShowInputsCode] = useState(true)

  const dispatchActions = useActionsDispatch()
  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const { email } = useSelector(selectProfile)
  const dispatchGlobal = useDispatch()
  const [completedValue, setCompletedValue] = useState('')
  const { verifyAndCreateAlternativeAddress } = useCreateAddressExternal()

  const isLite = isLiteVersion && isMobile

  const [verifyCode] = useLazyQuery(VERIFY_CODE, {
    onCompleted: async (data) => {
      if (!data) return setError(true)
      const { verifyCode: userData } = data

      let persistedData = JSON.parse(localStorage.getItem('checkoutless_data'))

      persistedData
        ? (persistedData.authorizedEmail = userData.data.email)
        : (persistedData = {
            email: userData.data.email,
            authorizedEmail: userData.data.email,
          })

      localStorage.setItem('checkoutless_data', JSON.stringify(persistedData))
      localStorage.setItem('checkoutless_attempts', '0')

      const addressAlternativeWhitPostalCode =
        await verifyAndCreateAlternativeAddress(userData, addressAlternative)

      dispatchGlobal(
        setUserInfo(
          userInfoMapper(userData.data, addressAlternativeWhitPostalCode)
        )
      )

      dispatchGlobal(setIsLoggedIn(true))

      if (section === 'registerFormProfile' || section === 'return') {
        dispatchGlobal(setPrevStep())
      }

      dispatchGlobal(setSameSection(section))
    },
    onError: () => {
      setError(true)
    },
  })

  const clearCountSecond = () => {
    clearInterval(interval)
    dispatchActions({
      type: 'SET_RESTART',
    })
  }

  const initCountSecond = () => {
    setcanSendCode(false)
    clearInterval(interval)
    const newInterval = setInterval(() => {
      dispatchActions({
        type: 'SET_SECOND',
      })
    }, 1000)

    dispatchActions({
      type: 'SET_INTERVAL_SECOND',
      args: newInterval,
    })
  }

  const [login] = useLazyQuery(LOGIN, {
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setValue(['', '', '', '', '', ''])
      setError(false)
      localStorage.setItem('checkoutless_attempts', '0')
    },
    onError: (e) => {
      const attempts =
        parseInt(localStorage.getItem('checkoutless_attempts'), 10) || 0

      if (attempts >= 3) {
        TIME_BLOCKED_EMAIL = 600
        dispatchActions({
          type: 'SET_SECOND_DIRECT',
          args: TIME_BLOCKED_EMAIL,
        })
      }

      setShowInputsCode(false)
      initCountSecond()
      console.error('error: ', e)
    },
  })

  const onChangeValue = (newValue: string, index: number) => {
    if (newValue.length === 6 && index === 0) {
      setValue(newValue.split(''))
      ref[ref.length - 1].focus()
    }

    if (newValue.match(/(\d|^(?![\s\S]))/g) && newValue.length <= 2) {
      setValue([
        ...value.slice(0, index),
        newValue.slice(-1),
        ...value.slice(index + 1),
      ])
      if (newValue.length > 0 && ref[index + 1]) {
        ref[index + 1].focus()
      }
    }
  }

  const onRemove = (key: string, index: number) => {
    if (key === 'Backspace') {
      ref[index - 1].focus()
    }
  }

  const handleClick = () => {
    login({
      variables: {
        email,
      },
    })
    initCountSecond()
    if (error) setError(false)
    if (!showInputsCode) setShowInputsCode(true)
  }

  const updateAttempts = () => {
    let attempts =
      parseInt(localStorage.getItem('checkoutless_attempts'), 10) || 0

    localStorage.setItem('checkoutless_attempts', JSON.stringify(++attempts))
  }

  useEffect(() => {
    dispatchActions({
      type: 'SET_IS_LOADING_CVV_FIELD',
      args: false,
    })

    if (second === TIME_BLOCKED_EMAIL || second < TIME_RESEND_EMAIL) {
      if (!showInputsCode) setShowInputsCode(true)

      login({
        variables: {
          email,
        },
      })
      initCountSecond()
      localStorage.setItem(
        'checkoutless_last_notify',
        JSON.stringify({ email })
      )
    } else {
      setShowInputsCode(false)
    }
  }, [])

  useEffect(() => {
    if (!value.includes('')) {
      verifyCode({
        variables: {
          email,
          code: value.reduce((acc: string, next: string) => acc + next),
        },
      })
      updateAttempts()
    }
  }, [value])

  useEffect(() => {
    if (!completedValue) return

    setValue(completedValue.split(''))
  }, [completedValue])

  useEffect(() => {
    if (!('OTPCredential' in window)) return

    const ac = new AbortController()

    const o: any = {
      otp: { transport: ['sms'] },
      signal: ac.signal,
    }

    navigator.credentials
      .get(o)

      .then((otp: any) => {
        inputAuto.current.value = otp.code
        setCompletedValue(otp.code)
        console.warn(`otp`, otp)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    const validateSeconds = second <= TIME_RESEND_EMAIL

    TIME_BLOCKED_EMAIL = 60
    if (validateSeconds) {
      clearCountSecond()
    }

    setcanSendCode(validateSeconds || second === TIME_BLOCKED_EMAIL)
  }, [second])

  return {
    error,
    handleClick,
    intl,
    inputAuto,
    isLite,
    onChangeValue,
    onRemove,
    refInput: ref,
    setCompletedValue,
    value,
    canSendCode,
    showInputsCode,
    second,
  }
}

export default useAccessKeyForm
