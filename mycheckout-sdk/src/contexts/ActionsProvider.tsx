import React, { createContext, useContext, useReducer } from 'react'

import type {
  Address,
  ItemToAdd,
  ItemToRemove,
  ClientProfileData,
  CartSimulation,
  Settings,
  OfferingInput,
  Config,
  Product,
  ProductItem,
  Runtime,
} from '../interfaces'

interface State {
  openModal: boolean
  showLogo?: boolean
  step: number
  section: string
  addToCart: (item: ItemToAdd) => void
  itemToAdd?: ItemToAdd
  updateItems: (items: ItemToRemove[]) => void
  updateSelectedAddress: (address: Address) => void
  updateOrderFormProfile: (profile: ClientProfileData) => void
  cartSimulation: (simulationItems: CartSimulation) => void
  clearData: (items: ItemToRemove[]) => void
  fullScreen: boolean
  settings: Settings
  loadingOrder: boolean
  errorOrder: any
  insertCoupon: (text: string) => void
  addItemOffering?: (offeringInput: OfferingInput) => void
  removeItemOffering?: (offeringInput: OfferingInput) => void
  config?: Partial<Config>
  isOpenSummary?: boolean
  multipleAvailableSKUs: boolean
  onClickBehavior?: 'ensure-sku-selection'
  product?: Product
  selectedItem?: ProductItem
  handleSelectedItem?: (item: ProductItem) => void
  redirectUrl?: string
  isMobile?: boolean
  minimize: boolean
  runtime: Runtime
  styles?: any
  handleGetDocumentsClient?: (email: string) => void
}

type Action =
  | {
      type: 'SET_OPEN_MODAL'
    }
  | {
      type: 'SET_CLOSE_MODAL'
    }
  | {
      type: 'SET_NEXT_STEP'
    }
  | {
      type: 'SET_PREV_STEP'
    }
  | {
      type: 'SET_NEXT_SECTION'
      args: string
    }
  | {
      type: 'SET_SAME_SECTION'
      args: string
    }
  | {
      type: 'SET_STEP'
      args: number
    }
  | {
      type: 'SET_CLEAR_CLOSE'
    }
  | {
      type: 'SET_ITEM'
      args: ItemToAdd
    }
  | {
      type: 'SET_FULL_SCREEN'
      args: boolean
    }
  | {
      type: 'SET_SETTINGS'
      args: Settings
    }
  | {
      type: 'SET_SHOW_LOGO'
      args: boolean
    }
  | {
      type: 'SET_LOADING_ORDER'
      args: boolean
    }
  | {
      type: 'SET_ERROR_ORDER'
      args: any
    }
  | {
      type: 'SET_IS_OPEN_SUMMARY'
      args: boolean
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
      type: 'SET_IS_MOBILE'
      args: boolean
    }
  | {
      type: 'SET_MINIMIZE_MODAL'
      args: boolean
    }

type Dispatch = (action: Action) => void

interface Props {
  children: JSX.Element[] | JSX.Element
  addToCart: (item: ItemToAdd) => void
  itemToAdd?: ItemToAdd
  updateItems: (items: ItemToRemove[]) => void
  updateSelectedAddress: (address: Address) => void
  updateOrderFormProfile: (profile: ClientProfileData) => void
  cartSimulation: (simulationItems: CartSimulation) => void
  clearData: (items: ItemToRemove[]) => void
  insertCoupon?: (text: string) => void
  addItemOffering?: (offeringInput: OfferingInput) => void
  removeItemOffering?: (offeringInput: OfferingInput) => void
  config?: Partial<Config>
  multipleAvailableSKUs: boolean
  onClickBehavior?: 'ensure-sku-selection'
  product?: Product
  selectedItem?: ProductItem
  handleSelectedItem?: (item: ProductItem) => void
  runtime: Runtime
  styles?: any
  handleGetDocumentsClient?: (email: string) => void
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_OPEN_MODAL': {
      return {
        ...state,
        openModal: true,
      }
    }

    case 'SET_CLOSE_MODAL': {
      return {
        ...state,
        openModal: false,
      }
    }

    case 'SET_CLEAR_CLOSE': {
      return {
        ...state,
        openModal: false,
        step: 1,
        section: '',
      }
    }

    case 'SET_NEXT_STEP': {
      return {
        ...state,
        step: state.step + 1,
      }
    }

    case 'SET_PREV_STEP': {
      return {
        ...state,
        step: state.step - 1,
      }
    }

    case 'SET_NEXT_SECTION': {
      const { args } = action

      return {
        ...state,
        step: state.step + 1,
        section: args,
      }
    }

    case 'SET_SAME_SECTION': {
      const { args } = action

      return {
        ...state,
        step: state.step,
        section: args,
      }
    }

    case 'SET_STEP': {
      const { args } = action

      return {
        ...state,
        step: args,
      }
    }

    case 'SET_ITEM': {
      const { args } = action

      return {
        ...state,
        itemToAdd: args,
      }
    }

    case 'SET_FULL_SCREEN': {
      const { args } = action

      return {
        ...state,
        fullScreen: args,
      }
    }

    case 'SET_SETTINGS': {
      const { args } = action

      return {
        ...state,
        settings: {
          ...state.settings,
          ...args,
        },
      }
    }

    case 'SET_LOADING_ORDER': {
      const { args } = action

      return {
        ...state,
        loadingOrder: args,
      }
    }

    case 'SET_SHOW_LOGO': {
      const { args } = action

      return {
        ...state,
        showLogo: !args,
      }
    }

    case 'SET_ERROR_ORDER': {
      const { args } = action

      return {
        ...state,
        errorOrder: args,
      }
    }

    case 'SET_IS_OPEN_SUMMARY': {
      const { args } = action

      return {
        ...state,
        isOpenSummary: args,
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

    case 'SET_IS_MOBILE': {
      const { args } = action

      return {
        ...state,
        isMobile: args,
      }
    }

    case 'SET_MINIMIZE_MODAL': {
      const { args } = action

      return {
        ...state,
        minimize: args,
      }
    }

    default: {
      return state
    }
  }
}

const ActionsContext = createContext(null)
const ActionsDispatchContext = createContext<Dispatch | null>(null)

const ActionsProvider = ({
  children,
  addToCart,
  itemToAdd,
  updateItems,
  updateSelectedAddress,
  updateOrderFormProfile,
  cartSimulation,
  clearData,
  insertCoupon,
  addItemOffering,
  removeItemOffering,
  config,
  multipleAvailableSKUs,
  onClickBehavior,
  product,
  selectedItem,
  handleSelectedItem,
  runtime,
  styles,
  handleGetDocumentsClient,
}: Props) => {
  const shouldNavigateToSkuSelector =
    onClickBehavior === 'ensure-sku-selection' && multipleAvailableSKUs

  const [state, dispatch] = useReducer(reducer, {
    openModal: false,
    showLogo: true,
    loadingOrder: false,
    errorOrder: null,
    isOpenSummary: false,
    step: shouldNavigateToSkuSelector ? 0 : 1,
    section: '',
    addToCart,
    itemToAdd,
    updateItems,
    updateSelectedAddress,
    updateOrderFormProfile,
    cartSimulation,
    clearData,
    fullScreen: false,
    settings: {
      cvcRequired: true,
      cvcValid: false,
    },
    insertCoupon,
    addItemOffering,
    removeItemOffering,
    handleGetDocumentsClient,
    config,
    multipleAvailableSKUs,
    onClickBehavior,
    product,
    selectedItem,
    handleSelectedItem,
    redirectUrl: null,
    minimize: false,
    runtime,
    styles,
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
