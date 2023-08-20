import React from 'react'
import { useIntl } from 'react-intl'

import type { ICredit } from '../../interfaces'
import { ApprovedCart } from './ApprovedCart'
import { DenyCart } from './DenyCart'
import { VerifyCart } from './VerifyCart'

const CustomerCreditPayment = ({
  credit,
  validateCredit,
}: {
  credit: ICredit
  validateCredit: boolean
}) => {
  const intl = useIntl()

  if (credit?.credit && !validateCredit) {
    return <ApprovedCart intl={intl} credit={credit} />
  }

  if (!credit?.credit && !validateCredit) return <DenyCart intl={intl} />

  return <VerifyCart intl={intl} />
}

export default CustomerCreditPayment
