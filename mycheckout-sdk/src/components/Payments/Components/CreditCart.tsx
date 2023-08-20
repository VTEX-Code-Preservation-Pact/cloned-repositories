import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import type { LabelProps } from './Label'
import Label from './Label'
import { PaymentKey } from '../Models/payments'
import Form from '../../RegisterForm/Form'
import { usePayment } from '../../../contexts/PaymentContext'
import { Cards } from '../Constants'
import { selectIdImgCard } from '../../../utils/payments'
import styles from './CreditCard.module.css'
import { selectSettings } from '../../../contexts/global-context/reducers/uiSettingsSlice'
import type { GroupPaymentMethods } from '../../../interfaces/simulation'

interface CreditCardProps {
  payments: GroupPaymentMethods
}

const CreditCard = ({ payments }: CreditCardProps) => {
  const {
    disabled,
    error,
    franchiseImg,
    gateway,
    loadingOrder,
    paymentMethod,
    handleClick,
    handledClickDisabled,
    setError,
    setFranchiseImg,
  } = usePayment()

  const { additionalData } = useSelector(selectSettings)

  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    if (franchiseImg) {
      const paymentSelected = payments.paymentMethods.find((payment) => {
        const name = payment.name.toLowerCase()

        return franchiseImg && franchiseImg === name
      })

      setSelectedCard(paymentSelected)
    }
  }, [franchiseImg, payments])

  const label: LabelProps = useMemo(
    () => ({
      type: payments.groupName,
      label:
        payments.groupName !== PaymentKey.CreditCard
          ? payments.paymentMethods[0].name ||
            'store/checkoutless.register.creditCard'
          : 'store/checkoutless.register.creditCard',
      useCustomLabel: payments.groupName === PaymentKey.CreditCard,
    }),
    [payments]
  )

  const show = useMemo(
    () => paymentMethod === payments.groupName,
    [paymentMethod]
  )

  const cardInfo = useMemo(() => {
    const response = selectIdImgCard(franchiseImg)

    return response?.nameComplete || franchiseImg
  }, [franchiseImg])

  return (
    <div>
      <Label {...label} />
      {show && (
        <Fragment>
          <div className={styles.cardsImgContainer}>
            {payments.paymentMethods.map((payment, index) => {
              const infoCard = Cards[payment.name]
              const name = payment.name.toLocaleLowerCase()

              return infoCard ? (
                <img
                  key={`payment-logo-${index}`}
                  src={infoCard?.image}
                  alt={payment?.name}
                  style={{
                    opacity:
                      name.includes(franchiseImg) ||
                      franchiseImg === name ||
                      cardInfo === name
                        ? '1'
                        : '0.4',
                  }}
                />
              ) : (
                <Fragment />
              )
            })}
          </div>
          <Form
            handledPaymentDisabled={handledClickDisabled}
            handlePayment={handleClick}
            loading={loadingOrder}
            error={error}
            setError={setError}
            disabled={disabled}
            paymentMethod={paymentMethod}
            payments={payments}
            id={gateway === 'creditpay' || !gateway ? 'noop' : gateway}
            gateway={additionalData?.paymentez === 'true' && 'paymentez'}
            setFranchiseImg={setFranchiseImg}
            selectedCard={selectedCard}
          />
        </Fragment>
      )}
    </div>
  )
}

export default CreditCard
