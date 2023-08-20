import { createSlice } from '@reduxjs/toolkit'

import type {
  AddressMC,
  ItemMC,
  LogisticInfo,
  OrderFormMC,
  PackageSummaryMC,
  Payment,
  PaymentsMC,
  ProfileMC,
  ShippingMC,
} from '../../../interfaces/orderForm'
import type { Simulation } from '../../../interfaces/simulation'

const DEFAULT_STATE: OrderFormMC = {
  items: [],
  payments: {
    payment: [],
    availableCards: [],
    selectedCard: null,
  },
  profile: {
    email: null,
    name: null,
    lastname: null,
    phoneCode: null,
    phone: null,
    document: null,
    documentType: null,
    habeasData: false,
  },
  shipping: {
    address: null,
    selectedAddresses: [],
    availableAddresses: [],
    logisticInfo: [],
  },
  canEdit: true,
  isLoggedIn: false,
  status: 'idle',
  acceptHabeasData: false,
}

const slice = createSlice({
  name: 'orderForm',
  initialState: DEFAULT_STATE,
  reducers: {
    setEmail: (state, action: { payload: string }) => {
      state.profile.email = action.payload
    },
    setItems: (state, action) => {
      state.items = action.payload
    },
    setProfile: (state, action: { payload: ProfileMC }) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      }
    },
    setAddressStore: (state, action: { payload: AddressMC }) => {
      if (state.shipping.selectedAddresses.length) return

      if (action.payload.id === null) {
        const id = Math.floor(Math.random() * 10)

        action.payload.id = id.toString()
      }
      // if (state.shipping.selectedAddresses.length) {
      //   // Busca el indice de la dirección, si hay.
      //   const addressIndex = state.shipping.selectedAddresses.findIndex(
      //     (address: AddressMC) =>
      //       address.addressDeliveryType === action.payload.addressDeliveryType
      //   )

      //   if (addressIndex === -1) {
      //     state.shipping.selectedAddresses.push(action.payload)
      //   } else {
      //     state.shipping.selectedAddresses[addressIndex] = {
      //       ...action.payload,
      //       id: state.shipping.selectedAddresses[addressIndex].id
      //         ? state.shipping.selectedAddresses[addressIndex].id
      //         : action.payload.id,
      //     }
      //   }

      //   return
      // }

      state.shipping.selectedAddresses.push(action.payload)
    },
    setAddressDelivery: (state, action: { payload: AddressMC }) => {
      state.shipping.address = {
        ...action.payload,
        addressDeliveryType: 'delivery',
      }

      if (state.shipping.selectedAddresses.length) {
        // Busca el indice de la dirección de domicilio, si hay.
        const deliveryIndex = state.shipping.selectedAddresses.findIndex(
          (address: AddressMC) =>
            address.addressDeliveryType === action.payload.addressDeliveryType
        )

        if (deliveryIndex === -1) {
          state.shipping.selectedAddresses.push(action.payload)
        } else {
          state.shipping.selectedAddresses[deliveryIndex] = {
            ...state.shipping.selectedAddresses[deliveryIndex],
            ...action.payload,
          }
        }

        state.shipping.logisticInfo = state.shipping.logisticInfo.map(
          (logistic) => ({
            ...logistic,
            addressId:
              state.shipping.selectedAddresses.length > 1 && !logistic.addressId
                ? action.payload.id
                : logistic.addressId,
          })
        )

        if (state.shipping.availableAddresses.length) {
          const addressIndex = state.shipping.availableAddresses.findIndex(
            (address: AddressMC) => address.id === action.payload.id
          )

          // Actualiza direccion existente
          if (addressIndex === -1) {
            state.shipping.availableAddresses.push(action.payload)

            return
          }

          state.shipping.availableAddresses[addressIndex] = action.payload
        } else {
          state.shipping.availableAddresses.push(action.payload)
        }

        return
      }

      // Usuario sin direcciones
      state.shipping.selectedAddresses.push(action.payload)
      state.shipping.availableAddresses.push(action.payload)
    },
    setUpdateAddresses: (
      state,
      action: {
        payload: {
          selectedAddress?: AddressMC
          availableAddresses?: AddressMC[]
        }
      }
    ) => {
      if (action.payload.availableAddresses) {
        state.shipping.availableAddresses = action.payload.availableAddresses
      }

      if (action.payload.selectedAddress) {
        state.shipping.address = action.payload.selectedAddress
        if (state.shipping.selectedAddresses.length) {
          // Busca el indice de la dirección de domicilio, si hay.

          const deliveryIndex = state.shipping.selectedAddresses.findIndex(
            (address: AddressMC) =>
              address.addressDeliveryType ===
              action.payload.selectedAddress.addressDeliveryType
          )

          if (deliveryIndex === -1) {
            // No tiene direcciones seleccionadas
            state.shipping.selectedAddresses.push(
              action.payload.selectedAddress
            )
          } else {
            state.shipping.selectedAddresses[deliveryIndex] =
              action.payload.selectedAddress
          }

          state.shipping.logisticInfo = []
        } else {
          state.shipping.selectedAddresses.push(action.payload.selectedAddress)
        }
      }
    },
    setLogisticsInfo: (state, action: { payload: LogisticInfo[] }) => {
      state.shipping.logisticInfo = action.payload
    },
    setRestorePayment: (state, action: { payload: { paymentId: string } }) => {
      // Si el usuario ya existente regresa en el flujo cuando va a pagar con un nuevo medio de pago,
      // vuelve a seleccionar la ultima tarjeta seleccionada
      if (state.payments.selectedCard) {
        state.payments.payment = [
          {
            ...state.payments.selectedCard,
            paymentMethod: 'tc',
            installments: 1,
            paymentId: action.payload.paymentId,
          },
        ]
      } else {
        state.payments.payment = []
      }
    },
    setCardInfo: (state, action: { payload: Payment }) => {
      state.payments.payment[0] = {
        ...(state.payments.payment[0] || {}),
        ...action.payload,
      }
    },
    setPaymetId: (state, action: { payload: string }) => {
      state.payments.payment[0] = {
        paymentId: action.payload,
        installments: 1,
      }
    },
    setCardBin: (state, action: { payload: string }) => {
      state.payments.payment[0] = {
        ...(state.payments.payment[0] || {}),
        bin: action.payload,
      }
    },
    setInstallments: (state, action: { payload: number }) => {
      state.payments.payment[0] = {
        ...(state.payments.payment[0] || {}),
        installments: action.payload,
      }
    },
    setUserInfo: (
      state,
      action: {
        payload: {
          profile: ProfileMC
          shipping?: ShippingMC
          payments?: PaymentsMC
        }
      }
    ) => {
      state.profile = {
        ...state.profile,
        ...action.payload.profile,
      }

      state.shipping = {
        ...state.shipping,
        ...action.payload.shipping,
        selectedAddresses: action.payload.shipping.selectedAddresses.length
          ? action.payload.shipping.selectedAddresses
          : state.shipping.selectedAddresses,
      }

      if (action.payload.payments.selectedCard) {
        state.payments = {
          ...state.payments,
          ...action.payload.payments,
        }
      }

      state.status = 'complete'

      // TODO: Queda pendiente llenar la información de shipping y payment
    },
    setIsLoggedIn: (state, action: { payload: boolean }) => {
      state.isLoggedIn = action.payload
      state.canEdit = action.payload || state.canEdit
    },
    setNewOrderform: (
      state,
      action: { payload: { noDeleteEmail: boolean } }
    ) => {
      state.payments = {
        payment: [],
        availableCards: [],
        selectedCard: null,
      }

      state.profile = {
        email: action.payload?.noDeleteEmail ? state.profile.email : null,
        name: null,
        lastname: null,
        phoneCode: null,
        phone: null,
        document: null,
        documentType: null,
        habeasData: false,
      }

      state.shipping = {
        address: null,
        selectedAddresses: [],
        availableAddresses: [],
        logisticInfo: [],
      }
      state.canEdit = true
      state.isLoggedIn = false
      state.status = 'idle'
    },
    setOrderformStatus: (
      state,
      action: { payload: 'idle' | 'incomplete' | 'complete' }
    ) => {
      state.status = action.payload
    },
    setHabeasData: (state, action: { payload: boolean }) => {
      state.profile = {
        ...state.profile,
        habeasData: action.payload,
      }
    },
    setPayments: (state, action: { payload: PaymentsMC }) => {
      state.payments = {
        ...state.payments,
        ...action.payload,
      }
    },
    setAcceptHabeasData: (state, action: { payload: boolean }) => {
      state.acceptHabeasData = action.payload
    },

    setPaymentsOrderForm: (state, action: { payload: PaymentsMC }) => {
      state.payments = {
        ...state.payments,
        ...action.payload,
      }
    },
  },
})

