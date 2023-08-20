import React, { Fragment } from 'react'

import useAddresses from './useAddresses'
import AddressList from './AddressList'

const AddressesContainer = () => {
  const addresses = useAddresses()

  return (
    <Fragment>
      <AddressList {...addresses} />
    </Fragment>
  )
}

export default AddressesContainer
