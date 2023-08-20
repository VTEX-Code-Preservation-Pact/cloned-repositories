import type { ChangeEvent, Dispatch } from 'react'
import React, { useState, Fragment } from 'react'

import {
  BellIcon,
  CreditCard,
  LiteLocation,
  MyData,
  MyOrder,
  MyProfile,
} from '../../Icons'
import type {
  Address,
  InputValue,
  Installment,
  Item,
  LogisticsInfo,
  ProductItem,
  SelectValue,
} from '../../../interfaces'
import { Alert, Input, Toast } from '../../shared'
import { InputCVCSF } from '../InputCVC'
import { SelectDues } from '../SelectDues'
import { setNextSection } from '../../../contexts/global-context/reducers/checkoutFormSlice'
import BuyButtonContainer from '../../BuyButton'
import InfoItem from '../../shared/InfoItem'
import LoadingProcessOrdeContainer from '../LoadingProcessOrder/LoadingProcessOrderContainer'
import LogisticsSummaryContainer from '../../LogisticsInfo/LogisticsSummary/LogisticsSummaryContainer'
import Summary from '../../Summary'
import Title from '../../shared/Title'
import UnavailableProductsContainer from '../../UnavailableProducts/UnavailableProductsContainer'
import useFormatMessage from '../../../i18n/useFormatMessage'
import globalStyles from '../../../myCheckout-styles.module.css'
import styles from './informationView.module.css'
import Coupon from '../../Coupon/CouponContainer'
import genericStyles from '../../../generic-styles.module.css'
import useLogisticBlock from '../../../hooks/useLogisticBlock'
import type { Message } from '../../shared/interfaces/interfaces'
import type {
  AddressMC,
  Payment,
  ProfileMC,
} from '../../../interfaces/orderForm'
import { ArrowRight } from '../../Icons/ArrowRight'

interface Props {
  canBuy: boolean
  cvcRequired: boolean
  cvv: InputValue
  dues: SelectValue
  forceDisabled: boolean
  gateway: string
  installments: Installment[]
  isOpenAlertCvv: boolean
  isValidCVC: any
  items: Item[]
  loadingOrder: boolean
  loadPaymentForm: boolean
  paymentData: Payment
  paymentMessage: any
  profile: ProfileMC
  selectedAddress: AddressMC
  selectedItem: ProductItem
  showToast: boolean
  successAddressAlter: boolean
  toastMessage: Message
  validateShowAddress: boolean | Address
  validateWarningAddress: LogisticsInfo
  dispatchGlobal: Dispatch<any>
  handleCloseAlertCvv: () => void
  handleOpenAlertCvv: (cvv: boolean) => void
  handleSubmit: (handleClick?: () => void) => void
  onBlurCvv: () => void
  onChangeCvv: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onCloseToast: () => void
  onRenderCvvContainer: () => void
}

