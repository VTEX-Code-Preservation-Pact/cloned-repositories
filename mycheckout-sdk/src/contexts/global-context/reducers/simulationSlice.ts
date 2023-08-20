import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { OrderFormSimulation } from '../../../interfaces/orderForm'
import type {
  DeliveryWindowSimulation,
  GroupPaymentMethods,
  InstallmentOptionsSimulation,
  ItemSimulation,
  LogisticInfoSimulation,
  PaymentMethodSimulation,
  Simulation,
  SimulationData,
  SimulationStatus,
  SlaSimulation,
} from '../../../interfaces/simulation'

export const orderFormSimulation = createAsyncThunk(
  'simulation/api',
  async ({
    orderForm,
    cartSimulation,
  }: {
    orderForm: OrderFormSimulation
    cartSimulation: (simulationData: SimulationData) => any
  }): Promise<Simulation> => {
    if (!orderForm.selectedAddresses.length || !orderForm.items.length) {
      return null
    }

    return (
      cartSimulation({
        items: orderForm.items.map((item) => {
          if (!item.bundleItems?.length) {
            return {
              id: item.id,
              quantity: item.quantity,
              seller: item.seller,
            }
          }

          return {
            id: item.id,
            quantity: item.quantity,
            seller: item.seller,
            bundleItems: item.bundleItems?.map((bundleItems) => {
              return {
                id: bundleItems.id,
              }
            }),
          }
        }),
        country: 'COL', // Esto deberia venir del setup de la tienda
        clientProfileData: {
          email: orderForm.email,
        },
        paymentData: {
          payments:
            orderForm.payments.length && orderForm.payments[0].paymentId
              ? orderForm.payments.map((payment) => ({
                  bin: payment.bin,
                  installments: payment.installments,
                  paymentSystem: payment.paymentId,
                }))
              : [],
        },
        shippingData: {
          logisticsInfo: orderForm.logisticsInfo.map((logisticInfo) => ({
            ...(logisticInfo.deliveryWindow
              ? {
                  selectedDeliveryWindow: {
                    startDateUtc: logisticInfo.deliveryWindow.startDateUtc,
                    endDateUtc: logisticInfo.deliveryWindow.endDateUtc,
                  },
                }
              : {}),
            addressId: logisticInfo.addressId,
            itemIndex: logisticInfo.itemIndex,
            selectedSlaId: logisticInfo.selectedSla,
            selectedDeliveryChannel: logisticInfo.selectedDeliveryChannel,
          })),
          selectedAddresses: orderForm.selectedAddresses.map((item) => ({
            ...(item.postalCode ? { postalCode: item.postalCode } : {}),
            ...(item.geoCoordinates
              ? {
                  geoCoordinates: [
                    item.geoCoordinates.longitude,
                    item.geoCoordinates.latitude,
                  ],
                }
              : {}),
            country: item.country,
            addressId: item.id,
            addressType:
              item.addressDeliveryType === 'delivery'
                ? 'residential'
                : 'search',
          })),
        },
      })
        // TODO: Este mapeo de datos se deberia hacer en el proyecto implementador (CMS, VTEX IO, etc...),
        // para asegurarnos de mantener un standard de datos dentro del SDK y no nos toque hacer if X plataforma mapear Y datos.
        .then((response: any) => response?.json())
        .then((response: any): Simulation => {
          const totals: {
            items?: number
            shipping?: number
            tax?: number
            discount?: number
          } = {}

          // TODO: Deberia haber una forma más simple de hacer estas asignaciones
          const itemTotal = response.totals.find(
            (total: { id: string }) => total.id === 'Items'
          )

          const shippingTotal = response.totals.find(
            (total: { id: string }) => total.id === 'Shipping'
          )

          const taxTotal = response.totals.find(
            (total: { id: string }) => total.id === 'Tax'
          )

          const discountTotal = response.totals.find(
            (total: { id: string }) => total.id === 'Discounts'
          )

          if (itemTotal) {
            totals.items = itemTotal.value / 100
          }

          if (shippingTotal) {
            totals.shipping = shippingTotal.value / 100
          }

          if (taxTotal) {
            totals.tax = taxTotal.value / 100
          }

          if (discountTotal) {
            totals.discount = discountTotal.value / 100
          }

          return {
            items: response.items.map(
              (item: any): ItemSimulation => ({
                id: item.id,
                requestIndex: item.requestIndex,
                quantity: item.quantity,
                seller: item.seller,
                measurementUnit: item.measurementUnit,
                unitMultiplier: item.unitMultiplier,
                sellingPrice: item.sellingPrice / 100,
                listPrice: item.listPrice / 100,
                price: item.price / 100,
                availability: item.availability,
              })
            ),
            paymentData: {
              paymentMethods: response.paymentData.paymentSystems?.map(
                (paymentSystem: any): PaymentMethodSimulation => ({
                  id: paymentSystem.stringId,
                  name: paymentSystem.name,
                  description: paymentSystem.description,
                  groupName: paymentSystem.groupName,
                  isCustom: paymentSystem.isCustom,
                  value:
                    (response.paymentData.installmentOptions.find(
                      (installmentOption: any) =>
                        installmentOption.paymentSystem ===
                        paymentSystem.stringId
                    )?.value || 0) / 100,
                  installmentsOptions: response.paymentData.installmentOptions
                    .find(
                      (installmentOption: any) =>
                        installmentOption.paymentSystem ===
                        paymentSystem.stringId
                    )
                    .installments?.map(
                      (
                        installmentOption: any
                      ): InstallmentOptionsSimulation => ({
                        count: installmentOption.count,
                        value: installmentOption.value / 100,
                      })
                    ),
                })
              ),
            },
            logisticsInfo: response.logisticsInfo.map(
              (logisticInfo: any): LogisticInfoSimulation => ({
                itemIndex: logisticInfo.itemIndex,
                addressInternalId: logisticInfo.addressId,
                selectedDeliveryChannel: logisticInfo.selectedDeliveryChannel,
                selectedSla: logisticInfo.selectedSla,
                slas: logisticInfo.slas.map(
                  (sla: any): SlaSimulation => ({
                    id: sla.id,
                    name: sla.name,
                    deliveryChannel: sla.deliveryChannel,
                    shippingEstimate: sla.shippingEstimate,
                    price: sla.price,
                    deliveryWindow: sla.deliveryWindow && {
                      startDateUtc: sla.deliveryWindow.startDateUtc,
                      endDateUtc: sla.deliveryWindow.endDateUtc,
                      lisPrice: sla.deliveryWindow.listPrice,
                      price: sla.deliveryWindow.price,
                    },
                    pickupStoreInfo:
                      (sla.pickupStoreInfo.isPickupStore && {
                        additionalInfo: sla.pickupStoreInfo.additionalInfo,
                        friendlyName: sla.pickupStoreInfo.friendlyName,
                        address: {
                          street: sla.pickupStoreInfo.address.street,
                          state: sla.pickupStoreInfo.address.state,
                          city: sla.pickupStoreInfo.address.city,
                        },
                      }) ||
                      null,
                    availableDeliveryWindow: sla.availableDeliveryWindows.map(
                      (deliveryWindow: any): DeliveryWindowSimulation => ({
                        startDateUtc: deliveryWindow.startDateUtc,
                        endDateUtc: deliveryWindow.endDateUtc,
                        lisPrice: deliveryWindow.listPrice,
                        price: deliveryWindow.price,
                      })
                    ),
                  })
                ),
              })
            ),
            totals,
            promotions:
              response.ratesAndBenefitsData?.rateAndBenefitsIdentifiers?.map(
                (promotion: { id: string; name: string }) => ({
                  id: promotion.id,
                  name: promotion.name,
                })
              ),
          }
        })
    )
  }
)

