import type { ChangeEvent, Dispatch } from 'react'
import React, { Fragment } from 'react'

import { Input } from '../../shared'
import { InputCVCSF } from '../InputCVC'
import { CreditCard, MyOrder, MyProfile } from '../../Icons'
import { SelectDues } from '../SelectDues'
import {
  setNextSection,
  setSameSection,
} from '../../../contexts/global-context/reducers/checkoutFormSlice'
import { useUserDataDispatch } from '../../../contexts/UserDataProvider'
import BuyButtonContainer from '../../BuyButton'
import InfoItem from '../../shared/InfoItem'
import LoadingProcessOrdeContainer from '../LoadingProcessOrder/LoadingProcessOrderContainer'
import UnavailableProductsContainer from '../../UnavailableProducts/UnavailableProductsContainer'
import type {
  ClientProfileData,
  InputValue,
  Installment,
  Item,
  ProductItem,
  SelectValue,
} from '../../../interfaces'
import globalStyles from '../../../myCheckout-styles.module.css'
import genericStyles from '../../../generic-styles.module.css'
import styles from './detailView.module.css'
import Coupon from '../../Coupon/CouponContainer'
import type { Payment } from '../../../interfaces/orderForm'

interface Props {
  canBuy: boolean
  clientProfileData: ClientProfileData
  cvcRequired: boolean
  cvv: InputValue
  dues: SelectValue
  forceDisabled: boolean
  installments: Installment[]
  isValidCVC: any
  items: Item[]
  loadingOrder: boolean
  loadPaymentForm: boolean
  selectedPaymentMethod: Payment
  selectedItem: ProductItem
  dispatchGlobal: Dispatch<any>
  handleSubmit: (handleClick?: () => void) => void
  onBlurCvv: () => void
  onChangeCvv: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const DetailView = ({
  canBuy,
  cvcRequired,
  clientProfileData,
  cvv,
  dues,
  forceDisabled,
  installments,
  isValidCVC,
  items,
  loadingOrder,
  loadPaymentForm,
  selectedPaymentMethod,
  selectedItem,
  dispatchGlobal,
  handleSubmit,
  onBlurCvv,
  onChangeCvv,
}: Props) => {
  const dispatchUserData = useUserDataDispatch()

  return (
    <div className={`${styles.detailViewContainer}`}>
      {loadingOrder ? (
        <LoadingProcessOrdeContainer />
      ) : (
        <Fragment>
          {items?.length ? (
            <Fragment>
              <div
                className={`${styles.detailViewContent} ${globalStyles.marginBottom} ${globalStyles.borderBottom}`}
              >
                <InfoItem
                  firstAction={() => {
                    dispatchUserData({
                      type: 'SET_CLIENT_DATA',
                      args: {
                        clientProfileData: {
                          ...clientProfileData,
                          completed: true,
                        },
                      },
                    })
                    dispatchUserData({
                      type: 'SET_PROFILE_DETAIL',
                      args: true,
                    })
                    dispatchGlobal(setSameSection(''))
                  }}
                >
                  <InfoItem.Icon>
                    <MyProfile fill={globalStyles.iconAlternative} />
                  </InfoItem.Icon>
                  <InfoItem.Content text="store/checkoutless.summary.MyInfo" />
                </InfoItem>

                <InfoItem
                  firstAction={() => dispatchGlobal(setNextSection('summary'))}
                >
                  <InfoItem.Icon>
                    <MyOrder
                      fill={globalStyles.iconAlternative}
                      height={24}
                      width={24}
                    />
                  </InfoItem.Icon>
                  <InfoItem.Content text="store/checkoutless.summary.myOrder" />
                </InfoItem>

                {cvcRequired && selectedPaymentMethod?.paymentMethod === 'tc' && (
                  <InfoItem>
                    <InfoItem.Icon>
                      <CreditCard
                        fill={
                          isValidCVC
                            ? globalStyles.iconAlternative
                            : globalStyles.iconAlternativeSecondary
                        }
                        width={24}
                        height={24}
                      />
                    </InfoItem.Icon>
                    <InfoItem.Content>
                      <div id="cvv-container">
                        {selectedPaymentMethod?.paymentMethod === 'tc' && (
                          <div className={globalStyles.inDesktop}>
                            <SelectDues
                              dues={dues}
                              installments={installments}
                            />
                          </div>
                        )}
                        {selectedPaymentMethod?.paymentMethod === 'tc' &&
                          cvcRequired &&
                          loadPaymentForm && (
                            <Fragment>
                              {selectedPaymentMethod?.gateway ===
                              'paymentez' ? (
                                <Input
                                  type="tel"
                                  placeholder="store/checkoutless.card.cvv"
                                  errorMessage="store/checkoutless.card.invalidSecurityCodeError"
                                  {...cvv}
                                  name="cvc"
                                  maxLength={4}
                                  className={genericStyles.cvcInput}
                                  onChange={onChangeCvv}
                                  blurFunction={onBlurCvv}
                                  deleteBtn={false}
                                  showError={false}
                                />
                              ) : (
                                <InputCVCSF
                                  className={`${styles.secureFieldInput} ${
                                    isValidCVC !== null && !isValidCVC
                                      ? styles.secureFieldInvalidLite
                                      : null
                                  } ${
                                    isValidCVC ? styles.secureFieldValid : null
                                  }`}
                                  isValid={isValidCVC}
                                  itemId={selectedItem?.itemId || 'not-id'}
                                  showError={false}
                                />
                              )}
                            </Fragment>
                          )}
                      </div>
                    </InfoItem.Content>
                  </InfoItem>
                )}
              </div>
              <Coupon borderBottom />
              <BuyButtonContainer
                canBuy={canBuy}
                classNameContainer={globalStyles.w100}
                cvv={cvv.value}
                forceDisabled={forceDisabled}
                handleSubmit={handleSubmit}
                secondary={true}
              />
            </Fragment>
          ) : (
            <UnavailableProductsContainer />
          )}
        </Fragment>
      )}
    </div>
  )
}
