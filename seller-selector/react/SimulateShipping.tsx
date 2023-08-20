import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import {
  AddressRules,
  AddressContainer,
  PostalCodeGetter,
} from 'vtex.address-form'
import { StyleguideInput } from 'vtex.address-form/inputs'
import { Button, Spinner } from 'vtex.styleguide'
import { useProduct } from 'vtex.product-context'
import { addValidation } from 'vtex.address-form/helpers'
import { FormattedMessage } from 'react-intl'
import './global.css'

import SimulateShippingQuery from './queries/SimulateShipping.gql'
import { useSellerContext } from './SellerContext'
import { getNewAddress } from './utils'

const SIMULATE_SHIPPING_CSS_HANDLES = [
  'simulateShipping',
  'simulateShippingSearch',
  'simulateShippingSpinner',
] as const

function SimulateShipping() {
  const handles = useCssHandles(SIMULATE_SHIPPING_CSS_HANDLES)
  const { selectedItem, selectedQuantity } = useProduct() ?? {}
  const { setShippingQuotes } = useSellerContext()
  const [updateShippingQuotes, { loading, data }] = useLazyQuery(
    SimulateShippingQuery
  )

  let shippingItems = null

  const runtime = useRuntime()
  const {
    culture: { country },
  } = runtime

  if (selectedItem) {
    shippingItems = selectedItem.sellers.map((current) => ({
      id: selectedItem.itemId,
      quantity: selectedQuantity?.toString() ?? '1',
      seller: current.sellerId,
    }))
  }

  const variables = {
    shippingItems,
    country,
    postalCode: '',
  }

  const [address, setAddress] = useState(() =>
    addValidation(getNewAddress(country))
  )

  if (data) {
    setShippingQuotes(data.shipping)
  }

  function handleAddressChange(newAddress: any) {
    const updatedAddress = {
      ...address,
      ...newAddress,
    }

    setAddress(updatedAddress)
    if (updatedAddress.postalCode.valid) {
      const postalCode = updatedAddress.postalCode.value

      updateShippingQuotes({ variables: { ...variables, postalCode } })
    }
  }

  const showSpinner = () => {
    if (loading) {
      return (
        <div className={`${handles.simulateShippingSpinner} ml4 mt6`}>
          <Spinner />
        </div>
      )
    }

    return null
  }

  return (
    <div
      className={`${handles.simulateShipping} mt7 flex mr-auto ml-auto mw6 ba-s b--muted-3 pl4 pv5 pb5 mb3 br2`}
    >
      <AddressRules country={country} shouldUseIOFetching>
        <AddressContainer
          Input={StyleguideInput}
          address={address}
          onChangeAddress={handleAddressChange}
        >
          <PostalCodeGetter />
        </AddressContainer>
      </AddressRules>
      <Button
        className={`${handles.simulateShippingSearch} ba-s b--muted-3 br3-s bg-action-primary red`}
        size="small"
        type="submit"
        block
      >
        <FormattedMessage id="store/seller-list.shipping-label" />
      </Button>
      {showSpinner()}
    </div>
  )
}

export default SimulateShipping
