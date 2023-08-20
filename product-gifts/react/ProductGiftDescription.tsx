import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useGift } from './components/ProductGift'

const CSS_HANDLES = ['giftDescription'] as const

const ProductGiftDescription: FC = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const gift = useGift()

  return (
    <span className={`${handles.giftDescription} t-small c-muted-1`}>
      {gift?.description}
    </span>
  )
}

export default ProductGiftDescription
