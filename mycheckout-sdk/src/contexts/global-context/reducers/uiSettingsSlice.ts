import { createSlice } from '@reduxjs/toolkit'

import type { Settings } from '../../../interfaces'

const slice = createSlice({
  name: 'uiSetting',
  initialState: {
    showLogo: true,
    isFullscreen: false,
    isSummaryOpen: false,
    isMobile: false,
    settings: {
      buttonText: null,
      isLoaded: false,
      cvcRequired: true,
      cvcValid: false,
      habeasDataInformation: {
        url: '',
        version: 0,
      },
      hasGoogleAnalytics: false,
      isConfigured: false,
      isLiteVersion: true,
      styles: '',
    },
    theme: '',
    showingBuyButton: false,
  },
  reducers: {
    setShowLogo: (state, action) => {
      state.showLogo = action.payload
    },
    setIsFullscreen: (state, action) => {
      state.isFullscreen = action.payload
    },
    setIsSummaryOpen: (state, action) => {
      state.isSummaryOpen = action.payload
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
    },
    setSettings: (state, action) => {
      state.settings = {
        ...state.settings,
        ...action.payload,
        isLoaded: true,
      }
    },
    setVersion: (state, action) => {
      state.settings.isLiteVersion = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setShowingBuyButton: (state, action) => {
      state.showingBuyButton = action.payload
    },
  },
})

export const {
  setShowLogo,
  setIsFullscreen,
  setIsSummaryOpen,
  setIsMobile,
  setSettings,
  setVersion,
  setTheme,
  setShowingBuyButton,
} = slice.actions

export default slice.reducer

export const selectShowLogo = (state: any): boolean => state.uiSettings.showLogo
export const selectTheme = (state: any): string => state.uiSettings.theme
export const selectIsFullscreen = (state: any): boolean =>
  state.uiSettings.isFullscreen
export const selectIsSummaryOpen = (state: any): boolean =>
  state.uiSettings.isSummaryOpen
export const selectIsMobile = (state: any): boolean => state.uiSettings.isMobile
export const selectSettings = (state: any): Settings =>
  state.uiSettings.settings
export const selectShowingBuyButton = (state: any): boolean =>
  state.uiSettings.showingBuyButton
