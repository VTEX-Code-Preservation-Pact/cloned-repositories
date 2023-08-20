import React from 'react'

import { Pickup, Shipping } from '../../Icons'
import type { ChangeLogistics } from '../../../interfaces'
import useFormatMessage from '../../../i18n/useFormatMessage'
import global from '../../../myCheckout-styles.module.css'
import styles from './loadingProcessOrder.module.css'
import type { AddressMC } from '../../../interfaces/orderForm'

interface Props {
  changeDelivery: ChangeLogistics
  deliveryType: string
  selectedAddress: AddressMC
  storeInfo: string
}

const LiteLoadingProcessOrder = ({
  changeDelivery,
  deliveryType,
  selectedAddress,
  storeInfo,
}: Props) => {
  return (
    <div className={styles.summaryLoadingProcessOrder}>
      <div className={styles.summaryContainerLite}>
        {deliveryType === 'delivery' ? (
          <Shipping fill={global.iconAlternativeStrokeSecondary} />
        ) : (
          <Pickup fill={global.iconAlternativeSecondary} />
        )}
        <div>
          {deliveryType === 'delivery' ? (
            <p>
              {useFormatMessage('store/checkoutless.summary.shipping')}
              {' - '}
              {selectedAddress?.street}
            </p>
          ) : (
            <p>
              {useFormatMessage('store/checkoutless.logistics.pickUpInStore')}{' '}
              {storeInfo}
            </p>
          )}
          {changeDelivery?.scheduleDelivery?.day &&
            changeDelivery?.scheduleDelivery?.timeRange && (
              <p>
                {changeDelivery?.scheduleDelivery?.day} |{' '}
                {changeDelivery?.scheduleDelivery?.timeRange}
              </p>
            )}
        </div>
      </div>
      <div className={styles.contenedor}>
        <div className={styles.barra}>
          <div className={styles.texto}>
            {useFormatMessage('store/checkoutless.register.processingPayment')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiteLoadingProcessOrder
