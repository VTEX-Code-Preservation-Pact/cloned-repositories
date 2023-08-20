import React, { createContext, useContext, useReducer } from 'react'

import type {
  Address,
  Item,
  Totalizer,
  OrderForm,
  ClientProfileData,
  PaymentMethod,
  LogisticsInfo,
  SlaSummary,
  Sla,
  PaymentData,
  ChangeLogistics,
  Message,
  MarketingData,
  InstallmentOption,
  RatesAndBenefitsData,
  CustomSubTotalItems,
} from '../interfaces'

interface State {
  isNew: boolean
  // user is athenticated
  loggedIn: boolean
  clientProfileData: ClientProfileData
  shippingData: ShippingData
  items: Item[]
  value: number
  totalizers: Totalizer[]
  paymentData: PaymentData
  logisticsInfo: LogisticsInfo[]
  slas: SlaSummary
  // Determine if the user is editing
  isEdit: boolean
  isNewInfo: boolean
  changeLogistics: ChangeLogistics[]
  theme: string // deprecated
  // User accept to use browser geolocation
  userLocation: boolean
  // If user go to emailForm it validate to delete cookies
  isChangeEmail: boolean
  // Store if the user accept terms
  habeasData: boolean
  storeTermsAndConditions: boolean
  customData?: unknown
  // Messages from orderForm
  messages: Message[]
  marketingData: MarketingData
  subtotalExcludePrice: SubtotalExcludePrice
  totalOfferings: number
  liteHeader: boolean // deprecated property
  isProfileDetail: boolean
  ratesAndBenefitsData: RatesAndBenefitsData
  // Exito: Show totals for bags
  customSubTotalItems?: CustomSubTotalItems[]
  itemsOrderForm: Item[]
}

interface ShippingData {
  availableAddresses?: Address[] | null
  selectedAddress?: Address | null
  address?: Address | null
  completed?: boolean
  addressAlternative?: Address | null
}

interface SubtotalExcludePrice {
  costServicePrice?: number
}

type Action =
  | {
      type: 'SET_ORDER_FORM'
      args: OrderForm
    }
  | {
      type: 'SET_EMAIL'
      args: { email: string; loadData?: boolean }
    }
  | {
      type: 'SET_USER_DATA'
      args: {
        clientProfileData: ClientProfileData
        shippingData: ShippingData
        paymentData: PaymentData
      }
    }
  | {
      type: 'SET_CLIENT_DATA'
      args: { clientProfileData: ClientProfileData }
    }
  | {
      type: 'SET_CLIENT_AND_SHIPPING_DATA'
      args: { clientProfileData: ClientProfileData; shippingData: ShippingData }
    }
  | {
      type: 'SET_SHIPPING_DATA'
      args: {
        shippingData: ShippingData
      }
    }
  | {
      type: 'SET_ADDRESS'
      args: Address
    }
  | {
      type: 'SET_SELECTED_ADDRESS'
      args: Address
    }
  | {
      type: 'SET_ITEMS'
      args: Item[]
    }
  | {
      type: 'SET_IS_NEW'
      args: { isNew: boolean }
    }
  | {
      type: 'SET_TOTALIZERS'
      args: Totalizer[]
    }
  | {
      type: 'SET_VALUE'
      args: number
    }
  | {
      type: 'SET_PAYMENT_DATA'
      args: {
        paymentData: PaymentData
      }
    }
  | {
      type: 'SET_PAYMENT_SYSTEMS'
      args: string
    }
  | {
      type: 'SET_SELECTED_PAYMENT'
      args: PaymentMethod
    }
  | {
      type: 'SET_INSTALLMENTS'
      args: InstallmentOption[]
    }
  | {
      type: 'SET_LOGISTICS_INFO'
      args: LogisticsInfo[]
    }
  | {
      type: 'SET_SLAS'
      args: SlaSummary
    }
  | {
      type: 'SET_NEW_USER'
      args: { email: string; loadData?: boolean }
    }
  | {
      type: 'SET_CHANGE_INFO'
      args: {
        isEdit: boolean
        isNewInfo: boolean
        userLocation: boolean
        isChangeEmail: boolean
      }
    }
  | {
      type: 'SET_CHANGE_LOGISTICS'
      args: ChangeLogistics[]
    }
  | {
      type: 'SET_OTHER_AVAILABLE_PAYMENTS'
      args: PaymentMethod[]
    }
  | {
      type: 'SET_THEME'
      args: string
    }
  | {
      type: 'SET_HABEAS_DATA'
      args: { habeasData: boolean }
    }
  | {
      type: 'SET_STORE_TERMS_AND_CONDITIONS'
      args: { storeTermsAndConditions: boolean }
    }
  | {
      type: 'SET_BIN'
      args: string
    }
  | {
      type: 'SET_DUES'
      args: string
    }
  | {
      type: 'SET_CUSTOM_DATA'
      args: unknown
    }
  | {
      type: 'SET_ADDRESS_ALTERNATIVE'
      args: Address
    }
  | {
      type: 'SET_OFFERINGS_PRICE'
      args: number
    }
  | {
      type: 'SET_LITEVIEW_HEADER'
      args: boolean
    }
  | {
      type: 'SET_PROFILE_DETAIL'
      args: boolean
    }
  | {
      type: 'SET_BENEFITS'
      args: {
        items: Item[]
        ratesAndBenefitsData: RatesAndBenefitsData
      }
    }
  | {
      type: 'SET_LOADING_PAYMENT'
      args: boolean
    }
  | {
      type: 'SET_TEMPORAL_PAYMENT_SYSTEM'
      args: string
    }
  | {
      type: 'SET_AVAILABLE_PAYMENT'
      args: {
        paymentData: {
          availablePaymentMethods?: PaymentMethod[] | null
        }
      }
    }
  | {
      type: 'SET_CUSTOM_SUBTOTAL_ITEMS'
      args: {
        customSubTotalItems: CustomSubTotalItems[] | null
      }
    }

