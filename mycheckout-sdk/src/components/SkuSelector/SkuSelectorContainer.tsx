import React from 'react'

import useSkuSelector from './useSkuSelector'
import SkuSelector from '.'

const SkuSelectorContainer = () => {
  const skuSelectorProps = useSkuSelector()

  return <SkuSelector {...skuSelectorProps} />
}

export default SkuSelectorContainer
