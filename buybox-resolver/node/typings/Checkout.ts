interface OrderFormMarketingData {
  utmCampaign?: string
  utmMedium?: string
  utmSource?: string
  utmiCampaign?: string
  utmiPart?: string
  utmipage?: string
  marketingTags?: string
}

interface CheckoutAddress {
  addressType: string
  receiverName: string
  addressId: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: string | null
  geoCoordinates: [number, number]
}

interface OrderFormItem {
  id: string
  name: string
  detailUrl: string
  imageUrl: string
  productRefId: string
  skuName: string
  quantity: number
  uniqueId: string
  productId: string
  refId: string
  ean: string
  priceValidUntil: string
  price: number
  tax: number
  listPrice: number
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  parentItemIndex: number | null
  parentAssemblyBinding: string | null
  productCategoryIds: string
  priceTags: string[]
  measurementUnit: string
  additionalInfo: {
    brandName: string
    brandId: string
    offeringInfo: any | null
    offeringType: any | null
    offeringTypeId: any | null
  }
  productCategories: Record<string, string>
  seller: string
  sellerChain: string[]
  availability: string
  unitMultiplier: number
}

interface LogisticsInfo {
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel: string
  addressId: string
  slas: Array<{
    id: string
    deliveryChannel: string
    name: string
    deliveryIds: Array<{
      courierId: string
      warehouseId: string
      dockId: string
      courierName: string
      quantity: number
    }>
    shippingEstimate: string
    shippingEstimateDate: string | null
    lockTTL: string | null
    availableDeliveryWindows: any[]
    deliveryWindow: string | null
    price: number
    listPrice: number
    tax: number
    pickupStoreInfo: {
      isPickupStore: boolean
      friendlyName: string | null

      address: CheckoutAddress | null
      additionalInfo: any | null
      dockId: string | null
    }
    pickupPointId: string | null
    pickupDistance: number
    polygonName: string | null
  }>
  shipsTo: string[]
  itemId: string
  deliveryChannels: Array<{ id: string }>
}

interface OrderForm {
  items: OrderFormItem[]
  ratesAndBenefitsData: {
    rateAndBenefitsIdentifiers: any[]
    teaser: any[]
  }
  paymentData: {
    installmentOptions: Array<{
      paymentSystem: string
      bin: string | null
      paymentName: string | null
      paymentGroupName: string | null
      value: number
      installments: Array<{
        count: number
        hasInterestRate: false
        interestRate: number
        value: number
        total: number
        sellerMerchantInstallments: Array<{
          count: number
          hasInterestRate: false
          interestRate: number
          value: number
          total: number
        }>
      }>
    }>
    paymentSystems: Array<{
      id: string
      name: string
      groupName: string
      validator: {
        regex: string
        mask: string
        cardCodeRegex: string
        cardCodeMask: string
        weights: number[]
        useCvv: boolean
        useExpirationDate: boolean
        useCardHolderName: boolean
        useBillingAddress: boolean
      }
      stringId: string
      template: string
      requiresDocument: boolean
      isCustom: boolean
      description: string | null
      requiresAuthentication: boolean
      dueDate: string
      availablePayments: any | null
    }>
    payments: any[]
    giftCards: any[]
    giftCardMessages: any[]
    availableAccounts: any[]
    availableTokens: any[]
  }
  selectableGifts: any[]
  logisticsInfo: LogisticsInfo[]
  marketingData: OrderFormMarketingData | null
  postalCode: string
  country: string
  messages: any[]
  subscriptionData: any | null
  itemMetadata: {
    items: MetadataItem[]
  }
}

interface PayloadItem {
  id: string
  quantity: number
  seller: string
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
}

interface SimulationPayload {
  country?: string
  items: PayloadItem[]
  postalCode?: string
  isCheckedIn?: boolean
  priceTables?: string[]
  marketingData?: Record<string, string>
}
