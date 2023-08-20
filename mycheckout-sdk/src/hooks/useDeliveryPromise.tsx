import { useIntl } from 'react-intl'

export const useDeliveryPromise = (shippingEstimate: string) => {
  const intl = useIntl()
  let time = ''
  let textTime

  if (shippingEstimate === '0bd') {
    time = shippingEstimate.substring(0, shippingEstimate.length - 2)
    textTime = intl.formatMessage({
      id: 'store/checkoutless.logistics.sameDay',
    })
  } else if (shippingEstimate.includes('bd')) {
    time = shippingEstimate.substring(0, shippingEstimate.length - 2)
    textTime = intl.formatMessage({
      id: 'store/checkoutless.logistics.businessDays',
    })
  } else if (shippingEstimate.includes('d')) {
    time = shippingEstimate.substring(0, shippingEstimate.length - 1)
    textTime = intl.formatMessage({
      id: 'store/checkoutless.logistics.days',
    })
  } else if (shippingEstimate.includes('m')) {
    time = shippingEstimate.substring(0, shippingEstimate.length - 1)
    textTime = intl.formatMessage({
      id: 'store/checkoutless.logistics.minutes',
    })
  }

  return {
    time,
    textTime,
  }
}
