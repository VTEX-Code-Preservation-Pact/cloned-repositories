import React from 'react'

import SkuSelector from './SkuSelector'
import useSkuSelector from './useSkuSelector'

interface Props {
  setDisabled: (disabled: boolean) => void
}

const SkuSelectorContainer = (props: Props) => {
  const skuSelector = useSkuSelector(props)

  return <SkuSelector {...skuSelector} />
}

export default SkuSelectorContainer
