import type { GroupPaymentMethods } from './simulation'

/* eslint-disable @typescript-eslint/no-explicit-any */
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
export interface Item {
  priceTags: any
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
  productCategories?: any[]
  productCategoryIds?: string
  skuSpecifications: any[]
  listPrice: number
  unitMultiplier: number
  measurementUnit: string
  showTotalMount?: boolean
  hiddenUnits?: boolean
  hiddenRemove?: boolean
  description?: string
  additionalInfo?: Record<string, unknown>
  refId?: string
  priceDefinition?: {
    calculatedSellingPrice?: number
    total?: number
    sellingPrices?: [
      {
        value?: number
        quantity?: number
      }
    ]
  }
  tax?: number
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

export interface OfferingInput {
  itemIndex: number
  offeringId: string
}

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
  message?: string
  imageUrl?: string
  name?: string
}

export type TotalizerId = 'Items' | 'Shipping' | 'Tax' | 'Discounts'
export interface Totalizer {
  id: TotalizerId
  name: string
  value: number
}
export interface OrderForm {
  clientProfileData?: {
    email?: string
  }
  shippingData?: {
    selectedAddress?: Address | null
    addressAlternative?: Address | null
  }
  items: Item[]
  totalizers: Totalizer[]
  value: number
  paymentData?: PaymentData
  messages?: Message[]
  marketingData?: MarketingData
  ratesAndBenefitsData?: RatesAndBenefitsData
  logisticsInfo?: LogisticsInfo[]
}

export interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
}

export interface RateAndBenefitsIdentifier {
  name: string
  id: string
}

export interface MarketingData {
  coupon?: string
}

export interface Message {
  code: string
}

export interface ClientProfileData {
  id?: string
  firstName?: string
  lastName?: string
  documentType?: string
  document?: string
  email: string
  phone?: string
  completed?: boolean
  loadData?: boolean
  prefix?: string
  habeasData?: boolean
}

export interface CartSimulation {
  items: ItemToAdd[]
  postalCode: string
  geoCoordinates?: GeoCoordinates
  country: string
  shippingData?: ShippingData
  logisticsInfo?: LogisticsInfo[]
  totals?: Totalizer[]
  paymentData?: {
    installmentOptions: InstallmentOption[]
  }
  ratesAndBenefitsData?: RatesAndBenefitsData
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
}

export interface DeliveryWindow {
  startDateUtc: string
  endDateUtc: string
  price?: number
}

export interface ScheduleDelivery {
  day: string
  timeRange: string
}