type Dispatch = (action: Action) => void

interface Props {
  children: JSX.Element[] | JSX.Element
}

const defaultState: State = {
  isNew: true,
  loggedIn: false,
  clientProfileData: {
    id: '',
    firstName: '',
    lastName: '',
    documentType: '',
    document: '',
    email: '',
    phone: '',
    completed: false,
  },
  shippingData: {
    availableAddresses: null as Address[],
    selectedAddress: null as Address,
    address: null as Address,
    completed: false,
    addressAlternative: null as Address,
  },
  items: [] as Item[],
  value: 0,
  totalizers: [] as Totalizer[],
  paymentData: {
    availablePaymentMethods: null as PaymentMethod[],
    selectedPaymentMethod: null as PaymentMethod,
    paymentMethod: null as PaymentMethod,
    completed: false,
    bin: null as string,
    installmentOptions: [] as InstallmentOption[],
  },
  logisticsInfo: [] as LogisticsInfo[],
  slas: {
    delivery: [] as Sla[],
    'pickup-in-point': [] as Sla[],
    packages: [] as ChangeLogistics[],
  },
  isEdit: false,
  isNewInfo: false,
  userLocation: false,
  isChangeEmail: false,
  changeLogistics: [] as ChangeLogistics[],
  theme: '',
  habeasData: false,
  storeTermsAndConditions: false,
  messages: [] as Message[],
  marketingData: null as MarketingData,
  customData: null,
  subtotalExcludePrice: {
    costServicePrice: 0,
  },
  totalOfferings: 0,
  liteHeader: false,
  isProfileDetail: false,
  ratesAndBenefitsData: {} as RatesAndBenefitsData,
  customSubTotalItems: [],
  itemsOrderForm: [],
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ORDER_FORM': {
      const { args } = action

      return {
        ...state,
        clientProfileData: {
          ...state.clientProfileData,
          ...args.clientProfileData,
        },
        shippingData: {
          ...state.shippingData,
          address: {
            ...state.shippingData.address,
            ...args.shippingData?.selectedAddress,
          },
          // selectedAddress: {
          //   ...state.shippingData.selectedAddress,
          //   ...args.shippingData?.selectedAddress,
          // },
        },
        items: args.items,
        totalizers: args.totalizers,
        value: args.value,
        paymentData: {
          ...state.paymentData,
          ...args.paymentData,
          availablePaymentMethods: [
            ...(state?.paymentData?.availablePaymentMethods || []),
            // ...(args?.paymentData?.availablePaymentMethods || []),
          ],
        },
        messages: args.messages,
        marketingData: args.marketingData,
        ratesAndBenefitsData: args.ratesAndBenefitsData,
        logisticsInfo: args.logisticsInfo,
      }
    }

    case 'SET_EMAIL': {
      const { args } = action

      return {
        ...state,
        clientProfileData: {
          ...state.clientProfileData,
          ...args,
        },
      }
    }

    case 'SET_USER_DATA': {
      const { args } = action

      return {
        ...state,
        clientProfileData: {
          ...state.clientProfileData,
          ...args.clientProfileData,
        },
        shippingData: {
          ...state.shippingData,
          ...args.shippingData,
        },
        paymentData: {
          ...state.paymentData,
          ...args.paymentData,
          availablePaymentMethods: [
            ...(state.paymentData.otherAvailablePaymentMethods
              ? state.paymentData.otherAvailablePaymentMethods
              : []),
            ...(args.paymentData.availablePaymentMethods
              ? args.paymentData.availablePaymentMethods
              : []),
          ],
        },
      }
    }

    case 'SET_CLIENT_DATA': {
      const { args } = action

      return {
        ...state,
        clientProfileData: {
          ...state.clientProfileData,
          ...args.clientProfileData,
        },
      }
    }

    case 'SET_CLIENT_AND_SHIPPING_DATA': {
      const { args } = action

      return {
        ...state,
        clientProfileData: {
          ...state.clientProfileData,
          ...args.clientProfileData,
        },
        shippingData: {
          ...state.shippingData,
          ...args.shippingData,
        },
      }
    }

    case 'SET_SHIPPING_DATA': {
      const { args } = action

      return {
        ...state,
        shippingData: {
          ...state.shippingData,
          ...args.shippingData,
        },
      }
    }

    case 'SET_ADDRESS': {
      const { args } = action

      return {
        ...state,
        shippingData: {
          ...state.shippingData,
          address: {
            ...state.shippingData.address,
            ...args,
          },
        },
      }
    }

    case 'SET_SELECTED_ADDRESS': {
      const { args } = action

      return {
        ...state,
        shippingData: {
          ...state.shippingData,
          address: state.shippingData.selectedAddress,
          selectedAddress: args
            ? {
                ...state.shippingData.selectedAddress,
                ...args,
              }
            : null,
          completed: true,
        },
      }
    }

    case 'SET_ADDRESS_ALTERNATIVE': {
      const { args } = action

      return {
        ...state,
        shippingData: {
          ...state.shippingData,
          addressAlternative: args
            ? {
                ...state.shippingData.addressAlternative,
                ...args,
                geoCoordinates: args.geoCoordinates
                  ? {
                      latitude:
                        args?.geoCoordinates?.latitude?.toString() || '',
                      longitude:
                        args?.geoCoordinates?.longitude?.toString() || '',
                    }
                  : null,
              }
            : null,
        },
      }
    }

    case 'SET_ITEMS': {
      const { args } = action

      return {
        ...state,
        itemsOrderForm: args,
      }
    }

    case 'SET_BENEFITS': {
      const { args } = action

      return {
        ...state,
        items: args.items,
        ratesAndBenefitsData: args.ratesAndBenefitsData,
      }
    }

    case 'SET_IS_NEW': {
      const { args } = action

      return {
        ...state,
        isNew: args.isNew,
      }
    }

    case 'SET_TOTALIZERS': {
      const { args } = action

      return {
        ...state,
        totalizers: args,
      }
    }

    case 'SET_VALUE': {
      const { args } = action

      return {
        ...state,
        value: args,
      }
    }

    case 'SET_PAYMENT_DATA': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          ...args.paymentData,
          availablePaymentMethods: [
            // Se quita la funcionalidad hasta que se encuentre una solución a las tarjetas duplicadas
            // ...(state.paymentData.otherAvailablePaymentMethods
            //   ? state.paymentData.otherAvailablePaymentMethods
            //   : []),
            ...(args.paymentData.availablePaymentMethods
              ? args.paymentData.availablePaymentMethods
              : []),
          ],
        },
      }
    }

    case 'SET_PAYMENT_SYSTEMS': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          paymentSystems: args,
        },
      }
    }

    case 'SET_AVAILABLE_PAYMENT': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          availablePaymentMethods: args.paymentData.availablePaymentMethods,
        },
      }
    }

    case 'SET_SELECTED_PAYMENT': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          selectedPaymentMethod: {
            ...state.paymentData.selectedPaymentMethod,
            ...args,
          },
          completed: true,
        },
      }
    }

    case 'SET_INSTALLMENTS': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          installmentOptions: args,
        },
      }
    }

    case 'SET_LOGISTICS_INFO': {
      const { args } = action

      return {
        ...state,
        logisticsInfo: args,
      }
    }

    case 'SET_SLAS': {
      const { args } = action

      return {
        ...state,
        slas: args,
      }
    }

    case 'SET_NEW_USER': {
      const { args } = action

      return {
        ...state,
        isNew: true,
        clientProfileData: {
          ...args,
          id: '',
          firstName: '',
          lastName: '',
          documentType: '',
          document: '',
          phone: '',
          completed: false,
        },
        shippingData: {
          availableAddresses: null,
          selectedAddress: null,
          address: null,
          completed: false,
          addressAlternative: { ...state.shippingData.addressAlternative },
        },
        paymentData: {
          availablePaymentMethods: null,
          selectedPaymentMethod: null,
          paymentMethod: null,
          completed: false,
        },
      }
    }

    case 'SET_CHANGE_INFO': {
      const { args } = action

      return {
        ...state,
        isEdit: args.isEdit,
        isNewInfo: args.isNewInfo,
        userLocation: args.userLocation,
        isChangeEmail: args.isChangeEmail,
      }
    }

    case 'SET_CHANGE_LOGISTICS': {
      const { args } = action

      return {
        ...state,
        changeLogistics: args,
      }
    }

    case 'SET_OTHER_AVAILABLE_PAYMENTS': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          otherAvailablePaymentMethods: args,
        },
      }
    }

    case 'SET_THEME': {
      const { args } = action

      return {
        ...state,
        theme: args,
      }
    }

    case 'SET_CUSTOM_DATA': {
      const { args } = action

      return {
        ...state,
        customData: args,
      }
    }

    case 'SET_HABEAS_DATA': {
      const { args } = action

      return {
        ...state,
        habeasData: args.habeasData,
      }
    }

    case 'SET_STORE_TERMS_AND_CONDITIONS': {
      const { args } = action

      return {
        ...state,
        storeTermsAndConditions: args.storeTermsAndConditions,
      }
    }

    case 'SET_BIN': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          bin: args,
        },
      }
    }

    case 'SET_DUES': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          dues: args,
        },
      }
    }

    case 'SET_OFFERINGS_PRICE': {
      const { args } = action

      return {
        ...state,
        totalOfferings: args,
      }
    }

    case 'SET_LITEVIEW_HEADER': {
      const { args } = action

      return {
        ...state,
        liteHeader: args,
      }
    }

    case 'SET_PROFILE_DETAIL': {
      const { args } = action

      return {
        ...state,
        isProfileDetail: args,
      }
    }

    case 'SET_LOADING_PAYMENT': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          loadingPayment: args,
        },
      }
    }

    case 'SET_TEMPORAL_PAYMENT_SYSTEM': {
      const { args } = action

      return {
        ...state,
        paymentData: {
          ...state.paymentData,
          temporalPaymentSystem: args,
        },
      }
    }

    case 'SET_CUSTOM_SUBTOTAL_ITEMS': {
      const { args } = action

      return {
        ...state,
        customSubTotalItems: args.customSubTotalItems,
      }
    }

    default: {
      return state
    }
  }
}

const UserDataContext = createContext(defaultState)
const UserDataDispatchContext = createContext<Dispatch | null>(null)

const UserDataProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <UserDataContext.Provider value={state}>
      <UserDataDispatchContext.Provider value={dispatch}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  )
}

const useUserData = () => {
  return useContext(UserDataContext)
}

const useUserDataDispatch = (): Dispatch => {
  return useContext(UserDataDispatchContext)
}

export { UserDataProvider, useUserData, useUserDataDispatch }
