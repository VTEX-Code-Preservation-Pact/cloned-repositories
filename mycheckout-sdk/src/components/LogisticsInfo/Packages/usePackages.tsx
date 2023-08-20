/* eslint-disable no-loop-func */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { Sla } from '../../../interfaces'
import { arrayEquals, mergeArrays } from '../../../utils'
import {
  useUserData,
  useUserDataDispatch,
} from '../../../contexts/UserDataProvider'
import { selectSettings } from '../../../contexts/global-context/reducers/uiSettingsSlice'
import {
  setNextUserRegistrationSections,
  setPrevStep,
} from '../../../contexts/global-context/reducers/checkoutFormSlice'
import { useActionsDispatch } from '../../../contexts/ActionsProviderV2'
import { FillShippingTypeDataEvent } from '../../../events'

const usePackages = () => {
  const { items, slas, logisticsInfo, changeLogistics, isNew, isEdit } =
    useUserData()

  const dispatchGlobal = useDispatch()
  const dispatchUserData = useUserDataDispatch()
  const dispatchActions = useActionsDispatch()
  const [deliveryType, setDeliveryType] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [itemsUsed, setItemsUsed] = useState([])

  const { hasGoogleAnalytics } = useSelector(selectSettings)

  const [actualPackage, setActualPackage] = useState({
    imgUrl: [],
    delivery: [],
    pickup: [],
    itemsIndex: [],
  })

  const [infoPackages, setInfoPackages] = useState({
    packages: {},
    totalPackages: 0,
    step: 0,
    packageKeys: [],
  })

  const [selectedLogistic, setSelectedLogistic] = useState({
    selectedSla: '',
    selectedDeliveryChannel: '',
  })

  const [deliveryWindow, setDeliveryWindow] = useState({
    startDateUtc: '',
    endDateUtc: '',
  })

  const [scheduleDelivery, setScheduleDelivery] = useState({
    day: '',
    timeRange: '',
  })

  useEffect(() => {
    dispatchActions({
      type: 'SET_IS_LOADING_CVV_FIELD',
      args: false,
    })
  }, [])

  const groupPackagesByItems = (packages: any[]) => {
    const groupPackages = {}
    let index = 0

    while (packages.length > 0) {
      groupPackages[index] = [packages.shift()]
      const filterItem = packages.filter((pack) =>
        arrayEquals(groupPackages[index][0].itemIndex, pack.itemIndex)
      )

      groupPackages[index] = groupPackages[index].concat(filterItem)
      packages = packages.filter(
        (pack) =>
          !arrayEquals(groupPackages[index][0].itemIndex, pack.itemIndex)
      )
      index++
    }

    return groupPackages
  }

  const handleClick = () => {
    let formatLogistics = [
      {
        shippingPackage: infoPackages.step,
        selectedSla: selectedLogistic.selectedSla,
        selectedDeliveryChannel: selectedLogistic.selectedDeliveryChannel,
      },
    ]

    let actualLogistics = actualPackage.itemsIndex?.map((info) => {
      return {
        itemIndex: info,
        selectedSla: selectedLogistic.selectedSla,
        selectedDeliveryChannel: selectedLogistic.selectedDeliveryChannel,
      }
    })

    if (deliveryWindow.startDateUtc && deliveryWindow.startDateUtc !== '') {
      actualLogistics = actualLogistics.map((info) => {
        return { ...info, deliveryWindow }
      })
      formatLogistics = formatLogistics.map((info) => {
        return { ...info, deliveryWindow, scheduleDelivery }
      })
    }

    const allLogistics = mergeArrays(
      logisticsInfo,
      actualLogistics,
      'itemIndex'
    )

    const allChangeLogistics = mergeArrays(
      changeLogistics,
      formatLogistics,
      'shippingPackage'
    )

    dispatchUserData({
      type: 'SET_SLAS',
      args: {
        ...slas,
        packages: allChangeLogistics,
        dontUpdateLogistics: true,
      },
    })
    dispatchUserData({
      type: 'SET_LOGISTICS_INFO',
      args: allLogistics,
    })
    dispatchUserData({
      type: 'SET_CHANGE_LOGISTICS',
      args: allChangeLogistics,
    })
    setDeliveryWindow({
      startDateUtc: '',
      endDateUtc: '',
    })

    if (items.length === itemsUsed.length) {
      if (isNew || isEdit) {
        dispatchGlobal(setNextUserRegistrationSections())
      } else {
        dispatchGlobal(setPrevStep())
      }
    } else {
      setInfoPackages({ ...infoPackages, step: infoPackages.step + 1 })
    }

    // TODO: Faltaria mover el envio de analytics al nuevo hook
    FillShippingTypeDataEvent({
      option: selectedLogistic.selectedSla,
      hasGoogleAnalytics,
    })
  }

  useEffect(() => {
    const packages = groupPackagesByItems(
      slas.delivery.concat(slas['pickup-in-point'])
    )

    const packageKeys = Object.keys(packages)

    setInfoPackages({
      packages,
      totalPackages: packageKeys?.length,
      step: 1,
      packageKeys,
    })
  }, [])

  useEffect(() => {
    if (!logisticsInfo || logisticsInfo?.length <= 0) return
    if (infoPackages.step === 0) return
    if (items.length === itemsUsed.length) return
    const temporalPackages = infoPackages
    const index = `${temporalPackages?.step - 1}`
    const packages = temporalPackages?.packages[index]
    let itemsIndex = packages ? packages[0]?.itemIndex : []
    let stepPackage = temporalPackages?.packages[index]

    itemsIndex = itemsIndex.filter((item: any) => !itemsUsed.includes(item))

    while (itemsIndex.length < 1) {
      delete temporalPackages?.packages[index]
      const filteredPackages = Object.values(temporalPackages?.packages)
      const groupFilteredPackages = { ...filteredPackages }

      temporalPackages.packages = groupFilteredPackages
      itemsIndex = groupFilteredPackages[index][0].itemIndex
      stepPackage = groupFilteredPackages[index]
      itemsIndex = itemsIndex.filter(
        (item: number) => !itemsUsed.includes(item)
      )
    }

    if (itemsIndex.length !== stepPackage[0].itemIndex.length) {
      // Si cambia el número de items para el paquete se recalculan todos los precios
      stepPackage.forEach((pack: Sla) => {
        const newPriceByItem = pack.prices.filter((itemIndex) => {
          const item = parseInt(Object.keys(itemIndex)[0], 10)

          return itemsIndex.includes(item)
        })

        const usedPrices = newPriceByItem.map((price) => Object.values(price))
        const mergePrices = [].concat([], ...usedPrices)
        const total = mergePrices.reduce(
          (acc: number, next: number) => acc + next,
          0
        )

        pack.price = total / 100
      })
    }

    setItemsUsed(itemsUsed.concat(itemsIndex))

    setDeliveryType(temporalPackages?.packages[index][0].deliveryChannel)
    const actualDelivery = stepPackage.filter(
      (sla: Sla) => sla.deliveryChannel === 'delivery'
    )

    const actualPickup = stepPackage.filter(
      (sla: Sla) => sla.deliveryChannel === 'pickup-in-point'
    )

    const imgUrl: string[] = []

    items.forEach((item, i) => {
      if (itemsIndex.includes(i)) {
        imgUrl.push(item.imageUrl)
      }
    })
    setActualPackage({
      imgUrl,
      delivery: actualDelivery,
      pickup: actualPickup,
      itemsIndex,
    })
    // eslint-disable-next-line vtex/prefer-early-return
    if (logisticsInfo?.length > 0) {
      const selectedSlaPackage = logisticsInfo.find((sla) => {
        const indice = itemsIndex.find((item: number) => {
          return sla.itemIndex === item
        })

        return typeof indice === 'number'
      })

      setDeliveryType(selectedSlaPackage?.selectedDeliveryChannel)

      setSelectedLogistic({
        selectedSla: selectedSlaPackage?.selectedSla,
        selectedDeliveryChannel: selectedSlaPackage?.selectedDeliveryChannel,
      })
    }

    setInfoPackages(temporalPackages)
  }, [infoPackages.step])

  return {
    infoPackages,
    deliveryType,
    actualPackage,
    setDeliveryType,
    selectedLogistic,
    setSelectedLogistic,
    setDeliveryWindow,
    setScheduleDelivery,
    setDisabled,
    handleClick,
    disabled,
    isEdit,
  }
}

export default usePackages
