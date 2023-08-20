import type {
  LogisticsInfo,
  Item,
  Sla,
  SlaSummary,
  Totalizer,
  Address,
  TotalizerId,
} from '../interfaces'
import type { ItemSimulation } from '../interfaces/simulation'

export const slasSummary = (logisticsInfo: LogisticsInfo[]): SlaSummary => {
  const slas =
    logisticsInfo
      ?.map((logistic: LogisticsInfo) =>
        logistic.slas?.map((sla, i) => {
          if (sla?.pickupStoreInfo?.address) {
            sla.pickupStoreInfo.address.addressType = 'search'
          }

          return {
            itemIndex: logistic.itemIndex,
            id: sla?.id,
            deliveryChannel: sla?.deliveryChannel,
            name: sla?.name,
            shippingEstimate: sla?.shippingEstimate,
            shippingEstimateDate: sla?.shippingEstimateDate,
            availableDeliveryWindows: sla?.availableDeliveryWindows,
            price: sla?.price,
            index: i,
            pickupStoreInfo: {
              additionalInfo: sla?.pickupStoreInfo?.additionalInfo,
              friendlyName: sla?.pickupStoreInfo?.friendlyName,
              address: sla?.pickupStoreInfo?.address,
            },
          }
        })
      )
      .reduce((acc, next) => acc.concat(next), []) || []

  const itemsIndex = logisticsInfo?.map(
    (logistic: LogisticsInfo) => logistic.itemIndex
  )

  const slasGroupById = {}

  for (const sla of slas) {
    const keys = Object.keys(slasGroupById)

    if (keys.includes(sla.id)) {
      slasGroupById[sla.id].push(sla)
    } else {
      slasGroupById[sla.id] = [sla]
    }
  }

  const consolidatedSlas = []
  const groupedKeys = Object.keys(slasGroupById)

  for (const key of groupedKeys) {
    const total = slasGroupById[key]
      .map((sla: Sla) => sla.price)
      .reduce((acc: number, next: number) => acc + next, 0)

    const consolidateitemsIndex = slasGroupById[key].map(
      (sla: Sla) => sla.itemIndex
    )

    const consolidatePrices = slasGroupById[key].map((sla: any) => {
      const index = sla.itemIndex

      return { [index]: sla.price }
    })

    const [consolidatedSla] = slasGroupById[key]

    consolidatedSla.price = total / 100
    consolidatedSla.itemIndex = consolidateitemsIndex
    consolidatedSla.prices = consolidatePrices
    consolidatedSlas.push(consolidatedSla)
  }

  const deliveryPoints = consolidatedSlas.filter(
    (sla) => sla.deliveryChannel === 'delivery'
  )

  deliveryPoints.sort((a, b) => {
    if (a.price > b.price) return 1
    if (a.price < b.price) return -1

    return 0
  })
  const pickupPoints = consolidatedSlas.filter(
    (sla) => sla.deliveryChannel === 'pickup-in-point'
  )

  pickupPoints.sort((a, b) => {
    if (a.price > b.price) return 1
    if (a.price < b.price) return -1

    return 0
  })

  return {
    delivery: deliveryPoints,
    'pickup-in-point': pickupPoints,
    itemsIndex,
  }
}

