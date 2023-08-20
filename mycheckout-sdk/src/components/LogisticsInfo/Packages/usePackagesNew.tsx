import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  setNextUserRegistrationSections,
  setPrevStep,
} from '../../../contexts/global-context/reducers/checkoutFormSlice'
import {
  selectAddressStore,
  selectItems,
  selectLogisticsInfo,
  selectOrderFormStatus,
  setLogisticsInfo,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import { selectSimulationLogistics } from '../../../contexts/global-context/reducers/simulationSlice'
import {
  selectIsMobile,
  selectSettings,
} from '../../../contexts/global-context/reducers/uiSettingsSlice'
import { useValidateStyles } from '../../../hooks/useValidateStyles'
import type { ItemMC, LogisticInfo } from '../../../interfaces/orderForm'
import type { LogisticInfoSimulation } from '../../../interfaces/simulation'
import type {
  PackageManager,
  PackageManagerOptions,
} from './usePackagesManager'

export const usePackages = () => {
  const [itemsToBeProcessed, setItemsToBeProcessed] = useState<
    Array<{ item: ItemMC; logisticInfo: LogisticInfoSimulation }>
  >([])

  const [packageManager, setPackageManager] = useState<PackageManager>({
    delivery: {
      selectedSla: null,
      addressId: '',
      availableSlas: [],
      currentItems: [],
      remainingItems: [],
    },
    pickUp: {
      selectedSla: null,
      addressId: '',
      availableSlas: [],
      currentItems: [],
      remainingItems: [],
    },
  })

  const [selectedLogistics, setSelectedLogistics] = useState<LogisticInfo[]>([])
  const addressAlternative = useSelector(selectAddressStore)
  const [packageNumber, setPackageNumber] = useState(1)
  const [deliveryChannel, setDeliveryChannel] = useState<'delivery' | 'pickUp'>(
    'delivery'
  )

  const dispatch = useDispatch()

  const items = useSelector(selectItems)
  const logisticInfo = useSelector(selectLogisticsInfo)
  const logisticInfoSimulation = useSelector(selectSimulationLogistics)
  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const orderFormStatus = useSelector(selectOrderFormStatus)
  const global = useValidateStyles()

  const recalculatePackage = () => {
    const slas: PackageManager = {
      delivery: {
        selectedSla: null,
        addressId: '',
        availableSlas: [],
        availableSlasId: [],
        currentItems: [], // Items for actual package
        currentIndexes: [],
        remainingItems: [], // Items pending for assign a package
      },
      pickUp: {
        selectedSla: null,
        addressId: '',
        availableSlas: [],
        availableSlasId: [],
        currentItems: [],
        currentIndexes: [],
        remainingItems: [],
      },
    }

    const slasResult = itemsToBeProcessed.reduce<PackageManager>(
      (result, current) => {
        // Check if there are slas for delivery
        const deliveriesSlas = current.logisticInfo?.slas.filter(
          (sla) => sla.deliveryChannel === 'delivery'
        )

        // Check if there are slas for pickup-in-point
        const pickupSlas = current.logisticInfo?.slas.filter(
          (sla) => sla.deliveryChannel === 'pickup-in-point'
        )

        if (deliveriesSlas?.length > 0) {
          if (!result.delivery.selectedSla) {
            //
            result.delivery.selectedSla = deliveriesSlas[0]
            result.delivery.availableSlas = deliveriesSlas
            result.delivery.availableSlasId = deliveriesSlas.map(
              (sla) => sla.id
            )
            result.delivery.currentItems.push(current.item)
            result.delivery.currentIndexes.push(current.logisticInfo.itemIndex)
            result.delivery.addressId = current.logisticInfo.addressInternalId
          } else {
            const canShipInSamePackage = deliveriesSlas.some((sla) =>
              result.delivery.availableSlasId.includes(sla.id)
            )

            if (canShipInSamePackage) {
              result.delivery.currentItems.push(current.item)
              result.delivery.currentIndexes.push(
                current.logisticInfo.itemIndex
              )
            } else {
              result.delivery.remainingItems.push(current)
            }
          }
        } else {
          result.delivery.remainingItems.push(current)
        }

        if (pickupSlas?.length > 0) {
          if (!result.pickUp.selectedSla) {
            result.pickUp.selectedSla = pickupSlas[0]
            result.pickUp.availableSlas = pickupSlas
            result.pickUp.availableSlasId = pickupSlas.map((sla) => sla.id)
            result.pickUp.currentItems.push(current.item)
            result.pickUp.currentIndexes.push(current.logisticInfo.itemIndex)
            result.pickUp.addressId = current.logisticInfo.addressInternalId
          } else {
            const canShipInSamePackage = pickupSlas.some((sla) =>
              result.pickUp.availableSlasId.includes(sla.id)
            )

            if (canShipInSamePackage) {
              result.pickUp.currentItems.push(current.item)
              result.pickUp.currentIndexes.push(current.logisticInfo.itemIndex)
            } else {
              result.pickUp.remainingItems.push(current)
            }
          }
        } else {
          result.pickUp.remainingItems.push(current)
        }

        return { ...result }
      },
      slas
    )

    if (
      !slasResult.delivery.availableSlas.length ||
      (addressAlternative?.addressDeliveryType === 'pickup' &&
        addressAlternative.id === slasResult.delivery.addressId)
    ) {
      setDeliveryChannel('pickUp')
    }

    setPackageManager(slasResult)
  }

  const handleContinue = (selectedLogistic: PackageManagerOptions) => {
    if (selectedLogistic.remainingItems.length) {
      setItemsToBeProcessed(selectedLogistic.remainingItems)
      setSelectedLogistics([
        ...selectedLogistics,
        ...selectedLogistic.currentIndexes.map<LogisticInfo>((index) => ({
          itemIndex: index,
          selectedDeliveryChannel: selectedLogistic.selectedSla.deliveryChannel,
          selectedSla: selectedLogistic.selectedSla.id,
          selectedShippingEstimate:
            selectedLogistic.selectedSla.shippingEstimate,
          deliveryWindow: selectedLogistic.selectedSla.deliveryWindow,
          addressId: selectedLogistic.addressId,
          storeName:
            selectedLogistic.selectedSla.deliveryChannel === 'pickup-in-point'
              ? selectedLogistic.selectedSla.pickupStoreInfo.friendlyName.concat(
                  ' ',
                  selectedLogistic.selectedSla.pickupStoreInfo.address.street
                )
              : null,
        })),
      ])
      setPackageNumber(packageNumber + 1)
      setDeliveryChannel('delivery') // TODO: Revisar que pasa cuando cambia a un paquete sin Domicilio
    } else {
      dispatch(
        setLogisticsInfo([
          ...selectedLogistics,
          ...selectedLogistic.currentIndexes.map<LogisticInfo>((index) => ({
            itemIndex: index,
            selectedDeliveryChannel:
              selectedLogistic.selectedSla.deliveryChannel,
            selectedSla: selectedLogistic.selectedSla.id,
            selectedShippingEstimate:
              selectedLogistic.selectedSla.shippingEstimate,
            deliveryWindow: selectedLogistic.selectedSla.deliveryWindow,
            addressId: selectedLogistic.addressId,
            storeName:
              selectedLogistic.selectedSla.deliveryChannel === 'pickup-in-point'
                ? selectedLogistic.selectedSla.pickupStoreInfo.friendlyName.concat(
                    ' ',
                    selectedLogistic.selectedSla.pickupStoreInfo.address.street
                  )
                : null,
          })),
        ])
      )

      if (orderFormStatus === 'complete') {
        dispatch(setPrevStep())
      } else {
        dispatch(setNextUserRegistrationSections())
      }
    }
  }

  const actualItems = useMemo(() => {
    if (!packageManager) return []
    if (deliveryChannel === 'delivery') {
      return packageManager?.delivery.currentItems
    }

    return packageManager?.pickUp.currentItems
  }, [deliveryChannel, packageManager])

  const disable = useMemo(
    () =>
      !!(
        packageManager &&
        packageManager[deliveryChannel].selectedSla &&
        (!packageManager[deliveryChannel].selectedSla.availableDeliveryWindow
          .length ||
          (packageManager[deliveryChannel].selectedSla.availableDeliveryWindow
            .length &&
            packageManager[deliveryChannel].selectedSla.deliveryWindow &&
            packageManager[deliveryChannel].selectedSla.deliveryWindow
              .startDateUtc !== '' &&
            packageManager[deliveryChannel].selectedSla.deliveryWindow
              .endDateUtc !== ''))
      ),
    [packageManager]
  )

  useEffect(() => {
    // TODO: Si hacen un cambio ya sea en los items o en la simulación se deberia reiniciar el proceso
    // de seleccion de paquetes
    setSelectedLogistics([])
    setPackageNumber(1)
    setPackageManager({
      delivery: {
        selectedSla: null,
        addressId: '',
        availableSlas: [],
        currentItems: [],
        remainingItems: [],
      },
      pickUp: {
        selectedSla: null,
        addressId: '',
        availableSlas: [],
        currentItems: [],
        remainingItems: [],
      },
    })

    const reducedItems = items?.reduce((previous, item) => {
      const wasAdded = previous.find(
        (previousItem) => previousItem.id === item.id
      )

      if (!wasAdded) {
        previous.push({
          ...item,
          quantity: items.filter((countItem) => countItem.id === item.id)
            .length,
        })
      }

      return previous
    }, [])

    setItemsToBeProcessed(
      reducedItems.map((item, index) => ({
        item,
        logisticInfo: logisticInfoSimulation[index],
      }))
    )
  }, [logisticInfoSimulation, logisticInfo, items])

  useEffect(() => {
    if (itemsToBeProcessed.length > 0) {
      recalculatePackage()
    }
  }, [itemsToBeProcessed])

  return {
    packageManager,
    actualItems,
    packageNumber,
    deliveryChannel,
    setDeliveryChannel,
    setPackageManager,
    handleContinue,
    isMobile,
    isLiteVersion,
    global,
    disable,
    isEdit: orderFormStatus === 'complete',
  }
}
