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
}

const addToCart = (_item: ItemToAdd) => {}

const itemToAdd = {
  id: 1,
  quantity: 1,
  seller: '1',
}

const updateItems = (_items: ItemToRemove[]) => {}

const updateSelectedAddress = (_address: Address) => {}

const updateOrderFormProfile = (_rofile: ClientProfileData) => {}

const cartSimulation = (_simulationItems: CartSimulation) => {}

const clearData = (_items: ItemToRemove[]) => {}

const insertCoupon = (_text: string) => {}

const addItemOffering = (_offeringInput: OfferingInput) => {}

const removeItemOffering = (_offeringInput: OfferingInput) => {}

const config = {}

const multipleAvailableSKUs = false

const onClickBehavior = 'ensure-sku-selection'

const product: Product = {
  items: [
    {
      itemId: '330',
      name: 'Talla S - Color Blanca',
      variations: [
        {
          name: 'Color',
          values: ['Blanca'],
        },
        {
          name: 'Talla',
          values: ['S'],
        },
      ],
      images: [
        {
          imageId: '158947',
          imageLabel: '',
          imageTag:
            '<img src="~/arquivos/ids/158947-#width#-#height#/98-Indonesia-Blanca-1.jpg?v=637463442999900000" width="#width#" height="#height#" alt="98-Indonesia-Blanca-1" id="" />',
          imageUrl:
            'https://amalia.vtexassets.com/arquivos/ids/158947/98-Indonesia-Blanca-1.jpg?v=637463442999900000',
          imageText: '98-Indonesia-Blanca-1',
        },
        {
          imageId: '158948',
          imageLabel: '',
          imageTag:
            '<img src="~/arquivos/ids/158948-#width#-#height#/98-Indonesia-Blanca-2.jpg?v=637463443002370000" width="#width#" height="#height#" alt="98-Indonesia-Blanca-2" id="" />',
          imageUrl:
            'https://amalia.vtexassets.com/arquivos/ids/158948/98-Indonesia-Blanca-2.jpg?v=637463443002370000',
          imageText: '98-Indonesia-Blanca-2',
        },
      ],
      sellers: [
        {
          sellerDefault: true,
          commertialOffer: {
            Price: 71000,
            ListPrice: 71000,
            AvailableQuantity: 0,
          },
        },
      ],
    },
    {
      itemId: '331',
      name: 'Talla M - Color Blanca',
      variations: [
        {
          name: 'Color',
          values: ['Blanca'],
        },
        {
          name: 'Talla',
          values: ['M'],
        },
      ],
      images: [
        {
          imageId: '158943',
          imageLabel: '',
          imageTag:
            '<img src="~/arquivos/ids/158943-#width#-#height#/98-Indonesia-Blanca-1.jpg?v=637463442989070000" width="#width#" height="#height#" alt="98-Indonesia-Blanca-1" id="" />',
          imageUrl:
            'https://amalia.vtexassets.com/arquivos/ids/158943/98-Indonesia-Blanca-1.jpg?v=637463442989070000',
          imageText: '98-Indonesia-Blanca-1',
        },
        {
          imageId: '158944',
          imageLabel: '',
          imageTag:
            '<img src="~/arquivos/ids/158944-#width#-#height#/98-Indonesia-Blanca-2.jpg?v=637463442992970000" width="#width#" height="#height#" alt="98-Indonesia-Blanca-2" id="" />',
          imageUrl:
            'https://amalia.vtexassets.com/arquivos/ids/158944/98-Indonesia-Blanca-2.jpg?v=637463442992970000',
          imageText: '98-Indonesia-Blanca-2',
        },
      ],
      sellers: [
        {
          sellerDefault: true,
          commertialOffer: {
            Price: 71000,
            ListPrice: 71000,
            AvailableQuantity: 0,
          },
        },
      ],
    },
    {
      itemId: '332',
      name: 'Talla L - Color Blanca',
      variations: [
        {
          name: 'Color',
          values: ['Blanca'],
        },
        {
          name: 'Talla',
          values: ['L'],
        },
      ],
      images: [
        {
          imageId: '158945',
          imageLabel: '',
          imageTag:
            '<img src="~/arquivos/ids/158945-#width#-#height#/98-Indonesia-Blanca-1.jpg?v=637463442995500000" width="#width#" height="#height#" alt="98-Indonesia-Blanca-1" id="" />',
          imageUrl:
            'https://amalia.vtexassets.com/arquivos/ids/158945/98-Indonesia-Blanca-1.jpg?v=637463442995500000',
          imageText: '98-Indonesia-Blanca-1',
        },
        {
          imageId: '158946',
          imageLabel: '',
          imageTag:
            '<img src="~/arquivos/ids/158946-#width#-#height#/98-Indonesia-Blanca-2.jpg?v=637463442997670000" width="#width#" height="#height#" alt="98-Indonesia-Blanca-2" id="" />',
          imageUrl:
            'https://amalia.vtexassets.com/arquivos/ids/158946/98-Indonesia-Blanca-2.jpg?v=637463442997670000',
          imageText: '98-Indonesia-Blanca-2',
        },
      ],
      sellers: [
        {
          sellerDefault: true,
          commertialOffer: {
            Price: 71000,
            ListPrice: 71000,
            AvailableQuantity: 3,
          },
        },
      ],
    },
  ],
  skuSpecifications: [
    {
      field: {
        name: 'Color',
        originalName: 'Color',
      },
      values: [
        {
          name: 'Blanca',
          originalName: 'Blanca',
        },
      ],
    },
    {
      field: {
        name: 'Talla',
        originalName: 'Talla',
      },
      values: [
        {
          name: 'S',
          originalName: 'S',
        },
        {
          name: 'M',
          originalName: 'M',
        },
        {
          name: 'L',
          originalName: 'L',
        },
      ],
    },
  ],
}

