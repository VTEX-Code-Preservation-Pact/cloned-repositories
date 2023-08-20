/* eslint-disable vtex/prefer-early-return */
import { useEffect, useState } from 'react'
import _ from 'lodash'

import { useUserData, useUserDataDispatch } from '../contexts/UserDataProvider'
import { useActions } from '../contexts/ActionsProviderV2'
import type { LogisticsInfo, CartSimulation, Item } from '../interfaces'
import constants from '../utils/constants'
import {
  defaultPackages,
  slasSummary,
  totalShipping,
} from '../utils/simulation'

export const useSimulation = () => {
  const {
    items,
    shippingData,
    logisticsInfo,
    totalizers,
    changeLogistics,
    slas,
    marketingData,
    paymentData,
    clientProfileData,
    ratesAndBenefitsData,
  } = useUserData()

  const [oldDataCartSimulation, setOldDataCartSimulation] = useState<any>({})
  const [payment, setPayment] = useState({})

  const { cartSimulation } = useActions()
  const dispatchUserData = useUserDataDispatch()

  const simulationItems = (newItems: Item[], resultItems: any[]): any[] => {
    return newItems.map((item: Item, index: number) => {
      if (!resultItems?.[index]) return item
      const { availability, price, sellingPrice, priceTags }: any = resultItems
        ? resultItems?.[index]
        : false

      const newPriceTags = priceTags?.map((priceTag: any) => {
        const lastPriceTag = item.priceTags?.find(
          (lastTag: any) =>
            priceTag?.name?.includes(lastTag?.identifier) ||
            lastTag?.name === priceTag?.name
        )

        return {
          ...priceTag,
          identifier: lastPriceTag?.identifier || priceTag?.identifier,
        }
      })

      return {
        ...item,
        availability,
        price: price / 100,
        sellingPrice: sellingPrice / 100,
        priceTags: newPriceTags,
      }
    })
  }

  // Valida segundo metodo de entrega
  const validateSecondMethod = (data: any) => {
    cartSimulation(data)
      .then((response: any) => response?.json())
      .then((result: CartSimulation) => {
        const resultItems = simulationItems(data?.items, result?.items)
        const newItems = items.map((item: Item) => {
          const dataFind = resultItems.find((simItem) => simItem.id === item.id)

          return dataFind || item
        })

        dispatchUserData({
          type: 'SET_BENEFITS',
          args: {
            items: newItems,
            ratesAndBenefitsData,
          },
        })
      })
  }

  useEffect(() => {
    let updateWhenChangeItems = false
    let simulationLogistics: LogisticsInfo[] = []

    if (
      (shippingData.selectedAddress &&
        Object.prototype.hasOwnProperty.call(
          shippingData.selectedAddress,
          'street'
        )) ||
      (shippingData?.addressAlternative &&
        shippingData?.addressAlternative?.addressType !== 'residential') ||
      clientProfileData?.completed
    ) {
      const orderItems = items
        ?.map((item: Item) => {
          return {
            id: item.id,
            seller: item.seller,
            quantity: item.quantity,
          }
        })
        .filter(
          (item, i) =>
            items.findIndex((searchItem) => searchItem.id === item.id) === i
        )

      if (items.length <= logisticsInfo?.length) {
        simulationLogistics = logisticsInfo?.map((item: LogisticsInfo) => {
          return {
            ...item,
            selectedSlaId: item.selectedSla,
            selectedDeliveryWindow: item.deliveryWindow,
          }
        })
      } else {
        updateWhenChangeItems = true
      }

      const { selectedAddress } = shippingData
      let newGeoCoordinates: string[] = []

      if (selectedAddress?.geoCoordinates) {
        const {
          geoCoordinates: { longitude, latitude },
        } = selectedAddress

        if (longitude !== '' && latitude !== '') {
          newGeoCoordinates = [longitude, latitude]
        } else if (
          shippingData?.addressAlternative &&
          shippingData?.addressAlternative?.addressType === 'residential'
        ) {
          const { geoCoordinates } = shippingData?.addressAlternative

          if (
            geoCoordinates?.longitude !== '' &&
            geoCoordinates?.latitude !== ''
          ) {
            newGeoCoordinates = [
              geoCoordinates?.longitude,
              geoCoordinates?.latitude,
            ]
          }
        }
      }

      const dataCartSimulation: any = {
        items: orderItems,
        postalCode: shippingData.selectedAddress?.postalCode,
        country: constants.countryCode,
        geoCoordinates: newGeoCoordinates,
        clientProfileData: {
          email: clientProfileData?.email,
        },
        shippingData: {
          logisticsInfo: simulationLogistics,
        },
        marketingData: marketingData?.coupon ? marketingData : null,
      }

      if (
        shippingData?.addressAlternative &&
        shippingData?.addressAlternative?.addressType !== 'residential'
      ) {
        const { addressAlternative } = shippingData

        dataCartSimulation.postalCode = addressAlternative?.postalCode
        if (Object.keys(addressAlternative?.geoCoordinates).length !== 0) {
          const {
            geoCoordinates: { longitude, latitude },
          } = addressAlternative

          if (longitude !== '' && latitude !== '') {
            dataCartSimulation.geoCoordinates = [longitude, latitude]
          }
        }
      }

      if (
        paymentData?.selectedPaymentMethod?.paymentSystem ||
        paymentData?.selectedPaymentMethod?.paymentMethod ||
        paymentData?.temporalPaymentSystem
      ) {
        dataCartSimulation.paymentData = {
          payments: [
            {
              bin: paymentData.bin
                ? paymentData.bin
                : paymentData?.selectedPaymentMethod?.bin,
              paymentSystem: paymentData?.temporalPaymentSystem
                ? paymentData?.temporalPaymentSystem
                : paymentData?.selectedPaymentMethod?.paymentSystem
                ? paymentData?.selectedPaymentMethod?.paymentSystem
                : paymentData?.selectedPaymentMethod?.paymentMethod,
            },
          ],
        }
      }

      const simulationObjectIsEqual = _.isEqual(
        dataCartSimulation,
        oldDataCartSimulation
      )

      if (!simulationObjectIsEqual) {
        setOldDataCartSimulation(dataCartSimulation)
        cartSimulation(dataCartSimulation)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((response: any) => response?.json())
          .then((result: CartSimulation) => {
            const slaSummary = slasSummary(result?.logisticsInfo)

            let logistictsInfo
            const resultItems = simulationItems(items, result?.items)

            dispatchUserData({
              type: 'SET_ITEMS',
              args: resultItems,
            })

            setPayment(result?.paymentData)

            dispatchUserData({
              type: 'SET_BENEFITS',
              args: {
                items: resultItems,
                ratesAndBenefitsData: result.ratesAndBenefitsData,
              },
            })

            if (slas.dontUpdateLogistics) {
              logistictsInfo = logisticsInfo
            } else {
              logistictsInfo = defaultPackages(
                slaSummary,
                resultItems,
                shippingData?.addressAlternative
              )
            }

            const totalizersArgs =
              result?.totals?.length > 0 ? result?.totals : totalizers

            const total = totalShipping(totalizersArgs)

            dispatchUserData({
              type: 'SET_VALUE',
              args: total / 100,
            })
            dispatchUserData({
              type: 'SET_TOTALIZERS',
              args: totalizersArgs,
            })
            dispatchUserData({
              type: 'SET_SLAS',
              args: {
                ...slaSummary,
                packages: slas.packages,
                dontUpdateLogistics: false,
                updateWhenChangeItems,
              },
            })
            dispatchUserData({
              type: 'SET_LOGISTICS_INFO',
              args: logistictsInfo,
            })
            dispatchUserData({
              type: 'SET_INSTALLMENTS',
              args: result?.paymentData?.installmentOptions || [],
            })

            if (shippingData?.addressAlternative) {
              if (
                shippingData?.addressAlternative?.addressType === 'search' &&
                logistictsInfo.some(
                  (x) => x.selectedDeliveryChannel === 'delivery'
                ) &&
                shippingData?.selectedAddress &&
                Object.keys(shippingData?.selectedAddress).length !== 0
              ) {
                const logisticsDelivery = logistictsInfo.filter(
                  (x) => x.selectedDeliveryChannel === 'delivery'
                )

                const productsDelivery: any[] = []

                logisticsDelivery.forEach((logistic: any) => {
                  if (resultItems?.[logistic?.itemIndex]) {
                    productsDelivery.push(resultItems?.[logistic?.itemIndex])
                  }
                })

                const dataToSimulate = {
                  items: productsDelivery,
                  postalCode: shippingData.selectedAddress?.postalCode,
                  country: constants.countryCode,
                  geoCoordinates: newGeoCoordinates,
                  clientProfileData: {
                    email: clientProfileData?.email,
                  },
                  shippingData: {
                    logisticsInfo: logisticsDelivery,
                  },
                  marketingData: marketingData?.coupon ? marketingData : null,
                }

                validateSecondMethod(dataToSimulate)
              }
            }
          })
      }
    }
  }, [
    shippingData,
    changeLogistics,
    paymentData?.selectedPaymentMethod?.bin,
    paymentData?.bin,
    paymentData?.temporalPaymentSystem,
    clientProfileData?.completed,
  ])

  const paymentInfo = {
    paymentData: payment || paymentData.selectedPaymentMethod,
    paymentDataSimulation: payment,
  }

  return { logisticsInfo, paymentInfo }
}
