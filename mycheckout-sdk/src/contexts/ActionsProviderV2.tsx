import React, { createContext, useContext, useReducer } from 'react'

import type {
  Address,
  ItemToAdd,
  ItemToRemove,
  ClientProfileData,
  CartSimulation,
  OfferingInput,
  Config,
  ProductItem,
  Runtime,
  ResponseValidateItem,
  IsClickToAddToCart,
  StoreTermsAndConditionsContent,
  ShowPaymentMethod,
  CounterSecond,
} from '../interfaces'

interface State {
  config?: Partial<Config> // TODO: This logic shouldn't be here
  onClickBehavior?: 'ensure-sku-selection'
  // url for Redirect Payments
  redirectUrl?: string
  // store runtime
  runtime: Runtime
  // Exito logic
  // Trigger for send event Clicks Button
  // TODO: Should exist another way to do this
  isClickAddToCart?: IsClickToAddToCart
  // This property is not being used
  isOpenModalViewUser: boolean
  // This property is not being used
  isMinimizeViewUser: boolean
  // determine if it is qa or prod
  sandbox?: boolean
  skuSelectorProps?: {
    visibleVariations?: string[]
    useImageInColor?: boolean
  }
  // This property is not being used
  isLoadingCvvField?: boolean
  // Preview Mode For the admin
  isPreview?: boolean
  // Add additional terms and conditions
  storeTermsAndConditionsContent?: StoreTermsAndConditionsContent[]
  showPaymentMethods: ShowPaymentMethod[]
  hideDiscount?: boolean
  addItemOffering?: (offeringInput: OfferingInput) => void
  addToCart: (item: ItemToAdd) => void
  cartSimulation: (simulationItems: CartSimulation) => Promise<Response>
  clearData: (items: ItemToRemove[]) => void
  handleGetDocumentsClient?: (email: string) => void
  handleSelectedItem?: (item: ProductItem) => void
  insertCoupon: (text: string) => void
  removeItemOffering?: (offeringInput: OfferingInput) => void
  updateItems: (items: ItemToRemove[]) => void
  updateOrderFormProfile: (profile: ClientProfileData) => void
  updateSelectedAddress: (address: Address) => void
  validateItems?: () => ResponseValidateItem[] | []
  secondAfterEmail?: CounterSecond
}

type Action =
  | {
      type: 'SET_ITEM'
      args: ItemToAdd
    }
  | {
      type: 'SET_SELECTED_ITEM'
      args: ProductItem
    }
  | {
      type: 'SET_REDIRECT_URL'
      args: string
    }
  | {
      type: 'SET_INITIAL_CONFIG'
      args: {
        config?: Partial<Config>
        hideDiscount?: boolean
        isPreview?: boolean
        showPaymentMethods?: ShowPaymentMethod[]
        skuSelectorProps?: {
          visibleVariations?: string[]
          useImageInColor?: boolean
        }
        storeTermsAndConditionsContent?: StoreTermsAndConditionsContent[]
        addItemOffering?: (offeringInput: OfferingInput) => void
        addToCart: (item: ItemToAdd) => void
        clearData: (items: ItemToRemove[]) => void
        handleGetDocumentsClient?: (email: string) => void
        handleSelectedItem: (item: ProductItem) => void
        insertCoupon?: (text: string) => void
        removeItemOffering?: (offeringInput: OfferingInput) => void
        updateItems: (items: ItemToRemove[]) => void
        updateOrderFormProfile: (profile: ClientProfileData) => void
        validateItems?: () => ResponseValidateItem[] | []
      }
    }
  // | {
  //     type: 'SET_VERSION'
  //     args: boolean
  //   }
  | {
      type: 'SET_IS_CLICK_ADD_TO_CART'
      args: IsClickToAddToCart
    }
  | {
      type: 'SET_IS_OPEN_MODAL_VIEW_USER'
      args: boolean
    }
  | {
      type: 'SET_IS_MINIMIZE_VIEW_USER'
      args: boolean
    }
  | {
      type: 'SET_STORE_CONFIG'
      args: Partial<Config>
    }
  | {
      type: 'SET_IS_LOADING_CVV_FIELD'
      args: boolean
    }
  | {
      type: 'SET_SHOW_PAYMENT_METHODS'
      args: ShowPaymentMethod[]
    }
  | {
      type: 'SET_SECOND'
    }
  | {
      type: 'SET_SECOND_DIRECT'
      args: number
    }
  | {
      type: 'SET_RESTART'
    }
  | {
      type: 'SET_INTERVAL_SECOND'
      args: ReturnType<typeof setInterval>
    }

type Dispatch = (action: Action) => void

interface Props {
  children: JSX.Element[] | JSX.Element
  updateSelectedAddress: (address: Address) => void
  cartSimulation: (simulationItems: CartSimulation) => Promise<Response>
  runtime: Runtime
  sandbox?: boolean
  isPreview?: boolean
}

