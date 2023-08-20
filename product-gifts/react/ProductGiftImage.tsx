import React from 'react'
import { defineMessages } from 'react-intl'
import { Image } from 'vtex.store-image'

import { useGift } from './components/ProductGift'

interface Props {
  maxWidth?: string | number
  maxHeight?: string | number
  minWidth?: string | number
  minHeight?: string | number
  imageLabel?: string
}

const DEFAULT_IMAGE_DIMENSIONS = 125

const ProductGiftImage: StoreFunctionComponent<Props> = ({
  maxWidth = DEFAULT_IMAGE_DIMENSIONS,
  maxHeight = DEFAULT_IMAGE_DIMENSIONS,
  minWidth = DEFAULT_IMAGE_DIMENSIONS,
  minHeight = DEFAULT_IMAGE_DIMENSIONS,
  imageLabel,
}) => {
  const gift = useGift()
  const productImage =
    gift.images.find(image => image.imageLabel === imageLabel) ?? gift.images[0]

  return (
    <Image
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      minWidth={minWidth}
      minHeight={minHeight}
      src={productImage.imageUrl}
      alt={gift.productName}
      title={gift.skuName}
    />
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.gift-image.title',
    defaultMessage: '',
  },
  description: {
    id: 'admin/editor.gift-image.description',
    defaultMessage: '',
  },
  imageLabel: {
    id: 'admin/editor.gift-image.imageLabel.title',
    defaultMessage: '',
  },
  imageLabelDescription: {
    id: 'admin/editor.gift-image.imageLabel.description',
    defaultMessage: '',
  },
})

ProductGiftImage.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    imageLabel: {
      default: '',
      title: messages.imageLabel.id,
      description: messages.imageLabelDescription.id,
      type: 'string',
    },
  },
}

export default ProductGiftImage
