import React, { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'

export interface Seller {
  sellerId: string
  sellerName: string
  sellerDefault: boolean
  commertialOffer: Offer
}

interface Offer {
  Price: number
  AvailableQuantity: number
}

export interface ShippingQuote {
  logisticsInfo: LogisticsInfo[]
}

export interface LogisticsInfo {
  itemIndex: number
  slas: SLA[]
}

interface SLA {
  id: string
  name: string
  price: number
  shippingEstimate: string
  shippingEstimateDate: string
}

interface SellerContextValue {
  sellerList: Seller[] | null
  shippingQuotes: ShippingQuote | null
  setShippingQuotes: (quote: ShippingQuote) => void
  limitShownShippingInformation: number
}

const SellerContext = createContext<SellerContextValue>({
  sellerList: null,
  shippingQuotes: null,
  setShippingQuotes: () => {},
  limitShownShippingInformation: 3,
})

export const useSellerContext = (): SellerContextValue => {
  return useContext(SellerContext)
}

interface ProviderProps {
  value: SellerContextValue
}

export function SellerProvider({
  value,
  children,
}: PropsWithChildren<ProviderProps>) {
  return (
    <SellerContext.Provider value={value}>{children}</SellerContext.Provider>
  )
}

export default {
  SellerProvider,
  useSellerContext,
}