export interface SlaSummary {
  delivery: Sla[]
  'pickup-in-point': Sla[]
  itemsIndex?: number[]
  packages?: ChangeLogistics[]
  dontUpdateLogistics?: boolean
  updateWhenChangeItems?: boolean
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

export interface PaymentMethod {
  paymentId?: string
  cardId?: string
  id?: string
  gateway?: string
  email?: string
  franchise?: string
  number?: string
  ccToken?: string
  paymentMethod: string
  card?: string
  bin?: string
  cvv?: string
  origin?: string
  paymentSystem?: string
}

interface GeoCoordinates {
  latitude: string
  longitude: string
}

export interface PaymentForm {
  disabled: boolean
  error: boolean
  franchiseImg?: string
  handlePayment: any
  loading: boolean
  paymentMethod: string
  payments: GroupPaymentMethods
  selectedCard: any
  setError: any
  handledPaymentDisabled?: () => void
  setFranchiseImg?: (franchise?: string) => void
}

export interface PaymentsMethod {
  accountName: string
  id: string
  isActive: boolean
  paymentMethodName: string
}

export interface Visualization {
  key: string
  secundaryKey: string
  type: string
}

export interface Settings {
  isLoaded: boolean
  buttonMessage?: string
  buttonText?: string
  cvcRequired?: boolean
  cvcValid?: boolean
  habeasDataInformation: HabeasDataInformation
  hasGoogleAnalytics?: boolean
  additionalData?: Record<string, string>
  isConfigured?: boolean
  isLiteVersion?: boolean
  orion?: boolean
  paymentMethod?: PaymentsMethod[]
  paymentSystem?: string
  styles?: string
  visualization?: Visualization[]
}

export interface PaymentData {
  availablePaymentMethods?: PaymentMethod[] | null
  selectedPaymentMethod?: PaymentMethod | null
  paymentMethod?: PaymentMethod | null
  completed?: boolean
  otherAvailablePaymentMethods?: PaymentMethod[] | null
  bin?: string | null
  cvv?: string | null
  installmentOptions?: InstallmentOption[] | null
  temporalPaymentSystem?: string
}

export interface InstallmentOption {
  bin?: string
  installments: Installment[] | null
  paymentName: string
  value: number
  paymentSystem: string
}

export interface Installment {
  count: number
  value: number
  total?: number
}

export interface Steps {
  profile: boolean
  shipping: boolean
  payment: boolean
}

export interface SelectValue {
  value: Option
  onChange: (option: Option) => void
  isValid: boolean
  setIsValid: React.Dispatch<boolean>
  reset: () => void
  setValue: React.Dispatch<React.SetStateAction<Option>>
}

export interface InputValue {
  value: string
  isValid: boolean
  setIsValid: React.Dispatch<boolean>
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  reset: () => void
  setValue: React.Dispatch<React.SetStateAction<string>>
}

interface Option {
  label: string
  value: string
}

export interface ChangeLogistics {
  shippingPackage: number
  selectedSla: string
  deliveryWindow: DeliveryWindow
  scheduleDelivery: ScheduleDelivery
  selectedDeliveryChannel: string
}
export interface ResponseValidateItem {
  id: string
  message: string
  imageUrl?: string
  name?: string
}
export interface BundleIteminput {
  id: string
  parentItemId: string
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
      SellingPrice?: number
    }
  }>
  nameComplete?: string
}