export const {
  setAcceptHabeasData,
  setAddressDelivery,
  setAddressStore,
  setCardBin,
  setCardInfo,
  setEmail,
  setHabeasData,
  setInstallments,
  setIsLoggedIn,
  setItems,
  setLogisticsInfo,
  setNewOrderform,
  setOrderformStatus,
  setPayments,
  setPaymentsOrderForm,
  setPaymetId,
  setProfile,
  setRestorePayment,
  setUpdateAddresses,
  setUserInfo,
} = slice.actions

export default slice.reducer

export const selectProfile = (state: any): ProfileMC => state.orderForm.profile
// check if all fields in profile are different from null or empty
export const selectIsProfileComplete = (state: any): boolean =>
  Object.values(state.orderForm.profile).every(
    (value) => !!value || (typeof value === 'boolean' && value !== undefined)
  )
export const selectAddressStore = (state: {
  orderForm: OrderFormMC
}): AddressMC =>
  state.orderForm?.shipping?.selectedAddresses?.find(
    (selectedAddress) =>
      selectedAddress?.id !== state.orderForm?.shipping?.address?.id ||
      selectedAddress?.selectedSlaId
  )
export const selectShipping = (state: { orderForm: OrderFormMC }): ShippingMC =>
  state.orderForm.shipping
