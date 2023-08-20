import type { FC } from 'react'
import React, { useCallback, useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { messages, defineMessages } from 'react-intl'

import type {
  IStyleSettingsCtx,
  Device,
  CustomizableComponent,
  IStyleSettingsQuery,
  PayButtonStyles,
  ModalStyles,
  IAlert,
} from '../../interfaces'
import { StyleSettingsContext } from './styleSettingsContext'
import { useStyleSettingsReducer } from '../reducer/styleSettingsReducer'
import UPDATE_STYLES from '../../../../graphql/styles/updateStyles.graphql'
import GET_STYLES from '../../../../graphql/styles/getStyles.graphql'
import { defaultStyleSettingState } from '../../constants'

const messages = defineMessages({
  errorUpdateMessage: { id: 'checkoutless.styleSettings.error-update-styles' },
})

export const StyleSettingsProvider: FC = ({ children }) => {
  const [componentSelected, setComponentSelected] =
    useState<CustomizableComponent>('payButton')

  const [deviceSelected, setDeviceSelected] = useState<Device>('desktop')
  const [alert, setAlert] = useState<IAlert>({
    message: {
      id: '',
    },
    type: 'success',
  })

  const [state, dispatch] = useStyleSettingsReducer()
  const [updateStylesMutations] = useMutation(UPDATE_STYLES)
  const { loading, data } = useQuery(GET_STYLES)

  const saveStyles = async (
    button: PayButtonStyles,
    modal: ModalStyles,
    restore: boolean
  ) => {
    const variables = {
      buttonText: button.value,
      styles: JSON.stringify({
        button,
        modal,
      }),
      restore,
    }

    try {
      await updateStylesMutations({
        variables,
      })
    } catch (_error) {
      setAlert({
        message: messages.errorUpdateMessage,
        type: 'error',
      })
    }
  }

  const setStyles = useCallback(
    (button: PayButtonStyles, modal: ModalStyles) => {
      dispatch({ type: 'SET_PAYBUTTON_STYLES', args: { styles: button } })
      dispatch({ type: 'SET_MODAL_STYLES', args: { styles: modal } })
    },
    [dispatch]
  )

  const updateStyles = () =>
    saveStyles(state.buttonStyles, state.modalStyles, false)

  const restoreStyles = async () => {
    const { buttonStyles, modalStyles } = defaultStyleSettingState

    setStyles(buttonStyles, modalStyles)
    await saveStyles(buttonStyles, modalStyles, true)
  }

  const clearAlert = () =>
    setAlert({
      message: {
        id: '',
      },
      type: 'success',
    })

  useEffect(() => {
    if (loading || !data || !data?.getStyles?.styles) return
    const styles: IStyleSettingsQuery = JSON.parse(data.getStyles.styles)

    setStyles(styles.button, styles.modal)
  }, [data, dispatch, loading, setStyles])

  const context: IStyleSettingsCtx = {
    state,
    componentSelected,
    deviceSelected,
    alert,
    dispatch,
    setComponentSelected,
    setDeviceSelected,
    updateStyles,
    restoreStyles,
    setAlert,
    clearAlert,
    loadingStyles: loading,
  }

  return (
    <StyleSettingsContext.Provider value={context}>
      {children}
    </StyleSettingsContext.Provider>
  )
}
