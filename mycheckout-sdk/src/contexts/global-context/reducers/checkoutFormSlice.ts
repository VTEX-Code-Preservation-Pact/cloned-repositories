import { createSlice } from '@reduxjs/toolkit'

import type {
  Section,
  PaymentDataSection,
} from '../../../interfaces/StepsAndSections'
import type { BlockedShipping } from '../../../interfaces'

const slice = createSlice({
  name: 'checkoutForm',
  initialState: {
    step: 1,
    section: null,
    userRegistrationSections: 1,
    loadingOrder: false,
    errorOrder: null,
    formAction: 'none',
    blockedShipping: {
      categories: [],
    },
    loadingAction: false,
    prevSection: null,
    paymentSection: 'list',
  },
  reducers: {
    setNextStep: (state) => {
      state.step += 1
    },
    setPrevStep: (state) => {
      state.step -= 1
    },
    setNextSection: (state, action: { type: string; payload: Section }) => {
      state.step += 1
      state.prevSection = state.section
      state.section = action.payload
    },
    setPrevSection: (state) => {
      if (state.section !== state.prevSection) {
        state.section = state.prevSection
      }
    },
    setSameSection: (state, action) => {
      state.section = action.payload
    },
    setStep: (state, action) => {
      state.step = action.payload
    },
    setLoadingOrder: (state, action) => {
      state.loadingOrder = action.payload
    },
    setErrorOrder: (state, action) => {
      state.errorOrder = action.payload
    },
    resetFlow: (state) => {
      state.step = 1
      state.section = ''
    },
    setNextUserRegistrationSections: (state) => {
      state.userRegistrationSections += 1
    },
    setPreviousUserRegistrationSections: (state) => {
      state.userRegistrationSections -= 1
    },
    setUserRegistrationSections: (state, action) => {
      state.userRegistrationSections = action.payload
    },
    setBlockedShipping: (state, action) => {
      state.blockedShipping = action.payload
    },
    setFormAction: (state, action: { payload: 'none' | 'add' | 'edit' }) => {
      state.formAction = action.payload
    },
    setLoadingAction: (state, action) => {
      state.loadingAction = action.payload
    },
    setPaymentDataSection: (state, action: { payload: PaymentDataSection }) => {
      state.paymentSection = action.payload
    },
  },
})

export const {
  resetFlow,
  setBlockedShipping,
  setErrorOrder,
  setLoadingAction,
  setLoadingOrder,
  setNextSection,
  setNextStep,
  setNextUserRegistrationSections,
  setPreviousUserRegistrationSections,
  setPrevSection,
  setPrevStep,
  setSameSection,
  setStep,
  setUserRegistrationSections,
  setFormAction,
  setPaymentDataSection,
} = slice.actions

export default slice.reducer

export const selectStep = (state: any): number => state.checkoutForm.step
export const selectSection = (state: any): Section => state.checkoutForm.section
export const selectLoadingOrder = (state: any): boolean =>
  state.checkoutForm.loadingOrder
export const selectErrorOrder = (state: any): string =>
  state.checkoutForm.errorOrder
export const selectUserRegistrationSections = (state: any) =>
  state.checkoutForm.userRegistrationSections
export const selectBlockedShipping = (state: any): BlockedShipping =>
  state.checkoutForm.blockedShipping
export const selectFormAction = (state: any): 'none' | 'add' | 'edit' =>
  state.checkoutForm.formAction
export const selectLoadingAction = (state: any) =>
  state.checkoutForm.loadingAction
export const selectPrevSection = (state: any) => state.prevSection
export const selectPaymentDataSection = (state: any): PaymentDataSection =>
  state.checkoutForm.paymentSection
