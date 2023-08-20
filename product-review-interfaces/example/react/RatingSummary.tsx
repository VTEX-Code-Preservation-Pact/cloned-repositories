import React, { FunctionComponent, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import Stars from './components/Stars'

const RatingSummary: FunctionComponent = () => {
  const { product } = useContext(ProductContext)

  if (!product) {
    return null
  }

  return (
    <div title={name}>
      <Stars rating={4} />
      <FormattedMessage
        id="rating-summary"
        values={{
          name: product.productName,
        }}
      />
    </div>
  )
}

export default RatingSummary
