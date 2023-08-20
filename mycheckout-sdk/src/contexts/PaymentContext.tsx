import { createContext, useContext } from 'react'

interface PaymentContext {
  canPayWithCredit: boolean
  disabled: boolean
  error: any
  franchiseImg: string
  gateway: string
  global: {
    [className: string]: string
  }
  intl: any
  loadingOrder: boolean
  paymentMethod: string
  paymentSystem?: string
  styles: {
    [className: string]: string
  }
  value: number
  handleClick: (cardData: any) => void
  handledClickDisabled?: () => void
  onSelectedPayment: (type: any, paymentSystem: string) => void
  setError: (error: any) => void
  setFranchiseImg: (FranchiseImg: string) => void
}

const paymentContext = createContext<PaymentContext | null>(null)

export const PaymentProvider = paymentContext.Provider

export const usePayment = () => useContext(paymentContext)
