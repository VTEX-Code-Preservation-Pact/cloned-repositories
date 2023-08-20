// TODO: Este cambio es temporal, se debe eliminar payments form, luego de la transicion a paymentez
import React from 'react'

import PaymentsForm from './PaymentsForm'
import PaymentezForm from './PaymentezForm'

const Form = (props: any) => {
  if (props.id === 'noop') {
    if (props.gateway === 'paymentez') {
      return <PaymentezForm {...props} />
    }

    return <PaymentsForm {...props} />
  }

  return null
}

export default Form
