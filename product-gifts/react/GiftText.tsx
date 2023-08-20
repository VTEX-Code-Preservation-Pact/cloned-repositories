import React, { useMemo } from 'react'
import { defineMessages } from 'react-intl'
import { IOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

import { useProductGiftsState } from './ProductGifts'

interface Props {
  text?: string
}

const CSS_HANDLES = ['productGiftText'] as const

const GiftText: StoreFunctionComponent<Props> = ({ text }) => {
  const { gifts, maxVisibleItems } = useProductGiftsState()
  const handles = useCssHandles(CSS_HANDLES)
  const resolvedMaxVisibleItems =
    maxVisibleItems === 'showAll' ? gifts.length : maxVisibleItems

  const values = useMemo(
    () => ({
      totalGifts: gifts.length,
      exceedingItems:
        gifts.length - resolvedMaxVisibleItems > 0
          ? gifts.length - resolvedMaxVisibleItems
          : 0,
      visibleItems:
        resolvedMaxVisibleItems > gifts.length
          ? gifts.length
          : resolvedMaxVisibleItems,
    }),
    [gifts.length, resolvedMaxVisibleItems]
  )

  return (
    <span className={handles.productGiftText}>
      <IOMessage id={text} values={values} />
    </span>
  )
}

/**
 * These messages are used in contentSchema.json and need to be defined for the messages
 * builder to pick them up. If these are not here, CMS will render their IDs.
 */
const messages = defineMessages({
  title: {
    id: 'admin/editor.product-gift-text.title',
    defaultMessage: '',
  },
  description: {
    id: 'admin/editor.product-gift-text.description',
    defaultMessage: '',
  },
  text: {
    id: 'admin/editor.product-gift-text.text.title',
    defaultMessage: '',
  },
  textDescription: {
    id: 'admin/editor.product-gift-text.text.description',
    defaultMessage: '',
  },
})

GiftText.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default GiftText
