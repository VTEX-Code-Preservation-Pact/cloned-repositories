import React from 'react'

import LoadingProcessOrderForm from './LoadingProcessOrderForm'
import LiteLoadingProcessOrder from './LiteLoadingProcessOrderForm'
import useLoadingProcessOrder from './useLoadingProcessOrder'

const LoadingProcessOrdeContainer = () => {
  const loadingProcessOrderForm = useLoadingProcessOrder()

  return loadingProcessOrderForm.isMobile &&
    loadingProcessOrderForm.isLiteVersion ? (
    <LiteLoadingProcessOrder {...loadingProcessOrderForm} />
  ) : (
    <LoadingProcessOrderForm {...loadingProcessOrderForm} />
  )
}

export default LoadingProcessOrdeContainer
