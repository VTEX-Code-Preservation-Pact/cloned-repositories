import React, { FC, MouseEvent, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { IconBookmark } from 'vtex.store-icons'
import { withToast } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'

const CSS_HANDLES = ['productBookmark'] as const

const messages = defineMessages({
  added: {
    id: 'store/wishlist.added',
    defaultMessage: '',
  },
  removed: {
    id: 'store/wishlist.removed',
    defaultMessage: '',
  },
})

const Bookmark: FC<Props> = ({ showToast }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { formatMessage } = useIntl()
  const [filled, setFill] = useState(false)
  const productContext = useProduct()

  const handleClick = (ev: MouseEvent) => {
    ev.stopPropagation()
    ev.preventDefault()
    setFill(!filled)
    if (productContext && productContext.product) {
      // eslint-disable-next-line no-console
      console.log('Product ' + productContext.product.productName)
    }
    showToast({
      message: filled
        ? formatMessage(messages.removed)
        : formatMessage(messages.added),
      duration: 3000,
    })
  }

  return (
    <div className={handles.productBookmark}>
      <button
        onClick={handleClick}
        className="bn pa3 pointer flex bg-action-secondary c-on-action-secondary hover-c-on-action-secondary"
      >
        <IconBookmark
          type={filled ? 'filled' : 'outline'}
          fill="currentColor"
        />
      </button>
    </div>
  )
}

interface ShowToastParams {
  message: string
  duration?: number
  action?: { label: string; onClick: Function }
}

interface Props {
  showToast: (params: ShowToastParams) => void
}

export default withToast(Bookmark)
