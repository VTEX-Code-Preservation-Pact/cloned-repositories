import React from 'react'

import Product from './Item'
import useProduct from './useItem'
import type { Item } from '../../../interfaces'

interface Props {
  item: Item
}

const DefaultViewContainer = (props: Props) => {
  const product = useProduct(props)

  return <Product {...product} {...props} />
}

export default DefaultViewContainer
