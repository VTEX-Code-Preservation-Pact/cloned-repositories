import React from 'react'
import { defineMessages } from 'react-intl'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useGift } from './components/ProductGift'

interface Props {
  linkToProductPage: boolean
  nameType: 'skuName' | 'productName'
}

const CSS_HANDLES = ['giftNameLink', 'giftNameText'] as const

const ProductGiftName: StoreFunctionComponent<Props> = ({
  linkToProductPage = false,
  nameType = 'skuName',
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const gift = useGift()

  return linkToProductPage ? (
    // No need for this rule since <Link> already creates an anchor
    // with href attribute.
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      className={`${handles.giftNameLink} c-on-base link`}
      to={`/${gift.linkText}/p`}
    >
      <span className={`${handles.giftNameText}`}>
        {nameType === 'skuName' ? gift.skuName : gift.productName}
      </span>
    </Link>
  ) : (
    <span className={`${handles.giftNameText} c-on-base`}>
      {nameType === 'skuName' ? gift.skuName : gift.productName}
    </span>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.gift-name.title',
    defaultMessage: '',
  },
  description: {
    id: 'admin/editor.gift-name.description',
    defaultMessage: '',
  },
  linkToProduct: {
    id: 'admin/editor.gift-name.linkToProduct.title',
    defaultMessage: '',
  },
  linkToProductDescription: {
    id: 'admin/editor.gift-name.linkToProduct.description',
    defaultMessage: '',
  },
  nameType: {
    id: 'admin/editor.gift-name.nameType.title',
    defaultMessage: '',
  },
  nameTypeDescription: {
    id: 'admin/editor.gift-name.nameType.description',
    defaultMessage: '',
  },
})

ProductGiftName.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    linkToProduct: {
      default: false,
      title: messages.linkToProduct.id,
      description: messages.linkToProductDescription.id,
      type: 'boolean',
    },
    nameType: {
      title: messages.nameType.id,
      description: messages.nameType.id,
      type: 'string',
      enum: [
        'skuName',
        'productName'
      ],
      enumNames: [
        'skuName',
        'productName'
      ],
      default: 'skuName'
    },
  },
}

export default ProductGiftName
