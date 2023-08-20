import type {
  ChangeLogistics,
  Sla,
  SlaSummary,
  PackageSummary,
} from '../interfaces'
import { formatter } from '.'
import type { LogisticInfo } from '../interfaces/orderForm'

interface PropsProcessInfo {
  logisticsInfo: LogisticInfo[]
  intl: any
  slas: SlaSummary
}
export const messages = {
  homeDelivery: {
    id: 'store/checkoutless.logistics.homeDelivery',
  },
  packageSteps: {
    id: 'store/checkoutless.logistics.packageSteps',
  },
  pickUpInStore: {
    id: 'store/checkoutless.logistics.pickUpInStore',
  },
  deliveryCost: {
    id: 'store/checkoutless.logistics.deliveryCost',
  },
  freeDeliveryCost: {
    id: 'store/checkoutless.logistics.freeDeliveryCost',
  },
}

export const processInfoPackages = ({
  logisticsInfo,
  intl,
  slas,
}: PropsProcessInfo) => {
  let step = ''
  let price = 0
  let friendlyName = ''
  let deliveryTypeName = ''

  const summaryChangeLogistics: ChangeLogistics[] = []

  const packages = [logisticsInfo[0]]

  logisticsInfo.forEach((logistic) => {
    const packageExist = packages.find(
      (info) =>
        info.selectedDeliveryChannel &&
        info.selectedSla === logistic.selectedSla
    )

    if (!packageExist) packages.push(logistic)
  })

  const packagesSummary: PackageSummary[] = packages.map((logistic, index) => {
    let day = ''
    let timeRange = ''
    let deliveryDate = ''
    let deliveryWindowPrice = 0
    const deliveryType = logistic?.selectedDeliveryChannel

    step = intl.formatMessage(messages.packageSteps, {
      step: index + 1,
      totalSteps: packages.length,
    })

    const actualSla = slas[deliveryType]?.find(
      (sla: Sla) => sla.id === logistic.selectedSla
    )

    price = actualSla?.price || 0

    if (deliveryType === 'delivery') {
      deliveryTypeName = intl.formatMessage(messages.homeDelivery)
      friendlyName = ''
    } else {
      deliveryTypeName = intl.formatMessage(messages.pickUpInStore)
      friendlyName = `${logistic?.storeName || 'tienda'}`
    }

    if (
      logistic?.deliveryWindow?.startDateUtc &&
      logistic?.deliveryWindow?.startDateUtc !== ''
    ) {
      const startDate = new Date(
        logistic?.deliveryWindow?.startDateUtc.split('+')[0]
      )

      const endDate = new Date(
        logistic?.deliveryWindow?.endDateUtc?.split('+')[0]
      )

      const fmtDay = new Intl.DateTimeFormat('es-CO', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
      })

      const fmtTime = new Intl.DateTimeFormat('es-CO', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
      })

      const slaDeliveryWindow = actualSla?.availableDeliveryWindows.find(
        (deliveryWindow: any) =>
          deliveryWindow.startDateUtc === logistic.deliveryWindow.startDateUtc
      )

      deliveryWindowPrice = slaDeliveryWindow?.price || 0
      deliveryWindowPrice /= 100

      day = `${fmtDay.format(startDate)}`
      timeRange = `${fmtTime.format(startDate)} - ${fmtTime.format(endDate)}`
      deliveryDate = `${day} | ${timeRange}`
    }

    const priceMessage = `${intl.formatMessage(messages.deliveryCost)} ${
      price + deliveryWindowPrice !== 0
        ? `(${formatter.format(price + deliveryWindowPrice)})`
        : `(${intl.formatMessage(messages.freeDeliveryCost)})`
    } `

    summaryChangeLogistics.push({
      shippingPackage: index + 1,
      selectedSla: logistic?.selectedSla,
      selectedDeliveryChannel: deliveryType,
      deliveryWindow: logistic?.deliveryWindow,
      scheduleDelivery: {
        day,
        timeRange,
      },
    })

    return {
      deliveryType,
      deliveryTypeName,
      selectedSla: logistic?.selectedSla,
      deliveryDate,
      step,
      price: priceMessage,
      storeInfo: friendlyName,
    }
  })

  return { summaryChangeLogistics, packagesSummary }
}
