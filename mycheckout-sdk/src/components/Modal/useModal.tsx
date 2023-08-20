import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { InitialProps } from '../../interfaces'
import { useActionsDispatch } from '../../contexts/ActionsProviderV2'
import {
  minimizeModal,
  selectIsModalOpen,
} from '../../contexts/global-context/reducers/modalSlice'
import {
  selectIsFullscreen,
  selectSettings,
  selectShowingBuyButton,
} from '../../contexts/global-context/reducers/uiSettingsSlice'
import {
  selectErrorOrder,
  selectStep,
  setStep,
} from '../../contexts/global-context/reducers/checkoutFormSlice'

export const useModal = (_: InitialProps) => {
  const dispatchGlobal = useDispatch()

  const isModalOpen = useSelector(selectIsModalOpen)
  const isModalMinimized = useSelector(
    (state: any) => state.modal.isMinimized
  ) as boolean

  const isFullscreen = useSelector(selectIsFullscreen)

  const step = useSelector(selectStep)

  const errorOrder = useSelector(selectErrorOrder)

  const dispatchActions = useActionsDispatch()

  const showingBuyButton = useSelector(selectShowingBuyButton)

  const { isConfigured } = useSelector(selectSettings)

  const showFloatButton = isConfigured && !isModalOpen && isModalMinimized

  // StoreSetup
  useEffect(() => {
    const floatButton = localStorage.getItem('minimize_modal')

    if (floatButton === 'true') {
      dispatchGlobal(minimizeModal())
    }
  }, [])

  useEffect(() => {
    if (isModalMinimized && step >= 2) {
      dispatchActions({
        type: 'SET_IS_MINIMIZE_VIEW_USER',
        args: true,
      })

      dispatchGlobal(setStep(1))
    }

    if (isModalOpen && step >= 2) {
      dispatchActions({
        type: 'SET_IS_OPEN_MODAL_VIEW_USER',
        args: true,
      })

      dispatchGlobal(setStep(1))
    }
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      localStorage.setItem('minimize_modal', 'true')
    }
  }, [isModalOpen])

  return {
    showFloatButton,
    errorOrder,
    isFullscreen,
    isModalMinimized,
    isModalOpen,
    showingBuyButton,
  }
}
