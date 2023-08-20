import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import {
  useUserData,
  useUserDataDispatch,
} from '../../../contexts/UserDataProvider'
import {
  selectIsMobile,
  selectSettings,
} from '../../../contexts/global-context/reducers/uiSettingsSlice'
import {
  selectSection,
  setNextUserRegistrationSections,
  setPrevStep,
  setSameSection,
} from '../../../contexts/global-context/reducers/checkoutFormSlice'
import { useActions } from '../../../contexts/ActionsProviderV2'
import type { ClientProfileData } from '../../../interfaces'
import { useInputValue } from '../../../hooks/useInputValue'
import constants from '../../../utils/constants'
import { Events } from '../../../interfaces'
import { useEcommerce } from '../../../hooks/useEcommerce'
import { FillPersonalDataEvent } from '../../../events'
import type { Message } from '../../shared/interfaces/interfaces'
import {
  selectProfile,
  setProfile,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import type { OrderFormMC } from '../../../interfaces/orderForm'
import { useFetchIpAddress } from '../../../hooks/useFetchIpAddress'

const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $habeasData: Boolean!
    $id_number: String!
    $id_type: String!
    $ip: String!
    $lastname: String!
    $name: String!
    $phone_code: String!
    $phone_number: String!
  ) {
    createUser(
      email: $email
      habeasData: $habeasData
      id_number: $id_number
      id_type: $id_type
      ip: $ip
      lastname: $lastname
      name: $name
      phone_code: $phone_code
      phone_number: $phone_number
    ) @context(provider: "kuikpay.my-checkout") {
      id
      name
      lastname
      id_type
      id_number
      email
      phone_code
      phone_number
      habeasData
    }
  }