const selectedItem: ProductItem = {
  itemId: '330',
  name: 'Talla S - Color Blanca',
  variations: [
    {
      name: 'Color',
      values: ['Blanca'],
    },
    {
      name: 'Talla',
      values: ['S'],
    },
  ],
  images: [
    {
      imageId: '158947',
      imageLabel: '',
      imageTag:
        '<img src="~/arquivos/ids/158947-#width#-#height#/98-Indonesia-Blanca-1.jpg?v=637463442999900000" width="#width#" height="#height#" alt="98-Indonesia-Blanca-1" id="" />',
      imageUrl:
        'https://amalia.vtexassets.com/arquivos/ids/158947/98-Indonesia-Blanca-1.jpg?v=637463442999900000',
      imageText: '98-Indonesia-Blanca-1',
    },
    {
      imageId: '158948',
      imageLabel: '',
      imageTag:
        '<img src="~/arquivos/ids/158948-#width#-#height#/98-Indonesia-Blanca-2.jpg?v=637463443002370000" width="#width#" height="#height#" alt="98-Indonesia-Blanca-2" id="" />',
      imageUrl:
        'https://amalia.vtexassets.com/arquivos/ids/158948/98-Indonesia-Blanca-2.jpg?v=637463443002370000',
      imageText: '98-Indonesia-Blanca-2',
    },
  ],
  sellers: [
    {
      sellerDefault: true,
      commertialOffer: {
        Price: 71000,
        ListPrice: 71000,
        AvailableQuantity: 0,
      },
    },
  ],
}

const handleSelectedItem = (_item: ProductItem) => {}

const runtime = {
  account: 'amalia',
  workspace: 'master',
  platform: 'vtex-io',
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

const ActionsProvider = ({ children }: Props) => {
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
    config,
    multipleAvailableSKUs,
    onClickBehavior,
    product,
    selectedItem,
    handleSelectedItem,
    redirectUrl: null,
    minimize: false,
    runtime,
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
