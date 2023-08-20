import React from 'react'

import useFormatMessage from '../../i18n/useFormatMessage'
import { formatter } from '../../utils'
import Popup from './popup'
import style from './quotaInformative.css'

interface Quota {
  quotas: number
  value: number
}

interface Props {
  handleModal: () => void
  open: boolean
  quota: Quota
}

const QuotaInformative = (props: Props) => {
  const { handleModal, open, quota } = props

  return (
    <div className={style.quotaInformationContainer} onClick={handleModal}>
      {useFormatMessage('store/quota.productdetails.quotainformation', {
        store: <span className={style.quotaInformationStore}>ORION</span>,
        quotas: (
          <span className={style.quotaInformationQuantity}>
            {quota.quotas} cuotas
          </span>
        ),
        value: (
          <span className={style.quotaInformationValue}>
            {formatter.format(quota.value)} libres de interés.
          </span>
        ),
      })}
      <Popup open={open} handleModal={handleModal} />
    </div>
  )
}

export default QuotaInformative