`

const profileFormInitialState: ClientProfileData = {
  email: '',
  firstName: '',
  lastName: '',
  document: '',
  phone: '',
  habeasData: false,
}

export const useProfileForm = () => {
  const [disabled, setDisabled] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [toastMessage, setToastMessage] = useState<Message>()

  const { storeTermsAndConditions } = useUserData()

  // cargar nuevo contexto

  const profile = useSelector(selectProfile)
  const isEdit = useSelector(
    (state: { orderForm: OrderFormMC }) => state.orderForm.status === 'complete'
  )

  const section = useSelector(selectSection)
  const dispatchUserData = useUserDataDispatch()
  const dispatchGlobal = useDispatch()
  const { isLiteVersion, hasGoogleAnalytics } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const { updateOrderFormProfile, storeTermsAndConditionsContent } =
    useActions()

  const { ipAddress } = useFetchIpAddress()

  const email = useInputValue(profile.email)
  const firstName = useInputValue(profile.name)
  const lastName = useInputValue(profile.lastname)
  const document = useInputValue(profile.document)
  const phone = useInputValue(profile.phone)
  const { handleEcommerce } = useEcommerce()
  const initialRenderer = useRef(true)
  const existStoreTermAndConditions = storeTermsAndConditionsContent?.length > 0
  const [showHabeasData, setShowHabeasData] = useState(false)

  const { prefix, documentType } = constants

  // TODO: review this logic
  const refreshProfileFormInitialState = () => {
    profileFormInitialState.email = email?.value
    profileFormInitialState.firstName = firstName?.value
    profileFormInitialState.lastName = lastName?.value
    profileFormInitialState.document = document?.value
    profileFormInitialState.phone = phone?.value
    profileFormInitialState.habeasData = profile.habeasData
  }

  const areThereChangesForm = () => {
    const enteredFields: ClientProfileData = {
      email: email?.value,
      firstName: firstName?.value,
      lastName: lastName?.value,
      document: document?.value,
      phone: phone?.value,
      habeasData: profile.habeasData,
    }

    return (
      Object.entries(enteredFields).toString() ===
      Object.entries(profileFormInitialState).toString()
    )
  }

  const handleContinue = () => {
    dispatchUserData({
      type: 'SET_CHANGE_INFO',
      args: {
        isEdit: false,
        isNewInfo: false,
        userLocation: false,
        isChangeEmail: false,
      },
    })
    dispatchGlobal(setPrevStep())
  }

  const [createUserFunction, { loading: loadingUser }] = useMutation(
    CREATE_USER,
    {
      onCompleted: (data) => {
        const { createUser } = data

        const user = {
          email: createUser.email,
          firstName: createUser.name,
          lastName: createUser.lastname,
          documentType: createUser.id_type,
          document: createUser.id_number,
          phone: createUser.phone_number,
        }

        dispatchGlobal(
          setProfile({
            id: createUser.id,
            email: createUser.email,
            name: createUser.name,
            lastname: createUser.lastname,
            documentType: createUser.id_type,
            document: createUser.id_number,
            phone: createUser.phone_number,
            phoneCode: createUser.phone_code,
            habeasData: createUser.habeasData,
          })
        )

        handleEcommerce(Events.authentication)

        updateOrderFormProfile(user)

        if (isEdit) {
          dispatchGlobal(setSameSection(section))
          setToastMessage({
            type: 'success',
            header: 'store/checkoutless.user.userEditedMessageHeader',
            text: 'store/checkoutless.user.userEditedMessageText',
          })
        } else {
          dispatchGlobal(setNextUserRegistrationSections())
        }
      },
      onError: (error) => {
        setHasError(true)
        console.error(`error`, error)
      },
    }
  )

  const handleClick = () => {
    if (loadingUser) return
    if (areThereChangesForm()) {
      if (isEdit) {
        handleContinue()
      } else {
        dispatchGlobal(setNextUserRegistrationSections())
      }

      return
    }

    refreshProfileFormInitialState()
    createUserFunction({
      variables: {
        email: email.value.toLowerCase(),
        id_number: document.value,
        id_type: documentType,
        ip: ipAddress,
        lastname: lastName.value?.trim(),
        name: firstName.value?.trim(),
        phone_code: prefix,
        phone_number: phone.value,
        habeasData: true,
      },
    })
    FillPersonalDataEvent({ hasGoogleAnalytics })
  }

  const handleKeyUpevent = (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (ev.key === 'Enter' && !disabled) {
      handleClick()
    }
  }

  useEffect(() => {
    const acceptStoreTermsAndConditions = existStoreTermAndConditions
      ? storeTermsAndConditions
      : true

    if (isEdit && !showHabeasData) {
      const newData = JSON.stringify({
        ...profile,
        email: email.value,
        name: firstName.value,
        lastname: lastName.value,
        document: document.value,
        phone: phone.value,
      })

      const clientProfileDataString = JSON.stringify(profile)

      setShowHabeasData(newData !== clientProfileDataString)
    }

    if (
      email.isValid &&
      firstName.isValid &&
      lastName.isValid &&
      document.isValid &&
      phone.isValid &&
      acceptStoreTermsAndConditions
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [email, firstName, lastName, document, phone])

  useEffect(() => {
    refreshProfileFormInitialState()
  }, [])

  useEffect(() => {
    if (isEdit) return
    setShowHabeasData(!profile.habeasData)
  }, [isEdit])

  useEffect(() => {
    if (!isEdit || !initialRenderer.current) return

    dispatchUserData({
      type: 'SET_HABEAS_DATA',
      args: {
        habeasData: false,
      },
    })

    if (existStoreTermAndConditions) {
      dispatchUserData({
        type: 'SET_STORE_TERMS_AND_CONDITIONS',
        args: {
          storeTermsAndConditions: false,
        },
      })
    }
  }, [isEdit])

  return {
    disabled,
    document,
    email,
    firstName,
    handleClick,
    handleContinue,
    handleKeyUpevent,
    hasError,
    isEdit,
    isLiteVersion,
    isMobile,
    lastName,
    loadingUser,
    phone,
    section,
    showHabeasData,
    toastMessage,
    profile,
  }
}
