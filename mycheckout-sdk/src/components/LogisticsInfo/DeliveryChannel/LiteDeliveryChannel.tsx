import React from 'react'
import type { IntlShape } from 'react-intl'

// import { LiteRadioButton } from '../../Icons'
import styles from '../logisticsInfo-module.css'
import { usePackagesManager } from '../Packages/usePackagesManager'

interface Props {
  availablePickUp: boolean
  availableDelivery: boolean
  global: any
  intl: IntlShape
}

const LiteDeliveryChannel = (props: Props) => {
  const { availablePickUp, availableDelivery, intl } = props

  const { deliveryChannel: deliveryType, setDeliveryChannel: setDeliveryType } =
    usePackagesManager()

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
            <div className={styles.container}>
              <div className={styles.iconContainer}>
                <input
                  type="radio"
                  value="delivery"
                  checked={deliveryType === 'delivery'}
                  className={styles.inputClasses}
                  onClick={() => {
                    availableDelivery ? setDeliveryType('delivery') : ''
                  }}
                />
              </div>
              <p>
                {intl.formatMessage({
                  id: 'store/checkoutless.logistics.delivery',
                })}
              </p>
            </div>
          )}
          {availablePickUp && (
            <div className={styles.container}>
              <div className={styles.iconContainer}>
                <input
                  type="radio"
                  value="pickUp"
                  checked={deliveryType === 'pickUp'}
                  className={styles.inputClasses}
                  onClick={() => {
                    setDeliveryType('pickUp')
                  }}
                />
              </div>
              <p>
                {intl.formatMessage({
                  id: 'store/checkoutless.logistics.pickUp',
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LiteDeliveryChannel
