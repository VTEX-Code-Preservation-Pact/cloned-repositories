import React from 'react'

import type { Product, ProductItem, Runtime } from '../../interfaces'
import QuotaInformativeComponent from './QuotaInformativeComponent'
import useQuotaInformativeComponent from './useQuotaInformativeComponent'

interface Props {
  sandbox?: boolean
  language?: string
  theme: string
  selectedItem?: ProductItem
  product?: Product
  runtime: Runtime
}

const QuotaInformativeComponentContainer = (props: Props) => {
  const { hidde, initialStyle, orion, styles } = useQuotaInformativeComponent(
    props.product
  )

  const propsComponent = {
    initialStyle,
    language: props.language,
    selectedItem: props.selectedItem,
    styles,
  }

  if (!styles || !orion || hidde) return null

  return <QuotaInformativeComponent {...propsComponent} />
}

export default QuotaInformativeComponentContainer
