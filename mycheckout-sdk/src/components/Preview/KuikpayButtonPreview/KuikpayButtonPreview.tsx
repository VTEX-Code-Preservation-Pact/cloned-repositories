import React from 'react'

import { MyCheckoutButton } from '../../MyCheckoutButton/MyCheckoutButton'
import useKuikpayButton from './useKuikpayButtonPreview'

type Props = {
  text?: string
}

export const KuikpayButtonPreview = (props: Props) => {
  const kuikpayButtonPreviewProps = useKuikpayButton()

  return <MyCheckoutButton {...kuikpayButtonPreviewProps} text={props.text} />
}
