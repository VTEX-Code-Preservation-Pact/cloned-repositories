export interface SimulationData {
  items: ItemRequest[]
  postalCode?: string
  geoCoordinates?: string[]
  country: string
  paymentData: {
    payments: PaymentRequest[]
  }
  clientProfileData: ClientProfileDataSimulation
  shippingData: {
    logisticsInfo: LogisticInfoRequest[]
    selectedAddresses?: AddressRequest[]
  }
}

interface AddressRequest {
  addressId: string
  country: string
  postalCode?: string
  geoCoordinates?: [string, string]
  addressType: 'residential' | 'search'
}

interface LogisticInfoRequest {
  itemIndex: number
  selectedSlaId: string // For Simulation is selectedSlaId, For Order is selectedSla
  selectedDeliveryChannel: string
  selectedDeliveryWindow?: {
    // For Simulation is selectedDeliveryWindow, For Order is deliveryWindow
    startDateUtc: string
    endDateUtc: string
  }
}

interface ItemRequest {
  id: string
  quantity: number
  seller: string
}

interface PaymentRequest {
  bin: string
  paymentSystem: string
  installments: number
}

export interface ClientProfileDataSimulation {
  email?: string
}

export interface Simulation {
  items: ItemSimulation[]
  paymentData: PaymentDataSimulation
  logisticsInfo: LogisticInfoSimulation[]
  totals: TotalsSimulation
  promotions: Promotion[]
}

export interface Promotion {
  id: string
  name: string
}

export interface ItemSimulation {
  id: string
  requestIndex: number
  quantity: number
  seller: string
  measurementUnit: string
  unitMultiplier: number
  sellingPrice: number
  listPrice: number
  price: number
  availability: string
}

interface PaymentDataSimulation {
  paymentMethods: PaymentMethodSimulation[]
}

export interface PaymentMethodSimulation {
  id: string
  name: string
  description: string
  groupName: string
  isCustom: boolean
  value: number
  installmentsOptions: InstallmentOptionsSimulation[]
}

export interface GroupPaymentMethods {
  isCreditCard: boolean
  groupName: string
  paymentMethods: PaymentMethodSimulation[]
}

export interface InstallmentOptionsSimulation {
  count: number
  value: number
}

export interface LogisticInfoSimulation {
  itemIndex: number
  addressInternalId: string
  selectedSla: string
  selectedDeliveryChannel: string
  slas: SlaSimulation[]
}

export interface SlaSimulation {
  id: string
  name: string
  deliveryChannel: string
  shippingEstimate: string
  price: number
  availableDeliveryWindow: DeliveryWindowSimulation[]
  deliveryWindow: DeliveryWindowSimulation
  pickupStoreInfo?: PickupStoreInfoSimulation
}

export interface PickupStoreInfoSimulation {
  additionalInfo?: string
  friendlyName?: string
  address?: {
    street: string
    state: string
    city: string
  }
}

export interface DeliveryWindowSimulation {
  endDateUtc: string
  lisPrice?: number
  price?: number
  startDateUtc: string
}

export interface TotalsSimulation {
  items?: number
  shipping?: number
  tax?: number
  discount?: number
}

export type SimulationStatus =
  | 'idle'
  | 'preloading'
  | 'loading'
  | 'succeeded'
  | 'failed'
