export interface ItemToAdd {
  id?: number | string
  quantity?: number
  seller?: string
}

export interface ItemToRemove {
  id?: number | string
  index?: number
  quantity: number
  seller?: string
  uniqueId?: string
}

export interface OfferingInput {
  itemIndex: number
  offeringId: string
}

export interface ResponseValidateItem {
  id: string
  message: string
  imageUrl?: string
  name?: string
}

export interface Config {
  mainSellerId?: string
  salesChannel?: string
  customItems?: CustomItems[]
  customSubTotalItems?: CustomSubTotalItems[]
}

export interface CustomSubTotalItems {
  name: string
  value: number
}

export interface CustomItems {
  sku: string
  customClassName?: string
  name?: string
  sendToFinish?: boolean
  showTotalMount?: boolean
  remove?: boolean
}

export interface Card {
  paymentSystemName: string
  accountId: string
  cardNumber: string
}

export interface MarketingData {
  coupon?: string
}

export interface Message {
  code: string
}

export interface PaymentMethod {
  id?: string
  bin?: string
  ccToken?: string
  email?: string
  franchise?: string
  gateway?: string
  number?: string
  paymentId?: string
  paymentMethod: string
}

export interface PaymentData {
  availablePaymentMethods?: PaymentMethod[] | null
  selectedPaymentMethod?: PaymentMethod | null
  paymentMethod?: PaymentMethod | null
  completed?: boolean
  otherAvailablePaymentMethods?: PaymentMethod[] | null
  bin?: string | null
}

type TotalizerId = 'Items' | 'Shipping' | 'Tax' | 'Discounts'

export interface Totalizer {
  id: TotalizerId
  name: string
  value: number
}

export interface BundleItem {
  id: string
  name: string
  price: number
}

export interface Offering {
  allowGiftMessage: boolean
  id: string
  name: string
  price: number
  type: string
}

export interface Item {
  uniqueId: string
  id: string
  name: string
  quantity: number
  sellingPrice: number
  imageUrl: string
  availability: string
  index: number
  seller: string
  offerings: Offering[]
  bundleItems: BundleItem[]
  isGift: boolean
  price: number
  skuSpecifications: SkuSpecification[]
  productCategories?: any[]
  listPrice: number
  imageUrls?: {
    at1x: string
  }
  unitMultiplier: number
  measurementUnit: string
  priceTags: any
}

interface GeoCoordinates {
  latitude: string
  longitude: string
}

export interface Address {
  addressId: string
  addressType: string
  city: string
  complement?: string
  country: string
  geoCoordinates: GeoCoordinates
  isDisposable?: boolean
  neighborhood: string
  number?: string
  postalCode: string
  receiverName: string
  reference?: string
  state: string
  street: string
  completed?: boolean
  selectedSlaId?: string
}

export interface OrderForm {
  clientProfileData?: {
    email?: string
  }
  shippingData?: {
    selectedAddress?: Address | null
  }
  items: Item[]
  totalizers: Totalizer[]
  value: number
  paymentData?: PaymentData
  messages?: Message[]
  marketingData?: MarketingData
}

export interface CustomData {
  customApps: CustomApp[]
}

interface CustomApp {
  id: string
  major: number
  fields: CustomAppField[]
}

interface CustomAppField {
  key: string
  value: string
}

export interface Seller {
  commertialOffer: CommertialOffer
}

interface CommertialOffer {
  AvailableQuantity: number
}

export interface Profile {
  email?: string
  firstName?: string
  lastName?: string
  document?: string
  phone?: string
  documentType?: string
  isCorporate?: boolean
  corporateName?: string
  tradeName?: string
  corporateDocument?: string
  stateInscription?: string
}

export interface ProductItem {
  itemId: string
  name: string
  images: Image[]
  variations: Array<{
    name: string
    values: string[]
  }>
  sellers: Array<{
    sellerDefault: boolean
    commertialOffer: {
      Price: number
      ListPrice: number
      AvailableQuantity: number
    }
  }>
}

export interface Image {
  imageId?: string
  imageLabel?: string | null
  imageTag?: string
  imageUrl?: string
  imageText?: string
}

export interface CartSimulation {
  items: ItemToAdd
  postalCode: string
  geoCoordinates: GeoCoordinates
  country: string
  shippingData?: ShippingData
  logisticsInfo: LogisticsInfo[]
  totals: Totalizer[]
  paymentData: {
    installmentOptions: InstallmentOption[]
  }
}

export interface ShippingData {
  logisticsInfo: LogisticsInfo[]
}

export interface LogisticsInfo {
  addressId?: string
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel: string
  slas?: Sla[]
  deliveryWindow?: DeliveryWindow
  deliveryChannel?: string
}

export interface DeliveryWindow {
  startDateUtc: string
  endDateUtc: string
  price?: number
}

export interface Sla {
  itemIndex?: number[]
  id: string
  deliveryChannel: string
  name: string
  shippingEstimate: string
  shippingEstimateDate: string
  availableDeliveryWindows: DeliveryWindow[]
  price: number
  prices: Prices[]
  index?: number
  pickupStoreInfo?: PickupStoreInfo
}

interface PickupStoreInfo {
  additionalInfo?: string
  friendlyName?: string
  address?: Address
}

interface Prices {
  [n: string]: number
}

export interface SkuSpecification {
  field: SkuSpecificationField
  values: SkuSpecificationValues[]
}

export interface SkuSpecificationField {
  name: string
  originalName: string
}

export interface SkuSpecificationValues {
  name: string
  originalName: string
}

export interface InstallmentOption {
  bin?: string
  installments: Installment[] | null
  paymentName: string
  value: number
}

export interface Installment {
  count: number
  value: number
  total: number
}

export interface ResponseManageBag {
  quantity: number | string
  price: number
}

export interface StoreTermsAndConditionsContent {
  id: string
  content: string
}
export interface BlockedShipping {
  categories: ICategory[]
}

export interface ShowPaymentMethod {
  id: string
  show: boolean
}

interface ICategory {
  name: string
  id: string
}