const slice = createSlice({
  name: 'simulation',
  initialState: {
    status: 'idle',
    items: [],
    paymentData: {
      paymentMethods: [],
    },
    logisticsInfo: [],
    totals: {},
    promotions: [],
  },
  reducers: {
    resetSimulation: (state) => {
      state.status = 'idle'
      state.items = []
      state.paymentData = {
        paymentMethods: [],
      }
      state.logisticsInfo = []
      state.totals = {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(orderFormSimulation.pending, (state, _) => {
        if (state.status === 'idle') {
          state.status = 'preloading'
        } else {
          state.status = 'loading'
        }
      })
      .addCase(
        orderFormSimulation.fulfilled,
        (state, action: { payload: Simulation }) => {
          if (!action.payload) {
            state.status = 'idle'

            return
          }

          if (state.status === 'loading') {
            state.status = 'succeeded'
          }

          state.items = action.payload.items
          state.logisticsInfo = action.payload.logisticsInfo
          state.paymentData.paymentMethods =
            action.payload.paymentData.paymentMethods
          state.promotions = action.payload.promotions
          state.totals = {
            items: action.payload.totals.items,
            shipping: action.payload.totals.shipping,
            tax: action.payload.totals.tax,
            discount: action.payload.totals.discount,
          }
        }
      )
      .addCase(orderFormSimulation.rejected, (state, _) => {
        state.status = 'failed'
      })
  },
})

export default slice.reducer

export const { resetSimulation } = slice.actions

export const selectSimulationLogistics = (state: { simulation: Simulation }) =>
  state.simulation.logisticsInfo

export const selectSimulationStatus = (state: {
  simulation: { status: SimulationStatus }
}) => state.simulation.status

export const selectAvailablePaymentMethods = (state: {
  simulation: Simulation
}) => state.simulation.paymentData.paymentMethods
export const selectGroupAvailablePaymentMethods = (state: {
  simulation: Simulation
  uiSettings: any
}) =>
  Object.values(
    state.simulation.paymentData.paymentMethods
      .filter((pm) =>
        state.uiSettings.settings.paymentMethod?.some(
          (settingsPM: any) =>
            settingsPM.paymentMethodName === pm.id && settingsPM.isActive
        )
      )
      .reduce((res: Record<string, GroupPaymentMethods>, current) => {
        if (res[current.groupName]) {
          res[current.groupName].paymentMethods.push({
            ...current,
          })

          return {
            ...res,
          }
        }

        return {
          ...res,
          [current.groupName]: {
            paymentMethods: [
              {
                ...current,
              },
            ],
            groupName: current.groupName,
            isCreditCard:
              // TODO: Esta logica deberia venir del proyecto implementador
              current.groupName.startsWith('creditCardPaymentGroup') ||
              current.groupName.startsWith('customPrivate'),
          },
        }
      }, {})
  ).sort((pm) => (pm.isCreditCard ? -1 : 1))

export const selectTotals = (state: { simulation: Simulation }) =>
  state.simulation.totals
export const selectTotalValue = (state: { simulation: Simulation }) =>
  (state.simulation.totals.items || 0) +
  (state.simulation.totals.shipping || 0) +
  (state.simulation.totals.tax || 0) +
  (state.simulation.totals.discount || 0)

export const selectPromotions = (state: { simulation: Simulation }) =>
  state.simulation.promotions

export const selectItems = (state: { simulation: Simulation }) =>
  state.simulation.items
