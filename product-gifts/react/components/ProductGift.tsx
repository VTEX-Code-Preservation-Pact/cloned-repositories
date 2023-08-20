import React, { FC, createContext, useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useProductGiftsState } from '../ProductGifts'

interface Props {
  giftIndex: number
}

const CSS_HANDLES = ['giftListItem'] as const

export const GiftContext = createContext<Gift | undefined>(undefined)

const ProductGift: FC<Props> = ({ giftIndex, children }) => {
  const { gifts: giftSkuInfo } = useProductGiftsState()
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <GiftContext.Provider value={giftSkuInfo[giftIndex]}>
      <div
        data-testid="giftListItem"
        className={`${handles.giftListItem} br3 ba b--muted-3 mv2 pa5`}
      >
        {children}
      </div>
    </GiftContext.Provider>
  )
}

export function useGift() {
  const context = useContext(GiftContext)
  if (context === undefined) {
    throw new Error(
      'useProductGift must be used within a ProductGiftContextProvider'
    )
  }
  return context
}

export default ProductGift
