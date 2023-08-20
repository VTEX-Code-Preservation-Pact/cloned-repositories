import type { Item } from '.'

export interface OrderFormMC {
  canEdit: boolean
  isLoggedIn: boolean
  profile: ProfileMC
  shipping: ShippingMC
  payments: PaymentsMC
  items: ItemMC[]
  status: 'idle' | 'incomplete' | 'complete'
  acceptHabeasData: boolean
}

export interface ProfileMC {
  id?: string
  name: string
  lastname: string
  phoneCode: string
  phone: string
  habeasData?: boolean
  email: string
  documentType: string
  document: string
}

export interface ShippingMC {
  address: AddressMC
  selectedAddresses: AddressMC[]
  availableAddresses: AddressMC[]
  logisticInfo?: LogisticInfo[]
}

export interface AddressMC {
  id: string
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  postalCode: string
  reference: string
  receiverName: string
  complement: string
  geoCoordinates: {
    longitude: string
    latitude: string
  }
  addressDeliveryType?: 'delivery' | 'pickup'
  selectedSlaId?: string
}

export interface LogisticInfo {
  itemIndex: number
  addressId?: string
  selectedSla: string // For Simulation is selectedSlaId, For Order is selectedSla
  selectedDeliveryChannel: string
  selectedShippingEstimate: string
  deliveryWindow?: {
    // For Simulation is selectedDeliveryWindow, For Order is deliveryWindow
    startDateUtc: string
    endDateUtc: string
  }
  storeName?: string
}

export interface PaymentsMC {
  payment?: Payment[]
  availableCards: Card[]
  selectedCard?: Card
}

export type Payment = {
  paymentMethod?: string
  paymentId?: string
  installments?: number
  additionalData?: Array<{ key: string; value: string }>
} & Card

export type Card = {
  cardId?: string
  bin?: string
  holderDocument?: string
  holderName?: string
  expirationDate?: string
  franchise?: string
  number?: string
  gateway?: string
  origin?: string
}

export type ItemMC = Item

export interface OrderFormSimulation {
  items: ItemMC[]
  email: string
  selectedAddresses: AddressMC[]
  payments: Payment[]
  logisticsInfo: LogisticInfo[]
}

export interface PackageSummaryMC {
  deliveryChannel: string
  deliveryId: string
  storeName: string
  packageCount?: number
  selectedShippingEstimate?: string
}