const defaultState: State = {
  config: null as Partial<Config>,
  hideDiscount: false,
  isClickAddToCart: { isClick: false, data: null },
  isLoadingCvvField: false,
  isMinimizeViewUser: false,
  isOpenModalViewUser: false,
  isPreview: false,
  onClickBehavior: 'ensure-sku-selection',
  redirectUrl: '',
  runtime: null as Runtime,
  sandbox: false,
  showPaymentMethods: [] as ShowPaymentMethod[],
  storeTermsAndConditionsContent: [] as StoreTermsAndConditionsContent[],
  addItemOffering: () => {},
  addToCart: () => {},
  cartSimulation: null as () => Promise<Response>,
  clearData: () => {},
  handleGetDocumentsClient: () => {},
  handleSelectedItem: () => {},
  insertCoupon: () => {},
  removeItemOffering: () => {},
  updateItems: () => {},
  updateOrderFormProfile: () => {},
  updateSelectedAddress: () => {},
  validateItems: () => [],
  secondAfterEmail: {
    second: 60,
    intervalSetSecond: null,
  },
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ITEM': {
      const { args } = action

      return {
        ...state,
        itemToAdd: args,
      }
    }

    case 'SET_SELECTED_ITEM': {
      const { args } = action

      return {
        ...state,
        selectedItem: args,
      }
    }

    case 'SET_REDIRECT_URL': {
      const { args } = action

      return {
        ...state,
        redirectUrl: args,
      }
    }

    case 'SET_INITIAL_CONFIG': {
      const { args } = action

      return {
        ...state,
        config: args.config,
        hideDiscount: args.hideDiscount,
        isPreview: args?.isPreview,
        showPaymentMethods: args.showPaymentMethods,
        skuSelectorProps: args?.skuSelectorProps,
        storeTermsAndConditionsContent: args.storeTermsAndConditionsContent,
        addItemOffering: args.addItemOffering,
        addToCart: args.addToCart,
        clearData: args.clearData,
        handleGetDocumentsClient: args.handleGetDocumentsClient,
        handleSelectedItem: args.handleSelectedItem,
        insertCoupon: args.insertCoupon,
        removeItemOffering: args.removeItemOffering,
        updateItems: args.updateItems,
        updateOrderFormProfile: args.updateOrderFormProfile,
        validateItems: args.validateItems,
      }
    }

    // case 'SET_VERSION': {
    //   const { args } = action

    //   return {
    //     ...state,
    //     settings: {
    //       ...state.settings,
    //       isLiteVersion: args,
    //     },
    //   }
    // }

    case 'SET_IS_CLICK_ADD_TO_CART': {
      const { args } = action

      return {
        ...state,
        isClickAddToCart: args,
      }
    }

    case 'SET_IS_OPEN_MODAL_VIEW_USER': {
      const { args } = action

      return {
        ...state,
        isOpenModalViewUser: args,
      }
    }

    case 'SET_IS_MINIMIZE_VIEW_USER': {
      const { args } = action

      return {
        ...state,
        isMinimizeViewUser: args,
      }
    }

    case 'SET_STORE_CONFIG': {
      const { args } = action

      return {
        ...state,
        config: args,
      }
    }

    case 'SET_IS_LOADING_CVV_FIELD': {
      const { args } = action

      return {
        ...state,
        isLoadingCvvField: args,
      }
    }

    case 'SET_SHOW_PAYMENT_METHODS': {
      const { args } = action

      return {
        ...state,
        showPaymentMethods: args,
      }
    }

    case 'SET_SECOND': {
      return {
        ...state,
        secondAfterEmail: {
          ...state.secondAfterEmail,
          second: (state.secondAfterEmail.second -= 1),
        },
      }
    }

    case 'SET_SECOND_DIRECT': {
      const { args } = action

      return {
        ...state,
        secondAfterEmail: {
          ...state.secondAfterEmail,
          second: args,
        },
      }
    }

    case 'SET_RESTART': {
      return {
        ...state,
        secondAfterEmail: {
          ...state.secondAfterEmail,
          second: 60,
        },
      }
    }

    case 'SET_INTERVAL_SECOND': {
      const { args } = action

      return {
        ...state,
        secondAfterEmail: {
          ...state.secondAfterEmail,
          intervalSetSecond: args,
        },
      }
    }

    default: {
      return state
    }
  }
}

const ActionsContext = createContext(defaultState)
const ActionsDispatchContext = createContext<Dispatch | null>(null)

const ActionsProvider = ({
  children,
  updateSelectedAddress,
  cartSimulation,
  runtime,
  sandbox,
  isPreview,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    updateSelectedAddress,
    cartSimulation,
    runtime,
    sandbox,
    isPreview,
  })

  return (
    <ActionsContext.Provider value={state}>
      <ActionsDispatchContext.Provider value={dispatch}>
        {children}
      </ActionsDispatchContext.Provider>
    </ActionsContext.Provider>
  )
}

const useActions = () => {
  return useContext(ActionsContext)
}

const useActionsDispatch = (): Dispatch => {
  return useContext(ActionsDispatchContext)
}

export { ActionsProvider, useActions, useActionsDispatch }
