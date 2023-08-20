import React, { useEffect, useState, Fragment } from 'react'
import { useIntl } from 'react-intl'

import { formatter } from '../../../utils'
import { useSelectValue } from '../../../hooks/useSelectValue'
import { Shipping } from '../../Icons'
import useFormatMessage from '../../../i18n/useFormatMessage'
import global from '../../../myCheckout-styles.module.css'
import { usePackagesManager } from '../Packages/usePackagesManager'

const useDelivery = () => {
  const intl = useIntl()
  const { packageManager, setPackageManager } = usePackagesManager()

  const [formatedEstimateTime, setFormatedEstimateTime] = useState([
    {
      label: '',
      value: '',
    },
  ])

  const delivery: any = useSelectValue({
    label: useFormatMessage('store/checkoutless.logistics.chooseShipping'),
    value: packageManager.delivery.selectedSla?.id,
  })

  useEffect(() => {
    setFormatedEstimateTime(
      packageManager.delivery.availableSlas.map((sla) => {
        const { shippingEstimate, id, name } = sla
        let time = ''
        let textTime
        let connector = ''

        if (shippingEstimate === '0bd') {
          textTime = intl.formatMessage({
            id: 'store/checkoutless.logistics.sameDay',
          })
        } else if (shippingEstimate.includes('bd')) {
          time = shippingEstimate.substring(0, shippingEstimate.length - 2)
          textTime = intl.formatMessage({
            id: 'store/checkoutless.logistics.businessDays',
          })
          connector = intl.formatMessage({
            id: 'store/checkoutless.generalMessage.in',
          })
        } else if (shippingEstimate.includes('d')) {
          time = shippingEstimate.substring(0, shippingEstimate.length - 1)
          textTime = intl.formatMessage({
            id: 'store/checkoutless.logistics.days',
          })
          connector = intl.formatMessage({
            id: 'store/checkoutless.generalMessage.in',
          })
        } else if (shippingEstimate.includes('m')) {
          time = shippingEstimate.substring(0, shippingEstimate.length - 1)
          textTime = intl.formatMessage({
            id: 'store/checkoutless.logistics.minutes',
          })
          connector = intl.formatMessage({
            id: 'store/checkoutless.generalMessage.in',
          })
        }

        if (packageManager.delivery.selectedSla.id === sla.id) {
          delivery.setValue({
            label: intl.formatMessage(
              { id: 'store/checkoutless.logistics.deliveryType' },
              {
                type: name,
                days: `${time} ${textTime}`,
                price: formatter.format(sla.price / 100),
                in: connector,
              }
            ),
            value: id,
          })
        }

        return {
          label: intl.formatMessage(
            { id: 'store/checkoutless.logistics.deliveryType' },
            {
              type: name,
              days: `${time} ${textTime}`,
              price: formatter.format(sla.price / 100),
              in: connector,
            }
          ),
          value: id,
        }
      })
    )
  }, [packageManager.delivery.selectedSla?.id])

  useEffect(() => {
    if (delivery.value.value !== packageManager.delivery.selectedSla?.id) {
      const selectedSla = packageManager.delivery.availableSlas.find(
        (sla) => sla.id === delivery.value.value
      )

      setPackageManager({
        ...packageManager,
        delivery: {
          ...packageManager.delivery,
          selectedSla,
        },
      })
    }
  }, [delivery.value.value])

  const selectIcon = () => {
    return (
      <Fragment>
        <Shipping
          fill={
            packageManager.delivery.selectedSla
              ? global.iconAlternativeStrokeSecondary
              : global.iconAlternativeStroke
          }
          width={24}
          height={24}
        />
      </Fragment>
    )
  }

  return {
    formatedEstimateTime,
    selectIcon,
    delivery,
    selectedSla: packageManager.delivery.selectedSla?.id || '',
  }
}

export default useDelivery
