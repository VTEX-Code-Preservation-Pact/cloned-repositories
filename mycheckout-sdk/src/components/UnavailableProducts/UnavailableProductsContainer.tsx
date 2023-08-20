import React from 'react'

import { Loader } from '../shared'
import UnavailableProducts from './UnavailableProducts'
import { useUnavailableProducts } from './useUnavailableProducts'

const UnavailableProductsContainer = () => {
  const unavailableProducts = useUnavailableProducts()

  if (unavailableProducts?.loadingAction) return <Loader />

  return <UnavailableProducts {...unavailableProducts} />
}

export default UnavailableProductsContainer
