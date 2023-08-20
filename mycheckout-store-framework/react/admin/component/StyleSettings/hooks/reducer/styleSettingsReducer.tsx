import { useReducer } from 'react'

import { defaultStyleSettingState } from '../../constants'
import type { Actions, IStyleSettings } from '../../interfaces'
import { modalReducer } from './modalReducer'
import { payButtonReducer } from './payButtonReducer'

const reducer = (state: IStyleSettings, action: Actions): IStyleSettings => {
  return {
    buttonStyles: payButtonReducer(state.buttonStyles, action),
    modalStyles: modalReducer(state.modalStyles, action),
  }
}

function initReducer() {
  return {
    ...defaultStyleSettingState,
  }
}

export const useStyleSettingsReducer = () =>
  useReducer(reducer, {}, initReducer)
