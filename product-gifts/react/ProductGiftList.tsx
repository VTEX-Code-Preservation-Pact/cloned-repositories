import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useProductGiftsState } from './ProductGifts'
import ProductGift from './components/ProductGift'

const CSS_HANDLES = ['productGiftListContainer'] as const

const ProductGiftList: FC = ({ children }) => {
  const { gifts, maxVisibleItems } = useProductGiftsState()
  const handles = useCssHandles(CSS_HANDLES)
  const itemsToShow =
    maxVisibleItems === 'showAll' ? gifts.length : maxVisibleItems

  return (
    <div className={handles.productGiftListContainer}>
      {gifts.slice(0, itemsToShow).map((gift, idx) => (
        <ProductGift key={gift.skuName} giftIndex={idx}>
          {children}
        </ProductGift>
      ))}
    </div>
  )
}

export default ProductGiftList
