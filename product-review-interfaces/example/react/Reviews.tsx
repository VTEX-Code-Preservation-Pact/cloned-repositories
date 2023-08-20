import React, { FunctionComponent, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import withSettings, { Settings } from './components/withSettings'
import { DataProps } from 'react-apollo'

const Reviews: FunctionComponent<Partial<DataProps<Settings>>> = () => {
  const { product } = useContext(ProductContext)

  if (!product) {
    return null
  }

  return (
    <div>
      <FormattedMessage
        id="reviews"
        values={{
          name: product.productName,
        }}
      />
    </div>
  )
}

export default withSettings(Reviews)
