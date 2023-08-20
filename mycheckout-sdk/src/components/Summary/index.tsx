import React from 'react'

import { Summary } from './Summary'
import { useSummary } from './useSummary'
import UnavailableProductsContainer from '../UnavailableProducts/UnavailableProductsContainer'

interface Props {
  className?: string
  isCollapsible?: boolean
  isVisible?: boolean
}

const index = ({
  className,
  isCollapsible = true,
  isVisible = true,
}: Props) => {
  const summary = useSummary(isCollapsible)

  const { items } = summary

  if (!isVisible) return null

  return items.length ? (
    <Summary className={className} {...summary} />
  ) : (
    <UnavailableProductsContainer />
  )
}

export default index