export interface Image {
  imageId: string
  imageLabel: string | null
  imageTag: string
  imageUrl: string
  imageText: string
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

export type Variations = Record<
  string,
  {
    originalName: string
    values: Array<{
      name: string
      originalName: string
    }>
  }
>

export type VariationsV2 = {
  name: string
  values: string[]
}

export interface Product {
  categories?: string[]
  items: ProductItem[]
  skuSpecifications: SkuSpecification[]
  priceRange?: {
    listPrice?: {
      highPrice?: number
      lowPrice?: number
    }
  }
  brand?: string
  brandId?: number
  description?: string
  link?: string
  linkText?: string
  productId?: string
  productName?: string
  productReference?: string
}

export interface SelectorProductItem extends Omit<ProductItem, 'variations'> {
  variations: string[]
  variationValues: Record<string, string>
}

export interface CallbackItem {
  name: string
  value: string
  skuId: string | null
  isMainAndImpossible: boolean
  possibleItems: SelectorProductItem[]
}

export type ImageMap = Record<string, Record<string, Image | undefined>>

export type ShowValueForVariation = 'none' | 'image' | 'all'

export type ShowVariationsLabels =
  | boolean
  | 'none'
  | 'variation'
  | 'itemValue'
  | 'variationAndItemValue'

export type DisplayMode = 'select' | 'default' | 'slider'

export type SelectedVariations = Record<string, string | null>

export type InitialSelectionType = 'complete' | 'image' | 'empty'

export interface DisplayOption {
  label: string
  originalName: string
  onSelectItem: () => void
  image: Image | undefined
  available: boolean
  impossible: boolean
  disabled: boolean
}

export interface DisplayVariation {
  name: string
  originalName: string
  options: DisplayOption[]
}

export interface AvailableVariationParams {
  variations: Variations
  selectedVariations: SelectedVariations
  imagesMap: ImageMap
  onSelectItemMemo: (callbackItem: CallbackItem) => () => void
  skuItems: SelectorProductItem[]
  hideImpossibleCombinations: boolean
  disableUnavailableSelectOptions: boolean
}

export type SelectedVariationsNotNull = Record<string, string>

export interface DataPCIChange {
  event: {
    field: string
    type: string
  }
  fields: {
    cardNumber: { length: number; valid: boolean; paymentMethod?: string }
    cvv: { length: number; valid: boolean; required?: boolean }
  }
  hasErrors: boolean
}

export interface DataPCIPSuccess {
  card: {
    bin: string
    expiry_month: string
    expiry_year: string
    message: string
    number: string
    origin?: string
    status?: string
    token: string
    transaction_reference?: string
    type: string
  }
}

export interface DataPCIPGetCardInfo {
  card: {
    card_auth: string
    cvc: string
    expiry_month: number
    expiry_year: number
    holder_name: string
    nip: string
    number: string
    type: string
  }
}

export interface DataPCISuccess {
  transactionId: string
  cardInfo: {
    brand: string
    type: string
    usage: string
    country: string
    issuer: string
  }
}

export interface DataPCIGetCardInfo {
  cardInfo?: {
    brand: string
    type: string
    usage: string
    country: string
    issuer: string
  }
  maskedCard?: string
  paymentMethod?: string
  result?: string
  error?: string
}

export interface Runtime {
  account: string
  workspace: string
  platform: string
}

// eslint-disable-next-line no-restricted-syntax
export enum Platform {
  vtexIo = 'vtex-io',
  vtexCms = 'vtex-cms',
}

export interface IsClickToAddToCart {
  isClick: boolean
  data: any | null
}

// eslint-disable-next-line no-restricted-syntax
export enum Events {
  add = 'addToCart',
  remove = 'removeFromCart',
  click = 'click',
  checkout = 'checkout',
  authentication = 'authentication',
}

export interface PackageSummary {
  deliveryType: string
  deliveryTypeName: string
  selectedSla: string
  deliveryDate: string
  step: string
  price: string
  storeInfo: string
}

export interface ICredit {
  approved: number
  credit: boolean
  installments: number
}

export interface ISimulationCredit {
  quotaQuantity: number
  quotaValue: number
}

// eslint-disable-next-line no-restricted-syntax
export enum DiscountIdentifier {
  GIFT = 'DISCOUNT@GIFT',
  SHIPPING = 'DISCOUNT@SHIPPING',
  SHIPPINGMARKETPLACE = 'DISCOUNT@SHIPPINGMARKETPLACE',
  MARKETPLACE = 'DISCOUNT@MARKETPLACE',
  MANUALPRICE = 'DISCOUNT@MANUALPRICE',
  SELLERPRICE = 'DISCOUNT@SELLERPRICE',
  GIFTCARD = 'DISCOUNT@GIFTCARD',
  TAX_SHIPPING = 'TAX@SHIPPING',
}

export interface BlockedShipping {
  categories: ICategory[]
}

interface ICategory {
  name: string
  id: string
}
export interface StoreTermsAndConditionsContent {
  id: string
  content: string
}

export interface ShowPaymentMethod {
  id: string
  show: boolean
}

export interface InitialProps {
  blockedShipping?: BlockedShipping
  config?: Partial<Config>
  customData?: any
  hideDiscount?: boolean
  isPreview?: boolean
  language?: string
  orderForm: OrderForm | null
  runtime: Runtime
  sandbox?: boolean
  showPaymentMethods?: ShowPaymentMethod[]
  skuSelectorProps?: {
    visibleVariations?: string[]
    useImageInColor?: boolean
  }
  storeTermsAndConditionsContent?: StoreTermsAndConditionsContent[]
  theme: string
  addItemOffering?: (offeringInput: OfferingInput) => void
  addToCart: (item: ItemToAdd) => void
  cartSimulation: (simulationItems: CartSimulation) => Promise<Response>
  clearData: (items: ItemToRemove[]) => void
  clearOrderFormProfile: () => void
  handleGetDocumentsClient?: (email: string) => void
  handleSelectedItem?: (item: ProductItem) => void
  insertCoupon?: (text: string) => void
  removeItemOffering?: (offeringInput: OfferingInput) => void
  updateItems: (items: ItemToRemove[]) => void
  updateOrderFormProfile: (profile: ClientProfileData) => void
  updateSelectedAddress: (address: Address) => void
  validateItems?: () => ResponseValidateItem[] | []
}
export interface Step {
  profile: boolean
  shipping: boolean
  payment: boolean
  logistic: boolean
}

export type HabeasDataInformation = {
  url: string
  version: number
}

export interface CounterSecond {
  second: number
  intervalSetSecond: ReturnType<typeof setInterval>
}
