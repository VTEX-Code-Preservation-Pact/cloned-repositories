import React from 'react'

import type { ProductItem } from '../../interfaces'
import useQuotaInformative from './useQuotaInformative'
import QuotaInformative from './QuotaInformative'

interface QuotaInformativeProps {
  selectedItem: ProductItem | null
}

const QuotaInformativeContainer = ({ selectedItem }: QuotaInformativeProps) => {
  const quotaInformativeProps = useQuotaInformative(selectedItem)

  return <QuotaInformative {...quotaInformativeProps} />
}

export default QuotaInformativeContainer