export const selectHasAddress = (state: { orderForm: OrderFormMC }): boolean =>
  !!state.orderForm.shipping.address ||
  !!state.orderForm.shipping.selectedAddresses.length
export const selectLogisticsInfo = (state: { orderForm: OrderFormMC }) =>
  state.orderForm.shipping.logisticInfo

export const selectDeliveryAddress = (state: { orderForm: OrderFormMC }) =>
  state.orderForm.shipping.selectedAddresses.find(
    (address) => address.addressDeliveryType === 'delivery'
  )
export const selectPickUpPointAddress = (state: { orderForm: OrderFormMC }) =>
  state.orderForm.shipping.selectedAddresses.find(
    (address) => address.addressDeliveryType === 'pickup'
  )
export const selectPackages = (state: {
  orderForm: OrderFormMC
}): PackageSummaryMC[] => {
  const packagesHashMap: Record<string, PackageSummaryMC> =
    state.orderForm.shipping.logisticInfo.reduce((res, current) => {
      return {
        ...res,
        [current.selectedSla]: {
          deliveryChannel: current.selectedDeliveryChannel,
          deliveryId: current.selectedSla,
          storeName: current.storeName,
          selectedShippingEstimate: current.selectedShippingEstimate,
        },
      }
    }, {})

  return Object.values(packagesHashMap).map((el, index) => ({
    ...el,
    packageCount: index + 1,
  }))
}

export const selectEmptyCart = (state: { orderForm: OrderFormMC }) =>
  !state.orderForm.items.length
export const selectItems = (state: {
  orderForm: OrderFormMC
  simulation: Simulation
}): ItemMC[] => {
  return state.orderForm?.items?.map((item) => {
    const simulationItem = state.simulation?.items?.find(
      (itemUpdated) => itemUpdated.id === item.id
    )

    return {
      ...item,
      availability: simulationItem?.availability || 'available',
      price: simulationItem?.price || item.price,
      sellingPrice: simulationItem?.sellingPrice || item.sellingPrice,
    }
  })
}

export const selectMainPayment = (state: { orderForm: OrderFormMC }) =>
  state.orderForm.payments.payment.length
    ? state.orderForm.payments.payment[0]
    : null

export const selectOrderFormStatus = (state: { orderForm: OrderFormMC }) =>
  state.orderForm.status
export const selectIsNew = (state: { orderForm: OrderFormMC }) =>
  state.orderForm.status === 'incomplete'
export const selectOrderForm = (state: any): OrderFormMC => state.orderForm

export const selectAcceptHabeasData = (state: any) => state.acceptHabeasData

export const selectPayment = (state: any) => state.orderForm.payments