export const defaultPackages = (
  slaSummary: SlaSummary,
  simulationItems: any,
  addressAlter?: Address
) => {
  const defaultLogistics: LogisticsInfo[] = []
  let totalItems = slaSummary.itemsIndex
  let deliverySlas = slaSummary.delivery
  let pickupSlas = slaSummary['pickup-in-point']
  const itemsUsed: number[] = []

  const itemsAvailability = simulationItems.filter(
    (item: Item) => item.availability !== 'available'
  )

  if (itemsAvailability.length < 1) {
    do {
      if (
        deliverySlas.length > 0 &&
        (!addressAlter ||
          addressAlter?.addressType === 'residential' ||
          (addressAlter?.addressType === 'search' && pickupSlas.length === 0))
      ) {
        const [delivery] = deliverySlas
        let slaItems = delivery.itemIndex

        slaItems = slaItems.filter((item: number) => !itemsUsed.includes(item))
        slaItems.forEach((item) => itemsUsed.push(item))

        if (slaItems.length !== delivery.itemIndex.length) {
          const newPriceByItem = delivery.prices.filter((itemIndex) => {
            const item = parseInt(Object.keys(itemIndex)[0], 10)

            return slaItems.includes(item)
          })

          const usedPrices = newPriceByItem.map((price) => Object.values(price))
          const mergePrices = [].concat([], ...usedPrices)
          const total = mergePrices.reduce(
            (acc: number, next: number) => acc + next,
            0
          )

          delivery.price = total / 100
        }

        const deliveryWindow: any =
          delivery.availableDeliveryWindows?.length > 0
            ? delivery.availableDeliveryWindows[0]
            : {}

        if (
          deliveryWindow?.startDateUtc &&
          deliveryWindow?.startDateUtc !== ''
        ) {
          slaItems.forEach((item) => {
            defaultLogistics.push({
              itemIndex: item,
              selectedSla: delivery.id,
              selectedDeliveryChannel: delivery.deliveryChannel,
              deliveryWindow: {
                startDateUtc: deliveryWindow.startDateUtc,
                endDateUtc: deliveryWindow.endDateUtc,
              },
            })
          })
        } else {
          slaItems.forEach((item) => {
            defaultLogistics.push({
              itemIndex: item,
              selectedSla: delivery.id,
              selectedDeliveryChannel: delivery.deliveryChannel,
            })
          })
        }

        totalItems = totalItems.filter((el) => !slaItems.includes(el))
      } else if (pickupSlas.length > 0) {
        const [pickup] = pickupSlas
        let slaItems = pickup.itemIndex

        slaItems = slaItems.filter((item: number) => !itemsUsed.includes(item))
        slaItems.forEach((item) => itemsUsed.push(item))
        if (slaItems.length !== pickup.itemIndex.length) {
          const newPriceByItem = pickup.prices.filter((itemIndex) => {
            const item = parseInt(Object.keys(itemIndex)[0], 10)

            return slaItems.includes(item)
          })

          const usedPrices = newPriceByItem.map((price) => Object.values(price))
          const mergePrices = [].concat([], ...usedPrices)
          const total = mergePrices.reduce(
            (acc: number, next: number) => acc + next,
            0
          )

          pickup.price = total / 100
        }

        const deliveryWindow: any =
          pickup.availableDeliveryWindows?.length > 0
            ? pickup.availableDeliveryWindows[0]
            : {}

        if (
          deliveryWindow?.startDateUtc &&
          deliveryWindow?.startDateUtc !== ''
        ) {
          slaItems.forEach((item) => {
            defaultLogistics.push({
              itemIndex: item,
              selectedSla: pickup.id,
              selectedDeliveryChannel: pickup.deliveryChannel,
              deliveryWindow: {
                startDateUtc: deliveryWindow.startDateUtc,
                endDateUtc: deliveryWindow.endDateUtc,
              },
            })
          })
        } else {
          slaItems.forEach((item) => {
            defaultLogistics.push({
              itemIndex: item,
              selectedSla: pickup.id,
              selectedDeliveryChannel: pickup.deliveryChannel,
            })
          })
        }

        totalItems = totalItems.filter((el) => !slaItems.includes(el))
      } else {
        totalItems = []
      }

      // eslint-disable-next-line no-loop-func
      deliverySlas = deliverySlas.filter((delivery) => {
        const availableItems = delivery.itemIndex.filter((index) =>
          totalItems.includes(index)
        )

        return availableItems.length > 0
      })
      // eslint-disable-next-line no-loop-func
      pickupSlas = pickupSlas.filter((pickup) => {
        const availableItems = pickup.itemIndex.filter((index) =>
          totalItems.includes(index)
        )

        return availableItems.length > 0
      })
    } while (totalItems.length > 0)
  }

  return defaultLogistics
}

const getTotalById = (id: TotalizerId, totalizers: Totalizer[]) =>
  totalizers?.find((totalizer) => totalizer.id === id) || {
    value: 0,
  }

export const totalShipping = (totalizers: Totalizer[]) => {
  const items = getTotalById('Items', totalizers)
  const shipping = getTotalById('Shipping', totalizers)
  const tax = getTotalById('Tax', totalizers)
  const discounts = getTotalById('Discounts', totalizers)

  return items.value + shipping.value + tax.value + discounts.value
}

export const existUnavailableProducts = (items: ItemSimulation[]) =>
  items?.filter(
    (item) =>
      item?.availability !== 'available' &&
      item?.availability !== 'cannotBeDelivered'
  ).length > 0
