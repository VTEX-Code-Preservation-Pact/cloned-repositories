import React from 'react'

import type { Step } from '../../../interfaces'
import { Loader } from '../../shared'
import ShippingForm from './ShippingForm'
import { useShippingForm } from './useShippingForm'

interface Props {
  steps?: Step
}

const ShippingFormContainer = ({ steps }: Props) => {
  const shippingForm = useShippingForm(steps)

  if (shippingForm?.loadingAction) return <Loader />

  return <ShippingForm {...shippingForm} />
}

export default ShippingFormContainer
