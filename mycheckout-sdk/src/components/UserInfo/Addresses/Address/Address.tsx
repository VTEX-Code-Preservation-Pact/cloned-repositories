import React from 'react'

import { LiteEdit, LiteDelete } from '../../../Icons'
import globalStyles from '../../../../myCheckout-styles.module.css'
import addressStyles from '../address.module.css'
import type { AddressMC } from '../../../../interfaces/orderForm'

interface Props {
  address: AddressMC
  selectedAddress: string
  setSelectedAddress: any
  handleDelete: any
  handleEdit: any
  styles: any
  global: any
}

const Address = ({
  address: { street, id: addressId, city, state },
  selectedAddress,
  setSelectedAddress,
  handleDelete,
  handleEdit,
  styles,
  global,
}: Props) => {
  return (
    <div
      className={`${addressStyles.addressContainer} ${globalStyles.borderBottom}`}
    >
      <div
        className={addressStyles.addressContainer}
        onClick={() => setSelectedAddress(addressId)}
      >
        <input
          id={`address-${addressId}`}
          type="radio"
          value={addressId}
          checked={addressId === selectedAddress}
          className={`${styles.inputClasses} ${globalStyles.cursorPointer}`}
          onClick={() => setSelectedAddress(addressId)}
        />
        <p className={styles.infoContainer}>{`${street} ${city} - ${state}`}</p>
      </div>
      <div className={styles.iconsContainer}>
        <div className={`${styles.edit} ${globalStyles.cursorPointer}`}>
          <LiteEdit
            fill={global.iconAlternative}
            onClick={() => handleEdit(addressId)}
          />
        </div>
        <a
          className={styles.liteDelete}
          onClick={() => {
            if (addressId !== selectedAddress) handleDelete(addressId)
          }}
        >
          {addressId !== selectedAddress && (
            <LiteDelete fill={global.iconAlternative} />
          )}
        </a>
      </div>
    </div>
  )
}

export default Address
