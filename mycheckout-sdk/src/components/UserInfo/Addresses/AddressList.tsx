import React from 'react'
import { useSelector } from 'react-redux'

import Address from './Address/AddressContainer'
import { LiteAdd, LiteLocation } from '../../Icons'
import { Alert, Button } from '../../shared'
import ShippingFormContainer from '../../RegisterForm/Shipping/ShippingFormContainer'
import UnavailableMessage from '../UnavailableMessage/UnavailableMessageContainer'
import useFormatMessage from '../../../i18n/useFormatMessage'
import globalStyles from '../../../myCheckout-styles.module.css'
import addressStyles from './address.module.css'
import { Toast } from '../../shared/Toast/Toast'
import type { AddressMC } from '../../../interfaces/orderForm'
import { selectAddressStore } from '../../../contexts/global-context/reducers/orderFormDataSlice'
import { emptyFunction } from '../../../utils'
import type { Message } from '../../shared/interfaces/interfaces'

interface Props {
  availableAddresses: AddressMC[]
  global: any
  messages: any
  selectedAddress: string
  showForm: boolean
  styles: any
  toastMessage: Message | null
  warning: any
  handleClick: () => void
  handleCloseToast: () => void
  handleContinue: () => void
  handleCreate: (userLocation: boolean) => void
  handleDelete: (addressId: string) => void
  handleEdit: (addressId: string) => void
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>
}

const AddressList = (props: Props) => {
  const {
    availableAddresses,
    global,
    messages,
    selectedAddress,
    showForm,
    styles,
    toastMessage,
    warning,
    handleClick,
    handleCloseToast,
    handleContinue,
    handleCreate,
    handleDelete,
    handleEdit,
    setSelectedAddress,
  } = props

  const addressAlternative = useSelector(selectAddressStore)

  return (
    <div>
      {!showForm && (
        <div>
          {messages.deleted && (
            <Alert
              type="success"
              text="store/checkoutless.userInfo.addressDeleted"
            />
          )}
          {messages.edited && (
            <Toast toastMessage={toastMessage} onClose={handleCloseToast} />
          )}
          {messages.error && (
            <Alert
              type="error"
              text="store/checkoutless.userInfo.deleteAddressError"
            />
          )}
          {warning.show && (
            <Alert
              type="warning"
              text={'store/checkoutless.userInfo.confirmDeleteAddress'}
              link="store/checkoutless.userInfo.deleteLink"
              handleClick={handleClick}
              customText={warning.address}
            />
          )}
          <UnavailableMessage />
          <div
            className={`${styles.containerLocation} ${globalStyles.blueColor} ${globalStyles.borderBottom}`}
            onClick={() => handleCreate(true)}
          >
            <div
              className={`${styles.iconContainer} ${globalStyles.cursorPointer}`}
            >
              <LiteLocation fill={globalStyles.iconAlternativeSecondary} />
            </div>
            <p className={`${styles.locationP} ${globalStyles.cursorPointer}`}>
              {useFormatMessage('store/checkoutless.location.userLocation')}
            </p>
          </div>
          {availableAddresses?.map((address) => {
            return (
              <Address
                key={address.id}
                address={address}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )
          })}
          {addressAlternative && availableAddresses?.length <= 0 && (
            <Address
              key={addressAlternative.id}
              address={addressAlternative}
              selectedAddress={selectedAddress}
              setSelectedAddress={emptyFunction}
              handleDelete={emptyFunction}
              handleEdit={emptyFunction}
            />
          )}
          <div
            className={`${addressStyles.addContainer} ${styles.marginLeftIcon} ${globalStyles.borderBottom}`}
          >
            <button
              className={`${globalStyles.flexContainer} ${globalStyles.marginBottom} ${globalStyles.cursorPointer}`}
              onClick={() => handleCreate(false)}
            >
              <div
                className={`${styles.marginLeftIcon} ${styles.iconContainer}`}
              >
                <LiteAdd fill={global.iconAlternative} />
              </div>
              <p>
                {useFormatMessage('store/checkoutless.userInfo.newAddress')}
              </p>
            </button>
          </div>
          <div className={globalStyles.actionButtonContainer}>
            <Button
              value={'store/checkoutless.next'}
              onClick={handleContinue}
            />
          </div>
        </div>
      )}
      {showForm && <ShippingFormContainer />}
    </div>
  )
}

export default AddressList
