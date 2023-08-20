import React, { useState } from 'react'
import type { IntlShape } from 'react-intl'

import styles from '../logisticsInfo-module.css'
import global from '../../../myCheckout-styles.module.css'
import { usePackagesManager } from '../Packages/usePackagesManager'
import { Alert } from '../../shared'
import { BellIcon } from '../../Icons'
import useLogisticBlock from '../../../hooks/useLogisticBlock'

interface Props {
  availableDelivery: boolean
  availablePickUp: boolean
  intl: IntlShape
}

const DeliveryChannel = (props: Props) => {
  const { availableDelivery, availablePickUp, intl } = props

  const { deliveryChannel: deliveryType, setDeliveryChannel: setDeliveryType } =
    usePackagesManager()

  const { logisticsBlocked } = useLogisticBlock()
  const [alertNonEditable, setAlertNonEditable] = useState(false)

  const showNonEditableAlert = () => {
    setAlertNonEditable(true)
    setTimeout(() => {
      setAlertNonEditable(false)
    }, 10000)
  }

  return (
    <div>
      <div>
        <div
          className={
            availablePickUp && availableDelivery
              ? styles.deliveryChannelContainer
              : styles.oneOptionDelivery
          }
        >
          {availableDelivery && (
            <div
              className={styles.container}
              onClick={() => {
                if (logisticsBlocked) {
                  showNonEditableAlert()

                  return
                }

                availableDelivery ? setDeliveryType('delivery') : ''
              }}
            >
              <div className={styles.iconContainer}>
                <input
                  checked={deliveryType === 'delivery'}
                  disabled={logisticsBlocked}
                  type="radio"
                />
              </div>
              <p className={deliveryType === 'delivery' ? global.enphasis : ''}>
                {intl.formatMessage({
                  id: 'store/checkoutless.logistics.delivery',
                })}
              </p>
            </div>
          )}
          {!logisticsBlocked && availablePickUp && (
            <div
              className={styles.container}
              onClick={() => {
                setDeliveryType('pickUp')
              }}
            >
              <div className={styles.iconContainer}>
                <input
                  checked={deliveryType === 'pickUp'}
                  disabled={logisticsBlocked}
                  type="radio"
                />
              </div>
              <p
                className={
                  !logisticsBlocked && deliveryType === 'pickUp'
                    ? global.enphasis
                    : ''
                }
              >
                {intl.formatMessage({
                  id: 'store/checkoutless.logistics.pickUp',
                })}
              </p>
            </div>
          )}
        </div>
      </div>
      {alertNonEditable && (
        <div className={global.floatAlert}>
          <Alert
            type="warning"
            text="store/checkoutless.summary.nonEditableDelivery"
            icon={<BellIcon />}
          />
        </div>
      )}
    </div>
  )
}

export default DeliveryChannel