export const InformationView = ({
  canBuy,
  cvcRequired,
  cvv,
  dues,
  forceDisabled,
  gateway,
  installments,
  isOpenAlertCvv,
  isValidCVC,
  items,
  loadingOrder,
  loadPaymentForm,
  paymentData,
  paymentMessage,
  profile,
  selectedAddress,
  selectedItem,
  showToast,
  successAddressAlter,
  toastMessage,
  validateShowAddress,
  validateWarningAddress,
  dispatchGlobal,
  handleCloseAlertCvv,
  handleOpenAlertCvv,
  handleSubmit,
  onBlurCvv,
  onChangeCvv,
  onCloseToast,
  onRenderCvvContainer,
}: Props) => {
  const [alertEditableDelivery, setAlertEditableDelivery] = useState(false)

  const { logisticsBlocked } = useLogisticBlock()

  const hanldeAlertEditableDelivery = () => {
    setAlertEditableDelivery(true)
  }

  return (
    <Fragment>
      {loadingOrder && <LoadingProcessOrdeContainer />}
      {items?.length ? (
        <Fragment>
          {!loadingOrder && (
            <Fragment>
              {showToast && (
                <Toast toastMessage={toastMessage} onClose={onCloseToast} />
              )}

              <Title>
                <Title.Item title="store/checkoutless.summary.MyInfo">
                  <MyData
                    fill={globalStyles.iconAlternativeSecondary}
                    height={24}
                    width={24}
                  />
                </Title.Item>

                <InfoItem
                  className={styles.informationViewTitleMobile}
                  firstAction={() => dispatchGlobal(setNextSection('summary'))}
                >
                  <InfoItem.Icon className={styles.customIconMargin}>
                    <MyOrder
                      fill={globalStyles.iconAlternative}
                      height={24}
                      width={24}
                    />
                  </InfoItem.Icon>
                  <InfoItem.Content text="store/checkoutless.summary.myOrder" />
                </InfoItem>
              </Title>

              <InfoItem className={styles.informationViewContent}>
                <InfoItem.Icon className={styles.iconContainer}>
                  <MyProfile
                    fill={globalStyles.iconAlternative}
                    width={24}
                    height={24}
                  />
                </InfoItem.Icon>
                <InfoItem.Content value={profile.email} />
                <InfoItem.Edit
                  className={`${styles.informationViewEdit} ${globalStyles.cursorPointer}`}
                  onClick={() => {
                    dispatchGlobal(setNextSection('clientProfileData'))
                  }}
                />
              </InfoItem>

              {validateShowAddress && (
                <InfoItem className={styles.informationViewContent}>
                  <InfoItem.Icon className={styles.iconContainer}>
                    <LiteLocation
                      fill={globalStyles.iconAlternative}
                      width={24}
                      height={24}
                    />
                  </InfoItem.Icon>
                  {selectedAddress ? (
                    <Fragment>
                      <InfoItem.Content
                        value={`${selectedAddress?.street} ${selectedAddress?.city} - ${selectedAddress?.state}`}
                      />
                      <InfoItem.Edit
                        className={`${styles.informationViewEdit} ${globalStyles.cursorPointer}`}
                        onClick={() => {
                          dispatchGlobal(setNextSection('shippingData'))
                        }}
                        disabledAction={logisticsBlocked}
                        alternativeAction={hanldeAlertEditableDelivery}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <InfoItem.Content>
                        <a
                          onClick={() => {
                            dispatchGlobal(setNextSection('shippingData'))
                          }}
                          className={`${globalStyles.cursorPointer} ${styles.incompleteStep}`}
                        >
                          {useFormatMessage(
                            'store/checkoutless.user.addAddresInfo'
                          )}
                        </a>
                      </InfoItem.Content>
                      <InfoItem.Edit
                        className={`${styles.informationViewEdit} ${globalStyles.cursorPointer}`}
                        onClick={() => {
                          dispatchGlobal(setNextSection('shippingData'))
                        }}
                        icon={
                          <ArrowRight
                            width={24}
                            fill={globalStyles.iconAlternative}
                          />
                        }
                      />
                    </Fragment>
                  )}
                </InfoItem>
              )}

              {selectedAddress && validateWarningAddress && (
                <Alert
                  type="warning"
                  text="store/checkoutless.summary.notAddress"
                  link="store/checkoutless.summary.notAddressLink"
                  handleClick={() => {
                    dispatchGlobal(setNextSection('shippingData'))
                  }}
                />
              )}

              {selectedAddress && successAddressAlter && (
                <Alert
                  type="warning"
                  text={'store/checkoutless.userInfo.address.alternative'}
                />
              )}

              {alertEditableDelivery && (
                <Alert
                  type="warning"
                  text="store/checkoutless.summary.nonEditableDelivery"
                  icon={<BellIcon />}
                />
              )}

              <LogisticsSummaryContainer
                className={styles.informationViewContent}
                onClick={() => {
                  dispatchGlobal(setNextSection('logisticsInfo'))
                }}
              />

              <InfoItem
                className={styles.informationViewContent}
                style={{
                  alignItems: gateway === 'creditpay' ? 'flex-start' : 'center',
                }}
              >
                <InfoItem.Icon className={styles.iconContainer}>
                  <CreditCard
                    fill={globalStyles.iconAlternative}
                    width={24}
                    height={24}
                  />
                </InfoItem.Icon>
                {paymentData?.paymentMethod ? (
                  <Fragment>
                    {paymentMessage?.isLoaded ? (
                      <InfoItem.Content
                        className={styles.informationViewPaymentContent}
                        value={
                          paymentMessage?.translate
                            ? useFormatMessage(
                                paymentMessage.isPromisoy
                                  ? 'store/checkoutless.register.payOnReceive'
                                  : 'store/checkoutless.register.customerCredit',
                                {
                                  store: <b>ORION</b>,
                                }
                              )
                            : paymentMessage.message
                        }
                      >
                        <div
                          id="cvv-container"
                          style={{
                            width:
                              cvcRequired && paymentData.paymentMethod === 'tc'
                                ? '60%'
                                : '',
                          }}
                        >
                          {paymentData.paymentMethod === 'tc' &&
                            cvcRequired &&
                            loadPaymentForm && (
                              <div
                                style={{
                                  display: cvcRequired ? 'flex' : '',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <div style={{ marginRight: '12px' }}>
                                  {
                                    // TODO: esta logica es lo de paymentez si viene este campo se muestra el CVV custom
                                    paymentData.gateway === 'paymentez' ? (
                                      <Input
                                        type="tel"
                                        placeholder="store/checkoutless.card.cvv"
                                        {...cvv}
                                        errorMessage="store/checkoutless.card.invalidSecurityCodeError"
                                        name="cvc"
                                        maxLength={4}
                                        className={genericStyles.cvcInput}
                                        onChange={onChangeCvv}
                                        deleteBtn={false}
                                        blurFunction={onBlurCvv}
                                        showError={false}
                                      />
                                    ) : (
                                      <InputCVCSF
                                        className={`${
                                          styles.secureFieldInput
                                        } ${
                                          isValidCVC !== null && !isValidCVC
                                            ? styles.secureFieldInvalidLite
                                            : null
                                        } ${
                                          isValidCVC
                                            ? styles.secureFieldValidLite
                                            : null
                                        }`}
                                        isValid={isValidCVC}
                                        itemId={selectedItem?.itemId || ''}
                                        showError={false}
                                        onRenderCvvContainer={
                                          onRenderCvvContainer
                                        }
                                      />
                                    )
                                  }
                                </div>
                                <div className={styles.duesContainer}>
                                  <span className={styles.duesLabel}>
                                    {useFormatMessage(
                                      'store/checkoutless.register.card.dues'
                                    )}
                                  </span>
                                  <SelectDues
                                    className={styles.duesSelect}
                                    dues={dues}
                                    installments={installments}
                                    showPlaceholder={false}
                                  />
                                </div>
                              </div>
                            )}
                        </div>
                      </InfoItem.Content>
                    ) : (
                      <InfoItem.Content
                        text={'store/checkoutless.register.payOnReceive'}
                      />
                    )}
                    <InfoItem.Edit
                      className={`${styles.informationViewEdit} ${globalStyles.cursorPointer}`}
                      onClick={() => {
                        dispatchGlobal(setNextSection('paymentData'))
                      }}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <InfoItem.Content>
                      <a
                        onClick={() => {
                          dispatchGlobal(setNextSection('paymentData'))
                        }}
                        className={`${globalStyles.cursorPointer} ${styles.incompleteStep}`}
                      >
                        {useFormatMessage(
                          'store/checkoutless.user.addPaymentInfo'
                        )}
                      </a>
                    </InfoItem.Content>
                    <InfoItem.Edit
                      className={`${styles.informationViewEdit} ${globalStyles.cursorPointer}`}
                      onClick={() => {
                        dispatchGlobal(setNextSection('paymentData'))
                      }}
                      icon={
                        <ArrowRight
                          width={24}
                          fill={globalStyles.iconAlternative}
                        />
                      }
                    />
                  </Fragment>
                )}
              </InfoItem>

              <InfoItem className={styles.informationViewContent}>
                <InfoItem.Content>
                  <Coupon />
                </InfoItem.Content>
              </InfoItem>

              {isOpenAlertCvv && (
                <Alert
                  type="warning"
                  text="store/checkoutless.textAlertCvv"
                  description="store/checkoutless.descriptionAlertCvv"
                  handleClickClose={handleCloseAlertCvv}
                />
              )}

              {/* {!profile.habeasData && <HabeasData />} */}
              <Summary
                className={`${styles.informationViewContent} ${globalStyles.inDesktop}`}
              />

              <BuyButtonContainer
                canBuy={canBuy}
                classNameContainer={globalStyles.buyButtonContainerFixed}
                cvv={cvv?.value}
                dues={dues?.value?.value}
                forceDisabled={forceDisabled && !selectedAddress}
                handleSubmit={handleSubmit}
                secondary={true}
                onClickDisabled={() => handleOpenAlertCvv(isValidCVC)}
              />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <UnavailableProductsContainer />
      )}
    </Fragment>
  )
}
