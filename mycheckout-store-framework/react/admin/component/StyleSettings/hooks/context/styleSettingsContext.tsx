import { createContext, useContext } from 'react'

import type { IStyleSettingsCtx } from '../../interfaces'
import { defaultStyleSettingState } from '../../constants'

export const styleSettingsCtxDefault: IStyleSettingsCtx = {
  componentSelected: 'payButton',
  deviceSelected: 'desktop',
  alert: {
    message: {
      id: '',
    },
    type: 'success',
  },
  state: defaultStyleSettingState,
  loadingStyles: true,
  setComponentSelected: () => null,
  setDeviceSelected: () => null,
  dispatch: () => null,
  updateStyles: async () => {},
  restoreStyles: async () => {},
  setAlert: () => null,
  clearAlert: () => null,
}

export const StyleSettingsContext = createContext<IStyleSettingsCtx>(
  styleSettingsCtxDefault
)
export const useStyleSettings = () => useContext(StyleSettingsContext)
