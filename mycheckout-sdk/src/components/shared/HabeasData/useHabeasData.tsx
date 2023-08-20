import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActions } from '../../../contexts/ActionsProviderV2'
import {
  selectAcceptHabeasData,
  selectIsProfileComplete,
  setAcceptHabeasData,
  setHabeasData,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import { selectSettings } from '../../../contexts/global-context/reducers/uiSettingsSlice'
import { useUserDataDispatch } from '../../../contexts/UserDataProvider'
import type { HabeasDataInformation } from '../../../interfaces'

export const useHabeasData = () => {
  const habeasData = useSelector(selectAcceptHabeasData)
  const profileComplete = useSelector(selectIsProfileComplete)
  const { habeasDataInformation } = useSelector(selectSettings)
  const { storeTermsAndConditionsContent } = useActions()
  const dispatchUserData = useUserDataDispatch()
  const [storeTermsAndConditions, setStoreTermsAndConditions] = useState({})
  const dispatchGlobal = useDispatch()
  const [habeasDataConfiguration, setHabeasDataConfiguration] =
    useState<HabeasDataInformation>()

  useEffect(() => {
    if (habeasDataInformation) setHabeasDataConfiguration(habeasDataInformation)
  }, [habeasDataInformation])

  const onCheckboxChange = () => {
    dispatchGlobal(setAcceptHabeasData(!habeasData))
    if (!profileComplete) dispatchGlobal(setHabeasData(!habeasData))
  }

  const onStoreCheckboxChange = (id: string) => {
    setStoreTermsAndConditions((prevState: any) => ({
      ...prevState,
      [id]: {
        isSelected: !storeTermsAndConditions[id]?.isSelected,
      },
    }))
  }

  useEffect(() => {
    const storeTermsAndConditionsState = {}

    storeTermsAndConditionsContent?.forEach(
      (storeTermsAndConditionsContentItem) => {
        storeTermsAndConditionsState[storeTermsAndConditionsContentItem?.id] = {
          isSelected: false,
        }
      }
    )

    setStoreTermsAndConditions(storeTermsAndConditionsState)
  }, [])

  useEffect(() => {
    const storeTermsAndConditionsSelected = Object.keys(
      storeTermsAndConditions
    ).filter(
      (storeTermsAndCondition) =>
        storeTermsAndConditions[storeTermsAndCondition]?.isSelected === false
    )

    if (storeTermsAndConditionsSelected?.length) {
      dispatchUserData({
        type: 'SET_STORE_TERMS_AND_CONDITIONS',
        args: {
          storeTermsAndConditions: false,
        },
      })
    } else {
      dispatchUserData({
        type: 'SET_STORE_TERMS_AND_CONDITIONS',
        args: {
          storeTermsAndConditions: true,
        },
      })
    }
  }, [storeTermsAndConditions])

  return {
    habeasData,
    habeasDataConfiguration,
    storeTermsAndConditions,
    storeTermsAndConditionsContent,
    onCheckboxChange,
    onStoreCheckboxChange,
  }
}
