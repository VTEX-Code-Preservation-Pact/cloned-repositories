import React, { Fragment } from 'react'

import Address from './Address'
import useAddress from './useAddress'
import type { AddressMC } from '../../../../interfaces/orderForm'

interface Props {
  address: AddressMC
  selectedAddress: string
  setSelectedAddress: any
  handleDelete: any
  handleEdit: any
}

const AddressContainer = (props: Props) => {
  const adress = useAddress()

  return (
    <Fragment>
      <Address {...props} {...adress} />
    </Fragment>
  )
}

export default AddressContainer
